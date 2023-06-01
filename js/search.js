var search_result;

var searchResult = []; // 存储所有搜索结果
let currentPage = 1; // 当前页码
const pageSize = 5; // 每页显示条数
let totalPage = 1; // 总页数

function display_search_result(data) {
  const result_div = document.getElementById("result_div");
  result_div.innerHTML = ""; //清空子元素

  if (data.length == 0) {
    var no_result_div = document.createElement("div");
    no_result_div.id = "no_result_div";
    no_result_div.innerText = "未找到任何商品！";
    result_div.appendChild(no_result_div);
    return;
  }

  // 将搜索结果存储到全局变量中
  searchResult.length = 0;
  for (var i = 0; i < data.length; i++) {
    searchResult.push(data[i]);
  }

  // 计算总页数
  totalPage = Math.ceil(searchResult.length / pageSize);

  // 显示当前页码和总页数，并更新分页控件
  updatePagination();
  // 根据当前页码获取对应的搜索结果，并展示在页面中
  getSearchResultsByPage(currentPage);
}

// 根据当前页码获取对应的搜索结果，并展示在页面中
function getSearchResultsByPage(page) {
  const result_div = document.getElementById("result_div");
  result_div.innerHTML = ""; //清空子元素

  // 获取当前页码对应的搜索结果的开始和结束下标
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, searchResult.length);

  var result_num_div = document.createElement("div");
  result_num_div.id = "result_num_div";
  result_num_div.innerText = "有" + (searchResult.length) + "条结果";
  result_div.appendChild(result_num_div);

  for (let i = startIndex; i < endIndex; i++) {
    // 创建父元素
    var SearchItem = document.createElement("div");
    SearchItem.id = i + 1;
    SearchItem.class = "SearchItem";
    // 展示艺术品图片
    var search_image = document.createElement("img");
    search_image.id = "search_image_" + searchResult[i].PaintingID;
    search_image.class = "search_image";
    search_image.height = "300";
    search_image.width = "300";
    search_image.src = "../img/" + searchResult[i].ImageFileName;
    SearchItem.appendChild(search_image);
    // 展示艺术品名称
    var search_paintingname_div = document.createElement("div");
    search_paintingname_div.id =
      "search_paintingname_div_" + searchResult[i].PaintingID;
    search_paintingname_div.class = "search_paintingname_div";
    search_paintingname_div.textContent = "艺术品名称：" + searchResult[i].PaintingName;
    SearchItem.appendChild(search_paintingname_div);
    // 展示作者名称
    var search_author_div = document.createElement("div");
    search_author_div.id = "search_author_div_" + searchResult[i].PaintingID;
    search_author_div.class = "search_author_div";
    search_author_div.textContent = "作者名称：" + searchResult[i].AuthorName;
    SearchItem.appendChild(search_author_div);
    // 展示价格
    var search_cost_div = document.createElement("div");
    search_cost_div.id = "search_cost_div_" + searchResult[i].PaintingID;
    search_cost_div.class = "search_cost_div";
    search_cost_div.textContent = "价格：" + searchResult[i].Cost + " RMB";
    SearchItem.appendChild(search_cost_div);
    // 展示简介
    var search_description_div = document.createElement("div");
    search_description_div.id = "search_description_div_" + searchResult[i].PaintingID;
    search_description_div.class = "search_description_div";
    search_description_div.textContent = "简介:" + searchResult[i].Description;
    SearchItem.appendChild(search_description_div);
    // 添加按钮
    var detail_btn = document.createElement("button");
    detail_btn.type = "button";
    detail_btn.id = "detail_btn_" + searchResult[i].PaintingID;
    detail_btn.class = "detail_btn";
    detail_btn.innerHTML = "查看详情";
    detail_btn.value = searchResult[i].PaintingID;
    detail_btn.addEventListener("click", function (event) {
      var id = event.target.getAttribute("value");
      window.location.href =
        "http://localhost:5500/html/product_detail.html?PaintingID=" + id;
    });
    SearchItem.appendChild(detail_btn);
    // 把父元素添加到更大的下面
    result_div.append(SearchItem);
  }
}

// 更新分页控件
function updatePagination() {
  const paginationElement = document.getElementById("pagination");
  let paginationHTML = "";
  // 显示当前页码和总页数
  paginationHTML += `当前页数：${currentPage} / 总页数：${totalPage}`;
  // 显示可点击的页码
  if (totalPage > 1) {
    paginationHTML +=
      '<button onclick="gotoPage(1)">首页</button>';
    if (currentPage > 1) {
      paginationHTML +=
        '<button onclick="gotoPage(currentPage - 1)">上一页</button>';
    }
    for (let i = 1; i <= totalPage; i++) {
      if (i === currentPage) {
        paginationHTML +=
          '<button class="current">' + i + "</button>";
      } else {
        paginationHTML +=
          '<button onclick="gotoPage(' +
          i +
          ')">' +
          i +
          "</button>";
      }
    }
    if (currentPage < totalPage) {
      paginationHTML +=
        '<button onclick="gotoPage(currentPage + 1)">下一页</button>';
    }
    paginationHTML +=
      '<button onclick="gotoPage(totalPage)">末页</button>';
  }
  paginationElement.innerHTML = paginationHTML;
}

