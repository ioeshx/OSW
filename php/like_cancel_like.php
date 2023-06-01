<?php
    require './mysql.php';

    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        try{
            $CommentID = $_POST["commentID"];
            $userID = $_POST["userID"];
            $type = $_POST["type"];         // 0代表该用户未点赞，现在点赞  1代表该用户已经点赞，现在取消点赞

            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            if( $type == 0){
                $sql_like = "INSERT INTO `like` (CommentID, UserID) VALUES  ($CommentID, $userID)";
                $sql_add_like_num = "UPDATE comment SET likesNum = likesNum+1 WHERE CommentID = $CommentID ";
                if($conn->query($sql_like) !== true || $conn->query($sql_add_like_num)!==true){
                    throw new Exception($conn->error);
                }else{
                    http_response_code(200);
                    echo json_encode(["message"=>"点赞成功"]);
                }
            }else if($type == 1){
                $sql_delete_like = "DELETE FROM `like` WHERE CommentID = $CommentID";
                $sql_sub_like_num = "UPDATE comment SET likesNum = likesNum-1 WHERE CommentID = $CommentID ";
                if($conn->query($sql_delete_like) != true || $conn->query($sql_sub_like_num)!=true){
                    throw new Exception($conn->error);
                }else{
                    http_response_code(200);
                    echo json_encode(["message"=>"取消点赞成功"]);
                }
            }
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>