import numpy as np


class Estado:
    def __init__(self):
        self.altura_tabuleiro = 6  # Altura do tabuleiro
        self.largura_tabuleiro = 7  # Largura do tabuleiro

        self.tabuleiro = np.zeros([self.altura_tabuleiro, self.largura_tabuleiro], dtype=int)
        # Posições disponíveis para próximas jogadas em cada coluna
        self.posicao_proximas_jogadas = np.full((self.largura_tabuleiro,), self.altura_tabuleiro - 1)
        # Número de jogadas desde o início do jogo
        self.turno_atual = 0

    def eh_possivel_jogar(self, coluna):
        return self.posicao_proximas_jogadas[coluna] < self.altura_tabuleiro

    def jogar(self, coluna):
        self.tabuleiro[self.posicao_proximas_jogadas[coluna]][coluna] = 1 + (self.turno_atual % 2)
        self.posicao_proximas_jogadas[coluna] += 1
        self.turno_atual += 1

    def eh_jogada_vitoriosa(self, coluna):
        jogador_atual = 1 + (self.turno_atual % 2)

        if (self.posicao_proximas_jogadas[coluna] >= 3
                and self.tabuleiro[self.posicao_proximas_jogadas[coluna] - 1][coluna] == jogador_atual
                and self.tabuleiro[self.posicao_proximas_jogadas[coluna] - 2][coluna] == jogador_atual
                and self.tabuleiro[self.posicao_proximas_jogadas[coluna] - 3][coluna] == jogador_atual):
            return True

        # Itera horizontalmente (dy = 0) e verticalmente (dy = -1 ou dy = 1)
        for dy in range(-1, 2):
            numero_pecas = 0    # Contador numero de peças ao redor do jogador
            for dx in range(-1, 2, 2):
                x = coluna+dx
                y = self.posicao_proximas_jogadas[coluna]+(dx*dy)
                # Conta o número de peças contínuas a esquerda e depois à direita do jogador
                while (0 <= x < self.largura_tabuleiro
                       and 0 <= y < self.altura_tabuleiro
                       and self.tabuleiro[x][y] == jogador_atual):
                    numero_pecas += 1
            if numero_pecas >= 3:
                return True

        return False
