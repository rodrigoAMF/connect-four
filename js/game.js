function clickColuna0(){
    alert("Você clicou na coluna 1!");
}

function clickColuna1(){
    alert("Você clicou na coluna 2!");
}

function clickColuna2(){
    alert("Você clicou na coluna 3!");
}

function clickColuna3(){
    alert("Você clicou na coluna 4!");
}

function clickColuna4(){
    alert("Você clicou na coluna 5!");
}

function clickColuna5(){
    alert("Você clicou na coluna 6!");
}

function clickColuna6(){
    alert("Você clicou na coluna 7!");
}

function clickColuna7(){
    alert("Você clicou na coluna 0!");
}

let divName = "";
for(let i=0; i < 8; i++) {
    for (let j=0; j < 8; j++) {
        divName = "posicao" + i + "-" + j;
        if (i === 0) {
            document.getElementById(divName).addEventListener("click", clickColuna0);
        } else if (i === 1) {
            document.getElementById(divName).addEventListener("click", clickColuna1);
        } else if (i === 2) {
            document.getElementById(divName).addEventListener("click", clickColuna2);
        } else if (i === 3) {
            document.getElementById(divName).addEventListener("click", clickColuna3);
        } else if (i === 4) {
            document.getElementById(divName).addEventListener("click", clickColuna4);
        } else if (i === 5) {
            document.getElementById(divName).addEventListener("click", clickColuna5);
        } else if (i === 6) {
            document.getElementById(divName).addEventListener("click", clickColuna6);
        } else if (i === 7) {
            document.getElementById(divName).addEventListener("click", clickColuna7);
        }

    }
}

/*
let jogo = new QuatroEmLinha();

let pai = new Estado();

let filhos = pai.geraFilhos()[0].geraFilhos()[0].geraFilhos();

console.log(filhos[0].jogadaAtual);

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