// 跳转到指定页码
function gotoPage(page) {
  if (page >= 1 && page <= totalPage && page !== currentPage) {
    currentPage = page;
    getSearchResultsByPage(currentPage);
    updatePagination();
  }
}

// function display_search_result(data){
//     const result_div = document.getElementById("result_div");
//     result_div.innerHTML = "";  //清空子元素

//     if(data.length == 0){
//         var no_result_div = document.createElement("div");
//         no_result_div.id = "no_result_div";
//         no_result_div.innerText = "未找到任何商品！"
//         result_div.appendChild(no_result_div);
//         return;
//     }
//     var result_num_div = document.createElement("div");
//     result_num_div.id = "result_num_div";
//     result_num_div.innerText = "有" + (data.length) + "条结果";
//     result_div.appendChild(result_num_div);
//     for(var i =0; i < data.length; i++){
//         //创建父元素
//         var SearchItem = document.createElement("div");
//         SearchItem.id = i+1;
//         SearchItem.class = "SearchItem";
//         //展示艺术品图片
//         var search_image = document.createElement("img");
//         search_image.id = "search_image_" + data[i].PaintingID;
//         search_image.class = "search_image";
//         search_image.height = "300";
//         search_image.width = "300";
//         search_image.src = "../img/" + data[i].ImageFileName;
//         SearchItem.appendChild(search_image);
//         //展示艺术品名称
//         var search_paintingname_div = document.createElement("div");
//         search_paintingname_div.id = "search_paintingname_div_" + data[i].PaintingID;
//         search_paintingname_div.class = "search_paintingname_div";
//         search_paintingname_div.textContent = data[i].PaintingName;
//         SearchItem.appendChild(search_paintingname_div);
//         //展示作者名称
//         var search_author_div = document.createElement("div");
//         search_author_div.id = "search_author_div_" + data[i].PaintingID;
//         search_author_div.class = "search_author_div";
//         search_author_div.textContent = data[i].AuhtorName;
//         SearchItem.appendChild(search_author_div);
//         //展示价格
//         var search_cost_div = document.createElement("div");
//         search_cost_div.id = "search_cost_div_" + data[i].PaintingID;
//         search_cost_div.class = "search_cost_div";
//         search_cost_div.textContent = data[i].Cost;
//         SearchItem.appendChild(search_cost_div);
//         //展示简介
//         var search_description_div = document.createElement("div");
//         search_description_div.id = "search_description_div_" + data[i].PaintingID;
//         search_description_div.class = "search_description_div";
//         search_description_div.textContent = data[i].Description;
//         SearchItem.appendChild(search_description_div);
//         //添加按钮
//         var detail_btn = document.createElement("button");
//         detail_btn.id = "detail_btn_" + data[i].PaintingID;
//         detail_btn.class = "detail_btn";
//         detail_btn.innerHTML = "查看详情";
//         detail_btn.value = data[i].PaintingID;
//         detail_btn.addEventListener("click", function(event){
//             var id = event.target.getAttribute("value");
//             window.location.href ="http://localhost:5500/html/product_detail.html?PaintingID=" + id;
//         })
//         SearchItem.appendChild(detail_btn);
//         //把父元素添加到更大的下面
//         result_div.append(SearchItem);       
//     }
// }

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
        get_all_paintings();
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
        
        fetch("http://localhost/search.php",{
            method:"POST",
            body:formData
        }).then(Response =>{
            if(Response.ok)
                return Response.json();
            else
                throw new Error(Response.json().message);
        }).then(data =>{
            document.getElementById("pagination").innerHTML = "";
            searchResult = [];
            search_result = data;
            display_search_result(data);            
        })
        .catch(e=>{
            console.error(e);
        });
    }
})


window.addEventListener("DOMContentLoaded",function(){
    get_all_paintings();
})

function get_all_paintings(){
    fetch("http://localhost/get_all_paintings.php",{
        method:"GET",
    }).then(Response =>{
        if(Response.ok)
            return Response.json();
        else
            alert(Response.json().message);
    }).then(data => {
        document.getElementById("pagination").innerHTML = "";
        searchResult = [];
        search_result = data;
        display_search_result(data)
    })
    .catch(e=>{
        console.error(e);
    });
}

function SortByAuthor(a,b){
    return a.AuthorName.localeCompare(b.AuthorName);
}

function SortByPaintingName(a,b){
    return a.PaintingName.localeCompare(b.PaintingName);
}

function SortByYearOfWork(a,b){
    return a.YearOfWork - b.YearOfWork;
}

function SortByCost(a,b){
    return a.Cost - b.Cost;
}

document.getElementById("sort_by_Author").addEventListener("click",function(){
    document.getElementById("pagination").innerHTML = "";
    searchResult = [];
    search_result.sort(SortByAuthor);
    display_search_result(search_result);
})

document.getElementById("sort_by_PaitingName").addEventListener("click",function(){
    document.getElementById("pagination").innerHTML = "";
    searchResult = [];
    search_result.sort(SortByPaintingName);
    display_search_result(search_result);
})

document.getElementById("sort_by_Cost").addEventListener("click",function(){
    document.getElementById("pagination").innerHTML = "";
    searchResult = [];
    search_result.sort(SortByCost);
    display_search_result(search_result);
})

document.getElementById("sort_by_YearOfWork").addEventListener("click",function(){
    document.getElementById("pagination").innerHTML = "";
    search_result.sort(SortByYearOfWork);
    display_search_result(search_result);
})
