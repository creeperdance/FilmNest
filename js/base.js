/**
 * 自行封装的javascript库
 * */

/*兼容：*/
//获取样式
function getStyle(obj, attr) {
	if(getComputedStyle) {
		return getComputedStyle(obj, false)[attr];
	} else {
		return obj.currentStyle[attr];
	}
}
//获取当前窗口大小
function getInner() {
	if(typeof window.innerWidth != "undefined") {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}
}
//获取事件对象
function getEvent(e) {
	return e || window.e;
}

//事件绑定（支持同一元素绑定多个监听函数）

/*封装库：*/
function Base(_this) {
	//用来存储获取后的节点对象
	this.elements = [];
	if(_this != undefined) {
		this.elements[0] = _this;
	}
}
//封装Base对象
function $(name) {
	var base = new Base();
	if(name instanceof Object) {
		base = new Base(name);
	} else if(name.charAt(0) == '#') {
		base = base.getId(name.slice(1));
	} else if(name.charAt(0) == '.') {
		base = base.getClass(name.slice(1));
	} else {
		base = base.getTagName(name);
	}
	return base;
}

//获取元素节点
Base.prototype.getId = function(id) {
	this.elements.push(document.getElementById(id));
	return this;
}
Base.prototype.getTagName = function(tag) {
	var eles = document.getElementsByTagName('p');
	for(var i = 0; i < eles.length; i++) {
		this.elements.push(eles[i]);
	}
	return this;
}
Base.prototype.getClass = function(className) {
	var all = document.getElementsByTagName("*");
	for(var i = 0; i < all.length; i++) {
		if(all[i].className == className) {
			this.elements.push(all[i]);
		}
	}
	return this;
}
//获取或更改内容
Base.prototype.html = function(value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0) {
			return this.elements[i].innerHTML;
		} else {
			this.elements[i].innerHTML = value;
		}
	}
	return this;
}

//获取或更改样式
Base.prototype.css = function(key, value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 1) {
			if(typeof window.getComputedStyle != "undefined") {
				return window.getComputedStyle(this.elements[i], null)[key];
			} else if(typeof this.elements[i].currentStyle != "undefined") {
				return this.elements[i].currentStyle[key];
			}
		} else {
			this.elements[i].style[key] = value;
		}
	}
	return this;
}

//获取元素数组中的某一个元素
Base.prototype.getElement = function(index) {
	return this.elements[index];
}
//添加Class
Base.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className += " " + className;
		}
	}
	return this;
}
//移除Class
Base.prototype.removeClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
		}
	}
	return this;
}
//设置鼠标移入移出
Base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
}
//设置鼠标点击
Base.prototype.click = function(on) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick = on;
	}
	return this;
}
//设置显示
Base.prototype.show = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "block";
	}
	return this;
}
//设置隐藏
Base.prototype.hide = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none";
	}
	return this;
}
//设置元素水平居中
Base.prototype.center = function(width, height) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top = (document.documentElement.clientHeight - parseInt(height)) / 2 + 'px';
		this.elements[i].style.left = (document.documentElement.clientWidth - parseInt(width)) / 2 + 'px';
	}
	return this;
}
//设置浏览器窗口变动
Base.prototype.resize = function(fn) {
	window.onresize = fn;
	return this;
}
//设置锁屏功能
Base.prototype.lock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		//隐藏滚动条
		document.documentElement.style.overflow = 'hidden';
	}
	return this;
}
//设置锁屏功能解锁
Base.prototype.unlock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
		//还原滚动条
		document.documentElement.style.overflow = 'auto';
	}
	return this;
}

//设置拖拽功能
Base.prototype.drag = function() {
	for(var i = 0; i < this.elements.length; i++) {
		//鼠标点击下去操作的是当前元素区域，鼠标移动的时候操作的是整个文档区域
		this.elements[i].onmousedown = function(event) {
			var e = getEvent(event);
			var _this = this;
			var disX = e.clientX - _this.offsetLeft;
			var disY = e.clientY - _this.offsetTop;
			document.onmousemove = function(event) {
				var e = getEvent(event);
				var left = e.clientX - disX;
				var top = e.clientY - disY;
				if(left < 0) {
					left = 0;
				} else if(left > getInner().width - _this.offsetWidth) {
					left = getInner().width - _this.offsetWidth;
				}
				if(top < 0) {
					top = 0;
				} else if(top > getInner().height - _this.offsetHeight) {
					top = getInner().height - _this.offsetHeight;
				}
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			}
			document.onmouseup = function() {
				this.onmousemove = null;
				this.onmouseup = null;
			}
		}
	}
	return this;
}
