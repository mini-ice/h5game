var obstacle = function() {
	this.ground = new Array();
	this.Origround = new Array();
	this.enabled = false;
	this.dx = 0;
	this.fps = 0;
}

obstacle.prototype.open = function() {
	this.enabled = true;
	//this.ground.push({ gx: 0, gy: 0, gw: 0, gh: 0 });
	this.Origround.push({ gx: 0, gy: 0, gw: 0, gh: 0 });
}

obstacle.prototype.close = function() {
	this.enabled = false;
	this.ground = null;
	this.Origround = null;
}

obstacle.prototype.init = function() {
	this.dx = 0;
	this.fps = 0;
//	//画布显示障碍物位置
//	this.ground[0] = {
//		gx: 0,
//		gy: 550,
//		gw: 270,
//		gh: 180
//	};
//	this.ground[1] = {
//		gx: 375,
//		gy: 606,
//		gw: 250,
//		gh: 120
//	};
//	this.ground[2] = {
//		gx: 622,
//		gy: 492,
//		gw: 323,
//		gh: 228
//	};
//
//	this.ground[3] = {
//		gx: 955,
//		gy: 329,
//		gw: 467,
//		gh: 112
//	};
//
//	this.ground[4] = {
//		gx: 1435,
//		gy: 492,
//		gw: 1300,
//		gh: 220
//	};
//
//	this.ground[5] = {
//		gx: 2740,
//		gy: 330,
//		gw: 467,
//		gh: 100
//	};
//
//	this.ground[6] = {
//		gx: 3230,
//		gy: 600,
//		gw: 270,
//		gh: 120
//	};
//	this.ground[7] = {
//		gx: 3500,
//		gy: 485,
//		gw: 340,
//		gh: 220
//	};

	//原始障碍物位置
	this.Origround[0] = {
		gx: 0,
		gy: 550,
		gw: 280,
		gh: 180
	};
	this.Origround[1] = {
		gx: 375,
		gy: 606,
		gw: 250,
		gh: 150
	};
	this.Origround[2] = {
		gx: 622,
		gy: 492,
		gw: 323,
		gh: 228
	};
	this.Origround[3] = {
		gx: 955,
		gy: 330,
		gw: 467,
		gh: 70
	};

	this.Origround[4] = {
		gx: 1432,
		gy: 492,
		gw: 1305,
		gh: 220
	};
	this.Origround[5] = {
		gx: 2740.5,
		gy: 330,
		gw: 463,
		gh: 70
	};

	this.Origround[6] = {
		gx: 3234,
		gy: 595.5,
		gw: 268,
		gh: 125
	};
	this.Origround[7] = {
		gx: 3495,
		gy: 485,
		gw: 340,
		gh: 220
	};
}
