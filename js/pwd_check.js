function check_password_strength(){
    //0-2是弱 3-4是中 5-6是强
    var pwd = document.getElementById("password").value;
    var strength = 0;
    if(pwd.length >= 7 & pwd.length < 12)
        strength += 1;
    else if(pwd.length >= 12 & pwd.length < 16)
        strength += 2;
    else if(pwd.length >= 16)
        strength += 3;
    if(/[A-Z]/.test(pwd))
        strength += 1;
    if(/[a-z]/.test(pwd))
        strength += 1;
    if(/\d/.test(pwd))
        strength += 1;
    //实时更改meter的value
    document.getElementById("pwd_meter").value = strength;

    if(strength < 3){
        document.getElementById("p_hint").innerHTML = "密码强度：弱。规则：密码长度在7-20位，可以含有大小写的英文字母和数字";
    }else{
        document.getElementById("p_hint").innerHTML = "";
    }
}

document.getElementById("password").addEventListener("input", function(){
    check_password_strength();
})