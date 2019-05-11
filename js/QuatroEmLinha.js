class QuatroEmLinha{
    estadoAtual = new Estado();

    constructor(){
        //this.estadoAtual = new Estado();
    }

    dfs(estado, nivel){

        let retornoDFS = 0;

        if(estado.jogadaAtual === 64 || nivel === 8){
            return;
        }
        let filhos = estado.geraFilhos();

        let melhorJogada = null;

        if(nivel%2 !== 0){
            // Nivel impar (MAX)
            var minMaxFinal = -10;
        }else{
            // Nível par (MIN)
            var minMaxFinal = 10;
        }

        for (let i = 0; i < filhos.length; i++) {
            this.dfs(filhos[i], nivel+1);
            retornoDFS = filhos[i].minMax;

            if(nivel%2 !== 0){
                // Nível MAX
                if(retornoDFS >= minMaxFinal){
                    minMaxFinal = retornoDFS;
                }
            }else{
                // Nível MIN
                if(retornoDFS <= minMaxFinal){
                    minMaxFinal = retornoDFS;
                }
            }
            estado.minMax = minMaxFinal;
        }


        let indiceMelhorJogada = 0;
        for (let i = 0; i < filhos.length; i++) {
            if(filhos%2 !== 0){
                if(filhos[i].minMax > melhorJogada){
                    melhorJogada = filhos[i];
                    indiceMelhorJogada = i;
                }
            }else{
                if(filhos[i].minMax < melhorJogada){
                    melhorJogada = filhos[i];
                    indiceMelhorJogada = i;
                }
            }
        }

        estado.melhorJogada = filhos[indiceMelhorJogada].posicaoJogada;

        //return melhorJogada;
    }
}