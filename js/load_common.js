function load_header() {
  const isLogin = localStorage.getItem('isLogin');
  const navbarUrl = isLogin ? 'header_login.html' : 'header_unlogin.html';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', navbarUrl, true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const navbar = this.responseText;
      document.getElementById("top_nav").innerHTML = navbar;
    }
  };
  xhr.send();
}

function load_footer() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'footer.html', true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const footer = this.responseText;
      document.getElementById("copyright").innerHTML = footer;
    }
  };
  xhr.send();
}

function logout_btn(){
  var isLogin = localStorage.getItem("isLogin");
  if(isLogin){  
      localStorage.clear();
      alert("已登出！")
      window.location.href="http://localhost:5500/html/homepage.html";
    }
}

window.onload = function () {
  load_header();
  load_footer();
}
