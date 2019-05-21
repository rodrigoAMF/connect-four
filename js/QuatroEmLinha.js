class QuatroEmLinha{
    alfa = -10;
    beta = 10;
    nivelMaximoDFS = 2;
    estadoAtual = new Estado();
    jogadorAtual = -1;

    constructor(nivelMaximoDFS){
        this.nivelMaximoDFS = nivelMaximoDFS;
    }

    dfs(estado, nivelMax, nivel){
        //console.log(nivel);
        let retornoDFS, melhorJogada, indiceMelhorJogada;

        if(estado.jogadaAtual === 64 || nivel === this.nivelMaximoDFS || estado.fimDeJogo){
            return;
        }
        let filhos = estado.geraFilhos();

        if(nivelMax){
            // MAX
            melhorJogada = -10;

            for (let i = 0; i < filhos.length; i++) {
                if(filhos[i].fimDeJogo !== 1){
                    this.dfs(filhos[i], false,nivel + 1);
                    retornoDFS = filhos[i].minMax;

                    if (retornoDFS > melhorJogada) {
                        melhorJogada = retornoDFS;
                        indiceMelhorJogada = i;
                    }
                    if (melhorJogada > this.alfa) {
                        this.alfa = melhorJogada;
                    }
                    if (melhorJogada >= this.beta) {
                        break;
                    }
                }

            }
        }else{
            // MIN
            melhorJogada = 10;

            for (let i = 0; i < filhos.length; i++) {
                this.dfs(filhos[i], true,nivel + 1);
                retornoDFS = filhos[i].minMax;

                if (retornoDFS < melhorJogada) {
                    melhorJogada = retornoDFS;
                    indiceMelhorJogada = i;
                }
                if (melhorJogada > this.beta) {
                    this.beta = melhorJogada;
                }
                if (melhorJogada <= this.alfa) {
                    break;
                }
            }
        }
        estado.minMax = melhorJogada;
        estado.melhorJogada = filhos[indiceMelhorJogada].posicaoJogada[1];
    }

    efetuaJogadaIA(){
        this.dfs(this.estadoAtual, true, 1);

        this.estadoAtual.efetuaJogada(this.estadoAtual.melhorJogada, this.jogadorAtual);

        console.log("IA: ");
        console.log(this.estadoAtual);

        if(jogo.estadoAtual.fimDeJogo){
            alert("IA Venceu!");
            return;
        }

        this.jogadorAtual = -1;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async efetuaJogadaJogador(posicaoJogada){
        if(jogo.jogadorAtual === -1 && jogo.estadoAtual.tabuleiro[jogo.estadoAtual.proximasJogadas[posicaoJogada]][posicaoJogada] === 0){
            jogo.estadoAtual.efetuaJogada(posicaoJogada, jogo.jogadorAtual);

            console.log("Jogador: ");
            console.log(this.estadoAtual);

            if(jogo.estadoAtual.fimDeJogo){
                alert("Jogador Venceu!");
                return;
            }


            jogo.jogadorAtual = 1;

            await jogo.sleep(1);

            jogo.efetuaJogadaIA();
        }
    }

    clickColuna0(){
        jogo.efetuaJogadaJogador(0);
    }

    clickColuna1(){
        jogo.efetuaJogadaJogador(1);
    }

    clickColuna2(){
        jogo.efetuaJogadaJogador(2);
    }

    clickColuna3(){
        jogo.efetuaJogadaJogador(3);
    }

    clickColuna4(){
        jogo.efetuaJogadaJogador(4);
    }

    clickColuna5(){
        jogo.efetuaJogadaJogador(5);
    }

    clickColuna6(){
        jogo.efetuaJogadaJogador(6);
    }

    clickColuna7(){
        jogo.efetuaJogadaJogador(7);
    }
}