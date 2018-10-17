var role = function() {
	this.w; //显示大小
	this.h;
	this.x; //画布位置
	this.ox;//屏幕位置
	this.y;
	this.sx; //图片裁剪位置
	this.sy;
	this.status; //状态
	this.judge; //判断状态
	this.currentnum; //当前帧数
	this.num; //帧数
	this.direction; //判断画布方向
	this.dir;//判断移动方向
	this.Key;//键位判断
	//this.src;
	this.ready;
	this.life;
	//this.loadImage();
}

role.prototype.init = function() {
	this.w = 100;
	this.h = 100;
	this.x = 20;	//画布位置
	this.y = 452;
	this.ox= 20;		//屏幕位置
	this.dx= 0; 	//画布位移
	this.odx= 0; 	//屏幕位移
	this.life = 1;	//生命值
	this.vy = 0;	//初始跳跃速度
	this.sdy = 0;   //偏移量
	this.direction = "right";
	this.currentnum = 0;
	this.fps = 0;		//延迟
	this.stop = true; 	//停止图片帧
	this.status = "waiting";	//初始状态
	this.judge = "waiting";		//判断角色状态
	this.jumpMusic = 0;		//检测播放跳跃音乐
	this.ready = false;
	this.loadImage();
	this.judgeStatus("waiting");
}

role.prototype.judgeStatus = function(status) {
	this.currentnum = 0;
	switch(status) {
		case "waiting":
			this.sy = 263;		//y轴裁剪位置
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy = 0;		//偏移
			this.num = 9;		//动作帧数
			this.fpsnum = 6;	//延迟
			break;
		case "attack":
			this.sy = 0;
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy=12;
			this.num = 4;
			this.fpsnum = 8;
			break;
		case "run":
			this.sy = 560;
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy = 0;
			//this.dx = 10;
			this.fpsnum = 3;
			this.num = 5;
			break;
		case "dead":
			this.sy = 860;
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy= 30;
			//this.dx = 10;
			this.fpsnum = 2;
			this.num = 2;
			this.delayfps = 0;	//延时进入死亡界面
			break;
		case "jump":
			this.sy = 1760;
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy = 0;
			this.vy = 40;
			this.fpsnum = 4;
			this.num = 1;
			break;
		case "drop":
			this.sy = 1760;
			this.sx = 320;
			this.sw = 320;
			this.sh = 300;
			this.sdy = 0;
			//this.vy = 0;
			this.fpsnum = 4;
			this.num = 1;
			break;	
		default:
			break;
	}
}

role.prototype.loadImage = function() {
	this.Image = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true
		}
	}
	this.Image.src = "img/role01.png";
}

role.prototype.draw = function() {
	if(this.ready) {
		if(this.direction=="right") {
			ctx.beginPath();
			ctx.drawImage(this.Image, this.currentnum * 320, this.sy, this.sw, this.sh, this.x*gameScal, (this.y+this.sdy)*gameScal, this.w*gameScal, this.h*gameScal);
		} else if(this.direction=="left"){
			ctx.save();
			ctx.translate(c.width,0);
			ctx.scale(-1, 1);
			ctx.beginPath();
			ctx.drawImage(this.Image, this.currentnum * 320, this.sy, this.sw, this.sh, this.x*gameScal, (this.y+this.sdy)*gameScal, this.w*gameScal, this.h*gameScal);
			ctx.restore();
		}
	}
}

role.prototype.update = function() {
	this.check();
	this.draw();
	this.fps++;
	if(this.fps >= this.fpsnum) {
		if(this.stop == true)
			this.currentnum = (this.currentnum + 1) % this.num;
		//Checkhit.checkhitGround();		//检测是否碰到墙
		if(this.status=="attack"){
			this.attack();
		}
		if(this.status == "run") {
			this.run();
		}
		if(this.status=="jump"){
			this.jump();
		}
		if(this.status=="drop"){
			this.drop();
		}
		if(this.status == "dead"){
			this.dead();
		}
		this.fps = 0;
	}
	if(role.ox > 1180){
		this.GameOver();	//走出屏幕外 游戏结束
	}
}

role.prototype.check = function() { //检测状态改变
	if(this.judge != this.status ) {
		this.judgeStatus(this.status);
		this.judge = this.status;
	}
}


/**********************************角色动作*****************************/


role.prototype.attack = function(){
	this.dx=0;			//攻击时 停止移动
	this.odx=0;
	scene.dx=0;
	obstacle.dx=0;
	if(this.currentnum == this.num - 2){
		bgAudio.shootplay();		//发射子弹声音
	}
	if(this.currentnum == this.num - 1){
		if(this.direction=="right" && bs.len<=5)
			bs.bullets.push(new bullet(role.ox+60,role.y+55,10));	//添加子弹
		else if(bs.len<=5 && this.direction=="left")
			bs.bullets.push(new bullet(role.ox+10,role.y+55,-10));	//添加子弹
		bs.len++;
		this.status = "waiting";
	}
}



role.prototype.run =function(){
	this.x+=this.dx;
	this.ox+=this.odx;
	if(Checkhit.checkStand()==false){	//未接触地面 掉落
		this.status="drop";
	}
}


role.prototype.jump=function(){
	if(role.jumpMusic == 0){	//设置每次只播放一次跳跃声音
		bgAudio.Jumpplay();		
	}
	this.vy-=gravity;
	this.y-=this.vy;
	this.x += this.dx; 
	this.ox += this.odx;
	if(Checkhit.checkStand()){//跳到地面 状态改变
		this.status="waiting";
		role.jumpMusic = 0;
		keycode.deletekeys(87);		//删除键盘数组跳跃
		this.dx = 0;		
		this.odx = 0;			
		scene.dx=0;				
		obstacle.dx=0;
		this.vy = 0;
	}
	if(this.y>1000 ){	//没有跳到地面且跳出屏幕 游戏结束
		this.GameOver();
	}
}

role.prototype.drop=function(){
	this.vy-=gravity;		//重力加速度
	this.y-=this.vy;		
	this.ox+=this.odx;		//x轴位移
	this.x+=this.dx;
	//console.log(this.odx);		//可能出现bug （走路到最后一帧时dx为0，下落时关闭键盘输出 会贴着墙壁下滑）
	if(Checkhit.checkStand()){//跳到地面 状态改变
		this.status="waiting";
		this.dx = 0;
		this.odx = 0;
		scene.dx=0;
		obstacle.dx=0;
		this.vy = 0;
	}
	if(this.y>1000){	//没有跳到地面且跳出屏幕 游戏结束
		this.life = 0;
		this.GameOver();
	}
}

role.prototype.dead=function(){
	this.life = 0;
	this.dx = 0;
	this.odx = 0;
	scene.dx=0;			//禁止移动
	obstacle.dx=0;
	bgAudio.deadplay();	//死亡音乐
	if(Checkhit.checkStand() == false){
		this.vy-=gravity;
		this.y-=this.vy;
	}
	if(this.currentnum == this.num - 1){
		this.currentnum = this.num - 1;	//保持死亡动作
		if(this.stop == true){		//x偏移
			this.x-=this.w/2;
		}
		this.stop = false;			//停止图片帧变化
		this.delayfps++;
		if(this.delayfps >= 8){		//延迟出现游戏结束界面
			this.GameOver();		//游戏结束
			this.delayfps = 0;
		}
	}
}

role.prototype.GameOver = function(){	//游戏结束
	scene.status=5;			//进入死亡场景
	mybutton.status=5;		//按钮切换
	mybutton.CheckStatus();		
	scene.Check();
	keycode.close();	//关闭键盘
}
