<?php
    require "./mysql.php";
    header('Content-Type: application/json');  
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        try{
            $modify_password = $_POST["password"];
            $modify_RealName = $_POST["modify_RealName"];
            $modify_phone = $_POST["modify_phone"];
            $modify_email = $_POST["modify_email"];
            $modify_address = $_POST["modify_address"];
            $modify_gender = $_POST["modify_gender"];
            $modify_birthday = $_POST["modify_birthday"];
            $modify_country = $_POST["modify_country"];
            $ID = $_POST["ID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            // 检查连接是否成功
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            //更新密码和盐值
            $salt = bin2hex(random_bytes(16));
            $hashed_password = hash("sha256", $modify_password. $salt);
            $sql_modify_password = "UPDATE customerlogon SET Pass='$hashed_password',Salt='$salt' WHERE CustomerID=$ID ";
            if($conn->query($sql_modify_password) !== true){
                throw new Exception("修改密码失败" . $conn->error);
            }
            //更新其他信息
            $sql_modify_other_info = "UPDATE customers SET RealName='$modify_RealName', Birthday='$modify_birthday', Gender='$modify_gender', Phone='$modify_phone', Email='$modify_email',`Address`='$modify_address',Country='$modify_country' WHERE CustomerID = $ID ";
            if($conn->query($sql_modify_other_info) !== true)
                throw new Exception($conn->error);

            http_response_code(200);
            echo json_encode(["message" =>'修改信息成功']);
        }catch(Exception $e){
            http_response_code(404);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>