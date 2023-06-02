function recharge(){
    const money = document.getElementById("account_charge_input").value;
    const IntegerRegEx = new RegExp(/^[1-9]\d*$/);
    if( !IntegerRegEx.test(money)){
        alert("充值应输入正整数，请重新输入！");
        return false;
    }else if(confirm("确定要充值吗?") !== true){
        return false;
    }
    var formData = new FormData();
    formData.append("money",money);
    formData.append("userID",localStorage.getItem("userID"));
    fetch("http://10.117.234.157/php/recharge.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data => {
            alert("充值成功!");
            window.location.reload();
        }).catch(e=>{
            console.error(e);
        });
}

document.getElementById("account_charge_button").addEventListener("click",function(){
    recharge();
})