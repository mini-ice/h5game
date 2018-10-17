var Checkhit = function() {
	this.x;
	this.sw = 80; //角色左右空白区域
	this.Position; //当前
	//this.prePosition; //记录上一个障碍物位置
	this.nextPosition; //记录下一个
	this.drop = true; //drop:1 角色掉落    drop:0 接触地面	
	//this.hitground = false;
	this.ob = obstacle.Origround; //障碍物原始坐标
}

Checkhit.prototype.checkStand = function() { //检测是否在地面上方 記錄當前位置
	for(var i = 0; i <= 7; i++) {
		if((role.ox + 60) >= this.ob[i].gx &&
			(role.ox + 40) < this.ob[i].gx + this.ob[i].gw &&
			role.y + role.h < this.ob[i].gy + 60 && role.y >= obstacle.Origround[i].gy - role.h + 1) {
			this.Position = i;
			if(role.direction == "right" && this.Position < 7)
				this.nextPosition = i + 1;
			else if(this.Position > 0 && role.direction == "left")
				this.nextPosition = i - 1;
			role.y = this.ob[this.Position].gy - role.h + 1;
			return true;
		}
	}
	role.jumpMusic = 1; //用来设置跳跃音乐播放
	return false;
}

//检测角色前方或上方是否有障碍
Checkhit.prototype.checkhitGround = function() {
	//撞墙
	if(role.y + role.h < this.ob[this.nextPosition].gy + this.ob[this.nextPosition].gh && role.y + role.h > this.ob[this.nextPosition].gy + 5 && role.ox + 70 >= this.ob[this.nextPosition].gx && role.direction == "right") {
		role.odx = 0;
		role.dx = 0;
		scene.dx = 0;
		obstacle.dx = 0;
		//console.log("撞到了", this.nextPosition);
		return true;
	}
	if(role.y + role.h < this.ob[this.nextPosition].gy + this.ob[this.nextPosition].gh && role.y + role.h > this.ob[this.nextPosition].gy + 5 &&
		role.ox - 20 <= this.ob[this.nextPosition].gx + this.ob[this.nextPosition].gw && role.direction == "left") {
		role.odx = 0;
		role.dx = 0;
		//console.log("撞到了", this.nextPosition);
		return true;
	}

	if(role.y > this.ob[this.nextPosition].gy && role.y < this.ob[this.nextPosition].gy + this.ob[this.nextPosition].gh - 40 && role.ox + 80 > this.ob[this.nextPosition].gx && role.vy >= 0 && role.direction == "right") {
		role.status = "drop";
		role.vy = 0;
		//console.log("撞到了", role.status);
		return true;
	}
	if(role.y > this.ob[this.nextPosition].gy && role.y < this.ob[this.nextPosition].gy + this.ob[this.nextPosition].gh - 40 && role.ox < this.ob[this.nextPosition].gx + this.ob[this.nextPosition].gw - 20 && role.vy >= 0 && role.direction == "left") {
		role.status = "drop";
		role.vy = 0;
		//console.log("撞到了", role.status);
		return true;
	}
	return false;
}

//检测子弹是否碰撞障碍物
Checkhit.prototype.BulletHit = function(bs) { //bs为发射子弹时传递的子弹下标
	//子弹碰撞障碍物
	for(let i = 0; i <= 7; i++) {
		//当子弹为正方向时 x坐标+宽度接触障碍物	
		if(bs.dx > 0 && bs.x + bs.w > this.ob[i].gx &&
			bs.x + bs.w < this.ob[i].gx + 40 && bs.y > this.ob[i].gy && bs.y < this.ob[i].gy + this.ob[i].gh) {
			//console.log("aa");
			return true;
		}
		//当子弹为负方向时 x坐标接触障碍物的x+障碍物的宽度
		if(bs.dx < 0 && bs.x < this.ob[i].gx + this.ob[i].gw &&
			bs.x > this.ob[i].gx + this.ob[i].gw - 40 && bs.y > this.ob[i].gy && bs.y < this.ob[i].gy + this.ob[i].gh) {
			//console.log("bb");
			return true;
		}
	}

	//子弹碰撞怪兽
	for(let i = 0; i < ms.len; i++) {
		//当子弹为正方向时		ms.masters[i].x+this.ob[ms.masters[i].i].gx表示怪兽位置		
		if(bs.dx > 0 && bs.x + bs.w >= (ms.masters[i].x + this.ob[ms.masters[i].i].gx) + 40 &&
			bs.x + bs.w <= ms.masters[i].x + this.ob[ms.masters[i].i].gx + ms.masters[i].w - 30 &&
			bs.y > ms.masters[i].y && bs.y + bs.h < ms.masters[i].y + ms.masters[i].h) {
			//console.log(1);
			bgAudio.blastplay(); //播放爆炸音乐
			ms.masters[i].life--;
			ms.masters[i].checklife = false;
			return true;
		}
		//子弹为负方向时
		if(bs.dx < 0 && bs.x <= ms.masters[i].x + this.ob[ms.masters[i].i].gx + ms.masters[i].w &&
			bs.x >= ms.masters[i].x + this.ob[ms.masters[i].i].gx + ms.masters[i].w - 60 &&
			bs.y > ms.masters[i].y && bs.y + bs.h < ms.masters[i].y + ms.masters[i].h) {

			bgAudio.blastplay(); //播放爆炸音乐
			ms.masters[i].life--;
			return true;
		}
	}

	//	//子弹碰撞子弹
	//	for(let i = 0; i < ms.mlen ; i++) {
	//		if(bs.x + bs.w + 20 >= ms.mbullets[i].x && bs.x + bs.w + 20 <= ms.mbullets[i].x + ms.mbullets[i].w ){
	//			ms.mbullets.splice(i,1);
	//			ms.len--;
	//			return true;
	//		}
	//	}

	return false;
}

//检测怪兽子弹
Checkhit.prototype.mBulletHit = function(mbs) {
	if(mbs.x >= role.ox - 20 && mbs.x <= role.ox + role.w - 40 && mbs.y > role.y && mbs.y + mbs.h < role.y + role.h - 10) {
		if(role.direction != "right") { //设置不会怪兽脚下颤抖
			role.x = c.width - role.x - role.w;
		}
		role.direction = "right";
		role.status = "dead";
		return true;
	}
}

//检测怪兽攻击
Checkhit.prototype.MsAttack = function(x, y, w, d) {
	if(d == 0 && role.x + role.w - 20 > x && role.y + role.h > y + 20) {
		return true;
	}
	if(d == 1 && role.ox + 20 < x + w && role.y + role.h > y + 20) {
		return true;
	}
	return false;
}