function Ship() {
    
    this.ship_x = 0;
    this.ship_y = 0;
    this.ship_angle = 0;
    this.head_angle = 40; //ângulo da parte superior do triângulo
    this.base_angle = 70; //ângulo das partes inferiores do triângulo
    this.hypo = 20; //hipotenusa do triângulo
    
    this.draw = function(ctx) {
        
        //Calcula as coordenadas do vértice superior do triângulo
        var head_x = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.sin(this.ship_angle * Math.PI / 180);
        var head_y = (Math.sin(this.base_angle * Math.PI / 180) * this.hypo / 2) * Math.cos(this.ship_angle * Math.PI / 180);

        //Calcula as coordenadas dos vértices inferiores do triângulo
        var vertex1_x = this.hypo * Math.sin((this.ship_angle + this.head_angle / 2) * Math.PI / 180);
        var vertex1_y = this.hypo * Math.cos((this.ship_angle + this.head_angle / 2) * Math.PI / 180);
        var vertex2_x = this.hypo * Math.sin((this.ship_angle - this.head_angle / 2) * Math.PI / 180);
        var vertex2_y = this.hypo * Math.cos((this.ship_angle - this.head_angle / 2) * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(this.ship_x - head_x, this.ship_y - head_y),
        ctx.lineTo(this.ship_x - head_x + vertex1_x, this.ship_y - head_y + vertex1_y);
        ctx.lineTo(this.ship_x - head_x + vertex2_x, this.ship_y - head_y + vertex2_y);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
    };
    
    this.turn = function(angle) {
        
        var n_angle = this.ship_angle + angle;

        if(n_angle > 359) {

            this.ship_angle = n_angle - 360;
            return;
        }

        if(n_angle < 0) {

            this.ship_angle = 360 + n_angle;
            return;
        }

        this.ship_angle = n_angle;
    };
}