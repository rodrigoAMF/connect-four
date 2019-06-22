from QuatroEmLinha import QuatroEmLinha

jogo = QuatroEmLinha()

jogo.estadoAtual = jogo.estadoAtual.efetuarJogada(jogo.estadoAtual.turnoAtual+1, [5,0])

jogo.buscarMelhorColunaParaJogar()

print(jogo.estadoAtual.melhorColunaParaJogar)