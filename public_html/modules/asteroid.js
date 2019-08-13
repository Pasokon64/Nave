function Asteroid() {
    
    this.x = 100;
    this.y = 100;
    this.points_l1 = [ [0, 0], [20, 0], [30, -15], [35, -35], [20, -45], 
        [0, -45], [-15, -25], [-10, -10], [0, 0] ];
    
    this.draw = function(ctx) {
        
        ctx.beginPath();
        ctx.moveTo(this.asteroid_x, this.asteroid_y);
        
        for(var i = 0; i < this.points_l1.length; i++) {
            
            ctx.lineTo(this.x + this.points_l1[i][0], this.y + this.points_l1[i][1]);
        }
        
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.stroke();
    }
}