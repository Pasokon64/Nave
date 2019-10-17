// dimensões do canvas
const WIDTH = 500;
const HEIGHT = 500;

// centro do canvas
const CENTER_WIDTH = WIDTH / 2;
const CENTER_HEIGHT = HEIGHT / 2;

// tempo de espera mínimo entre um tiro e outro
const SHOOT_DELAY = 400;

// tempo de espera entre a geração de um asteroide para outro
var asteroidDelay = 500;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

// armazena quando a última foi disparada para o 
// calculo de delay entre uma bala e outra.
var lastBullet = new Date();

// armazena quando o último asteroide foi criado
var lastAsteroid = new Date();

// variáveis que guardam quais botões foram precionados
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

// criando e posicionando um objeto nave
var ship = new Ship(ctx);
ship.x = CENTER_WIDTH;
ship.y = CENTER_HEIGHT;

// vetor que guarda as arteroides ativos no campo
var asteroids = [];
asteroids.push(new Asteroid(ctx, 25));

// vetor que guarda as balas disparadas
var shoots = [];

// número de balas presentes atualmente na tela
var numShoots = 0;

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
    
    // atualiza os objetos do cenário
    ship.update();
    updateBullets();
    updateAsteroids();
    updateCollisions();

    // gera asteroides na tela
    generateAsteroids();

    if(rightPressed) {
    
        ship.turn(-2);
    }

    if(leftPressed) {
    
        ship.turn(2);
    }
    
    if(upPressed) {
        
        ship.addVelocity(-0.05);
    }
    
    if(downPressed) {
        
        ship.addVelocity(0.05);
    }
    
    if(spacePressed) {
        
        let bulletTime = new Date();
        
        if(bulletTime - lastBullet > SHOOT_DELAY) {
            
            shoots.push(new Shoot(ship, ctx));
            lastBullet = bulletTime;
        }
    }
    else {

        lastBullet = 0;
    }
}

/**
 * Cuida de todos os eventos e atualizações referente as balas
 * disparadas.
 */
function updateBullets() {
    
    // loop que itera todos os tiros presentes na tela
    for(let i = 0; i < shoots.length; i++) {
    
        if(shoots[i].hit) {

            shoots.splice(i, 1);
        }
        else {

            // caso o tiro ainda esteja dentro dos limites do canvas
            if(shoots[i].x < WIDTH && shoots[i].x > 0 && shoots[i].y < HEIGHT && shoots[i].y > 0) {

                //desenha o objeto tiro na tela
                shoots[i].update();
            }
            else {

                // remove o tiro da lista caso ele já tenha saido para fora da tela
                shoots.splice(i, 1);
            }
        }
    }
}

/**
 * Cuida de todos os eventos e atualizações referente aos asteroides
 * presentes no campo de batalha.
 */
function updateAsteroids() {

    for (let i = 0; i < asteroids.length; i++) {

        if (asteroids[i].hit) {

            if (asteroids[i].size == 25) {
             
                newAsteroid1 = new Asteroid(ctx, 15);
                newAsteroid2 = new Asteroid(ctx, 15);

                newAsteroid1.x = asteroids[i].x;
                newAsteroid1.y = asteroids[i].y;

                newAsteroid2.moveAngle = addAngle(newAsteroid1.moveAngle, 180);

                if (newAsteroid1.moveAngle >= 0 && newAsteroid1.moveAngle <= 90) {
                    
                    newAsteroid2.x = asteroids[i].x - 20;
                    newAsteroid2.y = asteroids[i].y + 20;
                }

                if (newAsteroid1.moveAngle > 90 && newAsteroid1.moveAngle <= 180) {
                    
                    newAsteroid2.x = asteroids[i].x - 20;
                    newAsteroid2.y = asteroids[i].y - 20;
                }

                if (newAsteroid1.moveAngle > 180 && newAsteroid1.moveAngle <= 270) {
                    
                    newAsteroid2.x = asteroids[i].x + 20;
                    newAsteroid2.y = asteroids[i].y + 20;
                }

                if (newAsteroid1.moveAngle > 270 && newAsteroid1.moveAngle < 360) {
                    
                    newAsteroid2.x = asteroids[i].x + 20;
                    newAsteroid2.y = asteroids[i].y - 20;
                }

                newAsteroid1.velocity = 0.5;
                newAsteroid2.velocity = 0.5;

                asteroids.push(newAsteroid1);
                asteroids.push(newAsteroid2);
            }

            asteroids.splice(i, 1);
        }
        else {

            let maxX = WIDTH + 50;
            let maxY = HEIGHT + 50;

            let asteroidX = asteroids[i].x;
            let asteroidY = asteroids[i].y;

            // caso o asteroide esteja dentro dos limites
            if (asteroidX <= maxX && asteroidX >= -50 && asteroidY < maxY && asteroidY > -50) {

                asteroids[i].update();
            }
            else {

                asteroids.splice(i, 1);
            }
        }
    }
}

