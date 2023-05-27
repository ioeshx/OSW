function publicate_product(){
    const form = document.getElementById("publication_form");
    var formData = new FormData(form);
    const PublisherName = localStorage.getItem("username");
    const DatePublished = new Date();
    formData.append("PublisherName", PublisherName);
    formData.append("DatePublished", DatePublished);

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
        alert(data)
    }).catch(error=>{
        alert(error)
    })
}

document.getElementById("publication_submit").addEventListener("click", function(Event){
    Event.preventDefault();
    publicate_product();
});