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
        return self.posicao_proximas_jogadas[coluna] >= 0

    def jogar(self, coluna):
        self.tabuleiro[self.posicao_proximas_jogadas[coluna]][coluna] = 1 + (self.turno_atual % 2)
        self.posicao_proximas_jogadas[coluna] -= 1
        self.turno_atual += 1

    def eh_jogada_vitoriosa(self, coluna):
        jogador_atual = 1 + (self.turno_atual % 2)
        linha = self.posicao_proximas_jogadas[coluna]

        # Verifica pela vertical (Baixo)
        if (linha + 3 < self.altura_tabuleiro
                and self.tabuleiro[linha + 1][coluna] == jogador_atual
                and self.tabuleiro[linha + 2][coluna] == jogador_atual
                and self.tabuleiro[linha + 3][coluna] == jogador_atual):
            return True

        # Verifica Direita
        if ((coluna >= 0 and coluna + 2 < self.largura_tabuleiro
             and self.tabuleiro[linha][coluna - 1] == jogador_atual
             and self.tabuleiro[linha][coluna + 1] == jogador_atual
             and self.tabuleiro[linha][coluna + 2] == jogador_atual)
                or (coluna + 3 < self.largura_tabuleiro
                    and self.tabuleiro[linha][coluna + 1] == jogador_atual
                    and self.tabuleiro[linha][coluna + 2] == jogador_atual
                    and self.tabuleiro[linha][coluna + 3] == jogador_atual
                )):
            return True

        # Verifica Esquerda
        if ((coluna + 1 < self.largura_tabuleiro and coluna - 2 >= 0
             and self.tabuleiro[linha][coluna + 1] == jogador_atual
             and self.tabuleiro[linha][coluna - 1] == jogador_atual
             and self.tabuleiro[linha][coluna - 2] == jogador_atual)
                or (coluna - 3 >= 0
                    and self.tabuleiro[linha][coluna - 1] == jogador_atual
                    and self.tabuleiro[linha][coluna - 2] == jogador_atual
                    and self.tabuleiro[linha][coluna - 3] == jogador_atual
                )):
            return True

        # Verifica diagonal superior direita
        if((linha + 1 < self.altura_tabuleiro and coluna - 1 >= 0
            and linha - 2 >= 0 and coluna + 2 < self.largura_tabuleiro
            and self.tabuleiro[linha + 1][coluna - 1] == jogador_atual
            and self.tabuleiro[linha - 1][coluna + 1] == jogador_atual
            and self.tabuleiro[linha - 2][coluna + 2] == jogador_atual)
                or (
                    linha - 3 >= 0 and coluna + 3 < self.largura_tabuleiro
                    and self.tabuleiro[linha - 1][coluna + 1] == jogador_atual
                    and self.tabuleiro[linha - 2][coluna + 2] == jogador_atual
                    and self.tabuleiro[linha - 3][coluna + 3] == jogador_atual
                )):
            return True

        # Verifica diagonal inferior direita
        if ((linha - 1 >= 0 and coluna - 1 >= 0
             and linha + 2 < self.altura_tabuleiro and coluna + 2 < self.largura_tabuleiro
             and self.tabuleiro[linha - 1][coluna - 1] == jogador_atual
             and self.tabuleiro[linha + 1][coluna + 1] == jogador_atual
             and self.tabuleiro[linha + 2][coluna + 2] == jogador_atual)
                or (
                        linha + 3 < self.altura_tabuleiro and coluna + 3 < self.largura_tabuleiro
                        and self.tabuleiro[linha + 1][coluna + 1] == jogador_atual
                        and self.tabuleiro[linha + 2][coluna + 2] == jogador_atual
                        and self.tabuleiro[linha + 3][coluna + 3] == jogador_atual
                )):
            return True

        # Verifica diagonal inferior esquerda
        if ((linha - 1 >= 0 and coluna + 1 < self.largura_tabuleiro
             and linha + 2 < self.altura_tabuleiro and coluna - 2 >= 0
             and self.tabuleiro[linha - 1][coluna + 1] == jogador_atual
             and self.tabuleiro[linha + 1][coluna - 1] == jogador_atual
             and self.tabuleiro[linha + 2][coluna - 2] == jogador_atual)
                or (
                        linha + 3 < self.altura_tabuleiro and coluna - 3 >= 0
                        and self.tabuleiro[linha + 1][coluna - 1] == jogador_atual
                        and self.tabuleiro[linha + 2][coluna - 2] == jogador_atual
                        and self.tabuleiro[linha + 3][coluna - 3] == jogador_atual
                )):
            return True

        # Verifica diagonal superior esquerda
        if ((linha + 1 < self.altura_tabuleiro and coluna + 1 < self.largura_tabuleiro
             and linha - 2 >= 0 and coluna - 2 >= 0
             and self.tabuleiro[linha + 1][coluna + 1] == jogador_atual
             and self.tabuleiro[linha - 1][coluna - 1] == jogador_atual
             and self.tabuleiro[linha - 2][coluna - 2] == jogador_atual)
                or (
                        linha - 3 >= 0 and coluna - 3 >= 0
                        and self.tabuleiro[linha - 1][coluna - 1] == jogador_atual
                        and self.tabuleiro[linha - 2][coluna - 2] == jogador_atual
                        and self.tabuleiro[linha - 3][coluna - 3] == jogador_atual
                )):
            return True

        return False
