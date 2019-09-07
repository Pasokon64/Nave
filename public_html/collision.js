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
        
        let distance = Physics.distance(px, py, cx, cy);

        return distance <= r;
    }
}