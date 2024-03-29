<?php
  header('Content-Type: application/json');  

 

  $servername = "localhost:3306";
  $sql_username = "root";
  $sql_password = "shihongxiang";
  $dbname = "art";
  if($_SERVER['REQUEST_METHOD']==="POST"){
    try{
    $conn = mysqli_connect($servername, $sql_username, $sql_password, $dbname);
    if ($conn->connect_error) { // 检查连接是否成功
        throw new Exception("数据库连接失败：" . $conn->connect_error);
    }
    $username = $_POST["username"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $gender = $_POST["gender"];
    $birthday = $_POST["birthday"];
    $nationality = $_POST["nationality"];
    // 检查用户名是否重复
    $sql_check_username = "SELECT * FROM customerlogon WHERE UserName = ?";
    $stmt_check_username = $conn->prepare($sql_check_username);
    if (!$stmt_check_username) {
      throw new Exception("SQL 准备失败：" . $conn->error);
    }
    $stmt_check_username->bind_param("s", $username);
    if (!$stmt_check_username->execute()) {
      throw new Exception("SQL 执行失败：" . $stmt_check_username->error);
    }
    $check_result = $stmt_check_username->get_result();
    if ($check_result->num_rows > 0) {
      http_response_code(401);
      echo json_encode(["message" => '用户名重复']);
      exit();
    }
    // 密码哈希加盐
    $salt = bin2hex(random_bytes(16));
    $hashed_password = hash("sha256", $password . $salt);
    // 插入注册信息
    $sql_insert = "INSERT INTO customerlogon (UserName, Pass, Salt) VALUES (?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    if (!$stmt_insert) {
      throw new Exception("SQL 准备失败：" . $conn->error);
    }
    $stmt_insert->bind_param("sss", $username, $hashed_password, $salt);
    if (!$stmt_insert->execute()) {
      throw new Exception("SQL 执行失败：" . $stmt_insert->error);
    }
    // 插入详细的个人信息
    $customerID = $stmt_insert->insert_id;
    if ($birthday === '') {
      $sql_insert_info = "INSERT INTO customers (CustomerID, Gender, `Address`, Country, Phone, Email) VALUES (?, ?, ?, ?, ?, ?)";
      $stmt_insert_info = $conn->prepare($sql_insert_info);
      if (!$stmt_insert_info) {
        throw new Exception("SQL 准备失败：" . $conn->error);
      }
      $stmt_insert_info->bind_param("isssss", $customerID, $gender, $address, $nationality, $phone, $email);
    } else {
      $sql_insert_info = "INSERT INTO customers (CustomerID, Gender, `Address`, Country, Phone, Email, Birthday) VALUES (?, ?, ?, ?, ?, ?, ?)";
      $stmt_insert_info = $conn->prepare($sql_insert_info);
      if (!$stmt_insert_info) {
        throw new Exception("SQL 准备失败：" . $conn->error);
      }
      $stmt_insert_info->bind_param("issssss", $customerID, $gender, $address, $nationality, $phone, $email, $birthday);
    }
    if (!$stmt_insert_info->execute()) {
      throw new Exception("SQL 执行失败：" . $stmt_insert_info->error);
    }

    http_response_code(200);
    echo json_encode(["message" => '用户注册成功！']);

    //检查用户名是否重复
    // $sql_check_username = "SELECT * FROM customerlogon WHERE Username = '$username'";
    // $check_result = $conn->query($sql_check_username);
    // if($check_result->num_rows > 0){
    //   http_response_code(401);
    //   echo json_encode(["message" =>'用户名重复']);
    //   exit();
    // }
    // //密码哈希加盐
    // $salt = bin2hex(random_bytes(16));
    // $hashed_password = hash("sha256", $password. $salt);
    // //插入注册信息
    // $sql_insert = "INSERT INTO customerlogon (UserName, Pass, Salt) VALUES ('$username', '$hashed_password', '$salt')";
    // if ($conn->query($sql_insert) !== TRUE){
    //   http_response_code(500);
    //   echo json_encode(["message" =>'用户注册失败:'.$conn->error]);
    // } 
    // //插入详细的个人信息
    // $customerID = mysqli_insert_id($conn);
    // if($birthday === '')
    //   $sql_insert_info ="INSERT INTO customers (CustomerID,Gender,`Address`,Country,Phone,Email) VALUES ($customerID,'$gender','$address','$nationality','$phone','$email')";
    // else
    //   $sql_insert_info ="INSERT INTO customers (CustomerID,Gender,`Address`,Country,Phone,Email, Birthday) VALUES ($customerID,'$gender','$address','$nationality','$phone','$email','$birthday')";
    // if($conn->query($sql_insert_info) != true ){
    //   throw new Exception($conn->error);
    // }else{
    //   http_response_code(200);
    //   echo json_encode(["message" =>'用户注册成功！']);
    // }

  }catch(Exception $e){
    http_response_code(500);
    echo json_encode(['message' => '服务器错误：' . $e->getMessage()]);
    exit();
  }
  
  }

?>