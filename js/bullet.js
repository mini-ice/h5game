/******************************************子弹类初始********************************/

var bullet = function(x, y, dx) {
	//this.x=x;		//画布显示位置
	this.x = x; //原始x位置
	this.y = y;
	//this.dx=dx;		//子弹画布移动速度
	this.dx = dx; //子弹相对屏幕中移动速度
	this.w = 30;
	this.h = 30;
	this.sw; //子弹范围
	this.ready = false;
	this.loadImage();
}

bullet.prototype.loadImage = function() {
	this.Image = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true;
		}
	}
	this.Image.src = "img/bullet.png";
}

bullet.prototype.draw = function() {
	if(this.ready) {
		ctx.drawImage(this.Image, 0, 0, 70, 70, this.x * gameScal, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	}
}

bullet.prototype.update = function() {
	this.draw();
	this.x += this.dx;
}

/***************************************射手子弹类初始**************************************/
var mbullet = function(x, y, dx) {
	this.x = x; //原始x位置
	this.y = y;
	//this.dx=dx;		//子弹画布移动速度
	this.dx = dx; //子弹相对屏幕中移动速度
	this.w = 30;
	this.h = 30;
	this.sw; //子弹范围
	this.ready = false;
	this.loadImage();
}

mbullet.prototype.loadImage = function() {
	this.Image = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true;
		}
	}
	this.Image.src = "img/mbullets.png";
}

mbullet.prototype.draw = function() {
	if(this.ready) {
		ctx.drawImage(this.Image, 0, 0, 254, 225, this.x * gameScal, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	}
}

mbullet.prototype.update = function() {
	this.draw();
	this.x += this.dx;
}

/************************************子弹数组类初始***********************************/

var bullets = function() {
	this.bullets;
	this.len;
	this.mbullets;
	this.mlen;
	this.init();
}

bullets.prototype.init = function() {
	this.bullets = new Array(); //子弹数组
	this.len = 0; //子弹类数量
	this.mbullets = new Array(); //射手子弹数组
	this.mlen = 0; //射手子弹类数量
}

bullets.prototype.update = function() {
	//子弹更新
	if(this.len >= 0) {
		for(let i = 0; i < this.len; i++) {
			this.bullets[i].update();
			//Checkhit.BulletHitMs(this.bullets[i]);
			if(this.bullets[i].x > 1280 || this.bullets[i].x < 0 || Checkhit.BulletHit(this.bullets[i])) {
				this.bullets.splice(i, 1);
				this.len--;
			}
		}
	}

	//射手类子弹更新
	if(this.mlen >= 0) {
		for(let i = 0; i < this.mlen; i++) {
			this.mbullets[i].update();
			//Checkhit.mBulletHit(this.mbullets[i]);
			if(this.mbullets[i].x < 0 || Checkhit.mBulletHit(this.mbullets[i])) {
				this.mbullets.splice(i, 1);
				this.mlen--;
			}
		}
	}
}