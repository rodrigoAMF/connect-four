import numpy as np


class QuatroEmLinha:
    def __init__(self):
        # 6x7
        self.tabuleiro = np.array([[0, 0, 0, 0, 0, 0, 0],
                                   [0, 0, 0, 0, 0, 0, 0],
                                   [0, 0, 0, 0, 0, 0, 0],
                                   [0, 0, 0, 0, 0, 0, 0],
                                   [0, 0, 0, 0, 0, 0, 0],
                                   [0, 0, 0, 0, 0, 0, 0]])
        self.indices_das_linhas_para_proximas_jogadas = np.array([5, 5, 5, 5, 5, 5, 5])
        self.pecas_iguais_para_vencer = 4
        # ['Jogador', 'IA']
        self.jogadores = np.array([-1, 1])
        self.index_do_turno = 0
        self.fim_de_jogo = False

    def mudar(self):
        if self.index_do_turno == 0:
            self.index_do_turno = 1
        else:
            self.index_do_turno = 0

    def eh_fim_de_jogo(self):
        linhas_totalmente_preenchidas = 0
        for i in range(self.tabuleiro.shape[0]):
            contador_preenchidos = 0
            for j in range(self.tabuleiro.shape[1]):
                if self.tabuleiro[i][j] != 0:
                    contador_preenchidos += 1
            if contador_preenchidos == self.tabuleiro.shape[1]:
                linhas_totalmente_preenchidas += 1

        return linhas_totalmente_preenchidas == self.tabuleiro.shape[0]

    def jogo_finalizado(self):
        self.fim_de_jogo = True

    def verificar_vencedor(self, posicao):
        linha = posicao[0]
        coluna = posicao[1]
        jogador_atual = self.jogadores[self.index_do_turno]

        # Verifica para baixo
        linha_final = linha+self.pecas_iguais_para_vencer
        # coluna_final = coluna
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha-1, coluna) and jogador_atual == self.tabuleiro[linha-1][coluna]:
            elementos_iguais += 1

        i = linha+1
        j = coluna
        while self.verificar_se_eh_posicao_valida(i, j) and i < linha_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i += 1

        # Verifica para cima
        linha_final = linha-self.pecas_iguais_para_vencer
        # coluna_final = coluna
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha+1, coluna) and jogador_atual == self.tabuleiro[linha+1][coluna]:
            elementos_iguais += 1

        i = linha-1
        j = coluna
        while self.verificar_se_eh_posicao_valida(i, j) and i > linha_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i -= 1

        # Verifica para direita
        # linha_final = linha
        coluna_final = coluna+self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha, coluna-1) and jogador_atual == self.tabuleiro[linha][coluna-1]:
            elementos_iguais += 1

        i = linha
        j = coluna + 1
        while self.verificar_se_eh_posicao_valida(i, j) and j < coluna_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            j += 1

        # Verifica para esquerda
        # linha_final = linha
        coluna_final = coluna-self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha, coluna+1) and jogador_atual == self.tabuleiro[linha][coluna+1]:
            elementos_iguais += 1

        i = linha
        j = coluna - 1
        while self.verificar_se_eh_posicao_valida(i, j) and j > coluna_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            j -= 1

        # Verifica pela diagonal superior direita
        # linha_final = linha-self.pecas_iguais_para_vencer
        coluna_final = coluna+self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha+1, coluna-1) and jogador_atual == self.tabuleiro[linha+1][coluna-1]:
            elementos_iguais += 1

        i = linha - 1
        j = coluna + 1
        while self.verificar_se_eh_posicao_valida(i, j) and j < coluna_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i -= 1
            j += 1

        # Verifica pela diagonal inferior esquerda
        # linha_final = linha+self.pecas_iguais_para_vencer
        coluna_final = coluna-self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha-1, coluna+1) and jogador_atual == self.tabuleiro[linha-1][coluna+1]:
            elementos_iguais+=1

        i = linha + 1
        j = coluna - 1
        while self.verificar_se_eh_posicao_valida(i, j) and j > coluna_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i += 1
            j -= 1

        # Verifica pela diagonal superior esquerda
        linha_final = linha-self.pecas_iguais_para_vencer
        # coluna_final = coluna-self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha+1, coluna+1) and jogador_atual == self.tabuleiro[linha+1][coluna+1]:
            elementos_iguais += 1

        i = linha - 1
        j = coluna - 1
        while self.verificar_se_eh_posicao_valida(i, j) and i > linha_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i -= 1
            j -= 1

        # Verifica pela diagonal inferior direita
        linha_final = linha+self.pecas_iguais_para_vencer
        # coluna_final = coluna+self.pecas_iguais_para_vencer
        elementos_iguais = 1
        if self.verificar_se_eh_posicao_valida(linha-1, coluna-1) and jogador_atual == self.tabuleiro[linha-1][coluna-1]:
            elementos_iguais += 1

        i = linha + 1
        j = coluna + 1
        while self.verificar_se_eh_posicao_valida(i, j) and i < linha_final:
            if jogador_atual == self.tabuleiro[i][j]:
                elementos_iguais += 1
                if elementos_iguais == 4:
                    return jogador_atual
            i += 1
            j += 1

        # Sem vencedor
        return 0

    def verificar_se_eh_posicao_valida(self, i, j):
        return 0 <= i < self.tabuleiro.shape[0] and 0 <= j < self.tabuleiro.shape[1]

    def iniciar_novo_jogo(self):
        for i in range(self.tabuleiro.shape[0]):
            for j in range(self.tabuleiro.shape[1]):
                self.tabuleiro[i][j] = 0
        self.indices_das_linhas_para_proximas_jogadas.fill((self.tabuleiro.shape[0]-1))
        self.index_do_turno = 0
        self.fim_de_jogo = False

    def realizar_jogada(self, coluna_jogada):
        linha_jogada = self.indices_das_linhas_para_proximas_jogadas[coluna_jogada]
        if linha_jogada < 0 or self.fim_de_jogo or self.tabuleiro[linha_jogada][coluna_jogada] != 0:
            return False

        self.tabuleiro[linha_jogada][coluna_jogada] = self.jogadores[self.index_do_turno]
        self.indices_das_linhas_para_proximas_jogadas[coluna_jogada] -= 1

        if self.eh_fim_de_jogo():
            self.jogo_finalizado()
        
        vencedor = self.verificar_vencedor([linha_jogada, coluna_jogada])
        if vencedor == -1 or vencedor == 1:
            self.jogo_finalizado()
        else:
            self.mudar()

        return True
