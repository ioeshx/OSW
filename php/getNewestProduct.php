<?php
header('Content-Type: application/json');
$servername = "localhost";
$sql_username = "root";
$sql_password = "shihongxiang";
$dbname = "art";

if($_SERVER['REQUEST_METHOD'] === "GET")
    try{
        $conn = mysqli_connect($servername, $sql_username, $sql_password, $dbname);
        // 检查连接是否成功
        if ($conn->connect_error) 
            throw new Exception("数据库连接失败：" . $conn->connect_error);
        
        $sql = "SELECT * FROM products ORDER BY time DESC LIMIT 5";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $rows = array();
            while($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            http_response_code(200);
            echo json_encode($rows);
        } else {
            throw new Exception("数据库连接失败：" . $conn->connect_error);
        }
        

    }catch(Exception $e){
        http_response_code(500);
        echo json_encode(['message' => '服务器错误：' . $e->getMessage()]);
        exit();
    }

?>