function get_product_detail_byID(){
    const search_param = new URLSearchParams(window.location.search);
    const PaintingID = search_param.get("PaintingID");
    const formData = new FormData();
    formData.append("PaintingID", PaintingID);

    fetch("http://localhost/product_detail.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data =>{
        document.getElementById("product_image").src = "../img/" + data.ImageFileName;
        document.getElementById("product_name").innerText += data.PaintingName;
        document.getElementById("author_name").innerText += data.AuthorName;
        document.getElementById("YearOfWork").innerText += data.YearOfWork;
        document.getElementById("Width").innerText += data.Width;
        document.getElementById("Height").innerText += data.Height;
        document.getElementById("Era").innerText += data.Era;
        document.getElementById("Genre").innerText += data.Genre;
        document.getElementById("DatePublished").innerText += data.DatePublished;
        document.getElementById("PublisherName").innerText += data.PublisherName;
        document.getElementById("Cost").innerText += (parseFloat(data.Cost)).toFixed(2);
        if(data.Status == 0)
            document.getElementById("Status").innerText += "否";
        else 
            document.getElementById("Status").innerText += "是";
    }).catch(e=>{
        console.error(e);
    })

}


window.addEventListener("load", function () {
    get_product_detail_byID();
})