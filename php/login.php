<?php
header('Content-Type: application/json');
$servername = "localhost";
$sql_username = "root";
$sql_password = "shihongxiang";
$dbname = "art";

if($_SERVER['REQUEST_METHOD']==="POST"){
  $username = $_POST['username'];
  $password = $_POST['password'];
  try {
    $conn = mysqli_connect($servername, $sql_username, $sql_password, $dbname);
    // 检查连接是否成功
    if ($conn->connect_error) {
        throw new Exception("数据库连接失败：" . $conn->connect_error);
    }

    $stmt_1 = $conn->prepare("SELECT * FROM customerlogon WHERE Username = ? ");
    $stmt_1->bind_param("s", $username);
    $stmt_1->execute();
    $result_1 = $stmt_1->get_result();
    if($result_1->num_rows === 1){
        $row = $result_1->fetch_assoc();
        $hashPassword = hash('sha256',$password . $row['Salt']);
        if($hashPassword === $row['Pass']){
          //返回用户ID
          $stmt_2 = $conn->prepare("SELECT CustomerID FROM customerlogon WHERE Username = ? ");
          $stmt_2->bind_param("s", $username);
          $stmt_2->execute();
          $result_2 = $stmt_2->get_result();
          $userID = $result_2->fetch_assoc()["CustomerID"];
          http_response_code(200);
          echo json_encode(['message' => '登录成功', 'userID' => $userID]);
          exit();
        }else{
          http_response_code(401);
          echo json_encode(['message' => '密码错误']);
          exit();
        }
    }else{
      http_response_code(400);
      echo json_encode(['message' => '用户不存在']);
      exit();
    }
    // $sql_findByUsername = "SELECT * FROM customerlogon WHERE Username = '$username' ";
    // $sql_findID = "SELECT CustomerID FROM customerlogon WHERE Username = '$username' ";
    // $result = $conn->query($sql_findByUsername);
    // if($result->num_rows === 1){
    //   $row = $result->fetch_assoc();
    //   $hashPassword = hash('sha256',$password . $row['Salt']);
    //   if($hashPassword === $row['Pass']){
    //     //返回用户ID
    //     $userID = $conn->query($sql_findID)->fetch_assoc()["CustomerID"];
    //     http_response_code(200);
    //     echo json_encode(['message' => '登录成功', 'userID' => $userID]);
    //     exit();
    //   }else{
    //     http_response_code(401);
    //     echo json_encode(['message' => '密码错误']);
    //     exit();
    //   }
    // }else{
    //   http_response_code(400);
    //   echo json_encode(['message' => '用户不存在']);
    //   exit();
    // }
  }catch (Exception $e){
    http_response_code(500);
    echo json_encode(['message' => '服务器错误：' . $e->getMessage()]);
    exit();
  }
      
    
  }
?>