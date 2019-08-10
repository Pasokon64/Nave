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

/* propriedades da nave */
var ship_x = CENTER_WIDTH;
var ship_y = CENTER_HEIGHT;
var ship_angle = 0;
var head_angle = 40; //ângulo da parte superior do triângulo
var base_angle = 70; //ângulo das partes inferiores do triângulo
var hypo = 20; //hipotenusa do triângulo

//desenha a nave
function drawShip() {
    
    //Calcula as coordenadas do vértice superior do triângulo
    var head_x = (Math.sin(base_angle * Math.PI / 180) * hypo / 2) * Math.sin(ship_angle * Math.PI / 180);
    var head_y = (Math.sin(base_angle * Math.PI / 180) * hypo / 2) * Math.cos(ship_angle * Math.PI / 180);
    
    //Calcula as coordenadas dos vértices inferiores do triângulo
    var vertex1_x = hypo * Math.sin((ship_angle + base_angle / 2) * Math.PI / 180);
    var vertex1_y = hypo * Math.cos((ship_angle + base_angle / 2) * Math.PI / 180);
    var vertex2_x = hypo * Math.sin((ship_angle - base_angle / 2) * Math.PI / 180);
    var vertex2_y = hypo * Math.cos((ship_angle - base_angle / 2) * Math.PI / 180);
    
    ctx.beginPath();
    ctx.moveTo(ship_x - head_x, ship_y - head_y),
    ctx.lineTo(ship_x - head_x + vertex1_x, ship_y - head_y + vertex1_y);
    ctx.lineTo(ship_x - head_x + vertex2_x, ship_y - head_y + vertex2_y);
    ctx.fillStyle = WHITE;
    ctx.fill();
}

function draw() {
   
    //limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawShip();

    ship_x += dx;
    ship_y += dy;
    
    shipAddAngle(2);
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