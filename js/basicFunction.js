
//去除前后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
//获取class结点
function getClass(className,oParent){
	var oParent = oParent==""?document:document.getElementById(oParent),
	elements=[];
	var nodes = oParent.childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].className == className){
			elements.push(nodes[i]);
		}
	}
	return elements;
}
//返回相应选择器
function $(selector,oParentID){
	var selector = trim(selector),value;
	var pattern1 = /^#/g,
	pattern2 = /^./g
	elems = [];
	if(pattern1.test(selector)){
       value = selector.replace(/^#{1}/g,""); 
       alert(value);
       return document.getElementById(value);
	}else if(pattern2.test(selector)){
		value = selector.replace(/^.{1}/g,"");
		elems = getClass(value,oParentID);
		return elems;
	}else{
		return document.getElementsByTagName(selector);
	}
}
var x = $(".left_sidebar","goods_upload");
alert(c.length);