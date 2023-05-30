function delete_comment(Event){
    const commentID = Event.target.value;
    var formData = new FormData();
    formData.append("commentID", commentID);
    fetch("http://localhost/delete_comment.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(message =>{
        alert("删除评论成功");
        window.location.reload();
    })
    .catch(e=>{
        console.error(e);
    });
}

function like_and_cancel_like(Event){
    const type = this.value;
    const commentID = this.parentNode.id;
    const formData = new FormData();
    formData.append("commentID",commentID);
    formData.append("userID", localStorage.getItem("userID"));
    formData.append("type", type);
    fetch("http://localhost/like_cancel_like.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(message =>{
        console.log("点赞成功！");
    })
    .catch(e=>{
        console.error(e);
    });

    if(btn.value == 0){
        btn.src = "../resource/like_big.png";
        btn.value == 1;
    }
    else{
        btn.src = "../resource/unlike_big.png";
        btn.value == 0;
    }
    window.location.reload();  
}

// 获取用户所有点赞过的评论ID
function get_user_like(userID){
    const formData = new FormData();
    var userID =localStorage.getItem("userID");
    formData.append("userID",userID);
    fetch("http://localhost/get_user_like.php",{
        method:"POST",
        body:formData
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            throw new Error(Response.json().message);
    }).then(data =>{
        const buttons = document.querySelectorAll(".comment_div>button");
        buttons.forEach(button =>{
            if(data.includes(button.parentNode.id)){
                button.value = "1";
                button.getElementsByTagName("img")[0].src = "../resource/like.big.png";
            }
        })
    })
    .catch(e=>{
        console.error(e);
    });
}

// async function get_user_like(userID){
//     const formData = new FormData();
//     formData.append("userID",userID);
//     try{    
//     const response = await fetch("http://localhost/get_user_like.php",{
//         method:"POST",
//         body:formData
//     });
//     if(response.ok){

//     }else
//         throw new Error(response.json().message);
//     }catch(e){
//         console.error(e);
//     }
// }


function display_comment(data){
    var all_comments_div = document.getElementById("all_comments_on_product");
    var response_ID_select = document.getElementById("comment_select");
    for(var i=0; i<data.length; i++){
        //把ID添加到选框
        var comment_ID = document.createElement("option");
        comment_ID.setAttribute("value", data[i].CommentID);
        comment_ID.textContent = data[i].CommentID;
        response_ID_select.appendChild(comment_ID);
        //创建父块
        var comment_div = document.createElement("div");
        comment_div.setAttribute("id", data[i].CommentID);
        comment_div.setAttribute("class", "comment_div");
        //显示评论ID
        var comment_ID = document.createElement("div");
        comment_ID.setAttribute("id", "comment_ID_" + (i+1));
        comment_ID.setAttribute("class", "comment_ID")
        comment_ID.textContent = "评论ID " + data[i].CommentID;
        comment_div.appendChild(comment_ID);
        //显示评论用户名
        var username_of_comment = document.createElement("div");
        username_of_comment.setAttribute("id", "username_of_comment_" + (i+1));
        username_of_comment.setAttribute("class", "username_of_comment")
        username_of_comment.textContent = "评论者 " + data[i].UserName;
        comment_div.appendChild(username_of_comment);
        //显示回复的ID
        if(data[i].ResponseToCommentID > 0){
            var response_comment = document.createElement("div");
            response_comment.setAttribute("id", "response_comment_" + (i+1));
            response_comment.setAttribute("class", "response_comment")
            response_comment.textContent = "回复评论ID " + data[i].ResponseToCommentID;
            comment_div.appendChild(response_comment);
        }
        //显示评论内容
        var comment_str = document.createElement("div");
        comment_str.setAttribute("id", "comment_str_" + (i+1));
        comment_str.setAttribute("class", "comment_str")
        if(data[i].status == 0)
            comment_str.textContent =  data[i].CommentText;
        else if(data[i].status == 1)
            comment_str.textContent ="该评论已被删除";
        comment_div.appendChild(comment_str);
        //显示评论时间
        var comment_time = document.createElement("div");
        comment_time.setAttribute("id", "comment_time_" + (i+1));
        comment_time.setAttribute("class", "comment_time")
        comment_time.textContent = "发布于 " + data[i].CommentTime;
        comment_div.appendChild(comment_time);
        //如果是自己发布的评论，可以删除
        if(data[i].UserName === localStorage.getItem("username")){        
            var delete_button = document.createElement("button");
            delete_button.setAttribute("id", "delete_button_" + (i+1));
            delete_button.setAttribute("class", "delete_button")
            delete_button.value = data[i].CommentID;
            delete_button.textContent = "删除评论";
            delete_button.addEventListener("click", delete_comment);
            comment_div.appendChild(delete_button);
        }
        //显示点赞次数
        var like_num = document.createElement("div");
        like_num.setAttribute("id", "like_num_" + (i+1));
        like_num.setAttribute("class", "like_num")
        like_num.textContent = data[i].likesNum + "次点赞";
        comment_div.appendChild(like_num);
        //设置点赞图标
        var like_button = document.createElement("button");
        var img = document.createElement("img");
        like_button.addEventListener("click", like_and_cancel_like);
        like_button.value = "0";
        img.src="../resource/unlike_big.png";
        like_button.appendChild(img);
        comment_div.appendChild(like_button);
        //把父块附加到更大的div下
        all_comments_div.appendChild(comment_div);
    }
    //根据用户是否显示是否点赞过
    //get_user_like();
};



const url = `http://localhost/get_product_comment.php${location.search}`


function get_product_comment(){
    fetch(url,{
            method:"GET",
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data => display_comment(data))
        .catch(e=>{
            console.error(e);
    });
}

window.addEventListener("load",function(){
    get_product_comment();
})


