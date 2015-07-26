var checkRepeat = document.getElementById("checkRepeat");
var register_box = document.getElementById("register_box");
var username = register_box.getElementsByTagName("input")[0];
var password = register_box.getElementsByTagName("input")[1];
var repassword = register_box.getElementsByTagName("input")[2];
var submit_btn = register_box.getElementsByTagName("input")[3];
var checkbox = register_box.getElementsByTagName("input")[4];

function check()
{	
	if(password.value != repassword.value) {
		checkRepeat.innerHTML = "*两次输入的密码不一致";
		password.value = "";
		repassword.value = "";
		return false;
	}
	else if(username.value.length == 0) {
		checkRepeat.innerHTML = "*用户名不能为空";
		return false;
	}
	else if(password.value.length == 0 || repassword.value.length == 0)
  	{
  		checkRepeat.innerHTML = "*密码不能为空";
  		return false;
  	}
  	else if(checkbox.checked = "false")
  	{
  		checkRepeat.innerHTML = "*未同意相关条款";
  		return false;
  	}
	else {
		return true;
	}
}
