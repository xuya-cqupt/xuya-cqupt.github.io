window.onload = function() {
  var oTips = document.getElementById("tips");
  var register_box = document.getElementById("register_box");
  var oInput = register_box.getElementsByTagName("input")[1];
  var aSpan = oTips.getElementsByTagName("span");
  var aStr = ["弱", "中", "强", "非常好"];
  var i = 0;

  oInput.onkeyup = oInput.onfocus = oInput.onblur = function() {
    var index = checkStrong(this.value);
    this.className = index ? "correct" : "error";
    oTips.className = "s" + index;
    for (i = 0; i < aSpan.length; i++) 
      aSpan[i].className = aSpan[i].innerHTML = "";
      index && (aSpan[index - 1].className = "active", aSpan[index - 1].innerHTML = aStr[index - 1])
  }
};

function checkStrong(sValue) {
  var modes = 0;
  if (sValue.length < 6) return modes;
  if (/\d/.test(sValue)) modes++; //数字
  if (/[a-z]/.test(sValue)) modes++; //小写
  if (/[A-Z]/.test(sValue)) modes++; //大写  
  if (/\W/.test(sValue)) modes++; //特殊字符
  switch (modes) {
    case 1:
      return 1;
      break;
    case 2:
      return 2;
    case 3:
    case 4:
      return sValue.length < 12 ? 3 : 4
      break;
  }
}