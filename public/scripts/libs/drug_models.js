var newAccount=(function(){
	function Account(opt){
		this.opt=opt;
		this.main();
	}

	Account.prototype.main=function(){
		this.creat()
		this.mark=document.querySelector(".mark");
		var drawBox=document.getElementById("drawBox");
		var close=document.getElementById("close");
		var btns=drawBox.getElementsByTagName("button");
		if(this.opt.isdrag){
			this.drawBx(drawBox)
		}
		this.closebtn(close)
	}

	Account.prototype.creat=function(){
		var data=this.opt;
		if(data.ismark){
			var mark=document.createElement("div");
			mark.className='mark';
			document.body.appendChild(mark);
		}
		var html=`<div class="draw-box" id="drawBox">
					 <h3><span class="close" id="close">&times;</span></h3>
				 </div>`
		document.body.innerHTML+=html;
	}

	Account.prototype.drawBx=function(ele){
		ele.onmousedown=function(e){
			var e=e || window.event;
			var x=e.pageX-this.offsetLeft-175,
				y=e.pageY-this.offsetTop-100;

			document.onmousemove=function(e){
				var e=e || window.event;
				var movX=e.pageX-x,
					movY=e.pageY-y;
				ele.style.left=movX+"px";
	  	  		ele.style.top=movY+"px";
			}
			document.onmouseup=function(){
		  		document.onmousemove=null;
		  	}
		}
	}

	Account.prototype.closebtn=function(close){
		var ele=1,
			timer=null,
			_this=this;
		close.onclick=function(){
			timer=setInterval(function(){
				ele-=0.1;
				close.parentNode.parentNode.style.opacity =ele;
				if(ele<=0){
					clearInterval(timer);
					ele=0;
					document.body.removeChild(close.parentNode.parentNode);
					if(_this.opt.ismark){
						document.body.removeChild(_this.mark)
					}
				}
			},30)
			if(this.ind==0){
				_this.opt.callback && _this.opt.callback();
			}
		}
	}
	var Init=function(opt){
		new Account(opt);
	}
	return{
		init:Init
	}
})()