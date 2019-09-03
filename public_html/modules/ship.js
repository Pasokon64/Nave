function Ship() {
    
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.head_angle = 40; //ângulo da parte superior do triângulo
    this.base_angle = 70; //ângulo das partes inferiores do triângulo
    this.hypo = 20; //hipotenusa do triângulo
    this.velocity = 0;
    this.max_velocity = 2;
    
    this.draw = function(ctx) {
        
        //Calcula as coordenadas do vértice superior do triângulo
        var head_x = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.sin(this.angle * Math.PI / 180);
        var head_y = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.cos(this.angle * Math.PI / 180);

        //Calcula as coordenadas dos vértices inferiores do triângulo
        var vertex1_x = this.hypo * Math.sin((this.angle + this.head_angle / 2) * Math.PI / 180);
        var vertex1_y = this.hypo * Math.cos((this.angle + this.head_angle / 2) * Math.PI / 180);
        var vertex2_x = this.hypo * Math.sin((this.angle - this.head_angle / 2) * Math.PI / 180);
        var vertex2_y = this.hypo * Math.cos((this.angle - this.head_angle / 2) * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(this.x - head_x, this.y - head_y),
        ctx.lineTo(this.x - head_x + vertex1_x, this.y - head_y + vertex1_y);
        ctx.lineTo(this.x - head_x + vertex2_x, this.y - head_y + vertex2_y);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();

        this.slow_down();
        this.move();
    };
    
    this.turn = function(angle) {
        
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
    
    this.move = function() {
        
        this.x += Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.y += Math.cos(this.angle * Math.PI / 180) * this.velocity;
    };

    this.slow_down = function() {
        
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

    this.addVelocity = function(velocity) {

        this.velocity += velocity;

        if(this.velocity > 2) {

            this.velocity = 2;
        }

        if(this.velocity < -2) {

            this.velocity = -2;
        }
    }
}