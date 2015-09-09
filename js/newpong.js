var WIDTH = 700, HEIGHT = 600, pi = Math.PI, UpArrow = 38, DownArrow = 40, canvas, ctx, keystate,speed=3;
var player = new Paddle(0, 0, false);
var ai = new Paddle(0, WIDTH - 40, true);


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
    if(keystate[DownArrow]){
        player.update(player.y+speed);
    }else if(keystate[UpArrow]){
        player.update(player.y-speed);
    }
    
    
    //ai.update();
}



function Paddle(x, y, ai) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 200;
    this.isAi = ai;
    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log("x" + this.x + "y" + this.y + "width" +this.width + "height"+this.height);
    };
    this.update = function (y) {
        
        this.y=y;
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    };
}
$(document).ready(function () {
    main();

});


