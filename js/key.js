var keys = function() {
	this.enabled = false;
	this.check;
	this.keys = new Array();
	this.config;
}

keys.prototype.open = function() {
	this.enable = true;
}

keys.prototype.close = function() {
	this.enable = false;
}

keys.prototype.addkeys = function(k) {
	if(this.enable) {
		this.check = 0;
		for(var i = 0; i < this.keys.length; i++) {
			if(this.keys[i] == k) {
				this.check = 1;
			}
		}
		if(this.check == 0) {
			this.keys.push(k);
		}
	}
}

keys.prototype.deletekeys = function(k) {
	for(var i = 0; i < this.keys.length; i++) {
		if(this.keys[i] == k) {
			this.keys.splice(i, 1);
		}
	}
}


keys.prototype.popkeys = function() {
	for(var i = 0; i < 2; i++) {
		if(role.status != "drop" && role.status !="attack"  && role.status !="dead") {
			if(this.keys[i] == "65") {
				if(role.status != "jump")
					role.status = "run";
				if(role.direction == "right") {
					role.x = 1280 - role.x - role.w;
				}
				role.direction = "left";
				if(role.ox > 0) {
					role.dx = 6;
					role.odx = -6;
					scene.dx = 0;
					obstacle.dx = 0;
				} else {
					role.dx = 0;
					role.odx = 0;
				}
				if(this.keys[0] == "87" || this.keys[1] == "87") {
					role.status = "jump";
					//role.vy=40;
				}
			}
			if(this.keys[i] == "68") {
				if(role.status != "jump")
					role.status = "run";
				if(role.direction == "left") {
					role.x = 1280 - role.x - role.w;
				}
				role.direction = "right";
				if(role.x >= 1280 * gameScal * 0.3 && scene.sx < 2500) {
					role.dx = 0;
					role.odx = 0;
					scene.dx = 6;
					obstacle.dx = -6;
					//obstacle.dx=-6;
				} else if(role.x < 1280 * gameScal * 0.3 || scene.sx >= 2500) {
					role.dx = 6;
					role.odx = 6;
					scene.dx = 0;
					obstacle.dx = 0;
					//obstacle.dx=0;
				}
				//			role.odx=6;
				if(this.keys[0] == "87" || this.keys[1] == "87") {
					if(role.status !="jump")
						role.status = "jump";
					//role.vy=40;
				}
			}
			if(this.keys[i] == "87" && role.status !="jump") {
				role.status = "jump";
			}

		}
	}
}

document.onkeydown = function(e) {
	var k = e.keyCode || e.which;
	if(k == "18" || k == "9") {
		k = null;
	} else {
		keycode.addkeys(k);
	}
}

document.onkeyup = function(e) {
	var k = e.keyCode || e.which;
	keycode.deletekeys(k);
	//	if(k==65 || k == 68){
	//		role.dx=0;
	//	}
	if(k=="74" && role.status !="jump" && role.status !="drop" && role.status !="dead"){
		role.status="attack";
	}
	if(role.status !="jump" && role.status !="drop" && role.status !="dead"){
		if(k=="68" || k=="65" ){
			role.status="waiting";
			role.dx=0;
			role.odx=0;
			scene.dx=0;
			obstacle.dx=0;
		}
	}
}
window.onblur = function(e) {
//you code
	keycode.keys.splice(0,2);
	console.log(1);
};