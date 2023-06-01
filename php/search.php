<?php
    require './mysql.php';
    header('Content-Type: application/json');
    
    if($_SERVER['REQUEST_METHOD'] === "POST"  && isset($_POST['search']) && isset($_POST['type']) ){
        try{
            $search = $_POST["search"];
            $type = $_POST["type"];

            $conn = mysqli_connect($server_name, $sql_username, $sql_password, $db_name);
            if ($conn->connect_error)
                throw new Exception("数据库连接失败：" . $conn->connect_error);
            $sql_search = "";
            if($type == 1){
                $sql_search = "SELECT * FROM paintings WHERE PaintingName LIKE ?";
            }else{
                $sql_search = "SELECT * FROM paintings WHERE AuthorName LIKE ?";
            }
            $stmt = $conn->prepare('SELECT * FROM paintings WHERE ' . ($type == 1 ? 'PaintingName' : 'AuthorName') . ' LIKE ?');
            $param = "%" . $search . "%";
            $stmt->bind_param("s",$param);
            if( !$stmt->execute()){
                throw new Exception($conn->error);
            }       
            $result = $stmt->get_result();
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            http_response_code(200);
            echo json_encode($rows);           
        }catch(Exception $e){
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
            exit();
        }
    }
?>