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

/*
class QuatroEmLinha{
    static instance = null;

    constructor(){
        this.reset();
    }

    reset(){
        this.tamanhoTabuleiro = [8, 8];
        this.tabuleiro = [];
        for(let i = 0; i < this.tamanhoTabuleiro[0]; i++){
            this.tabuleiro.push([]);
            for(let j = 0; j < this.tamanhoTabuleiro[1]; j++){
                this.tabuleiro[i].push(0);
            }
        }
        // Locais onde é possível realizar a próxima jogada
        this.proximasJogadas = [];
        for(let i = 0; i < this.tamanhoTabuleiro[1]; i++){
            this.proximasJogadas.push(this.tamanhoTabuleiro[1]-1);
        }
        this.pecasIguaisParaVencer = 4;
        this.turnoAtual = 0;
        // -1 Jogador, 1 IA
        this.jogadorAtual = -1;
        this.inicioDeJogo = true;
        this.fimDeJogo = false;

        // TODO: limpar background das peças no tabuleiro
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new QuatroEmLinha();
        }
        return this.instance;
    }

    // Gera uma url para efetuar a requisição ao python
    // retorna: string com URL
    gerarUrl() {
        let parametros = "?tamanho_tabuleiro=" + this.estadoAtual.tamanhoTabuleiro.toString() + "&tabuleiro=" +
            this.tabuleiro.toString();

        return "http://localhost:5000" + parametros;
    }

    // Efetua uma jogada em uma posicão (x,x)
    // return: flag indicando se existe vencedor ou não
    efetuarJogada(posicaoJogada){
        // Atualiza variáveis do estadoAtual
        this.tabuleiro[posicaoJogada[0]][posicaoJogada[1]] = this.jogadorAtual;
        this.pintaPecaDoTabuleiro(posicaoJogada);
        this.jogadorAtual = ((this.jogadorAtual === 1) ? -1 : 1);
        this.proximasJogadas[posicaoJogada[1]]--;
        this.inicioDeJogo = false;
        this.turnoAtual++;
        // Verifica se existe vencedor
        return this.verificarVencedor();
    }

    // Chamar sempre em um estado com jogadorAtual = -1 (TEST)
    efetuarJogadaIA() {
        if(this.fimDeJogo) return;
        if(this.jogadorAtual === -1){
            let url = this.gerarUrl();

            $.getJSON(url, function(data){
                if(data.status !== 200){
                    throw "Erro: falha ao realizar comunicação com Python";
                }
                let posicaoJogada = [jogo.proximasJogadas[data.melhorColunaParaJogar], data.melhorColunaParaJogar];
                console.log(posicaoJogada);

                jogo.pintaPecaDoTabuleiro(posicaoJogada);
                let vencedor = jogo.efetuarJogada(posicaoJogada);

                if(this.fimDeJogo){
                    if(vencedor === -1){
                        alert("Fim de jogo: IA Venceu!");
                    }else{
                        // Vecendor = -2 (empate)
                        alert("Fim de jogo: Empate!");
                    }
                }
            });
        }else{
            throw "Erro: a busca pela melhor jogada só pode se efetuada após o Jogador jogar";
        }


    }

    // TEST
    efetuarJogadaJogador(colunaJogada) {
        if(this.fimDeJogo) return;
        if(this.jogadorAtual === 1 || this.inicioDeJogo){
            let posicaoJogada = [this.proximasJogadas[colunaJogada], colunaJogada];

            let vencedor = this.efetuarJogada(posicaoJogada);
            console.log(this.jogadorAtual);

            if(this.fimDeJogo){
                if(vencedor === 1){
                    alert("Fim de jogo: Jogador Venceu!");
                }else{
                    // Vecendor = -2 (empate)
                    alert("Fim de jogo: Empate!");
                }
            }
        }
    }

    pintaPecaDoTabuleiro(posicaoJogada) {
        let idPosicao = "posicao" + posicaoJogada[0] + "-" + posicaoJogada[1];
        if(this.jogadorAtual === 1){
            document.getElementById(idPosicao).className = "jogadorJogou";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "none";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "block";
        }else{
            document.getElementById(idPosicao).className = "iaJogou";
            document.getElementsByClassName("fundoComputador")[0].style["display"] = "none";
            document.getElementsByClassName("fundoPessoa")[0].style["display"] = "block";
        }
    }

    // TODO: TEST
    // retorna vecendor do estadoAtual e seta fimDejJogo para true caso exista um evencedor
    // return: 0 -> Empate
    //         1 -> IA Venceu
    //        -1 -> Jogador Venceu
    verificarVencedor() {
        if(this.inicioDeJogo){
            return 0;
        }
        let vencedor = 0;
        // Verifica se existe vencedor a partir de todas as posições (Pode ser otimizado)
        for(let i = 0; i < this.tamanhoTabuleiro[0]; i++){
            for(let j = 0; j < this.tamanhoTabuleiro[1]; j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    vencedor = this.verificarVencedorEmPosicaoEspecifica([i, j]);
                    // Encontrado um vencedor
                    if(vencedor !== 0){
                        this.fimDeJogo = true;
                        return vencedor;
                    }
                }
            }
        }
        // Ninguém venceu
        if(this.turnoAtual === this.tamanhoTabuleiro[0]*this.tamanhoTabuleiro[1]){
            this.fimDeJogo = true;
            return -2;
        }
        // Jogo sem vencedor até então
        return vencedor;
    }

    // TODO: TEST
    verificarVencedorEmPosicaoEspecifica(posicao) {
        // verifica se é possível ganhar pela direita
        if(posicao[1]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1]) {
            let posicaoFinal = [posicao[0], posicao[1]+(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[1]+1; i <= posicaoFinal[1]; i++){

                if(this.tabuleiro[posicao[0]][i] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === this.pecasIguaisParaVencer){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela esquerda
        if(posicao[1]-(this.pecasIguaisParaVencer-1) >= 0) {
            let posicaoFinal = [posicao[0], posicao[1]-(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[1]-1; i >= posicaoFinal[1]; i--){
                if(this.tabuleiro[posicao[0]][i] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar por cima
        if(posicao[0]-(this.pecasIguaisParaVencer-1) >= 0) {

            let posicaoFinal = [posicao[0]-(this.pecasIguaisParaVencer-1), posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]-1; i >= posicaoFinal[0]; i--){
                if(this.tabuleiro[i][posicao[1]] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar por baixo
        if(posicao[0]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1]) {
            let posicaoFinal = [posicao[0]+(this.pecasIguaisParaVencer-1), posicao[1]];
            let contadorPecas = 1;

            for(let i = posicao[0]+1; i <= posicaoFinal[0]; i++){
                if(this.tabuleiro[i][posicao[1]] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }

        // verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-(this.pecasIguaisParaVencer-1) >= 0 && posicao[1]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1]) {
            let posicaoFinal = [posicao[0]-(this.pecasIguaisParaVencer-1), posicao[1]+(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]+1; i >= posicaoFinal[0] && j <= posicaoFinal[1]; i--, j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior direita
        if(posicao[0]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1] && posicao[1]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1]) {
            let posicaoFinal = [posicao[0]+(this.pecasIguaisParaVencer-1), posicao[1]+(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]+1; i <= posicaoFinal[0] && j <= posicaoFinal[1]; i++, j++){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal inferior esquerda
        if(posicao[0]+(this.pecasIguaisParaVencer-1) < this.tamanhoTabuleiro[1] && posicao[1]-(this.pecasIguaisParaVencer-1) >= 0) {
            let posicaoFinal = [posicao[0]+(this.pecasIguaisParaVencer-1), posicao[1]-(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[0]+1, j = posicao[1]-1; i <= posicaoFinal[0] && j >= posicaoFinal[1]; i++, j--){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }
        // verifica se é possível ganhar pela diagonal superior esquerda
        if(posicao[0]-(this.pecasIguaisParaVencer-1) >= 0 && posicao[1]-(this.pecasIguaisParaVencer-1) >= 0) {
            let posicaoFinal = [posicao[0]-(this.pecasIguaisParaVencer-1), posicao[1]-(this.pecasIguaisParaVencer-1)];
            let contadorPecas = 1;

            for(let i = posicao[0]-1, j = posicao[1]-1; i >= posicaoFinal[0] && j >= posicaoFinal[1]; i--, j--){
                if(this.tabuleiro[i][j] === this.jogadorAtual){
                    contadorPecas++;
                }
            }
            if(contadorPecas === (this.pecasIguaisParaVencer)){
                return this.jogadorAtual;
            }
        }
        return 0;
    }
}
*/