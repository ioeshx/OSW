<?php
$servername = "localhost";
$username = "root";
$password = "031228wo";
$dbname = "art";

if($_SERVER['REQUEST_METHOD']==="POST"){
    $logon_UserName = $_POST['username'];
    $logon_Pass = $_POST['password'];
    try {
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        // 检查连接是否成功
        if ($conn->connect_error) {
            throw new Exception("数据库连接失败：" . $conn->connect_error);
        }

        $sql = "SELECT * FROM customerlogon WHERE Username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s",$logon_UserName);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows===1){
            $row = $result->fetch_assoc();
            $hashPassword = hash('sha256',$logon_Pass . $row['Salt']);
            if($hashPassword === $row['Pass']){
                header('Content-Type: application/json');
                http_response_code(200);
                echo json_encode(['message' => '登录成功']);
                exit();
            }
            else{
                header("Content-Type: application/json");
                http_response_code(401);
                echo json_encode(['message'=> '密码错误']);
                exit();
            }
        }
        else if($result->num_rows===0){
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(['message' => '用户不存在']);
            exit();
        }
        else{
            throw new Exception("数据库错误"); //意味着此时数据库内不止一条对应用户名的内容
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['message' => '服务器错误：' . $e->getMessage()]);
        exit();
    }
}


// 生成验证码
session_start();

// 生成随机验证码
function generateCaptcha($length = 4) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $captcha = '';
    
    for ($i = 0; $i < $length; $i++) {
        $captcha .= $characters[rand(0, strlen($characters) - 1)];
    }
    
    return $captcha;
}


?>
