class QuatroEmLinha{
    alfa = -10;
    beta = 10;
    estadoAtual = new Estado();

    dfs(estado, nivelMax, nivel){
        let retornoDFS, melhorJogada, indiceMelhorJogada;

        if(estado.jogadaAtual === 64 || nivel === 12){
            return;
        }
        let filhos = estado.geraFilhos();

        if(nivelMax){
            // MAX
            melhorJogada = -10;

            for (let i = 0; i < filhos.length; i++) {
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
        estado.melhorJogada = filhos[indiceMelhorJogada].posicaoJogada;
    }

}