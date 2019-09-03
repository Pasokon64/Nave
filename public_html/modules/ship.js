class Ship {
    
    x = 0;
    y = 0;
    angle = 0;
    head_angle = 40; //ângulo da parte superior do triângulo
    base_angle = 70; //ângulo das partes inferiores do triângulo
    hypo = 20; //hipotenusa do triângulo
    velocity = 0;
    max_velocity = 2;

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
        this.slow_down();
        this.move();
    }

    /**
     * Desenha o objeto nave na tela.
     */
    draw() {
        
        //Calcula as coordenadas do vértice superior do triângulo
        var head_x = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.sin(this.angle * Math.PI / 180);
        var head_y = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.cos(this.angle * Math.PI / 180);

        //Calcula as coordenadas dos vértices inferiores do triângulo
        var vertex1_x = this.hypo * Math.sin((this.angle + this.head_angle / 2) * Math.PI / 180);
        var vertex1_y = this.hypo * Math.cos((this.angle + this.head_angle / 2) * Math.PI / 180);
        var vertex2_x = this.hypo * Math.sin((this.angle - this.head_angle / 2) * Math.PI / 180);
        var vertex2_y = this.hypo * Math.cos((this.angle - this.head_angle / 2) * Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.moveTo(this.x - head_x, this.y - head_y),
        this.ctx.lineTo(this.x - head_x + vertex1_x, this.y - head_y + vertex1_y);
        this.ctx.lineTo(this.x - head_x + vertex2_x, this.y - head_y + vertex2_y);
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fill();
    };
    
    /**
     * Gira a nave com base ângulo escolhido. 
     * 
     * @param {Number} angle ângulo a ser adicionado no objeto.
     */
    turn(angle) {
        
        var n_angle = this.angle + angle;

        if(n_angle > 359) {

            this.angle = n_angle - 360;
            return;
        }

        if(n_angle < 0) {

            this.angle = 360 + n_angle;
            return;
        }

        this.angle = n_angle;
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
    slow_down() {
        
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
    add_velocity(velocity) {

        this.velocity += velocity;

        if(this.velocity > 2) {

            this.velocity = 2;
        }

        if(this.velocity < -2) {

            this.velocity = -2;
        }
    }
}