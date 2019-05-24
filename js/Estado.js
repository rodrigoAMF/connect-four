class Estado{
    constructor(turnoAtual, posicaoJogada, inicioJogo = false){
        if((!inicioJogo && posicaoJogada == null) || ((posicaoJogada != null) && (posicaoJogada[0] < 0 || posicaoJogada[1] < 0 || posicaoJogada[0] > 7 || posicaoJogada[1] > 7))) {
            throw "Erro ao criar estado: Especifique uma posicaoJogada válida";
        }

        this.tabuleiro = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ];
        // Locais onde é possível realizar a próxima jogada
        this.proximasJogadas = [7,7,7,7,7,7,7,7];
        this.turnoAtual = turnoAtual;
        this.inicioDeJogo = inicioJogo;
        // Posição que jogador jogou neste estado
        this.posicaoJogada = posicaoJogada;
        // Jogador responsável pela jogadaAtual
        this.jogadorAtual = this.atualizarJogadorAtual();
        // Valor de minMax neste estado
        this.minMax = null;
        // Melhor jogada para o estado atual
        this.melhorColunaParaJogar = null;
        this.fimDeJogo = false;
    }

    gerarFilhos(){
        let filhos = [];
        let estadoNovo, posicaoJogada;

        for(let i = 0; i < 8; i++){
            if(this.proximasJogadas[i] >= 0){
                posicaoJogada = [this.proximasJogadas[i], i];
                estadoNovo = this.efetuarJogada(this.turnoAtual+1, posicaoJogada);

                filhos.push(estadoNovo);
            }
        }

        return filhos;
    }

    efetuarJogada(turnoAtual, posicaoJogada){
        let estadoNovo = this.clonar(this.turnoAtual+1, posicaoJogada);

        estadoNovo.tabuleiro[posicaoJogada[0]][posicaoJogada[1]] = estadoNovo.jogadorAtual;
        estadoNovo.proximasJogadas[posicaoJogada[1]]--;
        estadoNovo.inicioDeJogo = false;
        estadoNovo.atualizarMinMax();

        return estadoNovo;
    }

    // -1 jogador, 1 ia
    atualizarJogadorAtual(){
        if(this.inicioDeJogo) {
            return null;
        }
        if ((this.turnoAtual % 2) === 0) {
            return 1;
        }
        return -1;
    }

    atualizarMinMax(){
        let vencedor = this.verificarVencedor();
        if(vencedor !== 0){
            this.minMax = vencedor;
        }
    }
    // verificaVencedor e seta fimDejJogo
    verificarVencedor(){
        if(this.inicioDeJogo){
            return 0;
        }
        let vencedor = 0;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    vencedor = this.verificarVencedorEmPosicaoEspecifica([i, j]);
                    if(vencedor !== 0){
                        this.fimDeJogo = true;
                        return vencedor;
                    }
                }

            }
        }

        return vencedor;
    }

    verificarVencedorEmPosicaoEspecifica(posicao){
        // verifica se é possível ganhar pela direita
        if(posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0], posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[1]+1; i <= posicaoFinal[1]; i++){

                if(this.tabuleiro[posicao[0]][i] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela esquerda
        if(posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0], posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[1]-1; i >= posicaoFinal[1]; i--){
                if(this.tabuleiro[posicao[0]][i] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar por cima
        if(posicao[0]-3 >= 0) {

            let posicaoFinal = [posicao[0]-3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]-1; i >= posicaoFinal[0]; i--){
                if(this.tabuleiro[i][posicao[1]] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar por baixo
        if(posicao[0]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]+1; i <= posicaoFinal[0]; i++){
                if(this.tabuleiro[i][posicao[1]] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-3 >= 0 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]-3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]+1; i >= posicaoFinal[0] && j <= posicaoFinal[1]; i--, j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior direita
        if(posicao[0]+3 < 8 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]+1; i <= posicaoFinal[0] && j <= posicaoFinal[1]; i++, j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior esquerda
        if(posicao[0]+3 < 8 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]+3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]-1; i <= posicaoFinal[0] && j >= posicaoFinal[1]; i++, j--){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal superior esquerda
        if(posicao[0]-3 >= 0 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]-3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]-1; i >= posicaoFinal[0] && j >= posicaoFinal[1]; i--, j--){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        return 0;
    }

    clonar(turnoAtual, posicaoJogada){
        let novo = new Estado(turnoAtual, posicaoJogada);
        for(let i = 0; i < 8; i++){
            novo.proximasJogadas[i] = this.proximasJogadas[i];
            for(let j = 0; j < 8; j++){
                novo.tabuleiro[i][j] = this.tabuleiro[i][j];
            }
        }
        novo.minMax = this.minMax;
        novo.melhorColunaParaJogar = this.melhorColunaParaJogar;
        novo.fimDeJogo = this.fimDeJogo;

        return novo;
    }
}