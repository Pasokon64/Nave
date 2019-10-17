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

    /**
     * Calcula se há colisão entre um seguimento de reta e um ponto.
     * 
     * @param {number} sX O eixo x do ponto inicial da reta.
     * @param {number} sY O eixo y do ponto inicial da reta.
     * @param {number} eX O eixo x do ponto final da reta.
     * @param {number} eY O eixo y do ponto final da reta.
     * @param {number} pX O eixo x do ponto.
     * @param {number} pY O eixo y do ponto.
     * @returns {boolean} Se há colisão entre a reta e o ponto.
     */
    static linePoint(sX, sY, eX, eY, pX, pY) {

        let dist1 = Physics.distance(pX, pY, sX, sY);
        let dist2 = Physics.distance(pX, pY, eX, eY);

        let lineLen = Physics.distance(sX, sY, eX, eY);

        if(dist1 + dist2 === lineLen) {

            return true;
        }

        return false;
    }

    /**
     * Calcula se há colisão entre um seguimento de reta e um círculo.
     * 
     * @param {number} sX O eixo x do ponto inicial da reta.
     * @param {number} sY O eixo y do ponto inicial da reta.
     * @param {number} eX O eixo x do ponto final da reta.
     * @param {number} eY O eixo y do ponto final da reta.
     * @param {number} cX O eixo x do círculo.
     * @param {number} cY O eixo y do círculo.
     * @param {number} r O raio do círculo.
     */
    static lineCircle(sX, sY, eX, eY, cX, cY, r) {

        /* Calculando colisão entre as duas extremidades e o círculo */
        let collidedP1 = this.pointCircle(sX, sY, cX, cY, r);
        let collidedP2 = this.pointCircle(eX, eY, cX, cY, r);

        if (collidedP1 || collidedP2) {

            return true;
        }

        /* Calculando o ponto da reta mais próximo do círculo */
        // calculando comprimento da linha através do teorema de Pitágoras.
        let lineLen = Physics.distance(sX, sY, eX, eY);

        // calculando o produto escalar.
        let dot = ( ((cX-sX)*(eX-sX)) + ((cY-sY)*(eY-sY)) ) / lineLen**2;

        // calculando ponto mais próximo.
        let closestX = sX + (dot * (eX - sX));
        let closestY = sY + (dot * (eY - sY));

        // testando se o ponto mais próximo calculado pertence a reta.
        let onSegment = this.linePoint(sX, sY, eX, eY, closestX, closestY);

        if(!onSegment) {

            return false;
        }

        // se o ponto mais próximo colidiu com o círculo.
        let collided = this.pointCircle(closestX, closestY, cX, cY, r);

        if(collided) {

            return true;
        }

        return false;
    }

    static circleCircle(c1X, c1Y, c1R, c2X, c2Y, c2R) {

        let distance = Physics.distance(c1X, c1Y, c2X, c2Y);

        if (distance <= (c1R + c2R)) {

            return true;
        }

        return false;
    }
}