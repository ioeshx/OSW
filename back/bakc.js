var code; //在全局定义验证码  
       
function createCode(){ 
  code = "";  
  var codeLength = 4;//验证码的长度  
  var checkCode = document.getElementById("verfication_code");  
  var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
                         'S','T','U','V','W','X','Y','Z'); 
  for(var i = 0; i < codeLength; i++) {
    var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
    code += random[index];              //随机数加到code上  
  }  
  checkCode.value = code;//把code值赋给验证码  
}

//验证登录表单
function valid_login_form(){
  //验证码的检验
  // var inputCode = document.getElementById("verification_code_input").value.toUpperCase();      
  // if(inputCode.length <= 0) {   
  //   alert("请输入验证码！");
  //   return false; 
  // }else if(inputCode != code ) {  
  //   alert("验证码输入错误！");  
  //   createCode();           
  //   document.getElementById("verfication_code_input").value = "";
  //   return false; 
  // }else { 
  //   //验证码正确 
  // }
  const form = document.getElementsByClassName("form")[0];
  const formData = new FormData(form);
  // var username = document.getElementById("username").value;
  // var password = document.getElementById("password").value;
  fetch("../php/login.php",{
    method:"POST",
    body:formData,
  })
  .then(response =>{
    console.log(response);
    // if (response.status === 200) {
    //   return response.json();
    // } else if (response.status === 400) {
    //   throw new Error("用户不存在");
    // }else if (response.status === 401) {
    //   throw new Error("密码错误");
    // } else if (response.status === 500) {
    //   throw new Error("服务器错误，请稍后再试");
    // } else {
    //   throw new Error("未知错误");
    // }
  })
  // .then(data =>{
  //   localStorage.setItem('username',username);
  //   localStorage.setItem('password',password);
  //   localStorage.setItem("isLogin","true");
  //   //window.location.href = "../html/homepage.html";
  // })
  // .catch(error=>{
  //   console.log(error);
  //   // alert(error)
  // });
  return true;
}

document.getElementById("login_form").onsubmit = function(){
  return valid_login_form();
};
