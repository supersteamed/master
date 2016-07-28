(function (win) {
	function bannerMove(arg) {
		this.obj=document.getElementById('banner');
		this.bannerPic=this.getByClass(this.obj,'bannerPic')[0];
		this.bannerControl=this.getByClass(this.obj,'bannerControl')[0];
		this.activePic=this.getByClass(this.obj,'active')[0];
		this.activeCon=this.getByClass(this.obj,'active')[1];
		this.banners=this.bannerPic.getElementsByTagName('li');
		this.controls = this.bannerControl.getElementsByTagName('li');
		this.actpic=this.activePic.getElementsByTagName('img')[0];
		this.pics=this.bannerPic.getElementsByTagName('img');
		for (var i = 0; i < this.banners.length; i++) {
			this.banners[i].index = i;
			this.controls[i].index=i;
		}
		this.bind();

	}
	bannerMove.prototype = {
			bind: function () {
				this.conBind();
				this.resize();
				this.autoMove();
				this.piccontrols();
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
			autoMove:function () {
				var _this =this;
				setInterval(function () {
					_this.pictopcg('+');
				},7000);
			},
			piccontrols:function() {
				var _this =this;
				for (var i = 0; i < this.controls.length; i++) {
					this.controls[i].onmousedown=function () {
						_this.pictopcg(this.index);
					};
				}
			},
			pictopcg:function (picindex) {
				if (picindex === '+') {
					this.index = this.activePic.index +1;
					if (this.index === this.banners.length) {
						this.index = 0;
					}
				}else{
					this.index = picindex;
				}
				this.activePic.className = '';
				this.activeCon.className = '';
				this.controls[this.index].className = 'active';
				this.banners[this.index].className = 'active';
				this.activePic = this.banners[this.index];
				this.activeCon=this.controls[this.index];	
			},
			conBind:function () {

				var loadImg=new Image();
				var _this=this;
				this.height= (window.innerHeight||document.documentElement.clientHeight) -66;
				this.width= window.innerWidth||document.documentElement.clientWidth;
				this.bannerControl.style.left =(this.width -this.bannerControl.offsetWidth)/2 +'px';
				this.bannerControl.style.bottom = 20+'px';
				this.obj.style.height=this.height+'px';
				win.topMenuScroll = $('#topmenu').offset().top;
				loadImg.onload=function (argument) {
					_this.imageWidth = this.width;
					_this.imageHeight = this.height;
					_this.picresize(false);
				};
				loadImg.src=this.actpic.src;
			},
			resize:function () {
				var _this=this;
				win.onresize=function () {
					_this.width= window.innerWidth||document.documentElement.clientWidth;
					_this.height= (window.innerHeight||document.documentElement.clientHeight) - 66;
					_this.bannerControl.style.left =(_this.width -_this.bannerControl.offsetWidth)/2 +'px';
					_this.obj.style.height=_this.height+'px';
					_this.picresize(true);
					win.topMenuScroll = $('#topmenu').offset().top;
				};
			},
			picresize:function (onOff) {

				if (this.width >1024) {
					for (var i = 0; i < this.pics.length; i++) {
						if (onOff) {
							this.pics[i].style.marginLeft = 0;
						}
						this.pics[i].width=this.width;
						this.pics[i].height = this.imageHeight*(this.pics[i].width/this.imageWidth);
						this.pics[i].style.marginTop=-(this.pics[i].height -this.height)/2 +'px';
						if(this.pics[i].height < this.height){
							this.pics[i].style.marginTop= 0;
							this.pics[i].height=this.height;
							this.pics[i].width = this.imageWidth*(this.pics[i].height/this.imageHeight);
							this.pics[i].style.marginLeft=-(this.pics[i].width -this.width)/2 +'px';
						}
					}
				}else if(this.width <=1024){
					for (var i = 0; i < this.pics.length; i++) {
						if (onOff) {
							this.pics[i].style.marginTop= 0;
						}
						this.pics[i].height=this.height;
						this.pics[i].width = this.imageWidth*(this.pics[i].height/this.imageHeight);
						this.pics[i].style.marginLeft=-(this.pics[i].width -this.width)/2 +'px';
						if(this.pics[i].width < this.width){
							this.pics[i].style.marginLeft = 0;
							this.pics[i].width=this.width;
							this.pics[i].height = this.imageHeight*(this.pics[i].width/this.imageWidth);
							this.pics[i].style.marginTop=-(this.pics[i].height -this.height)/2 +'px';
						}
					}
				}
			}
		};

	win.menBanner=function (arg) {
		new bannerMove(arg);
	};
})(window);