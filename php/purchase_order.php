<?php
    require './mysql.php';

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $OrderID = $_POST["OrderID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            //检查艺术品是否被购买
            $sql_get_order = "SELECT * FROM orders WHERE OrderID = $OrderID";
            $order_result = $conn->query($sql_get_order);
            if($order_result->num_rows != 1){
                throw new  Exception("未找到订单");
            }
            $OrderRow = $order_result->fetch_assoc();
            $PaintingID = $OrderRow["PaintingID"];
            $sql_check_painting_status = "SELECT * FROM paintings WHERE PaintingID=$PaintingID AND `Status`=1 ";
            $painting_result = $conn->query($sql_check_painting_status);
            if($painting_result->num_rows == 1){
                http_response_code(400);
                echo json_encode(['message' => "该商品已被购买"]);
                exit();
            }
            //检查用户余额是否充足
            $userID = $OrderRow["CustomerID"];
            $Cost = $OrderRow["Cost"];
            $sql_check_user_account = "SELECT Account FROM customers WHERE CustomerID=$userID";
            $acoount_result = $conn->query($sql_check_user_account);
            $account = $acoount_result->fetch_assoc()["Account"];
            if($account < $Cost){
                http_response_code(401);
                echo json_encode(['message' => "账户余额不足！"]);
                exit();
            }
            //购买，账户扣钱，设置订单状态
            $sql_set_my_order = "UPDATE orders SET `status`=1 WHERE OrderID=$OrderID ";     //设置订单也被购买
            //$sql_set_others_order = "";                                   
            $sql_set_painting_status = "UPDATE paintings SET status=1 WHERE PaintingID=$PaintingID";    //设置商品已被购买
            $sql_sub_account = "UPDATE customers SET Account=Account-$Cost WHERE CustomerID=$userID";              
            $conn->query($sql_set_my_order);
            $conn->query($sql_set_painting_status);
            $conn->query($sql_sub_account);
            //发布者账户收入
            $sql_get_publisher_name = "SELECT PublisherName FROM paintings WHERE PaintingID=$PaintingID";
            $publisher_name = ($conn->query($sql_get_publisher_name)->fetch_assoc())["PublisherName"];
            $sql_get_publisherID = "SELECT CustomerID FROM customerlogon WHERE UserName='0$publisher_name'";
            $publisherID = ($conn->query($sql_get_publisherID)->fetch_assoc())["CustomerID"];
            $sql_add_account = "UPDATE customers SET Account=Account+$Cost WHERE CustomerID=$publisherID";
            $conn->query($sql_add_account);

            http_response_code(200);
            echo json_encode(["message" =>'购买成功！']);
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>