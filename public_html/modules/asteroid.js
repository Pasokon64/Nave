class Asteroid {

    size = 3;
    type = Math.round(Math.random());
    angle = 0;
    move_angle = Math.floor(Math.random() * 360);
    velocity = 0.3;
    hit = false;
    circle_collision_radius = 15;

    points = [[180, 25], [270, 25], [0, 25], [90, 25]];
    real_points = [];
    qtd_real_points = 0;

    /**
     * Cria um novo objeto asteroide no cenário.
     * 
     * @param {CanvasRenderingContext2D} ctx Contexto de renderização.
     */
    constructor(ctx) {

        this.x = (600 * (Math.round(Math.random()) * 1)) - 50;
        this.y = 500 * Math.random(); 
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

        this.qtd_real_points = 0;

        let current_x = this.x + Math.sin((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);
        let current_y = this.y + Math.cos((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);

        this.ctx.beginPath();
        this.ctx.moveTo(current_x, current_y);

        this.real_points[0] = [current_x, current_y];

        for (let i = 0; i < this.points.length; i++) {

            current_x += Math.sin((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            current_y += Math.cos((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            ctx.lineTo(current_x, current_y);

            this.real_points[i + 1] = [current_x, current_y];
            this.qtd_real_points = i + 1;
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

        let n_angle = this.angle + angle;

        if (n_angle > 359) {

            this.angle = n_angle - 360;
            return;
        }

        if (n_angle < 0) {

            this.angle = 360 + n_angle;
            return;
        }

        this.angle = n_angle;
    };

    /**
     * Move o tiro pela tela de acordo com o ângulo do objeto.
     */
    move() {

        this.x += Math.sin(this.move_angle * Math.PI / 180) * this.velocity;
        this.y += Math.cos(this.move_angle * Math.PI / 180) * this.velocity;
    };
}