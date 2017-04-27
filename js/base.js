/**
 * 自行封装的javascript库
 * */

/*兼容：*/
//获取样式
function getStyle(obj, attr) {
	if(typeof getComputedStyle != "undefined") {
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
function getEvent(event) {
	return event || window.event;
}
//事件绑定
Base.prototype.addEvent = function(obj, type, fn) {
	if(typeof obj.addEventListener != "undefined") { //W3C
		obj.addEventListener(type, fn, false);
	} else {
		//创建每个对象的事件对象，并将函数按类型存储到其事件对象中
		if(!obj.event) {
			obj.event = {};
		}
		if(!obj.event[type]) {
			obj.event[type] = [];
			if(obj['on' + type]) {
				obj.event[type][0] = fn;
			}
		}
		obj.event[type][index++] = fn;
		obj.event['on' + type] = function() {
			for(var i = 0; i < obj.event[type].length; i++) {
				obj.event[type][i]();
			}
		}
	}
};
Base.prototype.addEvent.index = 1;
//事件移出
Base.prototype.removeEvent = function(obj, type, fn) {
	if(typeof obj.removeEventListener != "undefined") { //W3C
		obj.removeEventListener(type, fn);
	} else {
		var fns = obj.event[type];
		for(var i in fns) {
			if(fns[i] == fn) {
				delete obj.event[type][i];
			}
		}
	}
}
/*封装库：*/
function $(args) {
	return new Base(args);
}

function Base(args) {
	this.elements = [];
	if(typeof args == 'string') {
		if(args.indexOf(' ') != -1) {
			var elements = args.split(' ');
			var childElements = [];
			var node = [];
			for(var i = 0; i < elements.length; i++) {
				if(node.length == 0)
					node.push(document);
				switch(elements[i].charAt(0)) {
					case '#':
						childElements = [];
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;
						break;
					case '.':
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							var temps = this.getTagName(elements[i], node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			switch(args.charAt(0)) {
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	} else if(typeof args == 'object') {
		if(args != undefined) {
			this.elements[0] = args;
		}
	}

}
//获取ID 节点
Base.prototype.getId = function(id) {
	return document.getElementById(id);
};
//获取元素节点数组
Base.prototype.getTagName = function(tag, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i = 0; i < tags.length; i++) {
		temps.push(tags[i]);
	}
	return tags;
};
//获取CLASS 节点数组
Base.prototype.getClass = function(className, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++) {
		if(all[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			temps.push(all[i]);
		}
	}
	return temps;
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
		this.elements[i].onmousedown = function(e) {
			var e = getEvent(e);
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;
			document.onmousemove = function(e) {
				var e = getEvent(e);
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;
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
		};
	}
	return this;
}