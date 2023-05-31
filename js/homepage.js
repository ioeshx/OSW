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
            //把商品信息填到html文档中
            document.getElementById("product_image_" + (i+1)).src = "../img/" + current_product.ImageFileName;
            document.getElementById("product_name_" + (i+1)).textContent += current_product.PaintingName;
            document.getElementById("author_name_" + (i+1)).textContent += current_product.AuthorName;
            document.getElementById("cost_" + (i+1)).textContent += ((parseFloat(current_product.Cost)).toFixed(2) + " RMB");
            document.getElementById("product_detail_" + (i+1)).value = current_product.PaintingID;
            document.getElementById("product_detail_" + (i+1)).addEventListener("click", function(event){
                var id = event.target.getAttribute("value");
                window.location.href ="http://localhost:5500/html/product_detail.html?PaintingID=" + id;
            })
        }
    }).catch(e =>{
        console.error(e);
    })
}

window.addEventListener("load", function(){
    show_5_product();
})

// for(let i=0; i<5; i++){
//     document.getElementById("product_detail_" + (i+1)).addEventListener("click", function(event){
//         var id = event.target.getAttribute("value");
//     })
// }



// const checkboxes = document.querySelectorAll('input[type=checkbox]');
// for (let i = 0; i < checkboxes.length; i++) {
//   checkboxes[i].addEventListener('click', function() {
//     if (this.checked) {      // 当前选框被选中时,将其他选框的状态设为未选中
//       for (let j = 0; j < checkboxes.length; j++) {
//         if (checkboxes[j] !== this) 
//           checkboxes[j].checked = false;        
//       }
//     }
//   });
// }