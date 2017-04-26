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
//登陆窗口拖拽效果
login.drag();

//菜单切换功能
//电影1
var role_name1 = document.getElementById('role_name1');
var role_infos = document.getElementsByClassName('role_info');
var lis21 = role_name1.getElementsByTagName('ul')[0].getElementsByTagName('li');
var infos1 = role_infos[0].getElementsByClassName('row');
for(var j = 0; j < lis21.length; j++) {
	if(lis21[j].className.match(new RegExp('(\\s|)^active'))) {
		$(infos1[j]).css('display', 'block');
	}
	lis21[j].onclick = function() {
		for(var a = 0; a < lis21.length; a++) {
			$(infos1[a]).css('display', 'none');
		}
		var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
		$(infos1[a - 1]).css('display', 'block');
	}
}
//电影2
var role_name2 = document.getElementById('role_name2');
var role_infos = document.getElementsByClassName('role_info');
var lis2 = role_name2.getElementsByTagName('ul')[0].getElementsByTagName('li');
var infos2 = role_infos[1].getElementsByClassName('row');
for(var j = 0; j < lis2.length; j++) {
	if(lis2[j].className.match(new RegExp('(\\s|)^active'))) {
		$(infos2[j]).css('display', 'block');
	}
	lis2[j].onclick = function() {
		for(var a = 0; a < lis2.length; a++) {
			$(infos2[a]).css('display', 'none');
		}
		var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
		$(infos2[a - 1]).css('display', 'block');
	}
}
//电影3
var role_name3 = document.getElementById('role_name3');
var role_infos = document.getElementsByClassName('role_info');
var lis3 = role_name3.getElementsByTagName('ul')[0].getElementsByTagName('li');
var infos3 = role_infos[2].getElementsByClassName('row');
for(var j = 0; j < lis3.length; j++) {
	if(lis3[j].className.match(new RegExp('(\\s|)^active'))) {
		$(infos3[j]).css('display', 'block');
	}
	lis3[j].onclick = function() {
		for(var a = 0; a < lis3.length; a++) {
			$(infos3[a]).css('display', 'none');
		}
		var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
		$(infos3[a - 1]).css('display', 'block');
	}
}