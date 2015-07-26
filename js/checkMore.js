var check_box = document.getElementById("check_box");
var li = check_box.getElementsByTagName("li");
var check_more = [];
var state = false;
for (var i = 0,k=0; i < li.length; i++) {
	check_more[k] = li[i].getElementsByTagName("div")[2];
	k++;
};
check_more[3].onclick = check_more[4].onclick = function () {
		if(state == true)
		{
			this.parentNode.style.height = "38px";
			this.innerHTML = "更多<img src='./img/more_icon.png'>";
			state = false;
		}
		else
		{
			state = true;
			this.parentNode.style.height = "";
			this.innerHTML = "收起<img src='./img/more_icon.png'>";
		}
	};