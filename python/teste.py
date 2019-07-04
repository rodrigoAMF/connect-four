from QuatroEmLinha import QuatroEmLinha

def printa():
    print(jogo.printa_bits(jogo.estado_atual.tabuleiro[0]))
    print(jogo.printa_bits_matriz(jogo.estado_atual.tabuleiro[0]))
    print(jogo.estado_atual.posicao_proximas_jogadas)


jogo = QuatroEmLinha()
jogo.estado_atual.jogar(1)
#jogo.estado_atual.carrega_sequencia_jogadas("263616")

jogo.printa_bits((jogo.estado_atual.tabuleiro[0] ^ jogo.estado_atual.tabuleiro[1]) & jogo.estado_atual.top_mask(0))

pontuacao, coluna_para_jogar, responsavel_pela_jogada = jogo.encontrar_solucao()
