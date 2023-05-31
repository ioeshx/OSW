var code;   
       
function createCode(){ 
  code = "";  
  var codeLength = 4;
  var checkCode = document.getElementById("verification_code");  
  var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
                         'S','T','U','V','W','X','Y','Z'); 
  for(var i = 0; i < codeLength; i++) {
    var index = Math.floor(Math.random()*36);
    code += random[index];              
  }  
  checkCode.value = code;
}

document.addEventListener("DOMContentLoaded", createCode());

var registser_button = document.getElementById('regitser_button');
var isButtonDisabled = false;
var waitingTime = 500; // 设置等待时间为 0.5 秒

document.getElementById("register_form").addEventListener('submit', function(Event){
  Event.preventDefault();

  if (isButtonDisabled) {
    alert('请勿频繁点击按钮！');
    return;
  }
  isButtonDisabled = true;
  registser_button.setAttribute('disabled', true);
  setTimeout(function() {
    isButtonDisabled = false;
    registser_button.removeAttribute('disabled');
  }, waitingTime);

  //验证码的检验,先注释掉
  var inputCode = document.getElementById("verification_code_input").value.toUpperCase();      
  if(inputCode.length <= 0) {   
    alert("请输入验证码！");
    return false; 
  }else if(inputCode != code ) {  
    alert("验证码输入错误！");  
    createCode();           
    document.getElementById("verification_code_input").value = "";
    return false; 
  }

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm_password").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var gender = document.getElementById("gender").value;
  var nationality = document.getElementById("nationality").value;
  var birthday = document.getElementById("birthday").value; //一个string
  
  const register_form = document.getElementById("register_form");
  const registerFormData = new FormData(register_form);

  if(username==="" | password==="" | confirm_password===""){
    alert("用户名或密码为空，请输入")
    return false;
  }
  if(password !== confirm_password){
      alert("密码两次输入不一致，请重新输入")
      return false;
  }
  //用正则表达式检查输入值
  const usernameRegEX = new RegExp("^[a-zA-Z0-9]{6,15}$");
  // const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/);
  const passwordRegEx = new RegExp(/^[a-zA-Z\d]{8,20}$/);
  const phoneRegEX = new RegExp(/^[a-zA-Z0-9]{11}$/);
  const emailRegex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
  if(!usernameRegEX.test(username)){
    alert("用户名不合法！")
    return false;
  }else if(!passwordRegEx.test(password)){
    alert("密码不合法！")
    return false;
  }else if(phone.length != 0 && !phoneRegEX.test(phone)){
    alert("手机号格式不合法！")
    return false;
  }else if(email.length != 0 && !emailRegex.test(email)){
    alert("邮箱格式不合法！")
    return false;
  }

  fetch("http://localhost/register.php",{
    method:"POST",
    body:registerFormData
  })
  .then(Response =>{
    if (Response.status === 200) {
      return Response.json();
    }else if(Response.status === 401){
      throw new Error("用户名已被注册");
    }else if(Response.status === 500){
      throw new Error("注册失败，请重试");
    }
  })
  .then(data=>{
    alert("注册成功！")
    window.location.href = "../html/login.html";
  })
  .catch(error =>{
    alert(error);
  })

});



