function modify_user_info(){
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var modify_birthday = document.getElementById("modify_birthday").value;
    var dateArray = modify_birthday.split('-');
    const birthday_Number = Number(dateArray.join(''));

    const modify_birthday_input = document.getElementById("modify_birthday");

    const formData = new FormData();
    formData.append("ID",localStorage.getItem("userID"));
    formData.append("password", password);
    formData.append("modify_RealName", document.getElementById("modify_RealName").value);
    formData.append("modify_gender", document.getElementById("modify_gender").value);
    formData.append("modify_birthday", document.getElementById("modify_birthday").value);
    formData.append("modify_address", document.getElementById("modify_address").value);
    formData.append("modify_country", document.getElementById("modify_country").value);
    formData.append("modify_phone", document.getElementById("modify_phone").value);
    formData.append("modify_email", document.getElementById("modify_email").value);
    if(document.getElementById("origin_password").value !== localStorage.getItem("password")){
        alert("原密码不正确！");
        return false;
    }
    else if(password !== confirm_password){
        alert("修改后密码不一致，请重新输入！");
        return false;
    }else if( modify_birthday_input.value != ""  && password.includes(String(birthday_Number))){
        alert("密码中含有生日，请重新输入！");
        return false;
    }else{
        fetch("http://10.117.234.157/php/modify_user_info.php",{
            method:"POST",
            body:formData
        }).then(Response => {
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data=>{
            alert(data.message);
            window.location.reload();
        }).catch(e=>{
            alert(e);
        });
    }
};

document.getElementById("submit_info").addEventListener("click",function(){
    modify_user_info();
});