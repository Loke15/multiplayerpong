var WIDTH = 700, HEIGHT = 600, pi = Math.PI, UpArrow = 38, DownArrow = 40, canvas, ctx, keystate, speed = 5, scores;
var player = new Paddle(0, 0, 10, 100, false);
var ai = new Paddle(WIDTH - 40, HEIGHT / 2, 10, 50, true);
var ball = new Ball();
var url = "ws://localhost:8080";
var socket;
var connected=false;





//X,Y
function init() {
    player.x = player.width;
    player.y = (HEIGHT - player.height) / 2;
    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height) / 2;
    ball.serve(1);

}
function main() {
    // create, initiate and append game canvas
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
    //document.body.appendChild(canvas);
    keystate = {};
    // keep track of keyboard presses
    document.addEventListener("keydown", function (evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function (evt) {
        delete keystate[evt.keyCode];
    });
    init(); // initiate game objects

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

    ball.draw();
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
function connect() {
    socket = new WebSocket(url, "echo-protocol");

    socket.addEventListener("open", function () {

        socket.send("Connected");
        console.log("Connected");
    });

    
     socket.addEventListener("error", function (event) {
     alert("To many connected clients");
     });
     
    socket.addEventListener("message", function (event) {
        
           if(event.data==1 || !connected){
               main();
               //alert("you are connected and can play");
               connected=true;
           }else{
               //alert("you are not connected");
           } 
        
    });

}

function update() {
    player.update();
    ai.update();

    ball.update();





}



function Paddle(x, y, width, height, ai) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isAi = ai;
    this.points = 0;
    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //console.log("x" + this.x + "y" + this.y + "width" + this.width + "height" + this.height);
    };
    this.update = function () {
        if (this.isAi) {
            //600           100             30 = 565
            var desty = ball.y - (this.height - ball.side) * 0.5;

            // ease the movement towards the ideal position
            //         565-30=535 535*0.1= 53,5
            this.y += (desty - this.y) * 0.1;
            // keep the paddle inside of the canvas
            this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);

        } else {
            if (keystate[UpArrow])
                this.y -= 7;
            if (keystate[DownArrow])
                this.y += 7;
            // keep the paddle inside of the canvas
            this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
        }
    };
}

function Ball() {
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.velx = null;
    this.vely = null;

    this.side = 30;
    this.speed = speed;



    this.serve = function (side) {

        // set the x and y position
        var r = Math.random();
        this.x = side === 1 ? player.x + player.width : ai.x - this.side;
        this.y = (HEIGHT - this.side) * r;
        // calculate out-angle, higher/lower on the y-axis =>
        // steeper angle
        var phi = 0.1 * pi * (1 - 2 * r);
        // set velocity direction and magnitude

        this.velx = side * this.speed * Math.cos(phi);
        this.vely = this.speed * Math.sin(phi);

    };

    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.side, this.side);

        ctx.fillStyle = "#000";
    };
    this.update = function () {
        // update position with current velocity
        this.x += this.velx;
        this.y += this.vely;
        // check if out of the canvas in the y direction
        if (0 > this.y || this.y + this.side > HEIGHT) {
            // calculate and add the right offset, i.e. how far
            // inside of the canvas the ball is
            var offset = this.vely < 0 ? 0 - this.y : HEIGHT - (this.y + this.side);
            this.y += 2 * offset;
            // mirror the y velocity
            this.vely *= -1;
        }

        // helper function to check intesectiont between two
        // axis aligned bounding boxex (AABB)
        var AABBIntersect = function (ax, ay, aw, ah, bx, by, bw, bh) {
            return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
        };
        var pdle = this.velx < 0 ? player : ai;
        // check againts target paddle to check collision in x
        // direction
        if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
                this.x, this.y, this.side, this.side)
                ) {

            // set the x position and calculate reflection angle
            this.x = pdle === player ? player.x + player.width : ai.x - this.side;
            var n = (this.y + this.side - pdle.y) / (pdle.height + this.side);
            var phi = 0.25 * pi * (2 * n - 1); // pi/4 = 45
            // calculate smash value and update velocity
            var smash = Math.abs(phi) > 0.2 * pi ? 1.5 : 1;
            this.velx = smash * (pdle === player ? 1 : -1) * this.speed * Math.cos(phi);
            this.vely = smash * this.speed * Math.sin(phi);
        }

        // reset the ball when ball outside of the canvas in the
        // x direction
        if (0 > this.x + this.side) {

            this.serve(pdle === player ? 1 : -1);
            ai.points++;
            scores.innerHTML = player.points + " - " + ai.points;
        } else if (this.x > WIDTH) {

            this.serve(pdle === player ? 1 : -1);
            player.points++;
            scores.innerHTML = player.points + " - " + ai.points;

        }


    }
}



$(document).ready(function () {

    canvas = document.getElementById('canvas');
    scores = document.getElementById('scores');
    
    connect();
});

$(document).unload(function () {

    socket.close();
});



