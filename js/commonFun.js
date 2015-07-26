
	var common = {
		$up_btn: $("#up_btn"),
		$file: $("#file"),
		$history: $("#history"),
		$favorite: $("#favorite"),
		$select: $("select[name='goods_style']"),
		$small_ul: $("#small_ul"),
		$big_pic: $("#big_pic"),
		$file: $("#file"),
		$form: $("form[name=form1]"),
		$form2:$("form[name=form2]"),
		$icon_close:$(".icon_close"),
		init: function() {
			this.bindEvent();
			this.initPage();
		},
		init2:function(){
			this.bindEvent2();
			this.initPage2();
		},
		//初始化页面
		initPage: function() {
			//下拉框
			this.fullSelect("js/goodsStyle.json", this.$select);

			//历史信息
			this.changeImage("js/image.json", this.$history.find("ul"));

			//猜你喜欢
			this.changeImage("js/image.json", this.$favorite.find("ul"));
		},
        initPage2:function(){
        	//填充信息
        	this.getMessage("js/message.json");
        	//历史信息
			this.changeImage("js/image.json", this.$history.find("ul"));

			//猜你喜欢
			this.changeImage("js/image.json", this.$favorite.find("ul"));
        },
		//事件绑定
		bindEvent: function() {
			var _this = this,
			submit =this.$form.find("input[name=submit]");
			this.iconClick();
			//图片上传
			this.$up_btn.click(function() {
				_this.upClick("js/src.json");
			});
			
			//表单提交
			submit.click(function() {
				var formResult = _this.checkForm();
				for(var i in formResult){
					console.log(i+"   :  "+formResult[i]);
				}
                  if(formResult) {
                      $.post("js/image.json",formResult,function(){
                      	alert("提交成功");
                      });
                  }else{
                  	return false;
                  }
			});

		},
		bindEvent2:function(){
			var result = true,
			_this = this;
			this.iconClick();
			this.$up_btn.click(function() {
				_this.upClick("js/src.json");
			});
			$("#submit2").click(function(){
			var file = $("#extra").val(),
			explain = $("#explain").val(),
			sellerData = {
              "explain":explain
			};
              if(file){
              	result = _this.checkFile(file,$("#extra"));
              	sellerData.file = "classpath/file/"+file;
              }
              if(result){
              	console.log(sellerData);
              	$.post("js/message.json",sellerData,function(){
              		alert("上传成功！");
              	});
              }
			});
		},
		getMessage:function(url){
			$.get(url,function(data){
               $("#style").html(data.goodsStyle);
               $("#description").html(data.description);
			});

		},
		iconClick:function(){
			//关闭侧边栏
			this.$icon_close.click(function(){
				$(this).parent().slideUp(500);
			});	
		},
		upClick:function(url){
			var _this = this,
				m = [],
				imgRoute = [],
				pattern = /^image\/\w+/
				dv = document;
			var file = dv.getElementById("file"),
					up_btn = dv.getElementById('up_btn');
				len = file.files.length;
				if (len == 0) {
					alert("请先选择上传图片！");
				} else if (len > 5) {
					alert("上传失败！最多只能上传6张！");
					_this.$file.val("");
				} else {
					for (var i = 0; i < len; i++) {
						var elem = file.files[i];
						//console.log(elem.name + "   " + elem.type);
						if (pattern.test(elem.type)) {
							m.push(elem.name);
						} else {
							alert("上传失败！请选择格式正确的图片！");
							_this.$file.val("");
							return;
						}
					} //for end
					for (var k = 0; k < m.length; k++) {
						imgRoute[k] = "classpath/img/"+m[k];
					}
					_this.getImage(url, {
						"imgRoute": imgRoute
					});
				} //else
			

		},
		getImage: function(url, imgData) {
			var fullUl = ""
			_this = this;
			$.post(url, imgData, function(data) {
				var src = data.src;
				_this.$big_pic.attr("src", data.src[0]).fadeIn(1000);
				_this.$small_ul.css("width", src.length * 130 + "px");
				for (var i = 0; i < src.length; i++) {
					fullUl += "<li><img src='" + src[i] + "''></li>";
				}
				_this.$small_ul.html("").append(fullUl);
				alert("上传成功！");
				var all_li = _this.$small_ul.find("li");
				clickAfter();
				$(all_li[0]).find("img").addClass("img_click_after");
				for (var j = 0; j < all_li.length; j++) {
					all_li[j].index = j;
				}
				all_li.on("click", function() {
					var iNow = this.index,
						imgSrc = $(this).find("img").eq(0).attr("src");
					_this.$big_pic.attr("src", imgSrc);
					clickAfter();
					$(this).find("img").eq(0).removeClass("img_click_before").addClass("img_click_after");
					

				});
				function clickAfter(){
					for (var k = 0; k < all_li.length; k++) {
						$(all_li[k]).find("img").eq(0).removeClass("img_click_after").addClass("img_click_before");
					}
				}
			}); //post

		},
		changeImage: function(url, whichUll) {
			var a = [],
				b = [],
				c = [],
				d = [],
				iNow = 0;
			var _this = this;
			$.get(url, function(data) {
				$.each(data, function(i, value) {
					if (i < 5) {
						a.push(value);
					} else if (i < 10) {
						b.push(value);
					} else if (i < 15) {
						c.push(value);
					} else if (i < 20) {
						d.push(value);
					}
				}); //each
				repeat();
			}); //
			function repeat() {
				if (iNow == 0) {
					_this.showInfor(a, whichUll);
					//console.log(iNow);
				} else if (iNow == 1) {
					_this.showInfor(b, whichUll);
				} else if (iNow == 2) {
					_this.showInfor(c, whichUll);
				} else if (iNow == 3) {
					_this.showInfor(d, whichUll);
					iNow = -1;
				}
				iNow++;
				setTimeout(function() {
					repeat();
				}, 6000);
			}

		},
		fullSelect: function(url, select) {
			var options = $(select).find("options")
			constent = "";
			$.get(url, function(data) {
				for (var i in data) {
					content += "<option>" + data[i] + "</option>"
				}
				$(select).append(content);
			}); //get
		},
		showInfor: function(arr, whichUll) {
			var images = $(whichUll).find("img"),
				infors = $(whichUll).find("p");
			for (var i = 0; i < arr.length; i++) {
				images.eq(i).fadeOut(100);
				infors.eq(i).fadeOut(100);
				images.eq(i).attr("src", arr[i].src).fadeIn(1500);
				infors.eq(i).val("").html(arr[i].infor).fadeIn(1500);
			}

		},
		checkForm: function() {
		 //var form = $this.$form;
		 var code,fileName;
         var radio = $("input[name='decision']:checked").val(),
         goods_name =$("input[name='goods_name']").val(),
         date = $("input[name='date']").val(),
         explain =$("textarea[name='explain']").val(),
         goods_style = this.$select.val(),
         file = $("input[name='extra']").val(); 

        var result1 = this.checkDate(date,$("input[name='date']")),
        result2 = this.checkGoodsName(goods_name,$("input[name='goods_name']")),
        result3 = true,formData;
        if(file){
         result3 = this.checkFile(file,$("input[name='extra']")); 
        }
        if(result1&&result2&&result3){
				if(radio=='yes'){
				         	code =1;//代表是
				         }else if(radio=='no'){
				         	code=0;//代表否
				         }
	            file ="classpath/file/"+file;
	            formData = {
	        	   "goods_style":goods_style,//商品类型
	               "code":code,//是否拍卖
	               "date":date,//拍卖天数
	               "fileName":file,//上传文件名
	               "explain":explain,//商品说明
                   "goods_name":goods_name//商品名称
	        	};
	        	//alert(45);
           return formData;
        }else{
           return false;
        }
		},
		checkDate:function(date,elem){
          var pattern = /^\d+$/g;
          if(!(pattern.test(date)&&date<30||date==30)){
           elem.next("i").html("请输入正确日期！");
           return false;
         }else{
         	elem.next('i').html("");
         	return true; }
         },//checkDate
         checkGoodsName:function(goods_name,elem){
           if(goods_name){
           	elem.next("i").html("");
           	return true;
           }else{
           	elem.next("i").html("请输入商品名称！");
           	return false;
           }
         },
         checkFile:function(file,elem){
           var split = file.split(".");
           var style = split[split.length-1];
           if(style=='rar'||style=='zip'){
           	//console.log(style);
           	elem.next("i").html("");
           	return true;
           }else{
           	elem.next("i").html("请上传正确文件！");
           	elem.val("");
           	return false;
           }
         }
	};
