
var img_auto = 0;
var img_ul = document.getElementById("imgList");
var img = img_ul.getElementsByTagName("img");
var page_ul = document.getElementById("pageList");
var listNumber = page_ul.getElementsByTagName("li");
for (var i = 0 ; i < img.length ; i++){
	var newList = document.createElement("li");
	page_ul.appendChild(newList);
	//newList.innerHTML = i + 1;
	newList.style.cssText = "text-align:center;cursor:pointer;width:13px;height:13px;";
	if(window.addEventListener) listNumber[i].addEventListener("click",changeColor(i),false);
	else listNumber[i].attachEvent("onclick",changeColor(i));
 };
autoPPT();

function changeColor(i){	
	return function(e){
		img_ul.style.right = (img[0].offsetWidth)*i + "px";
		for (var k = 0 ; k < listNumber.length ; k++){
			listNumber[k].style.backgroundColor = "#fff";
		};
		listNumber[i].style.backgroundColor = "#6e6e6d";
		img_auto = i;
	}
}
function autoPPT(){
	for (var m = 0 ; m < listNumber.length ; m++){
		listNumber[m].style.backgroundColor = "#fff";
	};
	listNumber[img_auto].style.backgroundColor = "#6e6e6d";
	img_ul.style.right = (img[0].offsetWidth)*img_auto + "px";
	img_auto++;
	if(img_auto == img.length) img_auto = 0;
	setTimeout(function(){
		autoPPT();
	},3000);
}

