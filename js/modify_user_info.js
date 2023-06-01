function modify_user_info(){
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    const formData = new FormData(document.getElementById("modify_user_info_form"));
    formData.append("ID",localStorage.getItem("userID"));

    if(document.getElementById("origin_password").value !== localStorage.getItem("password")){
        alert("原密码不正确！");
        return false;
    }
    else if(password !== confirm_password){
        alert("修改后密码不一致，请重新输入！");
        return false;
    }else{
        fetch("http://localhost/modify_user_info.php",{
            method:"POST",
            body:formData
        }).then(Response => {
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data=>{
            alert("修改成功！");
            window.location.reload();
        }).catch(e=>{
            console.error(e);
        });
    }
};

document.getElementById("submit_info").addEventListener("click",function(){
    modify_user_info();
});