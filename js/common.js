window.onload = function(){
	var dv = document;
	var pageWidth = dv.body.clientWidth<dv.documentElement.clientWidth?dv.documentElement.clientWidth:dv.body.clientWidth;
	var pageHeight = dv.body.clienteight<dv.documentElement.clientHeight?dv.documentElement.clientHeight:dv.body.clientHeight;
	window.onresize = function(){
		//console.log( document.body.clientWidth);
		//console.log( document.documentElement.clientWidth);
		//console.log( document.body.clientHeight);
		//console.log( document.documentElement.clientHeight);
        //console.log(pageWidth+"  :   "+pageHeight);
        document.body.style.width = pageWidth +"px";
        document.body.style.height = pageHeight +"px";
	};
};