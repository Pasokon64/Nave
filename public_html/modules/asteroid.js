function Asteroid() {
    
    this.x = 100;
    this.y = 100;
    this.size = 3;
    this.type = Math.round(Math.random());
    this.angle = 0;
    this.move_angle = Math.floor(Math.random() * 360);
    this.velocity = 0.3;
    this.hit = false;
    
    this.points = [ [180, 25], [270, 25], [0, 25], [90, 25] ];
    this.real_points = [];
    this.qtd_real_points = 0;
    
    this.draw = function(ctx) {
        
        this.qtd_real_points = 0;

        var current_x = this.x + Math.sin((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);
        var current_y = this.y + Math.cos((this.angle + 45) * Math.PI / 180) * (25 / Math.sin(45 * Math.PI / 180) / 2);
        
        ctx.beginPath();
        ctx.moveTo(current_x, current_y);
        
        this.real_points[0] = [current_x, current_y];

        for(var i = 0; i < this.points.length; i++) {
            
            current_x += Math.sin((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            current_y += Math.cos((this.angle + this.points[i][0]) * Math.PI / 180) * this.points[i][1];
            ctx.lineTo(current_x, current_y);

            this.real_points[i + 1] = [current_x, current_y];
            this.qtd_real_points = i + 1;
        }
        
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.stroke();
        
        this.turn(-2);
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
        
        this.x += Math.sin(this.move_angle * Math.PI / 180) * this.velocity;
        this.y += Math.cos(this.move_angle * Math.PI / 180) * this.velocity;
    };
}