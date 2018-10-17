var mybutton=function(){
	this.x;
	this.y;
	this.dy;
	this.w;
	this.h;
	this.nw;
	this.nh;
	this.btnName;
	this.data;
	this.status;
	this.ready;
	this.role01;
	this.role02;
}

mybutton.prototype.init=function(){
	this.x=530;			//初始按钮大小
	this.y=560;
	this.w=220;
	this.h=80;
	this.nw=220;		
	this.nh=80;
	this.dy=0;
	this.ready=false;
	this.btnName="play01";		//第一个play按钮
	this.status=0;				//当前状态
	this.data=0;				//检测状态
	this.voice = 0;	//0：开启  1：关闭
	this.loadImage(0);
}

mybutton.prototype.loadImage = function(status) {
	this.Image = new Image();
	this.Image1 = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true
		}
	}
	if(status==0||status==1)
		this.Image.src = "img/play.png";
	if(status==2)
		this.Image.src="img/choserole.png";
	if(status==3){
		this.Image.src="img/pause.png";
		this.Image1.src="img/Voff.png";
	}
}



mybutton.prototype.config=function(status){		//按钮切换
	switch(status){
		case 0:
			this.beginBtn();
			break;
		case 1:
			this.x=0;
			this.y=-720;
			this.w = 1280;		//画布 作为按钮
			this.h = 720;
			this.btnName="play02";
			this.Falldown();
			this.showBtn();
			break;
		case 2:
			this.nw=392;
			this.nh=386;
			this.w=392;
			this.h=386;
			this.role01=false;	//角色♀
			this.role02=false;	//角色♂
			this.choseRole();
			break;
		case 3:
			this.x=1024;
			this.y=14.5;
			this.w=50;
			this.h=50;
			this.x1=1088;
			this.y1=21.5;
			this.w1=142;
			this.h1=31;
			this.btnName="pause";
			this.btnName1="voice";
			this.playBtn();
			break;
		case 4:
			this.x = 505;
			this.y = 160;
			this.w = 240;
			this.h = 50;
			this.btnName="continue";
			this.continueBtn();
			break;
		case 5:
			this.x = 610;
			this.y = 158;
			this.w = 60;
			this.h = 70;
			this.btnName="flash";
			this.flashBtn();
			break;
		default:
			break;
	}
}


/****************************************绘制场景按钮***********************************************/

mybutton.prototype.beginBtn=function(){		//初始场景按钮
	this.checkIn(q);
	if(this.ready){
		if(this.checkHover(p))
			ctx.drawImage(this.Image,0,0,this.nw,this.nh,this.x*gameScal,(this.y+2)*gameScal,this.w*gameScal,this.h*gameScal);	//鼠标悬停按钮下移
		else
			ctx.drawImage(this.Image,0,0,this.nw,this.nh,this.x*gameScal,this.y*gameScal,this.w*gameScal,this.h*gameScal);
	}
}

mybutton.prototype.showBtn=function(){		//说明场景按钮
	this.checkIn(q);
	this.checkHover(p);
//	if(this.ready){
//		if(this.checkHover(p))
//			ctx.drawImage(this.Image,0,0,this.nw,this.nh,this.x*gameScal,(this.y+2)*gameScal,this.w*gameScal,this.h*gameScal);	//鼠标悬停按钮下移
//		else{
//			ctx.drawImage(this.Image,0,0,this.nw,this.nh,this.x*gameScal,this.y*gameScal,this.w*gameScal,this.h*gameScal);
//		}
//	}
}

