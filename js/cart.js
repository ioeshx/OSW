function purchase_order(btn){
    var OrderID = btn.id;
    const formData = new FormData();
    formData.append("OrderID", OrderID);
    fetch("http://localhost/",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(message =>{
    
    })
    .catch(e=>{
        console.error(e);
    });
}

function delete_order(btn){
    var OrderID = btn.id;
    const formData = new FormData();
    formData.append("OrderID", OrderID);
    fetch("http://localhost/",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(message =>{
        
    })
    .catch(e=>{
        console.error(e);
    });
}

function display_orders(data){
    const all_orders_div =document.getElementById("all_orders");
    if(data.length == 0){
        var no_order_p = document.createElement("p");
        no_order_p.textContent = "购物车中还没有任何商品……";
        all_orders_div.appendChild(no_order_p);
        return;
    }
    for(var i = 0; i<data.length; i++){
        //创建父元素
        var orderItem = document.createElement("div");
        orderItem.id = data[i].OrderID;
        orderItem.class = "orderItem";
        // //显示订单ID
        // var order_ID_div = document.createElement("div");
        // order_ID_div.id = "order_ID_div_" + data[i].OrderID;
        // order_ID_div.class = "order_ID_div";
        // order_ID_div.textContent = data[i].OrderID;
        // orderItem.appendChild(order_ID_div);
        //商品名称
        var order_paintingname_div = document.createElement("div");
        order_paintingname_div.id = "order_paintingname_div_" + data[i].OrderID;
        order_paintingname_div.class = "order_paintingname_div";
        order_paintingname_div.textContent = data[i].PaintingName;
        orderItem.appendChild(order_paintingname_div);
        //价格
        var order_cost_div = document.createElement("div");
        order_cost_div.id = "order_cost_div_" + data[i].OrderID;
        order_cost_div.class = "order_cost_div";
        order_cost_div.textContent = parseFloat(data[i].Cost).toFixed(2);
        orderItem.appendChild(order_cost_div);
        //商品图片
        var order_image = document.createElement("img");
        order_image.id = "order_image_" + data[i].OrderID;
        order_image.class = "order_image";
        order_image.height = "300";
        order_image.width = "300";
        order_image.src = "../img/" + data[i].ImageFileName;
        orderItem.appendChild(order_image);
        //购买按钮
        var purchase_button = document.createElement("button")
        purchase_button.id = data[i].OrderID;
        purchase_button.innerText = "购买"
        purchase_button.addEventListener("onclick", purchase_order);
        orderItem.appendChild(purchase_button);
        //从购物车删除的按钮
        var delete_button = document.createElement("button")
        delete_button.id = data[i].OrderID;
        delete_button.innerText = "删除";
        delete_button.addEventListener("onclick", delete_order);
        orderItem.appendChild(delete_button);
        //附加到总的下面
        all_orders_div.appendChild(orderItem);
    }

}

document.addEventListener("DOMContentLoaded", function(){
    const formData = new FormData();
    formData.append("userID",localStorage.getItem("userID"));
    fetch("http://localhost/get_orders.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data =>{
        display_orders(data);
    })
    .catch(e=>{
        console.error(e);
    });
})