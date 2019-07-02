from Estado import Estado
import copy


class QuatroEmLinha:
    def __init__(self):
        self.estado_atual = Estado()
        self.nivel_maximo_busca = 6

    def encontrar_solucao(self):
        return self.negamax(self.estado_atual)

    def negamax(self, estado, nivel=1, nivel_max=True):
        # Verifica se aconteceu um empate
        if estado.turno_atual == estado.altura_tabuleiro * estado.largura_tabuleiro:
            return 0, -1

        # Verifica se jogador pode vencer com próximo movimento
        for coluna in range(estado.largura_tabuleiro):
            if estado.eh_possivel_jogar(coluna) and estado.eh_jogada_vitoriosa(coluna):
                return int((estado.largura_tabuleiro*estado.altura_tabuleiro+1 - estado.turno_atual) / 2), coluna

        if nivel == self.nivel_maximo_busca:
            if nivel_max:
                return -50, -1
            else:
                return 50, -1

        # Inicia melhor pontuação com um valor muito pequeno
        melhor_pontuacao = -estado.altura_tabuleiro * estado.largura_tabuleiro
        coluna_melhor_pontuacao = -1

        for coluna in range(estado.largura_tabuleiro):
            if estado.eh_possivel_jogar(coluna):
                estado_novo = copy.deepcopy(estado)
                estado_novo.jogar(coluna)
                pontuacao, __ = self.negamax(estado_novo, nivel + 1, not nivel_max)
                pontuacao = -pontuacao
                if pontuacao > melhor_pontuacao:
                    melhor_pontuacao = pontuacao
                    coluna_melhor_pontuacao = coluna

        return melhor_pontuacao, coluna_melhor_pontuacao

    def ler_arquivo_jogadas(self, arquivo):
        arquivo = open(arquivo, "r")
        #lines = arquivo.readlines()

        lines = arquivo.read().split(' ')

        arquivo.close()