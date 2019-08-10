const WIDTH = 500;
const HEIGHT = 500;

const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

const BLACK = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255, 255, 255)';

const SHIP_WIDTH = 15;
const SHIP_HEIGHT = 20;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

//propriedades da nave
var ship_x = CENTER_WIDTH;
var ship_y = CENTER_HEIGHT;
var ship_angle = 0;
var dx = 0;
var dy = 0;

//desenha a nave
function drawShip() {
    
    ctx.beginPath();
    ctx.moveTo(ship_x, ship_y - SHIP_HEIGHT / 2);
    ctx.lineTo(ship_x + SHIP_WIDTH / 2, ship_y + SHIP_HEIGHT / 2);
    ctx.lineTo(ship_x - SHIP_WIDTH / 2, ship_y + SHIP_HEIGHT / 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
}

function draw() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawShip();

    ship_x += dx;
    ship_y += dy;
    
    shipAddAngle(1);
}

function shipAddAngle(angle) {
    
    var n_angle = ship_angle + angle;
    
    if(n_angle > 359) {
        
        ship_angle = n_angle - 360;
        return;
    }
    
    if(n_angle < 0) {
        
        ship_angle = 360 + n_angle;
        return;
    }
    
    ship_angle = n_angle;
}

setInterval(draw, 10);