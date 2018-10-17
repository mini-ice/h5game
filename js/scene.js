var scene = function() {
	this.w; //显示大小
	this.h;
	this.sx; //图片裁剪位置
	this.sy;
	this.x;
	this.y;
	this.status; //状态
	this.check; //检测状态
	this.dx;
	this.dy;
	this.head;	//头像
	this.Sumscore; //当前总得分
	this.ready; //图片加载
}

scene.prototype.init = function() {
	this.status = 0;	//状态0 表示第一个场景
	this.check = 0;		//检测状态变化
	this.w = 1280;		
	this.h = 720;
	this.dx = 0;
	this.dy = 0;
	this.Sumscore = 0;	//初始化得分
	this.a1 = 1;	//转场动画的透明度
	this.a2 = 0;	//转场动画的透明度
	this.sx = 0;	//场景图片裁剪的x轴位置（用于场景移动）
	this.fps = 0;	//延迟
	this.ready = false;
	this.loadImage(0);
}

scene.prototype.loadImage = function(status) {
	this.Image = new Image();
	this.Image1 = new Image();
	this.headimage =new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true
		}
	}
	switch (status){
		case 0:
			this.Image.src = "img/BG1.png";
			break;
		case 1:
			this.Image.src = "img/BG1.png";
			this.Image1.src = "img/BG2.png";
			break;
		case 2:
			this.Image.src = "img/BG2.png";
			this.Image1.src = "img/BG3.png";
			break;
		case 3:
			this.Image.src = "img/BG.png";
			this.headimage.src = this.head;
			break;
		case 4:
			this.Image.src = "img/BG01.png";
			this.Image1.src = "img/BG4.png";
			this.headimage.src = this.head;
			break;
		case 5:
			this.Image.src = "img/BG.png";
			this.Image1.src = "img/die.png";
			this.headimage.src = this.head;
			break;
		default:
			break;
	}
}

scene.prototype.config = function(status) { //切换界面
	switch(status) {
		case 0:
			break;
		case 1:
			this.x = 0;
			this.y = -720;
			break;
		case 2:
			this.x = 0;
			this.y = 0;
			break;
		case 3:
			bgAudio.play();		//播放音乐
			//this.Sumscore = 0;		//当重新加载 得分重置为0
			break;
		case 4:
			bgAudio.pause();	//暂停音乐
			break;
		case 5:
			bgAudio.pause();	//暂停音乐
			break;
		default:
			break;
	}
}

