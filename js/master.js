/*********************怪兽类*************************/
let master = function(x, y, w, h, Ox, i, src, life, score ) {
	this.w = w; //画布显示大小
	this.h = h;
	this.x = x; //画布显示位置
	this.y = y;
	this.Ox = Ox; //屏幕位置（画布显示位置，会因为切换方向改变，使用这个值记录在屏幕中的位置）
	this.dx = 0; //移动速度
	this.Odx = 0; //屏幕移动速度
	this.sx = 0; //裁剪位置
	this.sy = 240;
	this.direction = 0; //0:向左 ;1:向右
	this.i = i //所在障碍物位置
	this.currentnum = 0;
	this.num = 4; //帧数
	this.fps = 0; //帧速率
	this.fpsnum = 8; //初始等待状态帧延迟
	this.flashfps = 0; //闪烁时间帧 
	this.src = src; //图片
	this.life = life; //生命值
	this.score = score //分数
	this.checklife = true; //检测生命值变化
	this.disappear = true; //false时删除怪兽
	this.status = 0; //怪兽状态（初始为0 等待状态）
	this.data = 0; //检测状态
	this.name = "master" //近战怪兽类
	this.ready = false;
	this.loadImage();
}

master.prototype.loadImage = function() {
	this.Image = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true;
		}
	}
	this.Image.src = this.src;
}

master.prototype.config = function(status) {
	this.currentnum = 0;
	switch(status) {
		case 0: //左等待
			this.sx = 0;
			this.sy = 240;
			this.fps = 0; //帧速率
			this.fpsnum = 8; //初始等待状态帧延迟
			break;
		case 1: //向左移动
			this.sx = 0;
			this.sy = 0;
			this.fps = 0; //帧速率
			this.fpsnum = 4; //初始等待状态帧延迟
			break;
		case 2: //左攻击
			this.sx = 0;
			this.sy = 480;
			this.fps = 0; //帧速率
			this.fpsnum = 8; //初始等待状态帧延迟
			break;
		case 3: //left-dead
			this.sx = 0;
			this.sy = 720;
			this.fps = 0; //帧速率
			this.fpsnum = 4; //初始等待状态帧延迟
			break;
		case 4: //右等待
			this.sx = 720;
			this.sy = 1200;
			this.fps = 0; //帧速率
			this.fpsnum = 8; //初始等待状态帧延迟
			break;
		case 5: //向右移动
			this.sx = 720;
			this.sy = 960;
			this.fps = 0; //帧速率
			this.fpsnum = 4; //初始等待状态帧延迟
			break;
		case 6: //右攻击
			if(this.src == "img/enemy2-1.png")
				this.sx = 750;
			else if(this.src == "img/enemy3-1.png")
				this.sx = 730;
			else
				this.sx = 720;
			this.sy = 1440;
			this.fps = 0; //帧速率
			this.fpsnum = 8; //初始等待状态帧延迟
			break;
		case 7: //right-dead
			this.sx = 720;
			this.sy = 1680;
			this.fps = 0; //帧速率
			this.fpsnum = 4; //初始等待状态帧延迟
			break;
		default:
			break;
	}
}

