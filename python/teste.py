from QuatroEmLinha import QuatroEmLinha

jogo = QuatroEmLinha()
jogo.estado_atual.carrega_sequencia_jogadas("6146", 1)

pontuacao, coluna_para_jogar = jogo.encontrar_solucao()
