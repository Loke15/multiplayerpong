var WIDTH = 700, HEIGHT = 600, pi = Math.PI, UpArrow = 38, DownArrow = 40, canvas, ctx, keystate, speed = 3;
var player = new Paddle(0, 0, false);
var ai = new Paddle(WIDTH - 40, HEIGHT / 2, true);
var ball = new Ball();
//X,Y

function init() {

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
    // game loop function
    var loop = function () {
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
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
    this.vel = null

    this.side = 20;
    this.speed = 12;

    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.side, this.side);
    }
    this.update = function () {


    }
}


$(document).ready(function () {
    main();

});



