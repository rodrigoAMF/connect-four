let jogo = QuatroEmLinha.getInstance();

console.log(jogo.estadoAtual);
console.log(jogo.estadoAtual.gerarFilhos());


//jogo.estadoAtual = jogo.estadoAtual.gerarFilhos()[3].gerarFilhos()[0].gerarFilhos()[3].gerarFilhos()[1].gerarFilhos()[3].gerarFilhos()[2];

//jogo.estadoAtual = jogo.estadoAtual.gerarFilhos()[4].gerarFilhos()[0].gerarFilhos()[4].gerarFilhos()[1].gerarFilhos()[0];

//jogo.buscarMelhorColunaParaJogar();

//console.log(jogo.estadoAtual);

function geraTabuleiro(){
    let tabuleiro = $(".tabuleiro");
    let stringHTML = "";
    for(let i=0; i < jogo.estadoAtual.tamanhoTabuleiro; i++) {
        stringHTML += "<div class='linha line-" + i + "'>";
        for (let j = 0; j < jogo.estadoAtual.tamanhoTabuleiro; j++) {
            stringHTML += "<div id='posicao" + i + "-" + j + "'></div>";
        }
        stringHTML += "</div>";
    }

    tabuleiro.html(stringHTML);
}

function bindClickColunas(){
    let divName;
    for(let i=0; i < jogo.estadoAtual.tamanhoTabuleiro; i++) {
        for (let j=0; j < jogo.estadoAtual.tamanhoTabuleiro; j++) {
            divName = "posicao" + i + "-" + j;
            document.getElementById(divName).addEventListener("click", () => {
                jogo.efetuarJogadaJogador(j);
            });
        }
    }
}

geraTabuleiro();
bindClickColunas();

/*let start = performance.now();

jogo.dfs(jogo.estadoAtual, true,1);

let end = performance.now();
let duration = (end - start)/(10**3);
duration = duration.toFixed(2);

alert("Finalizado execução da DFS com " + jogo.nivelMaximoDFS + " níveis de profundidade em " + duration + " segundos");
*/

/*
let pai = new Estado();

let filhos = pai.geraFilhos()[0].geraFilhos()[0].geraFilhos()[0].geraFilhos();

console.log(filhos);



let string = "1234567812345678123456781234567812345678123456781234567812345678";

console.log(string);

console.log(string[2]);

string[2] = "5";

console.log(string[2]);
*/
/*
jogo.dfs(jogo.estadoAtual, 1);

let melhor = jogo.estadoAtual.melhorJogada;

console.log(melhor);
*/