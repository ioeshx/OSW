function display_my_orders(data){
    var show_orders_div = document.getElementById("show_my_order");
    if(data.length == 0){
        var no_orders_div = document.createElement("div");
        no_orders_div.id = "no_orders_div";
        no_orders_div.innerText = "你还未购买任何商品……"
        show_orders_div.appendChild(no_orders_div);
        return;
    }
    for(var i=0; i<data.length; i++){
        //创建父元素
        var orderItem = document.createElement("div");
        orderItem.id = data[i].OrderID;
        orderItem.class = "orderItem";
        //展示商品名称
        var order_paintingname_div = document.createElement("div");
        order_paintingname_div.id = "order_paintingname_div_" + data[i].OrderID;
        order_paintingname_div.class = "order_paintingname_div";
        order_paintingname_div.textContent = data[i].PaintingName;
        orderItem.appendChild(order_paintingname_div);
        //展示商品图片
        var order_image = document.createElement("img");
        order_image.id = "order_image_" + data[i].OrderID;
        order_image.class = "order_image";
        order_image.height = "300";
        order_image.width = "300";
        order_image.src = "../img/" + data[i].ImageFileName;
        orderItem.appendChild(order_image);

        show_orders_div.appendChild(orderItem);
    }
}

window.addEventListener("DOMContentLoaded",function(){
    const formData = new FormData();
    formData.append("userID",this.localStorage.getItem("userID"));
    fetch("http://localhost/show_my_orders.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data => {
        display_my_orders(data)
    })
    .catch(e=>{
        console.error(e);
    });
});