// 验证码
let code = "";
refreshCode();
function generateCaptchaCode() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}
function refreshCode(){
  // 生成随机验证码
  const captchaCode = document.getElementById('captchaCode');
  code = generateCaptchaCode();
  captchaCode.textContent = code;
}


function login(){
    const form = document.getElementsByClassName("form")[0];
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const inputCaptchaCode = formData.get("captchaCode");
    if(username==""||password==""){
        alert("用户名和密码不可为空");
    }
    else if(inputCaptchaCode!=code){
      alert("验证码错误");
      // 重新生成随机验证码
      refreshCode();
    }
    else{
        fetch("../php/login.php",{
            method:"POST",
            body:formData,
        })
        .then(response => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 400) {
              throw new Error("用户不存在");
            }else if (response.status === 401) {
              throw new Error("密码错误");
            } else if (response.status === 500) {
              throw new Error("服务器错误，请稍后再试");
            } else {
              throw new Error("未知错误");
            }
          })
          .then(data => {
            localStorage.setItem('username',username);
            localStorage.setItem('password',password);
            localStorage.setItem("isLogin","true");
            window.location.href = "../html/index.html";
          })
          .catch(error => {
            alert(error);
          });
    }
}

