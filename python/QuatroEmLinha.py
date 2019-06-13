import numpy as np

class QuatroEmLinha:
    def __init__(self):
        self.pecasIguaisParaVencer = 4
        self.tamanhoTabuleiro = np.array([8, 8])
        
        self.tabuleiro = np.zeros([self.tamanhoTabuleiro[0], self.tamanhoTabuleiro[1]], dtype=int)
        # Locais onde é possível realizar a próxima jogada
        self.proximasJogadas = np.full((self.tamanhoTabuleiro[1],), self.tamanhoTabuleiro[1]-1)
        self.recompensaPelaJogada = 0
        
        self.inicioDeJogo = True
        self.fimDeJogo = False
        self.turnoAtual = 0
        # -1 = Jogador, 1 = IA
        self.jogadorAtual = -1
    
    def efetuaJogada(self, posicaoJogada):            
        self.tabuleiro[self.proximasJogadas[posicaoJogada], posicaoJogada] = self.jogadorAtual
        self.proximasJogadas[posicaoJogada] -= 1
        if(self.inicioDeJogo):   
            self.inicioDeJogo = False
        self.turnoAtual += 1
        
        self.recompensaPelaJogada = self.turnoAtual
        vencedor = self.verificarVencedor()
        if(vencedor == -1):
            self.recompensaPelaJogada += 100*(1-(self.turnoAtual/(self.tamanhoTabuleiro[0]*self.tamanhoTabuleiro[1])))
        elif(vencedor == 1):
            self.recompensaPelaJogada = 0
            
        if(self.jogadorAtual == 1):
            self.jogadorAtual = -1
        else:
            self.jogadorAtual = 1

        return self.tabuleiro.flatten(), self.recompensaPelaJogada, self.fimDeJogo 
    
    def reset(self):
        self.pecasIguaisParaVencer = 4
        self.tamanhoTabuleiro = np.array([8, 8])
        
        self.tabuleiro = np.zeros([self.tamanhoTabuleiro[0], self.tamanhoTabuleiro[1]], dtype=int)
        # Locais onde é possível realizar a próxima jogada
        self.proximasJogadas = np.full((self.tamanhoTabuleiro[1],), self.tamanhoTabuleiro[1]-1)
        self.recompensaPelaJogada = 0
        
        self.inicioDeJogo = True
        self.fimDeJogo = False
        self.turnoAtual = 0
        # 1 = Jogador, -1 = IA
        self.jogadorAtual = -1
        
        return self.tabuleiro.flatten()
    
    # verificaVencedor e seta fimDejJogo
    def verificarVencedor(self):
        if(self.inicioDeJogo):
            return 0
        
        if(self.turnoAtual == (self.tamanhoTabuleiro[0]*self.tamanhoTabuleiro[1])):
            self.fimDeJogo = True
        vencedor = 0
        for i in range(self.tamanhoTabuleiro[0]):
            for j in range(self.tamanhoTabuleiro[1]):
                if(self.tabuleiro[i][j] == self.jogadorAtual):
                    vencedor = self.verificarVencedorEmPosicaoEspecifica([i, j])
                    if(vencedor != 0):
                        self.fimDeJogo = True
                        return vencedor

        return vencedor
    

    def verificarVencedorEmPosicaoEspecifica(self, posicao):
        # verifica se é possível ganhar pela direita
        if(posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1]) :
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
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1]):
            posicaoFinal = [posicao[0]+(self.pecasIguaisParaVencer-1), posicao[1]]
            contadorPecas = 1
            
            for i in range(posicao[0]+1, posicaoFinal[0]+1):
                if(self.tabuleiro[i][posicao[1]] == self.jogadorAtual):
                    contadorPecas+=1
                
            
            if(contadorPecas == (self.pecasIguaisParaVencer)):
                return self.jogadorAtual
            
        

        # verifica se é possível ganhar pela diagonal superior direita
        if(posicao[0]-(self.pecasIguaisParaVencer-1) >= 0 
           and posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1]):
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
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1] 
           and posicao[1]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1]):
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
        if(posicao[0]+(self.pecasIguaisParaVencer-1) < self.tamanhoTabuleiro[1] 
           and posicao[1]-(self.pecasIguaisParaVencer-1) >= 0) :
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
        if(posicao[0]-(self.pecasIguaisParaVencer-1) >= 0 
           and posicao[1]-(self.pecasIguaisParaVencer-1) >= 0) :
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
        