master.prototype.draw = function() {
	if(this.ready) {
		if(this.direction == 0)
			ctx.drawImage(this.Image, this.sx + this.currentnum * 240, this.sy, 240, 240, (obstacle.Origround[this.i].gx + this.x) * gameScal, this.y * gameScal, this.w * gameScal, this.h * gameScal);
		else if(this.direction == 1) //精灵表里左右方向 帧数开始位置相反
			ctx.drawImage(this.Image, this.sx - this.currentnum * 240, this.sy, 240, 240, (obstacle.Origround[this.i].gx + this.x) * gameScal, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	}
}

master.prototype.update = function() {
	this.Checklife();
	this.Check();
	//obstacle.Origround[this.i].gx+this.x;x表示怪兽在当前障碍物的位置，ax表示怪兽在画布的位置（之前的键盘控制通过屏幕移动和障碍物左移实现检测站立在障碍物上）
	this.fps++;
	if(this.fps >= this.fpsnum) {
		this.currentnum = (this.currentnum + 1) % 4;
		switch(this.status) {
			case 0:
				break;
			case 1:
				this.x += this.dx; //移动
				this.Ox += this.Odx;
				break;
			case 2:
				if(this.currentnum == 2 && this.direction == 0 && Checkhit.MsAttack(this.Ox, this.y - 30, this.w, this.direction)) {
					if(role.direction != "right") { //设置不会怪兽脚下颤抖
						role.x = 1280 - role.x - role.w;
					}
					role.direction = "right";
					role.status = "dead"; //击中角色
				}
				if(this.currentnum == 3 && this.direction == 0) {
					this.status = 0;
				}
				break;
			case 3:
				if(this.currentnum == 3 && this.direction == 0) {
					this.disappear = false;
				}
				break;
			case 4:
				break;
			case 5:
				this.x += this.dx; //移动
				this.Ox += this.Odx;
				break;
			case 6:
				//向右攻击
				if(this.currentnum == 2 && this.direction == 1 && Checkhit.MsAttack(this.Ox, this.y - 30, this.w, this.direction)) {
					//击中角色 
					if(role.direction != "left") { //设置不会怪兽脚下颤抖
						role.x = 1280 - role.x - role.w;
					}
					role.direction = "left";
					role.status = "dead";
				}
				if(this.currentnum == 3 && this.direction == 1) {
					this.status = 4;
				}
				break;
			case 7:
				if(this.currentnum == 3 && this.direction == 1) {
					this.disappear = false;
				}
				break;
			default:
				break;
		}
		this.fps = 0;
	}
}

master.prototype.Check = function() { //检测怪兽状态变化
	if(this.data != this.status) {
		this.config(this.status);
		this.data = this.status;
	}
}

master.prototype.Checklife = function() { //检测怪兽是否被子弹击中，击中不执行画图 （实现闪烁效果）
	if(this.checklife == true) {
		this.draw();
		return true;
	} else if(this.checklife == false) {
		this.flashfps++;
		if(this.flashfps > 5) {
			this.checklife = true;
			this.flashfps = 0;
		}
		return true;
	}
	return false;
}

/***************************射手怪兽类***************/
let shooter = function(x, y, w, h, Ox, i, src, life, score) {
	this.w = w; //画布显示大小
	this.h = h;
	this.x = x; //画布显示位置
	this.y = y;
	this.sx = 0; //裁剪位置
	this.sy = 240;
	this.direction = 0; //0:向左 ;1:向右
	this.i = i //所在障碍物位置
	this.currentnum = 0;
	this.num = 4; //帧数
	this.fps = 0; //帧速率
	this.fpsnum = 8; //初始等待状态帧延迟
	this.flashfps = 0; //闪烁时间帧 
	this.src = src; //图片
	this.life = life; //生命值
	this.score = score //分数
	this.checklife = true; //检测生命值变化
	this.disappear = true; //false时删除怪兽
	this.status = 0; //怪兽状态（初始为0 等待状态）
	this.data = 0; //检测状态
	this.name = "shoot"; //射手类
	this.ready = false;
	this.loadImage();
}

shooter.prototype.loadImage = function() {
	this.Image = new Image();
	if(this.Image.complete) {
		this.ready = true;
	} else {
		this.Image.onload = function() {
			this.ready = true;
		}
	}
	this.Image.src = this.src;
}

shooter.prototype.config = function(status) {
	this.currentnum = 0;
	switch(status) {
		case 0: //左等待
			this.sx = 0;
			this.sy = 240;
			this.fps = 0; //帧速率
			this.fpsnum = 8; //初始等待状态帧延迟
			break;
		case 1: //左攻击
			this.sx = 0;
			this.sy = 480;
			this.fps = 0; //帧速率
			this.fpsnum = 24; //初始等待状态帧延迟
			break;
		case 3: //left-dead
			this.sx = 0;
			this.sy = 720;
			this.fps = 0; //帧速率
			this.fpsnum = 4; //初始等待状态帧延迟
			break;
		default:
			break;
	}
}

shooter.prototype.update = function() {
	this.Checklife();
	this.Check();
	//obstacle.Origround[this.i].gx+this.x;x表示怪兽在当前障碍物的位置，ax表示怪兽在画布的位置（之前的键盘控制通过屏幕移动和障碍物左移实现检测站立在障碍物上）
	this.fps++;
	if(this.fps >= this.fpsnum) {
		this.currentnum = (this.currentnum + 1) % 4;
		switch(this.status) {
			case 0:
				break;
			case 1:
				if(this.currentnum == 2) {
					bs.mbullets.push(new mbullet(this.x + obstacle.Origround[this.i].gx, this.y + 55, -10)); //添加子弹	x+220是因为延迟24帧 才执行 子弹显示的时候已经位移240px 所以向后移动220（同角色子弹）
					bs.mlen++;
				}
				break;
			case 3:
				if(this.currentnum == 3) {
					this.disappear = false;
				}
				break;
			default:
				break;
		}
		this.fps = 0;
	}
}

shooter.prototype.draw = function() {
	if(this.ready) {
		ctx.drawImage(this.Image, this.sx + this.currentnum * 240, this.sy, 240, 240, (obstacle.Origround[this.i].gx + this.x) * gameScal, this.y * gameScal, this.w * gameScal, this.h * gameScal);
	}
}

shooter.prototype.Check = function() { //检测怪兽状态变化
	if(this.data != this.status) {
		this.config(this.status);
		this.data = this.status;
	}
}

shooter.prototype.Checklife = function() { //检测怪兽是否被子弹击中，击中不执行画图 （实现闪烁效果）
	if(this.checklife == true) {
		this.draw();
		return true;
	} else if(this.checklife == false) {
		this.flashfps++;
		if(this.flashfps > 5) {
			this.checklife = true;
			this.flashfps = 0;
		}
		return true;
	}
	return false;
}

/***************************怪兽组类***************/
let masters = function() {
	this.len;
	this.init();
	this.dx;
	this.masters;
}

masters.prototype.init = function() { //添加怪兽初始数据
	this.len = 5; //初始怪兽数量为5
	this.dx = 0;
	this.masters = new Array();
	this.masters.push(new master(180, 384, 110, 110, 802, 2, "img/enemy1-1.png", 1, 5)); //把怪兽放入数组(x,y,w,h,ox,i,src,life,score)
	this.masters.push(new master(295, 220, 110, 110, 1250, 3, "img/enemy2-1.png", 4, 15));
	this.masters.push(new master(550, 386, 110, 110, 1982, 4, "img/enemy3-1.png", 10, 25));
	this.masters.push(new master(1100, 386, 110, 110, 2532, 4, "img/enemy3-1.png", 10, 25));

	//射手怪兽
	this.masters.push(new shooter(350, 220, 110, 110, 3090.5, 5, "img/enemy4-1.png", 3, 30));
}

masters.prototype.update = function() {
	this.check();
	for(let i = 0; i < this.len; i++) {
		this.masters[i].update();
		if(this.masters[i].life <= 0 && this.masters[i].direction == 0) { //检测怪兽方向和生命值
			this.masters[i].status = 3;
		}
		if(this.masters[i].life <= 0 && this.masters[i].direction == 1) {
			this.masters[i].status = 7;
		}
		if(this.masters[i].disappear == false) { //删除怪兽
			scene.Sumscore += this.masters[i].score;	//+分
			this.masters.splice(i, 1);
			this.len--;
		}
	}
}

masters.prototype.check = function() { //检测怪兽位置 改变状态
	for(let i = 0; i < this.len; i++) {
		//近战怪兽AI
		if(this.masters[i].status != 3 && this.masters[i].status != 7 && this.masters[i].name != "shoot") { //死亡状态或者射手类
			if(Checkhit.Position == this.masters[i].i && role.ox < this.masters[i].Ox - 50) { //角色在怪兽左边 向左移动
				this.masters[i].direction = 0;
				this.masters[i].status = 1;
				this.masters[i].Odx = -3;
				this.masters[i].dx = -3;
				if(i > 1 && this.masters[i].Ox < (this.masters[i - 1].Ox + 100) && this.masters[i].Ox > this.masters[i - 1].Ox) { //向左移动 发生重叠 后面怪兽停止移动
					this.masters[i].direction = 0;
					this.masters[i].status = 0;
					this.masters[i].Odx = 0;
					this.masters[i].dx = 0;
				}
			} else if(Checkhit.Position == this.masters[i].i && role.ox > this.masters[i].Ox + 70) { //角色在怪兽右边 向右移动
				this.masters[i].direction = 1;
				this.masters[i].status = 5;
				this.masters[i].Odx = 3;
				this.masters[i].dx = 3;
			} else if(Checkhit.Position != this.masters[i].i) { //检测不在同个障碍物上 执行等待
				if(this.masters[i].direction == 0) { //左等待
					this.masters[i].status = 0;
					this.masters[i].Odx = 0;
					this.masters[i].dx = 0;
				} else if(this.masters[i].direction == 1) { //右等待
					this.masters[i].status = 4;
					this.masters[i].Odx = 0;
					this.masters[i].dx = 0;
				}
			} else if(Checkhit.Position == this.masters[i].i) {
				if(this.masters[i].direction == 0) { //方向向左 执行左攻击
					this.masters[i].status = 2;
				} else if(this.masters[i].direction == 1) { //方向向右 执行右攻击
					this.masters[i].status = 6;
				}
			}
		}
		//射手类怪兽AI
		if(this.masters[i].status != 3 && this.masters[i].status != 7 && this.masters[i].name == "shoot") {
			if(Checkhit.Position == this.masters[i].i) {
				this.masters[i].status = 1;
			} else {
				this.masters[i].status = 0;
			}
		}
	}
}