<?php
    require "./mysql.php";

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $PaintingID = $_POST["PaintingID"];
            $userID = $_POST["userID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            
            $sql_select_painting = "SELECT * FROM paintings WHERE PaintingID=$PaintingID";
            $result = $conn->query($sql_select_painting);
            if($result->num_rows !== 1)
                throw new Exception($conn->error);
            $painting_row = $result->fetch_assoc();
            //已被购买的不允许添加到购物车
            if($painting_row["Status"] == 1){
                http_response_code(200);
                echo json_encode(["message"=>"该商品已被购买!"]);
            }else{
                $ImageFileName = $painting_row["ImageFileName"];
                $PaintingName = $painting_row["PaintingName"];
                $Cost = $painting_row["Cost"];
                //已经添加到购物车的，不允许再添加
                $sql_is_painting_in_cart = "SELECT * FROM orders WHERE CustomerID=$userID AND PaintingID=$PaintingID";
                if($conn->query($sql_is_painting_in_cart)->num_rows !== 0){
                    http_response_code(200);
                    echo json_encode(["message"=>"该商品已被添加到购物车"]);
                }else{
                    $sql_add_to_cart = "INSERT INTO orders (PaintingID,CustomerID,ImageFileName, PaintingName,Cost) VALUE ($PaintingID,$userID,'$ImageFileName','$PaintingName',$Cost)";
                    if($conn->query($sql_add_to_cart) !== true){
                        throw new Exception($conn->error);
                    }else{
                        http_response_code(200);
                        echo json_encode(["message" =>"添加到购物车成功"]);
                    }
                }
            }
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>