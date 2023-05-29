<?php
    require 'mysql.php';
    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $userID = $_POST["userID"];
            $money = $_POST["money"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            $sql_recharge = "UPDATE customers SET Account = Account + $money WHERE CustomerID = $userID ";
            if($conn->query($sql_recharge) !== true){
                http_response_code(500);
                echo json_encode(['message' => $e->getMessage()]);
            }else{
                http_response_code(200);
                echo json_encode(['message'=>'充值成功!']);
            }
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>