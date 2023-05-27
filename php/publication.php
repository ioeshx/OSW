<?php

  $servername = "localhost:3306";
  $sql_username = "root";
  $sql_password = "shihongxiang";
  $dbname = "art";

  $image_file = $_FILES["Image"];             //获取上传文件的信息  
  $image_name = $image_file['name'];   //获取上传文件的原始文件名。
  $tmp_name = $image_file['tmp_name'];        //获取上传文件在服务器上的临时文件名。
  //上传图片到img文件夹
  $Image_upload_path = "../img/";
  $Image_path = $Image_upload_path . $image_name;
  move_uploaded_file($tmp_name, $Image_path);

  header('Content-Type: application/json');
  
  if($_SERVER["REQUEST_METHOD"] === "POST"){
    try{
      $conn = mysqli_connect($servername, $sql_username, $sql_password, $dbname);
      if($conn->connect_error)
        throw new Exception($conn->connect_error);
      $PaintingName = $_POST["PaintingName"];
      $AuthorName = $_POST["AuthorName"];
      $Description = $_POST["Description"];
      $YearOfWork = $_POST["YearOfWork"];
      $Genre = $_POST["Genre"];
      $Era = $_POST["Era"];
      $Width = $_POST["Width"];
      $Height = $_POST["Height"];
      $Cost = $_POST["Cost"];
      $PublisherName = $_POST["PublisherName"];

      $sql_insert_product = "INSERT INTO paintings (PaintingName, AuthorName, `Description`, YearOfWork, Genre, Era, Width, Height, Cost,ImageFileName, PublisherName, DatePublished) Value ('$PaintingName', '$AuthorName', '$Description', $YearOfWork, '$Genre', '$Era',$Width, $Height,$Cost ,'$image_name','$PublisherName', Now());" ;
      if($conn->query($sql_insert_product) !== true){
        http_response_code(500);
        echo json_encode(["message" =>'错误:'.$conn->error]);
      }else{
        http_response_code(200);
        echo json_encode(["message" =>'发布成功！']);
      }

    }catch(Exception $e){
      http_response_code(500);
      echo json_encode(["message"=> $e->getMessage()]);
    }
  }
?>