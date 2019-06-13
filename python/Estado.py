import numpy as np

class Estado:
    def __init__(self, turnoAtual, posicaoJogada, inicioJogo = False):
        if((not inicioJogo and posicaoJogada == None) 
                or ((posicaoJogada != None) and (posicaoJogada[0] < 0 
                or posicaoJogada[1] < 0 or posicaoJogada[0] > 7 
                or posicaoJogada[1] > 7))):
            raise Exception("Erro ao criar estado: Especifique uma posicaoJogada válida")
        
        self.tabuleiro = np.zeros([self.tamanhoTabuleiro[0], self.tamanhoTabuleiro[1]], dtype=int)
        # Locais onde é possível realizar a próxima jogada
        self.proximasJogadas = np.full((self.tamanhoTabuleiro[1],), self.tamanhoTabuleiro[1]-1)
        
        self.turnoAtual = turnoAtual
        self.inicioDeJogo = inicioJogo
        # Posição que jogador jogou neste estado
        self.posicaoJogada = posicaoJogada
        # Jogador responsável pela jogadaAtual
        self.jogadorAtual = self.atualizarJogadorAtual()
        self.fimDeJogo = False
    

    def atualizarMinMax(self):
        vencedor = self.verificarVencedor()
        if(vencedor != 0):
            self.minMax = vencedor
        
    
    # verificaVencedor e seta fimDejJogo
    def verificarVencedor(self):
        if(self.inicioDeJogo):
            return 0
        
        vencedor = 0
        for i in range(self.tamanhoTabuleiro):
            for j in range(self.tamanhoTabuleiro):
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    vencedor = self.verificarVencedorEmPosicaoEspecifica([i, j])
                    if(vencedor != 0):
                        self.fimDeJogo = True
                        return vencedor

        return vencedor
    

    def verificarVencedorEmPosicaoEspecifica(self, posicao):
        # verifica se é possível ganhar pela direita
        if(posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro) :
            posicaoFinal = [posicao[0], posicao[1]+(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1
                
            for i in range(posicao[1]+1, posicaoFinal[1]+1):
                if(self.tabuleiro[posicao[0]][i] == self.jogadorAtual):
                    contadorPecas += 1
                
            if(contadorPecas == self.pecasIguaisParaVencer):
                return self.jogadorAtual
            
        
        # verifica se é possível ganhar pela esquerda
        if(posicao[1]-(self.pecasIguaisParaVencer-1) >= 0) :
            posicaoFinal = [posicao[0], posicao[1]-(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1

            for i in range( posicao[1]-1,posicaoFinal[1]+1):
                if(self.tabuleiro[posicao[0]][i] == self.jogadorAtual):
                    contadorPecas += 1
                
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        

        # verifica se é possível ganhar por cima
        if(posicao[0]-(self.pecasIguaisParaVencer-1) >= 0) :

            posicaoFinal = [posicao[0]-(self.pecasIguaisParaVencer-1), posicao[1]]
            contadorPecas = 1
            for i in range(posicao[0]-1, posicaoFinal[0]+1):
                if(self.tabuleiro[i][posicao[1]] == self.jogadorAtual):
                    contadorPecas+=1
                
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        

        # verifica se é possível ganhar por baixo
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro) :
            posicaoFinal = [posicao[0]+(self.pecasIguaisParaVencer-1), posicao[1]]
            contadorPecas = 1
            
            for i in range(posicao[0]+1, posicaoFinal[0]+1):
                if(self.tabuleiro[i][posicao[1]] == self.jogadorAtual):
                    contadorPecas+=1
                
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        

        # verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-(self.pecasIguaisParaVencer-1) >= 0 and posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro) :
            posicaoFinal = [posicao[0]-(self.pecasIguaisParaVencer-1), posicao[1]+(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1
            
            
            i = posicao[0]-1
            for j in range(posicao[1]+1, posicaoFinal[1]+1):
                if(i < posicaoFinal[0]):
                    break
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    contadorPecas+=1
                i=-1
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        
        # verifica se é possível ganhar pela diagonal inferior direita
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro and posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro) :
            posicaoFinal = [posicao[0]+(self.pecasIguaisParaVencer-1), posicao[1]+(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1

            i = posicao[0]+1
            for j in range(posicao[1]+1, posicaoFinal[1]+1):
                if(i < posicaoFinal[0]):
                    break
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    contadorPecas+=1                
                i+=1
                 
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        
        # verifica se é possível ganhar pela diagonal inferior esquerda
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro and posicao[1]-(self.pecasIguaisParaVencer-1) >= 0) :
            posicaoFinal = [posicao[0]+(self.pecasIguaisParaVencer-1), posicao[1]-(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1

            j = posicao[1]-1
            for i in range(posicao[0]+1, posicaoFinal[0]+1):
                if(j < posicaoFinal[1]):
                    break
                
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    contadorPecas+=1                
                j-=1
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        
        # verifica se é possível ganhar pela diagonal superior esquerda
        if(posicao[0]-(self.pecasIguaisParaVencer-1) >= 0 and posicao[1]-(self.pecasIguaisParaVencer-1) >= 0) :
            posicaoFinal = [posicao[0]-(self.pecasIguaisParaVencer-1), posicao[1]-(self.pecasIguaisParaVencer-1)]
            contadorPecas = 1

            j = posicao[1]-1
            for i in range(posicao[0]-1, posicaoFinal[0]-1, -1):
                if(j < posicaoFinal[1]):
                    break
                
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    contadorPecas+=1         
                j-=1
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
             
        return 0
    

    def clonar(self, turnoAtual, posicaoJogada):
        novo = Estado(turnoAtual, posicaoJogada)
        for i in range(self.tamanhoTabuleiro):
            novo.proximasJogadas[i] = self.proximasJogadas[i]
            for j in range(self.tamanhoTabuleiro):
                novo.tabuleiro[i][j] = self.tabuleiro[i][j]
            
        
        novo.minMax = self.minMax
        novo.melhorColunaParaJogar = self.melhorColunaParaJogar
        novo.fimDeJogo = self.fimDeJogo

        return novo
    