mybutton.prototype.choseRole=function(){	//选择角色场景
	this.checkRoleHover(p);
	this.checkRoleIn(q);
	if(this.ready){
		if(this.role01==true){
			ctx.drawImage(this.Image,401,8,this.nw,this.nh,55*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♀role 亮光
			ctx.drawImage(this.Image,1,408,this.nw,this.nh,820*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♂role
			//ctx.drawImage(this.Image,401,408,this.nw,this.nh,820*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♂role 亮光
		}else if(this.role02==true){
			ctx.drawImage(this.Image,1,8,this.nw,this.nh,55*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♀role
			//ctx.drawImage(this.Image,1,408,this.nw,this.nh,820*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♂role
			ctx.drawImage(this.Image,401,408,this.nw,this.nh,820*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♂role 亮光
		}else{
			ctx.drawImage(this.Image,1,408,this.nw,this.nh,820*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♂role
			ctx.drawImage(this.Image,1,8,this.nw,this.nh,55*gameScal,200*gameScal,this.w*gameScal,this.h*gameScal);	//♀role
		}
	}
}

mybutton.prototype.playBtn=function(){		//游戏场景按钮
	this.checkIn(q);
	this.checkVoiceIn(q);
	if(this.ready){
		if(this.checkHover(p))
			ctx.drawImage(this.Image,0,0,50,50,this.x*gameScal,(this.y+2)*gameScal,this.w*gameScal,this.h*gameScal);	//鼠标悬停按钮下移
		else
			ctx.drawImage(this.Image,0,0,50,50,this.x*gameScal,this.y*gameScal,this.w*gameScal,this.h*gameScal);
			ctx.drawImage(this.Image1,0,0,142,31,this.x1*gameScal,this.y1*gameScal,this.w1*gameScal,this.h1*gameScal);
	}
}

mybutton.prototype.continueBtn=function(){		//continue按钮
	this.checkIn(q);
	this.checkHover(p);
}

mybutton.prototype.flashBtn=function(){		//flash按钮
	this.checkIn(q);
	this.checkHover(p);
}

mybutton.prototype.update=function(){	
	switch(this.status){
		case 0:
			this.beginBtn();
			break;
		case 1:
			this.Falldown();
			this.showBtn();
			break;
		case 2:
			this.choseRole();
			break;
		case 3:
			this.playBtn();
			break;
		case 4:
			this.continueBtn();
			break;
		case 5:
			this.flashBtn();
			break;
		default:
			break;
	}
}



document.onmousemove=function(e){  //获取鼠标移动坐标
	p.x=e.offsetX;
	p.y=e.offsetY;
}

document.onmousedown=function(e){  //获取鼠标点击坐标
	q.x=e.offsetX;
	q.y=e.offsetY;
}



/********************************************检测**************************************************/




mybutton.prototype.checkHover=function(p){		//检测悬停
	if(p.x<this.x*gameScal+this.w*gameScal && p.x>this.x*gameScal && p.y<this.y*gameScal+this.h*gameScal && p.y>this.y*gameScal)
	{
		c.style.cursor="pointer";		//鼠标光标改变
		return true;
	}
	c.style.cursor="default";		//鼠标光标改变
	return false;
}

mybutton.prototype.checkRoleHover=function(p){		//检测鼠标角色按钮悬停
	if(p.x<385*gameScal && p.x>110*gameScal && p.y<560*gameScal && p.y>280*gameScal)
	{
		c.style.cursor="pointer";		//鼠标光标改变
		this.role01=true;
	}
	else if(p.x<1150*gameScal && p.x>875*gameScal && p.y<560*gameScal && p.y>280*gameScal)
	{
		c.style.cursor="pointer";		//鼠标光标改变
		this.role02=true;
	}else{
		this.role01 = false;
		this.role02 = false;
		c.style.cursor="default";		//鼠标光标改变
	}
}




mybutton.prototype.checkIn=function(q){	//检测点击
		if(q.x<this.x*gameScal+this.w*gameScal && q.x>this.x*gameScal && q.y<this.y*gameScal+this.h*gameScal && q.y>this.y*gameScal)
		{
			if(this.btnName=="play01"){
				q.x=0;				//清空点击坐标
				q.y=0;
				scene.status=1;		//点击play按钮进入下个界面
				this.status=1;		//按钮状态变化
			}
			if(this.btnName=="play02"){
				q.x=0;				//清空点击坐标
				q.y=0;
				scene.status=2;		//点击play按钮进入下个界面
				this.status=2;		//按钮状态变化
			}
			if(this.btnName == "pause"){
				q.x=0;				//清空点击坐标
				q.y=0;
				scene.status=4;		//点击play按钮进入下个界面
				this.status=4;		//按钮状态变化
			}
			if(this.btnName == "continue"){
				q.x=0;				//清空点击坐标
				q.y=0;
				scene.status=3;		//点击play按钮进入下个界面
				this.status=3;		//按钮状态变化
			}
			if(this.btnName=="flash"){
				q.x=0;				//清空点击坐标
				q.y=0;
				Game.gameload();	//初始化
				scene.status=3;		//点击play按钮进入下个界面
				this.status=3;		//按钮状态变化
				scene.Sumscore = 0;		//得分重置为0
				obstacle.init();
				ms.init();
			}
			q.x=0;				//清空点击坐标
			q.y=0;
			scene.Check();		//界面检测
			this.CheckStatus();	//检测按钮状态
			bgAudio.buttonplay();	//播放按钮声音
			return true;
		}
		return false;
}

//检测声音
mybutton.prototype.checkVoiceIn=function(q){
	if(this.x1 != null && q.x<this.x1*gameScal+this.w1*gameScal && q.x>this.x1*gameScal && q.y<this.y1*gameScal+this.h1*gameScal && q.y>this.y1*gameScal){
		q.x=0;				//清空点击坐标
		q.y=0;
		if(this.btnName1=="voice"){
			if(this.voice == 0 ){	//静音
				this.voice = 1; 
				bgAudio.setMuted(true);
				this.Image1.src="img/Von.png";
				return true;
			}else if(this.voice == 1){	
				this.voice = 0; 
				bgAudio.setMuted(false);
				this.Image1.src="img/Voff.png";
				return true;
			}
		}
		console.log(this.voice);
		//return true;
	}
	return false;
}



mybutton.prototype.checkRoleIn=function(q){		//检测选择角色
	if(q.x<385*gameScal && q.x>110*gameScal && q.y<560*gameScal && q.y>280*gameScal && this.status ==2)
	{
		q.x=0;				//清空点击坐标
		q.y=0;
		scene.head = "img/head2.png";
		scene.status=3;		//点击role1按钮进入下个界面
		this.status=3;		//按钮状态变化
		scene.Check();		//界面检测
		this.CheckStatus();	//检测按钮状态
		c.style.cursor="default";
	}
	else if(q.x<1150*gameScal && q.x>875*gameScal && q.y<560*gameScal && q.y>280*gameScal && this.status ==2)
	{
		q.x=0;				//清空点击坐标
		q.y=0;
		scene.head = "img/head3.png";
		scene.status=3;		//点击role2按钮进入下个界面
		this.status=3;		//按钮状态变化
		scene.Check();		//界面检测
		this.CheckStatus();	//检测按钮状态
		c.style.cursor="default";
	}
}


mybutton.prototype.CheckStatus=function(){		//检测按钮状态
	if(this.data != this.status){
		this.loadImage(this.status);
		this.config(this.status);
		this.data = this.status;
	}
}


mybutton.prototype.Falldown=function(){		//更新按钮位置
	if(this.status==1){		//跟着说明界面向下移动
		if(this.dy<720){
			this.dy+=15;
			this.y=this.y+this.dy;
		}else{
			this.y=0;
		}
	}
}

