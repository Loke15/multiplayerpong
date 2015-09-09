var WIDTH = 700, HEIGHT = 600, pi = Math.PI, UpArrow = 38, DownArrow = 40, canvas, ctx, keystate, speed = 3;
var player = new Paddle(0, 0, false);
var ai = new Paddle(WIDTH - 40, HEIGHT / 2, true);
var ball = new Ball();
//X,Y

function init() {
        player.x = player.width;
	player.y = (HEIGHT - player.height)/2;
	ai.x = WIDTH - (player.width + ai.width);
	ai.y = (HEIGHT - ai.height)/2;
	ball.serve(1);
}
function main() {
    // create, initiate and append game canvas
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    keystate = {};
    // keep track of keyboard presses
    document.addEventListener("keydown", function (evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function (evt) {
        delete keystate[evt.keyCode];
    });
    init(); // initiate game objects
    //
    /*
    // game loop function
    var loop = function () {
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
    */
   function loop() {
   update();
   draw();
}
setInterval(loop, 10);
}
function draw() {
    ctx.fillStyle = "#f0f";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#000";

    ball.draw()
    player.draw();
    ai.draw();
    // draw the net
    var w = 4;
    var x = (WIDTH - w) * 0.5;
    var y = 0;
    var step = HEIGHT / 20; // how many net segments
    while (y < HEIGHT) {
        ctx.fillRect(x, y + step * 0.25, w, step * 0.5);
        y += step;
    }
    ctx.restore();
}

function update() {
    if (keystate[DownArrow]) {
        player.update(player.y + speed);
        ai.update(ai.y-speed);
    } else if (keystate[UpArrow]) {
        player.update(player.y - speed);
        ai.update(ai.y+speed);
    }
    ball.update();


    
    //ball.update();
}



function Paddle(x, y, ai) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 200;
    this.isAi = ai;
    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log("x" + this.x + "y" + this.y + "width" + this.width + "height" + this.height);
    };
    this.update = function (y) {

        this.y = y;
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    };
}

function Ball() {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.velx=null;
    this.vely=null;
    
    this.side = 20;
    this.speed = 3;
    
    
    
    this.serve = function(side){
       
		// set the x and y position
		var r = Math.random();
		this.x = side===1 ? player.x+player.width : ai.x - this.side;
		this.y = (HEIGHT - this.side)*r;
		// calculate out-angle, higher/lower on the y-axis =>
		// steeper angle
		var phi = 0.1*pi*(1 - 2*r);
		// set velocity direction and magnitude
		
			this.velx=side*this.speed*Math.cos(phi);
			this.vely= this.speed*Math.sin(phi);
		
	};
    
    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.side, this.side);
    }
    this.update = function () {
        // update position with current velocity
		this.x += this.velx;
		this.y += this.vely;
		// check if out of the canvas in the y direction
		if (0 > this.y || this.y+this.side > HEIGHT) {
			// calculate and add the right offset, i.e. how far
			// inside of the canvas the ball is
			var offset = this.vely < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
			this.y += 2*offset;
			// mirror the y velocity
			this.vely *= -1;
		}
                
		// helper function to check intesectiont between two
		// axis aligned bounding boxex (AABB)
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};
                var pdle = this.velx < 0 ? player : ai;
		// check againts target paddle to check collision in x
		// direction
                if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
				this.x, this.y, this.side, this.side)
		) {
            
			// set the x position and calculate reflection angle
			this.x = pdle===player ? player.x+player.width : ai.x - this.side;
			var n = (this.y+this.side - pdle.y)/(pdle.height+this.side);
			var phi = 0.25*pi*(2*n - 1); // pi/4 = 45
			// calculate smash value and update velocity
			var smash = Math.abs(phi) > 0.2*pi ? 1.5 : 1;
			this.velx = smash*(pdle===player ? 1 : -1)*this.speed*Math.cos(phi);
			this.vely = smash*this.speed*Math.sin(phi);
		}
		
		// reset the ball when ball outside of the canvas in the
		// x direction
		if (0 > this.x+this.side || this.x > WIDTH) {
			this.serve(pdle===player ? 1 : -1);
		}

    
}
}



$(document).ready(function () {
    main();

});



