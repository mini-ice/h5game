//声音
function GameAudio() {	//不能完美支持每次事件执行播放（猜测解决方法：每次执行事件删除上一个音频，再加入新的音频）
	//背景音乐
	this.player=document.createElement('audio');	//懒得做加载，循环播放会有报错 	
	//this.player.controls = true ;
	this.player.src = "sounds/bk.wav";
	this.player.loop = true;
	this.player.volume = 0.2;
	this.player.muted = false;
	//document.body.appendChild(this.player);
	
	//射击音乐
	this.shoot = document.createElement("audio");
	//this.player.appendChild(this.shoot);
	//this.shoot =document.appendChild(this.player);
	this.shoot.src = "sounds/Bullet_E.wav";
	this.shoot.PlaybackRate=2;
	this.shoot.loop = false;
	this.shoot.muted = false;
	
	//blast
	this.blast = document.createElement("audio");
	//this.player.appendChild(this.shoot);
	//this.shoot =document.appendChild(this.player);
	this.blast.src = "sounds/Bullet_F.wav";
	this.blast.PlaybackRate=2;
	this.blast.loop = false;
	this.blast.muted = false;
	
	//jump
	this.jump = document.createElement("audio");
	//this.player.appendChild(this.shoot);
	//this.shoot =document.appendChild(this.player);
	this.jump.src = "sounds/JumpSpring2.wav";
	this.jump.PlaybackRate=1;
	this.jump.loop = false;
	this.jump.muted = false;
	
	
	//button
	this.Button = document.createElement("audio");
	this.Button.src = "sounds/Button_next_gun.wav";
	this.Button.PlaybackRate=1;
	this.Button.loop = false;
	this.Button.muted = false;
	
	//dead
	this.dead = document.createElement("audio");
	this.dead.src = "sounds/unit_die.wav";
	this.dead.PlaybackRate=1;
	this.dead.loop = false;
	this.dead.muted = false;	
	
}
//背景音乐
GameAudio.prototype.play = function() {
	this.player.play();
}
//子弹发射
GameAudio.prototype.shootplay = function() {
	this.shoot.play();
}

//爆炸
GameAudio.prototype.blastplay = function() {
	this.blast.play();
}

//跳跃
GameAudio.prototype.Jumpplay = function() {
	this.jump.play();
}

//按钮
GameAudio.prototype.buttonplay = function(){
	this.Button.play();
}

//dead
GameAudio.prototype.deadplay = function(){
	this.dead.play();
}


GameAudio.prototype.pause = function() {
	if(!this.player.paused) {
		this.player.pause();
		this.shoot.pause();
	}
}
GameAudio.prototype.reload = function() {
	this.player.load();
}
GameAudio.prototype.setMuted = function(muted) {
	this.player.muted = muted;
	this.shoot.muted = muted;
	this.Button.muted = muted;
	this.blast.muted = muted;
	this.jump.muted = muted;
}