function show_5_product(){
    fetch("http://localhost/getNewestProduct.php",{
      method:"GET"  
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data =>{
        
    }).catch(e =>{
        console.error(e);
    })
}

window.addEventListener("load", function(){
    show_5_product();
})