<?php
    require './mysql.php';

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $OrderID = $_POST["OrderID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            
            $sql_delete_order = "DELETE FROM orders WHERE OrderID = $OrderID";
            if($conn->query($sql_delete_order) !== true){
                throw new Exception($conn->error);
            }
            http_response_code(200);
            echo json_encode(["message" =>'删除成功!']);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>