/**
 * Cuida dos eventos de colisão entre os elementos de gameplay.
 */
function updateCollisions() {

    for(let i = 0; i < shoots.length; i++) {

        for(let x = 0; x < asteroids.length; x++) {

            // caso tiro colida com asteroide
            if(collisionShootAsteroid(shoots[i], asteroids[x])) {
        
                asteroids[x].hit = true;
                shoots[i].hit = true;
            }
        }
    }

    for(let i = 0; i < asteroids.length; i++) {

        for(let x = 0; x < asteroids.length; x++) {

            // se asteroide for diferente
            if(i !== x) {

                // se asteroide colidir com outro asteroide
                if (collisionAsteroidAsteroid(asteroids[i], asteroids[x])) {

                    asteroids[i].hit = true;
                    asteroids[x].hit = true;
                }
            }
        }

        // se asteroide colidir com nave
        if(collisionShipAsteroid(ship, asteroids[i])) {

            alert('Fim de jogo! tente novamente.');
            location.reload();
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
function collisionShootAsteroid(shoot, asteroid) {

    let cX = Math.round(asteroid.x);
    let cY = Math.round(asteroid.y);
    let pX = Math.round(shoot.x);
    let pY = Math.round(shoot.y);
    
    let r = Math.round(asteroid.circleCollisionRadius);

    let collided = Collision.pointCircle(pX, pY, cX, cY, r);
    
    return collided;
}

/**
 * Calcula se nave e asteroide estão colidindo.
 * 
 * @param {Ship} ship Nave na qual será verificada a colisão.
 * @param {Asteroid} asteroid Asteroide no qual será verificado a colisão.
 * @returns {boolean} se nave e asteroide estão colidindo entre si.
 */
function collisionShipAsteroid(ship, asteroid) {
    
    for (let i = 0; i < (ship.realPoints.length - 1); i++) {
       
        let sX = Math.round(ship.realPoints[i][0]);
        let sY = Math.round(ship.realPoints[i][1]);

        let eX = Math.round(ship.realPoints[i + 1][0]);
        let eY = Math.round(ship.realPoints[i + 1][1]);

        let cX = Math.round(asteroid.x);
        let cY = Math.round(asteroid.y);

        let r = asteroid.circleCollisionRadius;

        if(Collision.lineCircle(sX, sY, eX, eY, cX, cY, r)) {

            return true;
        }
    }

    return false;
}

function collisionAsteroidAsteroid(asteroid1, asteroid2) {
    
    let c1X = asteroid1.x;
    let c1Y = asteroid1.y;
    let c1R = asteroid1.circleCollisionRadius;

    let c2X = asteroid2.x;
    let c2Y = asteroid2.y;
    let c2R = asteroid2.circleCollisionRadius;

    if(Collision.circleCircle(c1X, c1Y, c1R, c2X, c2Y, c2R)) {

        return true;
    }

    return false;
}

/**
 * Gera asteroides periodicamente de acordo com o delay
 * especificado.
 */
function generateAsteroids() {

    let currentTime = new Date();

    if(currentTime - lastAsteroid >= asteroidDelay) {

        asteroids.push(new Asteroid(ctx, 25));
        lastAsteroid = currentTime;
    }
}

function addAngle(angle, addValue) {
        
    let nAngle = angle + addValue;

    if(nAngle > 359) {

        return nAngle - 360;
    }

    if(nAngle < 0) {

        return 360 + nAngle;
    }

    return nAngle;
};

setInterval(update, 10);