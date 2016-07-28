(function (win) {

	function bannerMove(arg) {
		this.bannerObj = document.getElementById(arg.obj);
		this.bannerPic = this.getByClass(this.bannerObj, arg.pic)[0];
		this.bannerCont = this.getByClass(this.bannerObj, arg.cont)[0];
		this.left = this.getByClass(this.bannerObj, arg.left)[0];
		this.right = this.getByClass(this.bannerObj, arg.right)[0];
		this.margin = arg.margin;
		this.trasitionpicNum = 0;
		this.transitioncontNum = 0;
		this.index = this.trasitionpicNum + 2;
		this.picList = this.bannerPic.getElementsByTagName('li');
		this.contList = this.bannerCont.getElementsByTagName('li');
		this.leng = this.contList.length + 1;
		this.onOff = true;
		this.actPic = this.getByClass(this.bannerPic, 'active')[0];
		this.actCont = this.getByClass(this.bannerCont, 'active')[0];
		for (var i = 0; i < this.picList.length; i++) {
			this.picList[i].index = i;
		}
		for (var i = 0; i < this.contList.length; i++) {
			this.contList[i].index = i;
		}
		this.bind();
	}
	bannerMove.prototype = {
		bind: function () {
			this.stopMove();
			this.startMove();
			this.autoGo();
			this.tansationend();
			this.contMove();
			this.leftRightCont();
		},
		getByClass: function (parent, classname) {
			var oAll = parent.getElementsByTagName('*');
			var classArr = [];
			var showclass = new RegExp('\\b' + classname + '\\b', 'i');
			for (var i = 0; i < oAll.length; i++) {
				if (showclass.test(oAll[i].className)) {
					classArr.push(oAll[i]);
				}
			}
			return classArr;
		},
		startMove: function () {

			var _this = this;
			_this.bannerPic.style.transition = 'all 0s linear 0s';
			this.objWidth = _this.bannerObj.clientWidth;
			this.picWidth = this.actPic.offsetWidth;
			this.conTr = _this.bannerCont.clientWidth;
			var clr = (_this.objWidth - _this.picWidth) / 2;
			this.autoLeft = clr - (_this.picWidth + _this.margin) * 2;
			this.bannerPic.style.left = _this.autoLeft + 'px';
			this.bannerCont.style.left = (_this.objWidth - this.conTr) / 2 + 'px';

		},
		autoGo: function () {
			var _this = this;
			this.Interval = setInterval(function () {
				_this.moveBefore('+');
			}, 5000);
		},
		tansationend: function () {
			var _this = this;

			function trans() {
				if (_this.actPic.index === _this.picList.length - 2) {
					_this.picList[2].style.transition = 'all 0s linear 0s';
					_this.bannerPic.style.transition = 'all 0s linear 0s';
					_this.bannerPic.style.left = _this.autoLeft + 'px';
					_this.actPic.className = '';
					_this.picList[2].className = 'active';
					_this.actPic = _this.picList[2];
					_this.trasitionpicNum = 0;
				} else if (_this.actPic.index === 1) {

					_this.picList[_this.leng].style.transition = 'all 0s linear 0s';
					_this.bannerPic.style.transition = 'all 0s linear 0s';
					_this.bannerPic.style.left = _this.autoLeft - (_this.picWidth + _this.margin) * 4 + 'px';
					_this.actPic.className = '';
					_this.picList[_this.leng].className = 'active';
					_this.actPic = _this.picList[_this.leng];
					_this.trasitionpicNum = _this.leng - 2;
				}
				_this.onOff = true;
			}
			this.bannerPic.addEventListener('webkitTransitionEnd', trans);
			this.bannerPic.addEventListener('transitionend', trans);
		},
		stopMove: function () {
			var _this = this;
			this.bannerObj.onmouseover = function (event) {
				clearInterval(_this.Interval);
			};
			this.bannerObj.onmouseout = function (event) {
				_this.autoGo();
			};
		},
		contMove: function () {
			var _this = this;
			for (var i = 0; i < this.contList.length; i++) {
				this.contList[i].onmousedown = function () {
					_this.moveBefore(this);
				};
			}
		},
		leftRightCont: function () {
			var _this = this;
			this.right.onclick = function () {
				if (_this.onOff === false) return;
				_this.onOff = false;
				_this.moveBefore('-');

			};
			this.left.onclick = function () {
				if (_this.onOff === false) return;
				_this.onOff = false;
				_this.moveBefore('+');

			};
		},
		setTra: function () {

			if (this.bannerPic.style.transition === 'all 0s linear 0s') {
				this.picList[2].style.transition = '1s';
				this.picList[this.leng].style.transition = '1s';
				this.bannerPic.style.transition = '1s';
			}
		},
		moveBefore: function (DA) {
			this.setTra();
			this.actPic.className = '';
			this.actCont.className = '';
			if (typeof DA === 'object') {
				this.trasitionpicNum = DA.index;
				this.transitioncontNum = DA.index;
			} else {

				switch (DA) {
				case '+':
					this.trasitionpicNum++;
					this.transitioncontNum++;
					break;
				case '-':
					this.trasitionpicNum--;
					this.transitioncontNum--;
					break;
				}
			}
			this.move = this.trasitionpicNum * (this.picWidth + this.margin);
			this.index = this.trasitionpicNum + 2;
			if (this.transitioncontNum === -1) {
				this.transitioncontNum = this.contList.length - 1;
			} else if (this.transitioncontNum === this.contList.length) {
				this.transitioncontNum = 0;
			}
			this.picList[this.index].className = 'active';
			this.contList[this.transitioncontNum].className = 'active';
			this.actPic = this.picList[this.index];
			this.actCont = this.contList[this.transitioncontNum];
			this.bannerPic.style.left = this.autoLeft - this.move + 'px';
		}

	};
	win.creatBanner = function (arg) {
		new bannerMove(arg);
	};
})(window);
