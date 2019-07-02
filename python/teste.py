from QuatroEmLinha import QuatroEmLinha

jogo = QuatroEmLinha()
jogo.estado_atual.carrega_sequencia_jogadas("1625", 0)

pontuacao, coluna_para_jogar = jogo.encontrar_solucao()
