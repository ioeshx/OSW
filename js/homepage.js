function show_5_product(){
    fetch("http://localhost/getNewestProduct.php",{
      method:"POST"  
    }).then(Response =>{
        if(Response.status === 200){
            return Response.json();
        }            
        else if(Response.status === 500){
            throw new Error(Response.statusText);
        }

    }).then(data =>{

    }).catch(error =>{
        alert(error);
    })
}

window.addEventListener("load", function(){
    //show_5_product();
})