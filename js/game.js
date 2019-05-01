class Estado{
    // Atributos
    tabuleiro = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];
    proximasJogadas = [7,7,7,7,7,7,7,7];
    ultimoJogador = null;
    ultimaPosicaoJogada = [0,0];
    minMax = 0;

    updateParametros() {

    }
    updateMinMax() {
        this.minMax = this.verificaVencedor(this.ultimaPosicaoJogada);

        if (this.minMax !== this.ultimoJogador) {
            let vizinhosValidos = [];
            // cima
            if (this.ultimaPosicaoJogada[0] - 1 >= 0 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] - 1][this.ultimaPosicaoJogada[1]] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] - 1, this.ultimaPosicaoJogada[1]]);
            }
            // baixo
            if (this.ultimaPosicaoJogada[0] + 1 < 8 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] + 1][this.ultimaPosicaoJogada[1]] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] + 1, this.ultimaPosicaoJogada[1]]);
            }
            // direita
            if (this.ultimaPosicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0]][this.ultimaPosicaoJogada[1] + 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0], this.ultimaPosicaoJogada[1] + 1]);
            }
            // esquerda
            if (this.ultimaPosicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0]][this.ultimaPosicaoJogada[1] - 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0], this.ultimaPosicaoJogada[1] - 1]);
            }
            // diagonal superior direita
            if (this.ultimaPosicaoJogada[0] - 1 >= 0 && this.ultimaPosicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] - 1][this.ultimaPosicaoJogada[1] + 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] - 1, this.ultimaPosicaoJogada[1] + 1]);
            }
            // diagonal inferior direita
            if (this.ultimaPosicaoJogada[0] + 1 < 8 && this.ultimaPosicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] + 1][this.ultimaPosicaoJogada[1] + 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] + 1, this.ultimaPosicaoJogada[1] + 1]);
            }
            // diagonal inferior esquerda
            if (this.ultimaPosicaoJogada[0] + 1 < 8 && this.ultimaPosicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] + 1][this.ultimaPosicaoJogada[1] - 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] + 1, this.ultimaPosicaoJogada[1] - 1]);
            }
            // diagonal superior esquerda
            if (this.ultimaPosicaoJogada[0] - 1 >= 0 && this.ultimaPosicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.ultimaPosicaoJogada[0] - 1][this.ultimaPosicaoJogada[1] - 1] === this.ultimoJogador) {
                vizinhosValidos.push([this.ultimaPosicaoJogada[0] - 1, this.ultimaPosicaoJogada[1] - 1]);
            }

            // Para cada vizinho válido, verifica se existe vencedor
            for (let i = 0; i < vizinhosValidos.length; i++) {
                this.minMax = this.verificaVencedor(vizinhosValidos[i]);
                if (this.minMax === this.ultimoJogador)
                    return;
            }
        }
    }

    verificaVencedor(posicao) {
        // verifica se é possível ganhar pela direita
        if(posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0], posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[1]+1; i <= posicaoFinal[1]; i++){
                if(this.tabuleiro[posicao[0]][i] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[1]+1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar pela esquerda
        if(posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0], posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[1]-1; i >= posicaoFinal[1]; i--){
                if(this.tabuleiro[posicao[0]][i] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[1]+1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar por cima
        if(posicao[0]-3 >= 0) {
            let posicaoFinal = [posicao[0]-3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]-1; i >= posicaoFinal[0]; i--){
                if(this.tabuleiro[i][posicao[1]] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]-1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar por cima
        if(posicao[0]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]+1; i <= posicaoFinal[0]; i++){
                if(this.tabuleiro[i][posicao[1]] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]-1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-3 >= 0 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]-3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]+1; i >= posicaoFinal[0] && j <= posicaoFinal[1]; i--, j++){
                if(this.tabuleiro[i][j] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]-1;
                    j = posicaoFinal[1]+1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior direita
        if(posicao[0]+3 < 8 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]+1; i <= posicaoFinal[0] && j <= posicaoFinal[1]; i++, j++){
                if(this.tabuleiro[i][j] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]+1;
                    j = posicaoFinal[1]+1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior esquerda
        if(posicao[0]+3 < 8 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]+3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]-1; i <= posicaoFinal[0] && j >= posicaoFinal[1]; i++, j--){
                if(this.tabuleiro[i][j] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]+1;
                    j = posicaoFinal[1]-1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        // verifica se é possível ganhar pela diagonal superior esquerda
        if(posicao[0]-3 >= 0 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]-3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]-1; i >= posicaoFinal[0] && j >= posicaoFinal[1]; i--, j--){
                if(this.tabuleiro[i][j] === this.ultimoJogador){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]-1;
                    j = posicaoFinal[1]-1;
                }
            }
            if(contadorPecas === 4){
                return this.ultimoJogador;
            }
        }
        return 0;
    }

    // Funções
    printaTabuleiro() {
        console.log(this.tabuleiro[0][0]);
        console.log(this.ultimoJogador);
    }
}

let estado = new Estado();
estado.printaTabuleiro();


class quatro_em_linha {
    estadoAtual;

    constructor(){
        this.estadoAtual = new Estado();
    }

    geraEstados(){
        let filhos = [];
        let estadoNovo;
        for(let i = 0; i < 8; i++){
            if(this.estadoAtual.proximasJogadas[i] >= 0)
            {
                estadoNovo = new Estado();
                estadoNovo.updateMinMax();
                filhos.push(estadoNovo);
            }
        }
    }
};

