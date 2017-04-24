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