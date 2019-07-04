from Estado import Estado
import copy
import time
import numpy as np


class QuatroEmLinha:
    def __init__(self):
        self.estado_atual = Estado()
        self.nivel_maximo_busca = 12
        self.nos_explorados = 0
        # Ordem de exploração das colunas
        self.ordem_colunas = np.zeros(self.estado_atual.largura_tabuleiro, dtype=int)
        for i in range(self.estado_atual.largura_tabuleiro):
            self.ordem_colunas[i] = int(self.estado_atual.largura_tabuleiro/2) + int(((1-(2*(i%2)))*(i+1))/2)

    def encontrar_solucao(self):
        self.tempo_total = 0 # EXCLUIR
        start = time.time()
        self.nos_explorados = 0

        alfa = -int((self.estado_atual.largura_tabuleiro*self.estado_atual.altura_tabuleiro)/2)
        beta = int((self.estado_atual.largura_tabuleiro*self.estado_atual.altura_tabuleiro)/2)
        melhor_pontuacao, melhor_coluna_para_jogar = self.negamax(self.estado_atual, alfa, beta)

        end = time.time()
        print(str(self.nos_explorados) + " Nós explorados em " + str(end - start) + " s")

        responsavel_pela_jogada = "negamax"

        # Não encontrou uma jogada boa
        if melhor_coluna_para_jogar == -1:
            self.estado_atual.turno_atual += 1

            # Verifica se oponente tem chance de vencer na próxima jogada
            for coluna in range(self.estado_atual.largura_tabuleiro):
                if self.estado_atual.eh_possivel_jogar(coluna) and self.estado_atual.eh_jogada_vitoriosa(coluna):
                    melhor_coluna_para_jogar = coluna
                    break

            self.estado_atual.turno_atual -= 1

            # Se ainda sim não encontrou uma coluna valida, jogada pelo centro
            if melhor_coluna_para_jogar == -1:
                for coluna in range(self.estado_atual.largura_tabuleiro):
                    if self.estado_atual.eh_possivel_jogar(self.ordem_colunas[coluna]):
                        melhor_coluna_para_jogar = self.ordem_colunas[coluna]
                        break

            responsavel_pela_jogada = "heuristica"

        return melhor_pontuacao, melhor_coluna_para_jogar, responsavel_pela_jogada

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
            if estado.eh_possivel_jogar(self.ordem_colunas[coluna]):
                #start = time.time()
                #estado_novo = copy.deepcopy(estado)
                #end = time.time()
                #self.tempo_total += (end-start)
                estado.jogar(self.ordem_colunas[coluna])
                pontuacao, __ = self.negamax(estado, -beta, -alfa, nivel + 1, not nivel_max)
                estado.desfazer_jogada()
                pontuacao = -pontuacao
                if pontuacao >= beta:
                    return pontuacao, coluna
                if pontuacao > alfa:
                    alfa = pontuacao
                    coluna_melhor_pontuacao = coluna

        return alfa, coluna_melhor_pontuacao


    def printa_bits(self, bits):
        bits_string = '{0:048b}'.format(bits)
        print(bits_string)
        '''for i in range(len(bits_string)):
            if (i % 7) == 0:
                print(bits_string[i])
            else:
                print(bits_string[i], end='')
        '''

    def printa_bits_matriz(self, bits):
        bits_string = '{0:049b}'.format(bits)
        cont = 0
        p1 = ''
        p2 = ''
        p3 = ''
        p4 = ''
        p5 = ''
        p6 = ''
        p7 = ''
        for i in range(len(bits_string)-1, -1, -1):
            if cont == 0:
                p1 += bits_string[i] + " "
                cont += 1
            elif cont == 1:
                p2 += bits_string[i] + " "
                cont += 1
            elif cont == 2:
                p3 += bits_string[i] + " "
                cont += 1
            elif cont == 3:
                p4 += bits_string[i] + " "
                cont += 1
            elif cont == 4:
                p5 += bits_string[i] + " "
                cont += 1
            elif cont == 5:
                p6 += bits_string[i] + " "
                cont += 1
            elif cont == 6:
                p7 += bits_string[i] + " "
                cont = 0

        print(p7 + "\n" + p6 + "\n" + p5 + "\n" + p4 + "\n" + p3 + "\n" + p2 + "\n" + p1)

