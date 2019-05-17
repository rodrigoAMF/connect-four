let jogo = new QuatroEmLinha(13);

jogo.estadoAtual = new Estado();

let divName;
for(let i=0; i < 8; i++) {
    for (let j=0; j < 8; j++) {
        divName = "posicao" + i + "-" + j;
        if (j === 0) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna0);
        } else if (j === 1) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna1);
        } else if (j === 2) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna2);
        } else if (j === 3) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna3);
        } else if (j === 4) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna4);
        } else if (j === 5) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna5);
        } else if (j === 6) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna6);
        } else if (j === 7) {
            document.getElementById(divName).addEventListener("click", jogo.clickColuna7);
        }

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