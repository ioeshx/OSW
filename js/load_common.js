function load_header() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'header_unlogin.html', true);
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
        document.querySelector('footer').innerHTML = footer;
      }
    };
    xhr.send();
}


window.onload = function () {
    load_header();
    load_footer();
}