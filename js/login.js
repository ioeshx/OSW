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

document.addEventListener("DOMContentLoaded",createCode());

document.getElementById("login_form").onsubmit = function(event){
  event.preventDefault();
  //验证码的检验
  var inputCode = document.getElementById("verification_code_input").value.toUpperCase();      
  if(inputCode.length <= 0) {   
    alert("请输入验证码！");
    return false; 
  }else if(inputCode != code ) {  
    alert("验证码输入错误！");  
    createCode();           
    document.getElementById("verfication_code_input").value = "";
    return false; 
  }

  const form = document.getElementById("login_form");
  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");
  const usernameRegEX = new RegExp("^[a-zA-Z0-9]{6,15}$");
  //const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/);
  const passwordRegEx = new RegExp(/^[a-zA-Z\d]{8,20}$/);
  if(username ==="" || password===""){
    alert("用户名、密码或验证码为空，请填写")
    return false;
  }else if(!usernameRegEX.test(username)){
    alert("用户名不合法");
    return false;
  }else if(!passwordRegEx.test(password)){
    alert("密码不合法");
    return false;
  }
  fetch("http://localhost/login.php",{
    method:"POST",
    body:formData
  })
  .then(Response => {
    if (Response.status === 200) {
      return Response.json();
    } else if (Response.status === 400) {
      throw new Error("用户名不存在！");
    } else if (Response.status === 401) {
      throw new Error("密码错误！");
    } else if(Response.status === 500){
      throw new Error("服务器错误！请稍后重试");
    } else {
      throw new Error("未知错误");
    }
  })
  .then(data => {
    localStorage.setItem('username',username);
    localStorage.setItem('password',password);
    localStorage.setItem("isLogin","true");
    localStorage.setItem('userID',data["userID"]);
    alert("登录成功");
    window.location.href = "../html/homepage.html";
  })
  .catch(error => {
    alert(error.message);
  });
  
  return true;
};