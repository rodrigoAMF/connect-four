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
    turnoAtual = 1;
    // Posição que jogador jogou neste estado
    posicaoJogada = [-1,-1];
    // Valor de minMax neste estado
    minMax = 0;
    // Melhor jogada para o estado atual
    melhorJogada = -1;
    // Flag determina o fim do jogo (1 = fim de jogo, 0 = jogo não terminou)
    fimDeJogo = 0;

    // colunaProximaJogada = coluna do tabuleiro onde irá ser realizada a próxima jogada
    updateParametros(colunaProximaJogada, jogadorAtual) {
        this.posicaoJogada = [this.proximasJogadas[colunaProximaJogada], colunaProximaJogada];
        this.tabuleiro[this.proximasJogadas[colunaProximaJogada]][colunaProximaJogada] = jogadorAtual;
        this.proximasJogadas[colunaProximaJogada]--;
    }

    pintaPeca(colunaProximaJogada, jogadorAtual){
        let idPosicao = "posicao" + this.proximasJogadas[colunaProximaJogada] + "-" + colunaProximaJogada;
        if(jogadorAtual === -1){
            document.getElementById(idPosicao).className = "jogadorJogou";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "none";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "block";
        }else{
            document.getElementById(idPosicao).className = "iaJogou";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "none";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "block";
        }
    }

    efetuaJogada(colunaProximaJogada, jogadorAtual){
        this.pintaPeca(colunaProximaJogada, jogadorAtual);
        this.updateParametros(colunaProximaJogada, jogadorAtual);
        this.updateMinMax();
        if(this.minMax !== 0){
            this.fimDeJogo = 1;
            QuatroEmLinha.fimDeJogo = 1;
        }
        this.turnoAtual++;

    }

    efetuaJogadaSemPintarPeca(colunaProximaJogada, jogadorAtual){
        this.updateParametros(colunaProximaJogada, jogadorAtual);
        this.updateMinMax();
    }

    geraFilhos() {
        let filhos = [];
        let estadoNovo;

        for(let i = 0; i < 8; i++){
            if(this.proximasJogadas[i] >= 0)
            {
                estadoNovo = this.clone();
                estadoNovo.efetuaJogadaSemPintarPeca(i, estadoNovo.getJogadorAtual());

                if(estadoNovo.minMax !== 0){
                    estadoNovo.fimDeJogo = 1;
                    QuatroEmLinha.fimDeJogo = 1;
                }
                estadoNovo.turnoAtual = this.turnoAtual+1;

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

        if (this.minMax !== this.getJogadorAtual()) {
            let vizinhosValidos = [];
            // cima
            if (this.posicaoJogada[0] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1]] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1]]);
            }
            // baixo
            if (this.posicaoJogada[0] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1]] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1]]);
            }
            // direita
            if (this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0]][this.posicaoJogada[1] + 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0], this.posicaoJogada[1] + 1]);
            }
            // esquerda
            if (this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0]][this.posicaoJogada[1] - 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0], this.posicaoJogada[1] - 1]);
            }
            // diagonal superior direita
            if (this.posicaoJogada[0] - 1 >= 0 && this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1] + 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1] + 1]);
            }
            // diagonal inferior direita
            if (this.posicaoJogada[0] + 1 < 8 && this.posicaoJogada[1] + 1 < 8 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1] + 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1] + 1]);
            }
            // diagonal inferior esquerda
            if (this.posicaoJogada[0] + 1 < 8 && this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] + 1][this.posicaoJogada[1] - 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] + 1, this.posicaoJogada[1] - 1]);
            }
            // diagonal superior esquerda
            if (this.posicaoJogada[0] - 1 >= 0 && this.posicaoJogada[1] - 1 >= 0 &&
                this.tabuleiro[this.posicaoJogada[0] - 1][this.posicaoJogada[1] - 1] === this.getJogadorAtual()) {
                vizinhosValidos.push([this.posicaoJogada[0] - 1, this.posicaoJogada[1] - 1]);
            }

            // Para cada vizinho válido, verifica se existe vencedor
            for (let i = 0; i < vizinhosValidos.length; i++) {

                this.minMax = this.verificaVencedor(vizinhosValidos[i]);
                if (this.minMax === this.getJogadorAtual())
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

                if(this.tabuleiro[posicao[0]][i] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }
        // verifica se é possível ganhar pela esquerda

        if(posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0], posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[1]-1; i >= posicaoFinal[1]; i--){
                if(this.tabuleiro[posicao[0]][i] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }

        // verifica se é possível ganhar por cima
        if(posicao[0]-3 >= 0) {

            let posicaoFinal = [posicao[0]-3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]-1; i >= posicaoFinal[0]; i--){
                if(this.tabuleiro[i][posicao[1]] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }

        // verifica se é possível ganhar por baixo
        if(posicao[0]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]+1; i <= posicaoFinal[0]; i++){
                if(this.tabuleiro[i][posicao[1]] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }

        // verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-3 >= 0 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]-3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]+1; i >= posicaoFinal[0] && j <= posicaoFinal[1]; i--, j++){
                if(this.tabuleiro[i][j] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }
        // verifica se é possível ganhar pela diagonal inferior direita
        if(posicao[0]+3 < 8 && posicao[1]+3 < 8) {
            let posicaoFinal = [posicao[0]+3, posicao[1]+3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]+1; i <= posicaoFinal[0] && j <= posicaoFinal[1]; i++, j++){
                if(this.tabuleiro[i][j] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }
        // verifica se é possível ganhar pela diagonal inferior esquerda
        if(posicao[0]+3 < 8 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]+3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]-1; i <= posicaoFinal[0] && j >= posicaoFinal[1]; i++, j--){
                if(this.tabuleiro[i][j] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }
        // verifica se é possível ganhar pela diagonal superior esquerda
        if(posicao[0]-3 >= 0 && posicao[1]-3 >= 0) {
            let posicaoFinal = [posicao[0]-3, posicao[1]-3];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]-1; i >= posicaoFinal[0] && j >= posicaoFinal[1]; i--, j--){
                if(this.tabuleiro[i][j] === this.getJogadorAtual()){
                    contadorPecas++;
                }
            }
            if(contadorPecas === 4){
                return this.getJogadorAtual();
            }
        }

        return 0;
    }
    // -1 jogador, 1 ia
    getJogadorAtual(){
        if(QuatroEmLinha.jogadorInicial === 'jogador') {
            if ((this.turnoAtual % 2) === 0) {
                return 1;
            }
            return -1;
        }else {
            if ((this.turnoAtual % 2) === 0) {
                return -1;
            }
            return 1;
        }
    }

    clone(){
        let novo = new Estado();

        for(let i = 0; i < 8; i++){
            novo.proximasJogadas[i] = this.proximasJogadas[i];
            for(let j = 0; j < 8; j++){
                novo.tabuleiro[i][j] = this.tabuleiro[i][j];
            }
        }
        novo.turnoAtual = this.turnoAtual+1;

        return novo;
    }
}