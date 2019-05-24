let jogo = QuatroEmLinha.getInstance();

//jogo.estadoAtual = jogo.estadoAtual.gerarFilhos()[3].gerarFilhos()[0].gerarFilhos()[3].gerarFilhos()[1].gerarFilhos()[3].gerarFilhos()[2];

//jogo.estadoAtual = jogo.estadoAtual.gerarFilhos()[4].gerarFilhos()[0].gerarFilhos()[4].gerarFilhos()[1].gerarFilhos()[0];

//jogo.buscarMelhorColunaParaJogar();

//console.log(jogo.estadoAtual);



let divName;
for(let i=0; i < 8; i++) {
    for (let j=0; j < 8; j++) {
        divName = "posicao" + i + "-" + j;
        document.getElementById(divName).addEventListener("click", () => {
            jogo.efetuarJogadaJogador(j);
        });
    }
}



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