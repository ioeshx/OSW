function publicate_product(){
   const form = document.getElementById("publication_form");
   var formData = new FormData(form);
   
}

document.getElementById("publication_submit").addEventListener("click", function(){
    publicate_product();
});