adicionaClick();
var jogadorAtual = -1;  // -1 jogador | 1 IA
var qntPecasColuna = [5,5,5,5,5,5,5];
document.getElementsByClassName("fundoPessoa")[0].style["visibility"] = "visible";
document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "hidden";


//Adiciona efeito de click em todas as div e seleciona a coluna
function adicionaClick(){
  let divName = "";
  for(let i=0; i < 7; i++) {
      for (let j=0; j < 6; j++) {
          divName = "posicao" + j + "-" + i;
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
}


function clickColuna0(){
    if(qntPecasColuna[0] >= 0){selecionaJogador(0);}
}

function clickColuna1(){
    if(qntPecasColuna[1] >= 0){selecionaJogador(1);}
}

function clickColuna2(){
    if(qntPecasColuna[2] >= 0){selecionaJogador(2);}
}

function clickColuna3(){
    if(qntPecasColuna[3] >= 0){selecionaJogador(3);}
}

function clickColuna4(){
    if(qntPecasColuna[4] >= 0){selecionaJogador(4);}
}

function clickColuna5(){
    if(qntPecasColuna[5] >= 0){selecionaJogador(5);}
}

function clickColuna6(){
    if(qntPecasColuna[6] >= 0){selecionaJogador(6);}
}

function selecionaJogador(coluna){
    if(jogadorAtual === -1){ // vez do jogador

        var div = $(".bolinhaDesce"); //350 a 14
        div.animate({bottom:  (14*(1+(6*(qntPecasColuna[coluna]-5))))+'px'},  800, "linear");
        setInterval(pintaBolinha, 800);


        qntPecasColuna[coluna]--;
        document.getElementsByClassName("fundoPessoa")[0].style["visibility"] = "visible";
        document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "hidden";
    }else{ // vez da IA

        document.getElementById("posicao"+qntPecasColuna[coluna]+"-"+coluna).style.backgroundColor  = "#8b0000";
        qntPecasColuna[coluna]--;
        document.getElementsByClassName("fundoComputador")[0].style["visibility"] = "visible";
        document.getElementsByClassName("fundoPessoa")[0].style["visibility"] = "hidden";
    }
    jogadorAtual = (this.jogadorAtual === -1) ? 1 : -1;
}

function pintaBolinha(){
  document.getElementById("posicao"+qntPecasColuna[coluna]+"-"+coluna).style.backgroundColor  = "#008b8b"
}
