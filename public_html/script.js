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
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var ship = new Ship();
ship.ship_x = CENTER_WIDTH;
ship.ship_y = CENTER_HEIGHT;

var asteroid = new Asteroid();

document.addEventListener('keydown', KeyDownHandler, false);
document.addEventListener('keyup', KeyUpHandler, false);

function KeyDownHandler(e) {
    
    if(e.key === 'Right' || e.key === 'ArrowRight') {

        rightPressed = true;
    }

    if(e.key === 'Left' || e.key === 'ArrowLeft') {

        leftPressed = true;
    }
    
    if(e.key === 'Up' || e.key === 'ArrowUp') {
        
        upPressed = true;
    }
    
    if(e.key === 'Down' || e.key === 'ArrowDown') {
        
        downPressed = true;
    }
    
    if(e.key === 'Space') {
        
        spacePressed = true;
    }
}

function KeyUpHandler(e) {
    
    if(e.key === 'Right' || e.key === 'ArrowRight') {

        rightPressed = false;
    }

    if(e.key === 'Left' || e.key === 'ArrowLeft') {

        leftPressed = false;
    }
    
    if(e.key === 'Up' || e.key === 'ArrowUp') {
        
        upPressed = false;
    }
    
    if(e.key === 'Down' || e.key === 'ArrowDown') {
        
        downPressed = false;
    }
    
    if(e.key === 'Space') {
        
        spacePressed = false;
    }
}

function draw() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ship.draw(ctx);
    asteroid.draw(ctx);

    if(rightPressed) {
    
        ship.turn(-2);
    }

    if(leftPressed) {
    
        ship.turn(2);
    }
    
    if(upPressed) {
        
        ship.move(-2);
    }
    
    if(downPressed) {
        
        ship.move(2);
    }
}

setInterval(draw, 10);