function publicate_product(){
    const form = document.getElementById("publication_form");
    var formData = new FormData(form);
    fetch("http://localhost/publication.php",{
        method:"POST",
        body:formData
    }).then(Response=>{

    }).then(data=>{

    }).catch(error=>{

    })
}

document.getElementById("publication_submit").addEventListener("click", function(){
    publicate_product();
});