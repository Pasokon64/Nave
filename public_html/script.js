const WIDTH = 500;
const HEIGHT = 500;

const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

const MAX_SHOOTS = 25;
const SHOOT_DELAY = 100;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

var lastBullet = new Date(); 

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var ship = new Ship();
ship.x = CENTER_WIDTH;
ship.y = CENTER_HEIGHT;

var asteroid = new Asteroid();

var shoots = [];
var num_shoots = 0;

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
    
    if(e.key === ' ' || e.key === 'Spacebar') {
        
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
    
    if(e.key === ' ' || e.key === 'Spacebar') {
        
        spacePressed = false;
    }
}

function update() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ship.draw(ctx);
    asteroid.draw(ctx);
    
    for(var i = 0; i < MAX_SHOOTS; i++) {
        
        if(shoots[i] !== undefined)
            shoots[i].draw(ctx);
    }

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
    
    if(spacePressed) {
        
        var bulletTime = new Date();
        
        if(bulletTime - lastBullet > SHOOT_DELAY) {
            
            shoots[num_shoots] = new Shoot(ship);
            num_shoots += 1;
            lastBullet = bulletTime;
        }

        if(num_shoots >= MAX_SHOOTS) {

            num_shoots = 0;
        }
    }
}

setInterval(update, 10);