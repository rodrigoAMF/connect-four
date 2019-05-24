class QuatroEmLinha{
    static instance = null;

    constructor(){
        this.estadoAtual = new Estado(0, null, true);
        this.alfa = -10;
        this.beta = 10;
        // Quantos níveis a partir do atual o MiniMax irá considerar
        // para buscar a melhor coluna para se jogar
        this.pronfundidadeBusca = 4;
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new QuatroEmLinha();
        }
        return this.instance;
    }
    // Chamar sempre em um estado com jogadorAtual = -1
    buscarMelhorColunaParaJogar(){
        if(this.estadoAtual.jogadorAtual === -1)
            this.miniMax(this.estadoAtual, this.estadoAtual.turnoAtual+this.pronfundidadeBusca, true);
        else
            throw "Erro: a busca pela melhor jogada só pode se efetuada após o Jogador jogar";
    }

    // MiniMax com poda alfa e beta (DFS Limitada)
    miniMax(estadoAtual, turnoFinalBusca, ehNivelMax){
        let melhorMinMax, minMaxEncontradoNaBusca, melhorColunaParaJogar;

        //console.log(estadoAtual.minMax);

        if(estadoAtual.fimDeJogo || estadoAtual.turnoAtual === 64 || estadoAtual.turnoAtual === turnoFinalBusca){
            estadoAtual.minMax = (estadoAtual.minMax == null) ? 0 : estadoAtual.minMax;
            return;
        }

        let filhos = estadoAtual.gerarFilhos();

        //console.log(filhos);

        if(ehNivelMax){
            // Estado MAX (Procura minimizar o MinMax)
            melhorMinMax = -10;

            for (let i = 0; i < filhos.length; i++) {
                this.miniMax(filhos[i], turnoFinalBusca,false);
                minMaxEncontradoNaBusca = filhos[i].minMax;

                if (minMaxEncontradoNaBusca > melhorMinMax) {
                    melhorMinMax = minMaxEncontradoNaBusca;
                    melhorColunaParaJogar = filhos[i].posicaoJogada[1];
                }
                if (melhorMinMax > this.alfa) {
                    this.alfa = melhorMinMax;
                }
                /*if (melhorMinMax >= this.beta) {
                    break;
                }*/
            }
        }else{
            // Estado MIN (Procura manimizar o MinMax)
            melhorMinMax = 10;

            for (let i = 0; i < filhos.length; i++) {
                this.miniMax(filhos[i], turnoFinalBusca,true);
                minMaxEncontradoNaBusca = filhos[i].minMax;

                if (minMaxEncontradoNaBusca < melhorMinMax) {
                    melhorMinMax = minMaxEncontradoNaBusca;
                    melhorColunaParaJogar = filhos[i].posicaoJogada[1];
                }
                if (melhorMinMax > this.beta) {
                    this.beta = melhorMinMax;
                }
                /*if (melhorMinMax <= this.alfa) {
                    break;
                }*/
            }
        }
        estadoAtual.minMax = melhorMinMax;
        estadoAtual.melhorColunaParaJogar = melhorColunaParaJogar;
    }

    efetuarJogadaIA(){
        this.buscarMelhorColunaParaJogar();

        let posicaoJogada = [this.estadoAtual.proximasJogadas[this.estadoAtual.melhorColunaParaJogar],
                    this.estadoAtual.melhorColunaParaJogar];

        this.pintaPecaDoTabuleiro(posicaoJogada);
        this.estadoAtual = this.estadoAtual.efetuarJogada(this.estadoAtual.turnoAtual+1, posicaoJogada);

        if(this.estadoAtual.fimDeJogo){
            alert("Fim de jogo: IA Venceu!");
            this.estadoAtual.jogadorAtual = -3;
        }
    }

    efetuarJogadaJogador(colunaJogada){
        if(this.estadoAtual.jogadorAtual === 1 || this.estadoAtual.inicioDeJogo){
            let posicaoJogada = [this.estadoAtual.proximasJogadas[colunaJogada], colunaJogada];

            this.pintaPecaDoTabuleiro(posicaoJogada);
            this.estadoAtual = this.estadoAtual.efetuarJogada(this.estadoAtual.turnoAtual+1, posicaoJogada);

            if(this.estadoAtual.fimDeJogo){
                alert("Fim de jogo: Jogador Venceu!");
                this.estadoAtual.jogadorAtual = -3;
            }

            this.efetuarJogadaIA();
        }
    }

    pintaPecaDoTabuleiro(posicaoJogada){
        let idPosicao = "posicao" + posicaoJogada[0] + "-" + posicaoJogada[1];
        if(this.estadoAtual.jogadorAtual === -1){
            document.getElementById(idPosicao).className = "jogadorJogou";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "none";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "block";
        }else{
            document.getElementById(idPosicao).className = "iaJogou";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "none";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "block";
        }
    }
}