const WIDTH = 500;
const HEIGHT = 500;

const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

var ship = new Ship();
ship.ship_x = CENTER_WIDTH;
ship.ship_y = CENTER_HEIGHT;

function draw() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ship.draw(ctx);
    ship.turn(2);
}

setInterval(draw, 10);