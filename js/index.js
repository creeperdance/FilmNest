$(function() {
	//鼠标浮动到个人中心的显示和隐藏
	$('#active').hover(function() {
		if(getInner().width >= 768) {
			$(".person_center").show();
		}
	}, function() {
		$(".person_center").hide();
	})
	//点击导航折叠按钮的显示和隐藏
	var collapse = $('#myCollapse');
	$('.navbar-toggle').click(function() {
		if(collapse.css('display') == 'none') {
			collapse.css('display', 'block');
		} else {
			collapse.css('display', 'none');
		}
	})
	//点击登陆，登陆模块的居中显示和隐藏，及锁屏功能
	var login = $('#user_login');
	$('.login').click(function() {
		var width = getStyle(login.getElement(0), 'width');
		var height = getStyle(login.getElement(0), 'height');
		collapse.hide();
		login.show();
		$('.lock_screen').lock();
		login.center(width, height).resize(function() {
			login.center(width, height);
			if(login.css('display') == "block") {
				$('.lock_screen').lock();
			}
		});
	})
	//点击注册，注册模块的居中显示和隐藏
	var regist = $('#regist_container');
	$('.regist').click(function() {
		var width = getStyle(regist.getElement(0), 'width');
		var height = getStyle(regist.getElement(0), 'height');
		collapse.hide();
		regist.show();
		$('.lock_screen').lock();
		regist.center(width, height).resize(function() {
			var width = getStyle(regist.getElement(0), 'width');
			var height = getStyle(regist.getElement(0), 'height');
			regist.center(width, height);
			if(regist.css('display') == "block") {
				$('.lock_screen').lock();
			}
		});
	})

	//点击关闭，关闭登陆/注册模块及锁屏功能
	$('#login_close').click(function() {
		login.hide();
		$('.lock_screen').unlock();
	})
	$('#regist_close').click(function() {
		regist.hide();
		$('.lock_screen').unlock();
	})
	//登陆注冊窗口的拖拽效果
	login.drag();
	regist.drag();

	//菜单切换功能
	//电影1
	var role_name1 = document.getElementById('role_name1');
	var infos1 = $('#role_info1 .row');
	var lis1 = role_name1.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis1.length; j++) {
		if(lis1[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos1.getElement(j)).css('display', 'block');
		}
		lis1[j].onclick = function() {
			for(var a = 0; a < lis1.length; a++) {
				$(infos1.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos1.getElement(a - 1)).css('display', 'block');
		}
	}
	//电影2
	var role_name2 = document.getElementById('role_name2');
	var infos2 = $('#role_info2 .row');
	var lis2 = role_name2.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis2.length; j++) {
		if(lis2[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos2.getElement(j)).css('display', 'block');
		}
		lis2[j].onclick = function() {
			for(var a = 0; a < lis2.length; a++) {
				$(infos2.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos2.getElement(a - 1)).css('display', 'block');
		}
	}
	//电影2
	var role_name3 = document.getElementById('role_name3');
	var infos3 = $('#role_info3 .row');
	var lis3 = role_name3.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis3.length; j++) {
		if(lis3[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos3.getElement(j)).css('display', 'block');
		}
		lis3[j].onclick = function() {
			for(var a = 0; a < lis3.length; a++) {
				$(infos3.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos3.getElement(a - 1)).css('display', 'block');
		}
	}
	//侧边栏图片动画效果
	$('#side1 p').hover(function() { //鼠标移入
		$('#side1 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side1 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 50);
	});
	$('#side2 p').hover(function() { //鼠标移入
		$('#side2 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side2 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 50);
	});

	$('#side3 p').hover(function() { //鼠标移入
		$('#side3 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side3 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 50);
	});
	//设置侧边栏高度
	$('.sidebar').css('height',getInner().height+'px').resize(function(){
		$('.sidebar').css('height',getInner().height+'px');
	});
	//点击侧边栏，跳转至相应区域 【可直接在html文档直接更改，此处仅为试手】
	/*$('#side1').click(function() {
		$('#side1 a').getElement(0).href = '#film_list1';
	});
	$('#side2').click(function() {
		$('#side2 a').getElement(0).href = '#film_list2';
	});
	$('#side3').click(function() {
		$('#side3 a').getElement(0).href = '#film_list3';
	});*/

});