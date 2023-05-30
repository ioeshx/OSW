<?php
    require './mysql.php';
    header('Content-Type: application/json');

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        try {
            $PaintingID = $_GET["PaintingID"];
            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            $sql_get_all_comment= "SELECT * FROM comment WHERE PaintingID = $PaintingID";
            $result = $conn->query($sql_get_all_comment);
            if($result === false)
                throw new Exception($conn->error);
            $rows =array();
            while($row = $result->fetch_assoc())
                $rows[] = $row;
            http_response_code(200);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>