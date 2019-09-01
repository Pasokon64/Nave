/**
 * Classe responsável pelos calculos que envolvem
 * trigonometria, matemática e física.
 */
class Physics {

    /**
     * Calcula a distância entre 2 pontos
     * 
     * @param {number} sX o eixo x do ponto inicial da reta.
     * @param {number} sY o eixo y do ponto inicial da reta.
     * @param {number} eX o eixo x do ponto final da reta.
     * @param {number} eY o eixo y do ponto final da reta.
     * @returns {number} A distância entre os dois pontos.
     */
    static distance(sX, sY, eX, eY) {

        let cathetus1 = eY - sY;
        let cathetus2 = eX - sX;

        // Calcula a hipotenusa com base no teorema de pitágoras.
        // 'hipo'^2 = 'cathetus1'^2 + 'cathetus2'^2 
        let hipo = Math.sqrt(cathetus1**2 + cathetus2**2);

        // A hipotenusa do triângulo corresponde a distância entre os dois pontos.
        return Math.abs(hipo);
    }
}