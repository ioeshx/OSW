function fill_in_user_info(data){
    
    document.getElementById("username").innerText += window.localStorage.getItem("username");
    
    data.RealName ? document.getElementById("RealName").innerText += data.RealName : document.getElementById("RealName").innerText += "未设置";
    data.Gender ? document.getElementById("Gender").innerText += data.Gender : document.getElementById("Gender").innerText += "未设置";
    data.Birthday ? document.getElementById("Birthday").innerText += data.Birthday : document.getElementById("Birthday").innerText += "未设置";
    data.Address ? document.getElementById("Address").innerText += data.Address : document.getElementById("Address").innerText += "未设置"; 
    data.Country ? document.getElementById("Country").innerText += data.Country : document.getElementById("Country").innerText += "未设置";
    data.Email ? document.getElementById("Email").innerText += data.Email : document.getElementById("Email").innerText += "未设置";
    data.Phone ? document.getElementById("Phone").innerText += data.Phone : document.getElementById("Phone").innerText += "未设置";
    document.getElementById("account_num").innerText += parseFloat(data.Account).toFixed(2);

    document.getElementById("modify_phone").value = data.Phone;
    document.getElementById("modify_email").value = data.Email;
    document.getElementById("modify_address").value =  data.Address;
    document.getElementById("modify_gender").value = data.Gender;
    document.getElementById("modify_birthday").value = data.Birthday;
    document.getElementById("modify_country").value = data.Country;
    document.getElementById("password").value = localStorage.getItem("password");
    document.getElementById("modify_RealName").value = data.RealName;
}

function get_user_info(){
    const username = localStorage.getItem("username");
    const isLogin = localStorage.getItem("isLogin");
    if(username !== null && isLogin !== null){
        var formData = new FormData();
        formData.append("username", username);
        fetch("http://10.117.234.157/php/get_user_info.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data => fill_in_user_info(data))
        .catch(e=>{
            console.error(e);
        });
    }
};

window.addEventListener("load", function(){
    get_user_info();
});


// data =>{
//     document.getElementById("username").innerText += window.localStorage.getItem("username");
//     document.getElementById("RealName").innerText += data.RealName;
//     document.getElementById("Gender").innerText += data.Gender;
//     document.getElementById("Birthday").innerText += data.Birthday;
//     document.getElementById("Address").innerText += data.innerText;
//     document.getElementById("Country").innerText += data.Country;
//     document.getElementById("Email").innerText += data.Email;
//     document.getElementById("Phone").innerText += data.Phone;

// }