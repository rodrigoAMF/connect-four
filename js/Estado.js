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
    // Locais onde é possível realizar a próxima jogada
    proximasJogadas = [7,7,7,7,7,7,7,7];
    // Jogada atual (jogadaInicial = 1, jogadaFinal = 64)
    jogadaAtual = 1;
    // Jogador que jogou neste estado (-1 = jogador1, 1=jogador2/IA)
    jogadorAtual = null;
    // Posição que jogador jogou neste estado
    posicaoJogada = [-1,-1];
    // Valor de minMax neste estado
    minMax = 0;
    // Melhor jogada para o estado atual
    melhorJogada = [];

    // colunaProximaJogada = coluna do tabuleiro onde irá ser realizada a próxima jogada
    //updateParametros(jogadorAtualPai, proximasJogadasPai, tabuleiroPai, colunaProximaJogada) {
    updateParametros(colunaProximaJogada) {
        this.posicaoJogada = [this.proximasJogadas[colunaProximaJogada], colunaProximaJogada];
        this.tabuleiro[this.proximasJogadas[colunaProximaJogada]][colunaProximaJogada] = this.jogadorAtual;
        this.proximasJogadas[colunaProximaJogada]--;
    }

    geraFilhos() {
        let filhos = [];
        let estadoNovo;
        for(let i = 0; i < 8; i++){
            if(this.proximasJogadas[i] >= 0)
            {
                estadoNovo = this.clone();
                if(this.jogadorAtual == null){
                    estadoNovo.jogadorAtual = -1;
                }else{
                    estadoNovo.jogadorAtual = (this.jogadorAtual === -1) ? 1 : -1;
                }

                estadoNovo.updateParametros(i);
                //estadoNovo.updateMinMax();
                estadoNovo.jogadaAtual = this.jogadaAtual+1;

                filhos.push(estadoNovo);
            }
        }
        return filhos;
    }

    updateMinMax() {
        if(this.posicaoJogada == null){
            return 0;
        }
        this.minMax = this.verificaVencedor(this.posicaoJogada);

        if (this.minMax !== this.jogadorAtual) {
            let vizinhosValidos = [];
            // cima
            if (this.posicaoJogada[0] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1]] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1]]);
            }
            // baixo
            if (this.posicaoJogada[0] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1]] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1]]);
            }
            // direita
            if (this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0]][this.posicaoJogada[1] + 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0], this.posicaoJogada[1] + 1]);
            }
            // esquerda
            if (this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0]][this.posicaoJogada[1] - 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0], this.posicaoJogada[1] - 1]);
            }
            // diagonal superior direita
            if (this.posicaoJogada[0] - 1 >= 0 && this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1] + 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1] + 1]);
            }
            // diagonal inferior direita
            if (this.posicaoJogada[0] + 1 < 8 && this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1] + 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1] + 1]);
            }
            // diagonal inferior esquerda
            if (this.posicaoJogada[0] + 1 < 8 && this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1] - 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1] - 1]);
            }
            // diagonal superior esquerda
            if (this.posicaoJogada[0] - 1 >= 0 && this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1] - 1] === this.jogadorAtual) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1] - 1]);
            }

            // Para cada vizinho válido, verifica se existe vencedor
            for (let i = 0; i < vizinhosValidos.length; i++) {

                this.minMax = this.verificaVencedor(vizinhosValidos[i]);
                if (this.minMax === this.jogadorAtual)
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

                if(this.tabuleiro[posicao[0]][i] === this.jogadorAtual){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[1]+1;
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
                }else{
                    i = posicaoFinal[1]-1;
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
                }else{
                    i = posicaoFinal[0]-1;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar por cima
        if(posicao[0]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]+1; i <= posicaoFinal[0]; i++){
                if(this.tabuleiro[i][posicao[1]] === this.jogadorAtual){
                    contadorPecas++;
                }else{
                    i = posicaoFinal[0]-1;
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
                }else{
                    i = posicaoFinal[0]-1;
                    j = posicaoFinal[1]+1;
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
                }else{
                    i = posicaoFinal[0]+1;
                    j = posicaoFinal[1]+1;
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
                }else{
                    i = posicaoFinal[0]+1;
                    j = posicaoFinal[1]-1;
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
                }else{
                    i = posicaoFinal[0]-1;
                    j = posicaoFinal[1]-1;
                }
            }
            if(contadorPecas === 4){
                return this.jogadorAtual;
            }
        }

        return 0;
    }

    // Funções
    printaTabuleiro() {
        console.log(this.tabuleiro);
        console.log(this.proximasJogadas);
        console.log(this.posicaoJogada);
        console.log("Jogador Atual " + this.jogadorAtual);
        console.log("MinMax " + this.minMax);
    }

    clone(){
        let novo = new Estado();
        novo.jogadorAtual = this.jogadorAtual;
        novo.minMax = this.minMax;

        for(let i = 0; i < 8; i++){
            novo.proximasJogadas[i] = this.proximasJogadas[i];
            for(let j = 0; j < 8; j++){
                novo.tabuleiro[i][j] = this.tabuleiro[i][j];
            }
        }

        novo.posicaoJogada[0] = this.posicaoJogada[0];
        novo.posicaoJogada[1] = this.posicaoJogada[1];

        return novo;
    }
}