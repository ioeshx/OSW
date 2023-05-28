function show_5_product(){
    fetch("http://localhost/getNewestProduct.php",{
      method:"GET"  
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data =>{
        for(let i=0; i< data.length; i++){
            const current_product = data[i];
            document.getElementById("product_image_" + (i+1)).src = "../img/" + current_product.ImageFileName;
            document.getElementById("product_name_" + (i+1)).textContent += current_product.PaintingName;
            document.getElementById("author_name_" + (i+1)).textContent += current_product.AuthorName;
            document.getElementById("cost_" + (i+1)).textContent += (parseFloat(current_product.Cost)).toFixed(2);
            document.getElementById("produuct_detail_" + (i+1)).value = current_product.PaintingID
        }
    }).catch(e =>{
        console.error(e);
    })
}

function check_product_detail(){
    
}

window.addEventListener("load", function(){
    show_5_product();
})

