from QuatroEmLinha import QuatroEmLinha

jogo = QuatroEmLinha()

jogo.estado_atual.jogar(1)
jogo.estado_atual.jogar(6)
jogo.estado_atual.jogar(2)
jogo.estado_atual.jogar(5)
jogo.estado_atual.jogar(3)


solucao = jogo.encontrar_solucao()
