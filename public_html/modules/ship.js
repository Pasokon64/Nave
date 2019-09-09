class Ship {
    
    x = 0;
    y = 0;
    angle = 0;
    headAngle = 40; //ângulo da parte superior do triângulo
    baseAngle = 70; //ângulo das partes inferiores do triângulo
    hypo = 20; //hipotenusa do triângulo
    velocity = 0;
    maxVelocity = 2;

    realPoints = [];

    /**
     * Cria um novo objeto nave no cenário.
     * 
     * @param {CanvasRenderingContext2D} ctx Contexto de renderização.
     */
    constructor(ctx) {

        this.ctx = ctx;
    }

    /**
     * Atualiza os parâmetros do objeto.
     */
    update() {

        this.draw();
        this.slowDown();
        this.move();
    }

    /**
     * Desenha o objeto nave na tela.
     */
    draw() {
        
        //Calcula as coordenadas do vértice superior do triângulo
        let headX = (Math.sin(this.baseAngle * Math.PI / 180) * this.hypo / 2) * Math.sin(this.angle * Math.PI / 180);
        let headY = (Math.sin(this.baseAngle * Math.PI / 180) * this.hypo / 2) * Math.cos(this.angle * Math.PI / 180);

        //Calcula as coordenadas dos vértices inferiores do triângulo
        let vertex1X = this.hypo * Math.sin((this.angle + this.headAngle / 2) * Math.PI / 180);
        let vertex1Y = this.hypo * Math.cos((this.angle + this.headAngle / 2) * Math.PI / 180);
        let vertex2X = this.hypo * Math.sin((this.angle - this.headAngle / 2) * Math.PI / 180);
        let vertex2Y = this.hypo * Math.cos((this.angle - this.headAngle / 2) * Math.PI / 180);

        this.realPoints[0] = [this.x - headX, this.y - headY];
        this.realPoints[1] = [this.x - headX + vertex1X, this.y - headY + vertex1Y];
        this.realPoints[2] = [this.x - headX + vertex2X, this.y - headY + vertex2Y];
        this.realPoints[3] = [this.x - headX, this.y - headY];

        this.ctx.beginPath();
        this.ctx.moveTo(this.x - headX, this.y - headY),
        this.ctx.lineTo(this.x - headX + vertex1X, this.y - headY + vertex1Y);
        this.ctx.lineTo(this.x - headX + vertex2X, this.y - headY + vertex2Y);
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fill();
    };
    
    /**
     * Gira a nave com base ângulo escolhido. 
     * 
     * @param {Number} angle ângulo a ser adicionado no objeto.
     */
    turn(angle) {
        
        let nAngle = this.angle + angle;

        if(nAngle > 359) {

            this.angle = nAngle - 360;
            return;
        }

        if(nAngle < 0) {

            this.angle = 360 + nAngle;
            return;
        }

        this.angle = nAngle;
    };
    
    /**
     * Move o tiro pela tela de acordo com o ângulo do objeto.
     */
    move() {
        
        this.x += Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.y += Math.cos(this.angle * Math.PI / 180) * this.velocity;
    };

    /**
     * Desacelera a nave.
     */
    slowDown() {
        
        if(this.velocity > 0) {

            if(this.velocity - 0.01 < 0) {

                this.velocity = 0;
            }
            else {
    
                this.velocity -= 0.01;
            }
        }

        if(this.velocity < 0) {

            if(this.velocity + 0.01 > 0) {

                this.velocity = 0;
            }
            else {
    
                this.velocity += 0.01;
            }
        }
    }

    /**
     * Adiciona uma determinada velocidade à nave.
     * 
     * @param {number} velocity velocidade a ser adicionada
     */
    addVelocity(velocity) {

        this.velocity += velocity;

        if(this.velocity > 2) {

            this.velocity = 2;
        }

        if(this.velocity < -2) {

            this.velocity = -2;
        }
    }
}