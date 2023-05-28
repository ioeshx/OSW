function get_user_info(){
    const username = localStorage.getItem("username");
    const isLogin = localStorage.getItem("isLogin");
    if(username !== null && isLogin !== null){
        var formData = new FormData();
        formData.append("username", username);
        fetch("http://localhost/get_user_info.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data =>{
            
        }).catch(e=>{
            console.error(e);
        });
    }
};

window.addEventListener("load", function(){
    get_user_info();
});