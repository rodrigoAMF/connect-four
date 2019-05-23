class QuatroEmLinha{
    alfa;
    beta;
    nivelMaximoDFS;
    estadoAtual;
    // Jogador que jogou neste estado (-1 = jogador1, 1=jogador2/IA)
    static jogadorAtual;
    static instance = null;
    // 'ia', 'jogador'
    static jogadorInicial;

    constructor(){
        this.estadoAtual = new Estado();
        QuatroEmLinha.jogadorInicial = 'jogador';
        this.alfa = -10;
        this.beta = 10;
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new QuatroEmLinha();
        }
        return this.instance;
    }

    dfs(estado, nivelMax, nivel){
        let retornoDFS, melhorJogada, indiceMelhorJogada;

        if(estado.getJogadorAtual() === 64 || nivel === this.nivelMaximoDFS || estado.fimDeJogo){
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
                if(filhos[i].min)
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

    async efetuaJogadaIA(){
        jogo.dfs(jogo.estadoAtual, true, 1);

        jogo.estadoAtual.efetuaJogada(jogo.estadoAtual.melhorJogada, jogo.estadoAtual.getJogadorAtual());

        await jogo.sleep(1);
        /*if(jogo.estadoAtual.fimDeJogo){
            alert("IA Venceu!");
            return;
        }*/

        QuatroEmLinha.jogadorAtual = -1;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async efetuaJogadaJogador(posicaoJogada){
        if(jogo.estadoAtual.getJogadorAtual() === -1 && jogo.estadoAtual.tabuleiro[jogo.estadoAtual.proximasJogadas[posicaoJogada]][posicaoJogada] === 0){
            jogo.estadoAtual.efetuaJogada(posicaoJogada, jogo.estadoAtual.getJogadorAtual());

            QuatroEmLinha.jogadorAtual = 1;

            await jogo.sleep(1);
            /*if(jogo.estadoAtual.fimDeJogo) {
                alert("Jogador Venceu!");
                return;
            }*/

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