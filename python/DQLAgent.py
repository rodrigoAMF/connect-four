import random
import numpy as np
from QuatroEmLinha import QuatroEmLinha
from collections import deque
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam

EPISODES = 1000

class DQNAgent:
    def __init__(self, tamanho_estado, tamanho_acao):
        # Tamanho do estado
        self.tamanho_estado = tamanho_estado
        # Tamanho da ação
        self.tamanho_acao = tamanho_acao
        # lista com experiencias passadas
        self.memoria = []
        self.gamma = 0.95    # discount rate
        self.epsilon = 1.0  # exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.model = self.build_model()
        
    def build_model(self):
        # Neural Net for Deep-Q learning Model
        model = Sequential()
        model.add(Dense(24, input_dim=self.tamanho_estado, activation='relu'))
        model.add(Dense(24, activation='relu'))
        model.add(Dense(self.tamanho_acao, activation='linear'))
        model.compile(loss='mse',
                      optimizer=Adam(lr=self.learning_rate))
        return model
    
    # Guarda dados da iteracao atual para que a rede neural não esqueça experiências passadas
    def remember(self, estado, action, reward, next_state, done):
        self.memoria.append((estado, action, reward, next_state, done))
        
    # Realiza uma ação no estado
    def act(self, estado):
        # Quanto maior epsilon mais o agente irá explorar jogadas aleatórias
        # Isso ajuda o agente a explorar o jogadas inusitadas no inicio do aprendizado
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.tamanho_acao)
        act_values = self.model.predict(estado)
        return np.argmax(act_values[0])  # returns action
    
    # Treina a rede neural com experiências em memoria
    def replay(self, batch_size):
        minibatch = random.sample(self.memoria, batch_size)
        for estado, action, reward, proximo_estado, done in minibatch:
            target = reward
            if not done:
                target = (reward + self.gamma *
                          np.amax(self.model.predict(proximo_estado)[0]))
            target_f = self.model.predict(estado)
            target_f[0][action] = target
            self.model.fit(estado, target_f, epochs=1, verbose=0)
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay
            
    def load(self, name):
        self.model.load_weights(name)

    def save(self, name):
        self.model.save_weights(name)