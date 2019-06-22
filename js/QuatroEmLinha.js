const QuatroEmLinha = {
    // ATRIBUTOS
    tabuleiro: [[0,0,0,0,0,0,0], // 6x7
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]],
    indicesDasLinhasParaProximasJogadas: [5,5,5,5,5,5,5],
    pecasIguaisParaVencer: 4,
    simbolos: {
        // ['Jogador', 'IA']
        jogadores: [-1, 1],
        indexDoTurno: 0,
        mudar() {
            this.indexDoTurno = (this.indexDoTurno === 0 ? 1 : 0);
        }
    },
    containerDoJogo: null,
    fimDeJogo: false,

    // FUNÇÕES
    init(containerDoJogo) {
        this.containerDoJogo = containerDoJogo;
    },

    ehFimDeJogo() {
        let linhasTotalmentePreenchidas = this.tabuleiro.reduce((valorAnterior ,linha) => {
            return valorAnterior + ( !linha.includes(0) ? 1 : 0 );
        }, 0);
        return (linhasTotalmentePreenchidas === 6);
    },

    jogoFinalizado() {
        this.fimDeJogo = true;
        alert("Fim de Jogo");
    },

    verificarVencedor(posicao) {
        const linha = posicao[0];
        const coluna = posicao[1];
        const jogadorAtual = this.simbolos.jogadores[this.simbolos.indexDoTurno];

        // Verifica para baixo
        let linhaFinal = linha+this.pecasIguaisParaVencer;
        let colunaFinal = coluna;
        let elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha-1, coluna) && jogadorAtual === this.tabuleiro[linha-1][coluna]){
            elementosIguais++;
        }
        for(let i = linha+1, j = coluna; this.verificarSeEhPosicaoValida(i, j) && i < linhaFinal; i++){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica para cima
        linhaFinal = linha-this.pecasIguaisParaVencer;
        colunaFinal = coluna;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha+1, coluna) && jogadorAtual === this.tabuleiro[linha+1][coluna]){
            elementosIguais++;
        }
        for(let i = linha-1, j = coluna; this.verificarSeEhPosicaoValida(i, j) && i > linhaFinal; i--){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica para direita
        linhaFinal = linha;
        colunaFinal = coluna+this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha, coluna-1) && jogadorAtual === this.tabuleiro[linha][coluna-1]){
            elementosIguais++;
        }
        for(let i = linha, j = coluna+1; this.verificarSeEhPosicaoValida(i, j) && j < colunaFinal; j++){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica para esquerda
        linhaFinal = linha;
        colunaFinal = coluna-this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha, coluna+1) && jogadorAtual === this.tabuleiro[linha][coluna+1]){
            elementosIguais++;
        }
        for(let i = linha, j = coluna-1; this.verificarSeEhPosicaoValida(i, j) && j > colunaFinal; j--){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica pela diagonal superior direita
        linhaFinal = linha-this.pecasIguaisParaVencer;
        colunaFinal = coluna+this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha+1, coluna-1) && jogadorAtual === this.tabuleiro[linha+1][coluna-1]){
            elementosIguais++;
        }
        for(let i = linha-1, j = coluna+1; this.verificarSeEhPosicaoValida(i, j) && j < colunaFinal; i--, j++){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica pela diagonal inferior esquerda
        linhaFinal = linha+this.pecasIguaisParaVencer;
        colunaFinal = coluna-this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha-1, coluna+1) && jogadorAtual === this.tabuleiro[linha-1][coluna+1]){
            elementosIguais++;
        }
        for(let i = linha+1, j = coluna-1; this.verificarSeEhPosicaoValida(i, j) && j > colunaFinal; i++, j--){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica pela diagonal superior esquerda
        linhaFinal = linha-this.pecasIguaisParaVencer;
        colunaFinal = coluna-this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha+1, coluna+1) && jogadorAtual === this.tabuleiro[linha+1][coluna+1]){
            elementosIguais++;
        }
        for(let i = linha-1, j = coluna-1; this.verificarSeEhPosicaoValida(i, j) && i > linhaFinal; i--, j--){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Verifica pela diagonal inferior direita
        linhaFinal = linha+this.pecasIguaisParaVencer;
        colunaFinal = coluna+this.pecasIguaisParaVencer;
        elementosIguais = 1;
        if(this.verificarSeEhPosicaoValida(linha-1, coluna-1) && jogadorAtual === this.tabuleiro[linha-1][coluna-1]){
            elementosIguais++;
        }
        for(let i = linha+1, j = coluna+1; this.verificarSeEhPosicaoValida(i, j) && i < linhaFinal; i++, j++){
            if(jogadorAtual === this.tabuleiro[i][j]){
                elementosIguais++;
                if(elementosIguais === 4){
                    return jogadorAtual;
                }
            }
        }

        // Sem vencedor
        return 0;
    },

    verificarSeEhPosicaoValida(i, j){
        return (i >= 0 && i < this.tabuleiro.length && j >= 0 && j < this.tabuleiro[0].length);
    },

    iniciarNovoJogo() {
        this.tabuleiro.map((linha) => linha.fill(0));
        this.desenharTabuleiro();
        this.indicesDasLinhasParaProximasJogadas.fill((this.tabuleiro.length-1));
        this.simbolos.indexDoTurno = 0;
        this.fimDeJogo = false;
    },

    // TODO: Impedir jogada do jogador enquanto IA não jogar
    realizarJogada(colunaJogada) {
        let linhaJogada = this.indicesDasLinhasParaProximasJogadas[colunaJogada];
        if (linhaJogada < 0 || this.fimDeJogo || this.tabuleiro[linhaJogada][colunaJogada] !== 0 || this.indexDoTurno === 1)
            return false;

        this.tabuleiro[linhaJogada][colunaJogada] = this.simbolos.jogadores[this.simbolos.indexDoTurno];
        this.indicesDasLinhasParaProximasJogadas[colunaJogada]--;
        this.desenharTabuleiro();

        if (this.ehFimDeJogo()) {
            this.jogoFinalizado();
        }
        const vencedor = this.verificarVencedor([linhaJogada, colunaJogada]);
        if (vencedor === -1 || vencedor === 1) {
            this.jogoFinalizado();
            // TODO: Estilizar sequencia vitoriosa
        } else {
            this.simbolos.mudar();
        }
        const tamanhoTabuleiro = [this.tabuleiro.length, this.tabuleiro[0].length];
        const url = "http://localhost:5000?tamanho_tabuleiro=" + tamanhoTabuleiro.toString()
            + "&tabuleiro=" + this.tabuleiro.toString();


        // Realiza Jogada IA
        let me = this;
        $.getJSON(url, function(data){
            if(data.status !== 200){
                throw "Erro: falha ao realizar comunicação com Python";
            }
            linhaJogada = me.indicesDasLinhasParaProximasJogadas[data.melhorColunaParaJogar];
            let colunaJogada = data.melhorColunaParaJogar;
            if (linhaJogada < 0 || me.fimDeJogo || me.tabuleiro[linhaJogada][colunaJogada] !== 0)
                return false;

            me.tabuleiro[linhaJogada][colunaJogada] = me.simbolos.jogadores[me.simbolos.indexDoTurno];
            me.indicesDasLinhasParaProximasJogadas[colunaJogada]--;
            me.desenharTabuleiro();

            if (me.ehFimDeJogo()) {
                me.jogoFinalizado();
            }
            const vencedor = me.verificarVencedor([linhaJogada, colunaJogada]);
            if (vencedor === -1 || vencedor === 1) {
                me.jogoFinalizado();
                // TODO: Estilizar sequencia vitoriosa
            } else {
                me.simbolos.mudar();
            }
        });

        return true;
    },

    desenharTabuleiro (){
        let html = "";
        for(let i = 0; i < this.tabuleiro.length; i++){
            for(let j = 0; j < this.tabuleiro[i].length; j++){
                html += `<div onclick="QuatroEmLinha.realizarJogada(${j});">`;
                if(this.tabuleiro[i][j] !== 0){
                    html += this.tabuleiro[i][j];
                }
                html += "</div>";
            }
        }
        this.containerDoJogo.innerHTML = html;
    }
};