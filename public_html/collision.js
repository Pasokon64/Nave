/**
 * Classe responsável pelos cálculos de colisão entre 
 * as formas geométricas
 */
class Collision {

    /**
     * Calcula se há uma colisão entre um ponto e um círculo.
     * 
     * @param {number} px O eixo x do ponto.
     * @param {number} py O eixo y do ponto.
     * @param {number} cx O eixo x do círculo.
     * @param {number} cy O eixo y do círculo.
     * @param {number} r O raio do círculo.
     * @returns {boolean} Se há colisão entre o ponto e o círculo.
     */
    static pointCircle(px, py, cx, cy, r) {
        
        // distância entre o ponto e o círculo.
        let distance = Physics.distance(px, py, cx, cy);

        // se distância menor que o raio do círculo, há colisão.
        return distance <= r;
    }

    static lineCircle(sX, sY, eX, eY, cX, cY, r) {

        let collided_p1 = this.pointCircle(sX, sY, cX, cY, r);
        let collided_p2 = this.pointCircle(eX, eY, cX, cY, r);

        if (collided_p1 || collided_p2) {

            return true;
        }

        return false;
    }
}