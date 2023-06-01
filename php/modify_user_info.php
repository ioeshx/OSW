<?php
    require "./mysql.php";
    header('Content-Type: application/json');  
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        try{
            $modify_password = $_POST["password"];
            $modify_RealName = $_POST["modify_RealName"] ?? "";
            $modify_phone = $_POST["modify_phone"] ?? "";
            $modify_email = $_POST["modify_email"] ?? "";
            $modify_address = $_POST["modify_address"] ?? "";
            $modify_gender = $_POST["modify_gender"] ?? "";
            $modify_birthday = $_POST["modify_birthday"] ?? "";
            $modify_country = $_POST["modify_country"] ?? "";
            $ID = $_POST["ID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            // 检查连接是否成功
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            //更新密码和盐值
            $salt = bin2hex(random_bytes(16));
            $hashed_password = hash("sha256", $modify_password. $salt);
            $sql_modify_password = "UPDATE customerlogon SET Pass='$hashed_password',Salt='$salt' WHERE CustomerID=$ID ";
            if($conn->query($sql_modify_password) != true){
                throw new Exception("修改密码失败" . $conn->error);
            }
            //更新其他信息
            // if( $modify_birthday == "")
            //     $sql_modify_other_info = "UPDATE customers SET RealName='$modify_RealName', Gender='$modify_gender', Phone='$modify_phone', Email='$modify_email',`Address`='$modify_address',Country='$modify_country' WHERE CustomerID = $ID ";
            // else
            //     $sql_modify_other_info = "UPDATE customers SET RealName='$modify_RealName', Gender='$modify_gender', Phone='$modify_phone', Email='$modify_email',`Address`='$modify_address', Country='$modify_country', Birthday='$modify_birthday' WHERE CustomerID = $ID ";
            // if($conn->query($sql_modify_other_info) != true)
            //     throw new Exception("修改个人信息失败". $conn->error);
            $stmt;
            if ($modify_birthday == "") {
                $sql_modify_other_info = "UPDATE customers SET RealName=?, Gender=?, Phone=?, Email=?, `Address`=?, Country=? WHERE CustomerID=?";
                $stmt = $conn->prepare($sql_modify_other_info);
                $stmt->bind_param('ssssssi', $modify_RealName, $modify_gender, $modify_phone, $modify_email, $modify_address, $modify_country, $ID);
            } else {
                $sql_modify_other_info = "UPDATE customers SET RealName=?, Gender=?, Phone=?, Email=?, `Address`=?, Country=?, Birthday=? WHERE CustomerID=?";
                $stmt = $conn->prepare($sql_modify_other_info);
                $stmt->bind_param('sssssssi', $modify_RealName, $modify_gender, $modify_phone, $modify_email, $modify_address, $modify_country, $modify_birthday, $ID);
            }
            
            if( !$stmt->execute()){
                throw new Exception($stmt->error);
            }
            $stmt->close();
            http_response_code(200);
            echo json_encode(["message" =>'修改信息成功']);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>