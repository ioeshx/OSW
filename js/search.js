function display_search_result(data){
    
    if(data.length == 0){

    }
}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', function() {
    if (this.checked) {      // 当前选框被选中时,将其他选框的状态设为未选中
      for (let j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j] !== this) 
          checkboxes[j].checked = false;        
      }
    }
  });
}

document.getElementById("search_button").addEventListener("click",function(){
    const search_input_text = document.getElementById("search_input").value;
    const search_by_painting = document.getElementById("checkbox_painting");
    const search_by_author = document.getElementById("checkbox_author");
    if(search_input_text.length == 0){
        alert("你尚未输入搜索内容！")
        return;
    }else if( !search_by_author.checked && !search_by_painting.checked){
        alert("你尚未选择按作品还是按作者搜索！");
        return;
    }else{
        const formData = new FormData();
        formData.append("search",search_input_text);
        if(search_by_painting.checked)
            formData.append("type", 1);
        else
            formData.append("type", 2);
        
        fetch("http://localhost:80/search.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data =>{
            alert("搜索成功！");
            display_search_result(data);            
        })
        .catch(e=>{
            console.error(e);
        });
    }
})