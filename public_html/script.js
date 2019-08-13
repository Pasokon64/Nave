const WIDTH = 500;
const HEIGHT = 500;

const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

var rightPressed = false;
var leftPressed = false;

var ship = new Ship();
ship.ship_x = CENTER_WIDTH;
ship.ship_y = CENTER_HEIGHT;

document.addEventListener('keydown', KeyDownHandler, false);
document.addEventListener('keyup', KeyUpHandler, false);

function KeyDownHandler(e) {
    
    if(e.key == 'Right' || e.key == 'ArrowRight') {

        rightPressed = true;
    }

    if(e.key == 'Left' || e.key == 'ArrowLeft') {

        leftPressed = true;
    }
}

function KeyUpHandler(e) {
    
    if(e.key == 'Right' || e.key == 'ArrowRight') {

        rightPressed = false;
    }

    if(e.key == 'Left' || e.key == 'ArrowLeft') {

        leftPressed = false;
    }
}

function draw() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ship.draw(ctx);

    if(rightPressed) {
    
        ship.turn(-2);
    }

    if(leftPressed) {
    
        ship.turn(2);
    }
}

setInterval(draw, 10);