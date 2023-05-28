function publicate_product(){
    const form = document.getElementById("publication_form");
    var formData = new FormData(form);
    const PublisherName = localStorage.getItem("username");
    const DatePublished = new Date().toISOString().slice(0,19).replace('T',' ');
    formData.append("PublisherName", PublisherName);

    fetch("http://localhost/publication.php",{
        method:"POST",
        body:formData
    }).then(Response=>{
        return Response.json();
        // if(Response.status === 400)
        //     return Response.json();
        // else 
        //     throw new Error(Response.json().message)
    }).then(data=>{
        alert(data.message)
    }).catch(error=>{
        alert(error)
    })
};

document.getElementById("publication_submit").addEventListener("click", function(Event){
    Event.preventDefault();
    publicate_product();
});

document.getElementById("Image").addEventListener("change", function (event){
    const file = event.target.files[0];
    var preview_element = document.getElementById("image_preview");
    if(file){
        const reader = new FileReader();
        reader.onload = event =>{
            preview_element.src = event.target.result;
        };
        reader.readAsDataURL(file);

    }
});

document.getElementById("reset_form").addEventListener("click", function(){
    document.getElementById("image_preview").src = "";
})