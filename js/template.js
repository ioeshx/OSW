const formData = new FormData();

fetch("http://localhost/",{
    method:"POST",
    body:formData
}).then(Response =>{
    if(Response.ok)
        return Response.json();
    else
        throw new Error(Response.json().message);
}).then(data =>{
    
    
})
.catch(e=>{
    console.error(e);
});