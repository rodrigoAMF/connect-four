class Estado:
    def __init__(self):
        self.altura_tabuleiro = 6   # Altura do tabuleiro
        self.largura_tabuleiro = 7  # Largura do tabuleiro

        # bitboard
        self.tabuleiro = [0, 0]
        # Posições disponíveis para próximas jogadas em cada coluna
        self.posicao_proximas_jogadas = []
        for coluna in range(self.largura_tabuleiro):
            self.posicao_proximas_jogadas.append(coluna * 7)
        # Número de jogadas desde o início do jogo
        self.turno_atual = 0
        self.jogadas = [None] * ((self.largura_tabuleiro * self.altura_tabuleiro) + 1)

    def eh_possivel_jogar(self, coluna):
        mascara = self.tabuleiro[0] ^ self.tabuleiro[1]
        return mascara & self.top_mask(coluna) == 0

    def jogar(self, coluna):
        jogada = 1 << self.posicao_proximas_jogadas[coluna]
        self.posicao_proximas_jogadas[coluna] += 1
        self.tabuleiro[self.turno_atual & 1] ^= jogada
        self.jogadas[self.turno_atual] = coluna
        self.turno_atual += 1

    def desfazer_jogada(self):
        self.turno_atual -= 1
        coluna = self.jogadas[self.turno_atual]
        jogada = 1 << (self.posicao_proximas_jogadas[coluna]-1)
        self.posicao_proximas_jogadas[coluna] -= 1
        self.tabuleiro[self.turno_atual & 1] ^= jogada

    def carrega_sequencia_jogadas(self, sequencia, sub=0):
        for i in range(len(sequencia)):
            coluna = int(sequencia[i]) - sub
            if (coluna < 0
                    or coluna >= self.largura_tabuleiro
                    or not self.eh_possivel_jogar(coluna)
                    or self.eh_jogada_vitoriosa(coluna)):
                return i
            self.jogar(coluna)

        return len(sequencia)

    def eh_jogada_vitoriosa(self, coluna):
        self.jogar(coluna)

        bitboard = self.tabuleiro[not (self.turno_atual & 1)]
        vitoria = False
        if bitboard & (bitboard >> 6) & (bitboard >> 12) & (bitboard >> 18) != 0:
            vitoria = True      # diagonal \
        if bitboard & (bitboard >> 8) & (bitboard >> 16) & (bitboard >> 24) != 0:
            vitoria = True      # diagonal /
        if bitboard & (bitboard >> 7) & (bitboard >> 14) & (bitboard >> 21) != 0:
            vitoria = True      # horizontal
        if bitboard & (bitboard >> 1) & (bitboard >> 2) & (bitboard >> 3) != 0:
            vitoria = True      # vertical

        self.desfazer_jogada()

        return vitoria

    def verifica_vencedor(self, coluna):
        jogador_atual = (self.turno_atual & 1) + 1
        if self.eh_jogada_vitoriosa(coluna):
            return jogador_atual

        return 0

    # Testa se ocorreu alinhamento de 4 peças no tabuleiro do jogador atual
    def alinhamento(self, tabuleiro):
        # Horizontal
        m = tabuleiro & (tabuleiro >> (self.altura_tabuleiro + 1))
        if m & (m >> (2 * (self.altura_tabuleiro + 1))):
            return True

        # Diagonal 1
        m = tabuleiro & (tabuleiro >> self.altura_tabuleiro)
        if m & (m >> (2 * self.altura_tabuleiro)):
            return True

        # Diagonal 2
        m = tabuleiro & (tabuleiro >> (self.altura_tabuleiro + 2))
        if m & (m >> (2 * (self.altura_tabuleiro + 2))):
            return True

        # Vertical
        m = tabuleiro & (tabuleiro >> 1)
        if m & (m >> 2):
            return True

        return False

    # retorna uma bitmask com um único 1 correspondente a posição do topo de uma dada coluna
    def top_mask(self, coluna):
        return (1 << (self.altura_tabuleiro - 1)) << (coluna * (self.altura_tabuleiro + 1))

    # retorna uma bitmask com um único 1 correspondente a posição de baixo de uma dada coluna
    def bottom_mask(self, coluna):
        return 1 << (coluna * (self.altura_tabuleiro + 1))

    # retorna um bitmask com 1 em todas as células de uma dada coluna
    def column_mask(self, coluna):
        return ((1 << self.altura_tabuleiro) - 1) << (coluna * (self.altura_tabuleiro + 1))
