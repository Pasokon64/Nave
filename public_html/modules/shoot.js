class Shoot {
    
    velocity = 4;
    hit = false;
    
    /**
     * Cria um novo objeto de tiro no cenário.
     * 
     * @param {Object} parent Objeto que disparou o tiro.
     * @param {CanvasRenderingContext2D} ctx Contexto de renderização.
     */
    constructor(parent, ctx) {

        this.parent = parent;
        this.x = parent.x;
        this.y = parent.y;
        this.angle = parent.angle;
        this.parent = parent;
        this.ctx = ctx;
    }

    /**
     * Atualiza os parâmetros do objeto.
     */
    update() {

        this.draw();
        this.move();
    }

    /**
     * Desenha o objeto tiro na tela.
     * 
     * @param {CanvasRenderingContext2D} ctx Contexto de renderização.
     */
    draw() {
      
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = 'rgb(255, 255, 255)'
        this.ctx.fill();
    }
    
    /**
     * Move o tiro pela tela de acordo com o ângulo do objeto que o disparou.
     */
    move() {
      
        this.x -= Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.y -= Math.cos(this.angle * Math.PI / 180) * this.velocity;
    }
}