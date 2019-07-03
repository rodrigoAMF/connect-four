from QuatroEmLinha import QuatroEmLinha

def printa():
    print(jogo.printa_bits(jogo.estado_atual.tabuleiro[0]))
    print(jogo.printa_bits_matriz(jogo.estado_atual.tabuleiro[0]))
    print(jogo.estado_atual.posicao_proximas_jogadas)


jogo = QuatroEmLinha()
jogo.estado_atual.carrega_sequencia_jogadas("1625", 1)
#printa()
#jogo.estado_atual.eh_jogada_vitoriosa(2)
'''jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.jogar(0)
jogo.estado_atual.desfazer_jogada()

jogo.printa_bits((jogo.estado_atual.tabuleiro[0] ^ jogo.estado_atual.tabuleiro[1]) & jogo.estado_atual.top_mask(0))
'''
pontuacao, coluna_para_jogar = jogo.encontrar_solucao()
