const formData = new FormData();

fetch("http://10.117.234.157/php/",{
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