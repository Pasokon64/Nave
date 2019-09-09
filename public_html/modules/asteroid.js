class Asteroid {

    size = 3;
    type = Math.round(Math.random());
    angle = 0;
    moveAngle = Math.floor(Math.random() * 360);
    velocity = 0.3;
    hit = false;
    circleCollisionRadius = 15;

    points = [[180, 25], [270, 25], [0, 25], [90, 25]];
    realPoints = [];
    qtdRealPoints = 0;

    /**
     * Cria um novo objeto asteroide no cenário.
     * 
     * @param {CanvasRenderingContext2D} ctx Contexto de renderização.
     */
    constructor(ctx) {

        this.x = (600 * (Math.round(Math.random()) * 1)) - 50;
        this.y = 500 * Math.random();
        
        if (this.x > 0) {

            this.moveAngle = 210 + Math.random() * 120;
        }
        else {

            this.moveAngle = 30 + Math.random() * 120;
        }

        this.ctx = ctx;
    }

    /**
     * Atualiza os parâmetros do objeto.
     */
    update() {

        this.draw();
        this.turn(-2);
        this.move();
    }

    /**
     * Desenha o objeto asteroide na tela.
     */
    draw() {

        this.qtdRealPoints = 0;

        let currentX = this.x + Math.sin((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);
        let currentY = this.y + Math.cos((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);

        this.ctx.beginPath();
        this.ctx.moveTo(currentX, currentY);

        this.realPoints[0] = [currentX, currentY];

        for (let i = 0; i < this.points.length; i++) {

            currentX += Math.sin((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            currentY += Math.cos((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            ctx.lineTo(currentX, currentY);

            this.realPoints[i + 1] = [currentX, currentY];
            this.qtdRealPoints = i + 1;
        }

        this.ctx.strokeStyle = 'rgb(255, 255, 255)';
        this.ctx.stroke();
    };

    /**
     * Gira o asteroide com base ângulo escolhido. 
     * 
     * @param {Number} angle ângulo a ser adicionado no objeto.
     */
    turn(angle) {

        let nAngle = this.angle + angle;

        if (nAngle > 359) {

            this.angle = nAngle - 360;
            return;
        }

        if (nAngle < 0) {

            this.angle = 360 + nAngle;
            return;
        }

        this.angle = nAngle;
    };

    /**
     * Move o tiro pela tela de acordo com o ângulo do objeto.
     */
    move() {

        this.x += Math.sin(this.moveAngle * Math.PI / 180) * this.velocity;
        this.y += Math.cos(this.moveAngle * Math.PI / 180) * this.velocity;
    };
}