scene.prototype.beginScene = function() { //开始界面
	if(this.ready) {
		ctx.drawImage(this.Image, 0, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
	}
}

scene.prototype.showScene = function() { //说明界面
	if(this.ready) {
		if(this.y < 0) {		//从上面掉下来
			this.y += 15;
			//this.y=this.y+this.dy;
		} else {
			this.y = 0;
		}
		this.animationFromTop();
	}
}

scene.prototype.choseScene = function() { //选择角色界面
	if(this.ready) {
		if(this.a1 > 0) {	//淡入淡出
		this.a2 += 0.005;
		this.a1 -= this.a2 * 2;
		} else {
			this.a2 = 1;
			this.a1 = 0;
		}
		this.sceneTransition();
	}
}

scene.prototype.playScene = function() { //游戏场景
	if(this.ready) {
		ctx.save();
		ctx.drawImage(this.Image, this.sx, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
		ctx.drawImage(this.headimage,0,0,145,141,20*gameScal,20*gameScal,100*gameScal,100*gameScal);
		ctx.restore();
		ctx.font=""+40*gameScal+"px 微软雅黑";
		ctx.fillText("×"+role.life+"", 140 * gameScal, 90 * gameScal);
	}
}

scene.prototype.pauseScene = function() { //暂停场景
	if(this.ready) {
		ctx.save();
		ctx.drawImage(this.Image1, 0, 0, 1280, 720, 0, this.y * gameScal, this.w * gameScal, this.h * gameScal);
		ctx.globalCompositeOperation = "destination-over";
		//生命值 角色 怪兽 背景
		ctx.font=""+40*gameScal+"px 微软雅黑";
		ctx.fillText("×"+role.life+"", 140 * gameScal, 90 * gameScal);
		ctx.drawImage(this.headimage, 0, 0, 145, 141, 20 * gameScal,20 * gameScal, 100 * gameScal, 100 * gameScal);
		role.draw();	//显示角色最后一帧
		for(let i = 0; i < ms.len; i++) {	//显示怪兽最后一帧
			ms.masters[i].draw();
		}
		ctx.drawImage(this.Image, this.sx, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
		ctx.restore();
		ctx.font=""+40*gameScal+"px Arial";
		ctx.fillText(this.Sumscore,640 * gameScal,470 * gameScal);
	}
}

scene.prototype.deadScene = function() { //死亡
	if(this.ready) {
		ctx.save();
		ctx.drawImage(this.Image1, 0, 0, 1280, 720, 0, this.y * gameScal, this.w * gameScal, this.h * gameScal);
		//同上
		ctx.globalCompositeOperation = "destination-over";
		ctx.font=""+40*gameScal+"px 微软雅黑";
		ctx.fillText("×"+role.life+"", 140 * gameScal, 90 * gameScal);
		ctx.drawImage(this.headimage, 0, 0, 145, 141, 20 * gameScal,20 * gameScal, 100 * gameScal, 100 * gameScal);
		if(role.y < 600)		//当角色不跳出屏幕 显示角色最后一帧
			role.draw();
		for(let i = 0; i < ms.len; i++) {	//显示怪兽最后一帧
			ms.masters[i].draw();
		}
		ctx.drawImage(this.Image, this.sx, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
		ctx.restore();
		ctx.font=""+40*gameScal+"px Arial";
		ctx.fillText(this.Sumscore,640 * gameScal,360 * gameScal);
		ctx.fillText(localStorage.maxScore,640 * gameScal,480 * gameScal);
	}
}

scene.prototype.update = function() {
	switch(this.status) {
		case 0:
			this.beginScene();	//开始场景
			break;
		case 1:
			this.showScene();	//说明场景
			break;
		case 2:
			this.choseScene();	//选择角色场景
			break;
		case 3:
			this.playScene();	//游戏场景
			this.fps++;
			if(this.fps >= 3) {		//更新屏幕，障碍物 ，怪兽位置
				this.sx += this.dx;
				for(var i = 0; i < obstacle.Origround.length; i++) {
					obstacle.Origround[i].gx += obstacle.dx;
				}
				for(let i = 0; i < ms.len; i++) {
					ms.masters[i].Ox += obstacle.dx;
				}
				this.fps = 0;
			}
			break;
		case 4:
			this.pauseScene();		//暂停
			break;
		case 5:
			this.deadScene();		//死亡
			break;
		default:
			break;

	}
}

/*********************检测场景变化***********************************/
scene.prototype.Check = function() {
	//this.config(this.status);
	if(this.check != this.status) {
		this.loadImage(this.status);
		this.config(this.status);
		this.check = this.status;
	}
}

/****************************场景载入动画*****************************/
scene.prototype.animationFromTop = function() {
	ctx.save();
	ctx.drawImage(this.Image1, 0, 0, 1280, 720, 0, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	ctx.globalCompositeOperation = "destination-over";
	ctx.drawImage(this.Image, 0, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
	ctx.restore();
}

scene.prototype.sceneTransition = function() {
	ctx.save();
	ctx.globalAlpha = this.a2;
	ctx.drawImage(this.Image1, 0, 0, 1280, 720, 0, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	ctx.globalCompositeOperation = "destination-over";
	ctx.globalAlpha = this.a1;
	ctx.drawImage(this.Image, 0, 0, 1280, 720, 0, 0, this.w * gameScal, this.h * gameScal);
	ctx.restore();
}