<?php
    require 'mysql.php';
    require 'product.php';

    header('Content-Type: application/json');
    if($_SERVER['REQUEST_METHOD'] !== "POST"){
        http_response_code(400);
        echo json_encode(["message" => "请求方法错误"]);
    }
    try{
        $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
        if(!$conn)
            throw new Exception("连接数据库失败");
        $ID = $_POST["PaintingID"];
        $sql_get_product_info = "SELECT * FROM paintings WHERE PaintingID = $ID";
        $result = $conn->query($sql_get_product_info);
        if($result->num_rows !== 1)
            throw new Exception("获取信息失败，数据库中没有相应的商品");
        else{
            $row = $result->fetch_assoc();
            $p = new product(PaintingName:$row["PaintingName"],AuthorName:$row["AuthorName"],
                            Description:$row["Description"], YearOfWork:$row["YearOfWork"],Genre:$row["Genre"],
                            Era:$row["Era"],Width:$row["Width"],Height:$row["Height"],Cost:$row["Cost"],
                            ImageFileName:$row["ImageFileName"],PublisherName:$row["PublisherName"],
                            DatePublished: $row["DatePublished"],Status:$row["Status"]);
            echo json_encode($p);
        }
    }catch(Exception $e){
        http_response_code(400);
        echo json_encode(["message" => $e->getMessage()]);
    }
?>