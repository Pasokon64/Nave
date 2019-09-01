function Shoot(parent) {
    
    this.x = parent.x;
    this.y = parent.y;
    this.angle = parent.angle;
    this.velocity = 4; 
    this.parent = parent;
    this.hit = false;
    
    this.draw = function(ctx) {
      
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fill();
        
        this.move();
    };
    
    this.move = function() {
      
        this.x -= Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.y -= Math.cos(this.angle * Math.PI / 180) * this.velocity;
    };
}