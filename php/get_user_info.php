<?php
    require './mysql.php';
    require './user.php';
    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $username = $_POST["username"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            //获取用户ID
            $sql_get_userID = "SELECT CustomerID FROM customerlogon WHERE username = '$username' ";
            $ID_result = $conn->query($sql_get_userID);
            if($ID_result->num_rows !== 1)
                throw new Exception("获取用户信息时发生错误：没有对应的用户！");    //找不到ID;
            $userID = ($ID_result->fetch_assoc())["CustomerID"];
            //根据ID来获取用户信息
            $sql_get_user_info = "SELECT * FROM customers WHERE CustomerID = $userID";
            $info_result = $conn->query($sql_get_user_info);
            if($info_result->num_rows !== 1)
                throw new Exception("获取用户信息时发生错误：无法获取用户信息！");    //
            $user_row = $info_result->fetch_assoc();
            //$user_info = new user();
            //需要包装在类中吗？
            http_response_code(200);
            echo json_encode($user_row);

        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>