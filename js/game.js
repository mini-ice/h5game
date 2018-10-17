function Game(){
	role=new role();
	scene=new scene();
	mybutton=new mybutton();
	keycode=new keys();
	obstacle = new obstacle();
	bs=new bullets();
	ms = new masters();
	Checkhit = new Checkhit();
	bgAudio = new GameAudio();
	localStorage.clear();	//清除本地数据
}

Game.prototype.gameset=function(){	//初始化
	role.init();
	scene.init();
	mybutton.init();
	//设置游戏存储
	if(!localStorage.maxScore) {
		localStorage.setItem("maxScore", "0");
	}
}

Game.prototype.gameload=function(){
	role.init();	//角色初始化
	scene.init();		//场景初始化
	mybutton.init();	//按钮初始化
	obstacle.init();	//障碍物初始化
	ms.init();	//怪兽初始化
	bs.init();	//子弹初始化
	bgAudio.reload()//重新加载音乐
}


Game.prototype.gameRender=function(){
	ctx.clearRect(0, 0, c.width, c.height);
	scene.update();
	mybutton.update();
	if(scene.status == 3){
		keycode.open();	//开启键盘
		role.update();	//角色更新
		keycode.popkeys();	//输出键盘数组
		Checkhit.checkStand();	//检测是否站在地面
		Checkhit.checkhitGround();	//检测是否碰到墙壁
		bs.update();	//子弹更新
		ms.update();	//怪兽更新
	}
	if(scene.status == 4){
		Game.gamePause();
		bgAudio.pause();
		keycode.close();
	}
	if(scene.status == 5){
		Game.gamePause();
		bgAudio.pause();
		keycode.close();
	}
	timeHandle = requestAnimationFrame(Game.gameRender);
}


Game.prototype.gamePause=function(){
	if(localStorage.maxScore) {
		var s = Number(localStorage.maxScore);
		if(s < scene.Sumscore) {
			localStorage.maxScore = scene.Sumscore + "";
		}
	}
	cancelAnimationFrame(Game.gameRender)
}
