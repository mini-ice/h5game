let c = document.getElementById("can");
let ctx = c.getContext("2d");
let timeHandle = null;
let gameScal;//尺寸
let p={			//移动坐标
	x:0,
	y:0
};
let q={			//点击坐标
	x:0,
	y:0
};
let gravity = 4;	//重力

let w ;

window.onload = function() {
	if(c.height<c.width){
		c.height=window.innerHeight;
		c.width=1280/720*c.height;
	}else{
		c.width=window.innerWidth;
		c.height=720/1280*c.width;
	}
	gameScal=c.width/1280;
	//w = c.width * gameScal;
	window.onresize=function(){
		if(c.height<c.width){
			c.height=window.innerHeight;
			c.width=1280/720*c.height;
		}else{
			c.width=window.innerWidth;
			c.height=720/1280*c.width;
		}
		gameScal=c.width/1280;
		//w = c.width *gameScal ;
	};
	Game = new Game();
	Game.gameset();
	Game.gameload();
	Game.gameRender();
}



