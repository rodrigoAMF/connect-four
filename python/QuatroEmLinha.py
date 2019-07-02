from Estado import Estado
import copy
import time


class QuatroEmLinha:
    def __init__(self):
        self.estado_atual = Estado()
        self.nivel_maximo_busca = 11
        self.nos_explorados = 0

    def encontrar_solucao(self):
        start = time.time()
        self.nos_explorados = 0

        alfa = -int((self.estado_atual.largura_tabuleiro*self.estado_atual.altura_tabuleiro)/2)
        beta = int((self.estado_atual.largura_tabuleiro*self.estado_atual.altura_tabuleiro)/2)
        melhor_pontuacao, coluna_melhor_pontuacao = self.negamax(self.estado_atual, alfa, beta)

        end = time.time()
        print(str(self.nos_explorados) + " Nós explorados em " + str(end - start) + " s")

        return melhor_pontuacao, coluna_melhor_pontuacao

    # Retorna pontuacao e melhor coluna para se jogar
    def negamax(self, estado, alfa, beta, nivel=1, nivel_max=True):
        self.nos_explorados += 1
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
        valor_maximo = int((estado.altura_tabuleiro * estado.largura_tabuleiro)/2)
        if beta > valor_maximo:
            beta = valor_maximo
            if alfa >= beta:
                return beta, -1
        coluna_melhor_pontuacao = -1
        for coluna in range(estado.largura_tabuleiro):
            if estado.eh_possivel_jogar(coluna):
                estado_novo = copy.deepcopy(estado)
                estado_novo.jogar(coluna)
                pontuacao, __ = self.negamax(estado_novo, -beta, -alfa, nivel + 1, not nivel_max)
                pontuacao = -pontuacao
                if pontuacao >= beta:
                    return pontuacao, coluna
                if pontuacao > alfa:
                    alfa = pontuacao
                    coluna_melhor_pontuacao = coluna

        return alfa, coluna_melhor_pontuacao
