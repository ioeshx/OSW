<?php
    require "./mysql.php";

    if($_SERVER["REQUEST_METHOD"] ==="POST"){
        try{
            $comment_str = $_POST["comment"];
            $PaintingID = $_POST["PaintingID"];
            $username = $_POST["username"];
            $ResponseToCommentID = $_POST["ResponseToCommentID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            $sql_insert_comment = "INSERT INTO comment SET UserName='$username',PaintingID=$PaintingID, CommentTime=NOW(), CommentText='$comment_str', ResponseToCommentID=$ResponseToCommentID";
            if($conn->query($sql_insert_comment) !== true){
                http_response_code(500);
                echo json_encode(['message' => "发布评论失败，请重试！"]);
            }else{
                http_response_code(200);
                echo json_encode(['message' => "评论成功！"]);
            }
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>