// dimensões do canvas
const WIDTH = 500;
const HEIGHT = 500;

// centro do canvas
const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

// número de tiros máximos permitidos simultaneamente
const MAX_SHOOTS = 25;

// tempo de espera mínimo entre um tiro e outro
const SHOOT_DELAY = 100;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

// armazena quando a última foi disparada para o 
// calculo de delay entre uma bala e outra
var lastBullet = new Date(); 

// variáveis que guardam quais botões foram precionados
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

// criando e posicionando um objeto nave
var ship = new Ship();
ship.x = CENTER_WIDTH;
ship.y = CENTER_HEIGHT;

// criando um novo objeto asteroide
var asteroid = new Asteroid();

// vetor que guarda as balas disparadas
var shoots = [];

// número de balas presentes atualmente na tela
var num_shoots = 0;

// adicionando eventos para quando algum botão for precionando
document.addEventListener('keydown', KeyDownHandler, false);
// adicionando eventos para quando algum botão for solto
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

/**
 * É chamada a cada 1 milisegundo. Essa função é responsável
 * pelas atualizações na gameplay do jogo.
 */
function update() {
   
    // limpa a tela para o desenho do próximo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // desenha o objeto nave na tela
    ship.draw(ctx);

    if(asteroid.hit === false)
        asteroid.draw(ctx);

    // loop que itera todos os tiros presentes na tela
    for(var i = 0; i < MAX_SHOOTS; i++) {
        
        if(shoots[i] !== undefined) {

            // caso o tiro ainda esteja dentro dos limites do canvas
            if(shoots[i].x < WIDTH && shoots[i].x > 0 && shoots[i].y < HEIGHT && shoots[i].y > 0) {

                //desenha o objeto tiro na tela
                shoots[i].draw(ctx);
            }

            if(collision_shoot_asteroid(shoots[i], asteroid)) {

                asteroid.hit = true;
            }
        }
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

/**
 * Calcula se bala e asteroid estão colidindo entre si.
 * 
 * @param {Shoot} shoot bala na qual será verificada a colisão.
 * @param {Asteroid} asteroid asteroide no qual será verificado a colisão
 * @returns {boolean} Se bala e asteroid estão colidindo.
 */
function collision_shoot_asteroid(shoot, asteroid) {

    //TODO: calcular colisão entre uma bala e um asteroid
    return false;
}

setInterval(update, 10);