$(function() {
	//
	var common = {
		$up_btn: $("#up_btn"),
		$file: $("#file"),
		$history: $("#history"),
		$favorite: $("#favorite"),
		$select: $("select[name='goods_style']"),
		$submit: $("input[name=submit]"),
		$small_ul: $("#small_ul"),
		$big_pic: $("#big_pic"),
		$file: $("#file"),
		init: function() {
			this.bindEvent();
			this.initPage();
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

		//事件绑定
		bindEvent: function() {
			var _this = this,
				m = [],
				imgRoute = [],
				pattern = /^image\/\w+/;
			//图片上传
			this.$up_btn.click(function() {
				var dv = document;
				var file = dv.getElementById("file"),
					up_btn = dv.getElementById('up_btn');
				len = file.files.length;
				if (len == 0) {
					alert("请先选择上传图片！");
				} else if (len > 5) {
					alert("最多只能上传5张！");
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
					_this.getImage("js/src.json", {
						"imgRoute": imgRoute
					});
				} //else
			});

			//表单提交
			this.$submit.click(function() {

			});

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
				$(all_li[0]).find("img").addClass("img_border");
				for (var j = 0; j < all_li.length; j++) {
					all_li[j].index = j;
				}
				all_li.on("click", function() {
					var iNow = this.index,
						imgSrc = $(this).find("img").eq(0).attr("src");
					_this.$big_pic.attr("src", imgSrc);
					for (var k = 0; k < all_li.length; k++) {
						$(all_li[k]).find("img").eq(0).removeClass("img_border");
					}
					$(this).find("img").eq(0).addClass("img_border");

					if (iNow == 0 || iNow == 1) {
						_this.$small_ul.animate({
							left: "0px"
						});
					} else if (iNow == src.length - 1) {
						_this.$small_ul.animate({
							right: "0px"
						});
					} else {
						var distance = -(iNow - 1) * 130;
						_this.$small_ul.animate({
							left: (distance + "px")
						});
					}
				});
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

		}
	};

	common.init();
});