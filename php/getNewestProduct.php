<?php
//global $server_name, $sql_username, $sql_password, $db_name;
require "./product.php";
require "./mysql.php";

header('Content-Type: application/json');
// $server_name = "localhost";
// $sql_username = "root";
// $sql_password = "shihongxiang";
// $db_name = "art";

if($_SERVER['REQUEST_METHOD'] === "GET")
    try{
        $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
        // 检查连接是否成功
        if ($conn->connect_error) 
            throw new Exception("数据库连接失败：" . $conn->connect_error);
        
        $sql = "SELECT * FROM paintings ORDER BY DatePublished DESC LIMIT 5";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $products = array();
            while($row = mysqli_fetch_assoc($result)) {
                $product = new product(PaintingID: $row["PaintingID"], PaintingName: $row["PaintingName"],AuthorName:$row["AuthorName"],Cost:$row["Cost"],ImageFileName: $row["ImageFileName"]);
                $products[] = $product;
            }
            http_response_code(200);
            echo json_encode($products);
        } else {
            throw new Exception("未找到任何数据");
        }
        

    }catch(Exception $e){
        http_response_code(404);
        echo json_encode(['message' => $e->getMessage()]);
        exit();
    }

?>