function submit_comment(){
    var comment_str = document.getElementById("comment_textarea").value;
    if(localStorage.getItem("isLogin") == null){
        alert("你尚未登录，无法评论！");
        return false;
    }else if(comment_str.length === 0){
        alert("你尚未输入任何评论！");
        return false;
    }else{
        const search_param = new URLSearchParams(window.location.search);
        const PaintingID = search_param.get("PaintingID");
        const username = localStorage.getItem("username");
        const ResponseToCommentID = document.getElementById("comment_select").value;
        var formData = new FormData();
        formData.append("comment", comment_str);
        formData.append("PaintingID", PaintingID);
        formData.append("username",username);
        formData.append("ResponseToCommentID", ResponseToCommentID);
        fetch("http://localhost/submit_comment.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data =>{
            alert("发布评论成功")
            window.location.reload();
        })
        .catch(e=>{
            console.error(e);
        });
    }
};

document.getElementById("submit_comment").addEventListener("click", function(){
    submit_comment();
})