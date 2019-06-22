import numpy as np
from QuatroEmLinha import QuatroEmLinha
from DQLAgent import DQNAgent

env = QuatroEmLinha()
tamanho_estado = env.tamanhoTabuleiro[0] * env.tamanhoTabuleiro[1]
tamanho_acao = env.proximasJogadas.shape[0]
agent = DQNAgent(tamanho_estado, tamanho_acao)
agent.load("save/4emLinha-dql.h5")
agent.epsilon = 0
estado = env.reset()
estado = np.reshape(estado, [1, tamanho_estado])
acao = agent.act(estado)
estado, __, __ = env.efetuaJogada(acao)
env.efetuaJogada(0)
estado = np.reshape(estado.flatten(), [1, tamanho_estado])
acao = agent.act(estado)

if __name__ == "__main__":
    env = QuatroEmLinha()
    tamanho_estado = env.tamanhoTabuleiro[0] * env.tamanhoTabuleiro[1]
    tamanho_acao = env.proximasJogadas.shape[0]
    agent = DQNAgent(tamanho_estado, tamanho_acao)
    jogador = DQNAgent(tamanho_estado, tamanho_acao)
    jogador.load("save/4emLinha-dql-jogador.h5")
    done = False
    batch_size = 32

    for e in range(1, EPISODES + 1):
        # TODO: Criar função reset para resetar ambiente virtual
        estado = env.reset()
        # estado = env.tabuleiro.flatten() Remover ao implementar o reset
        estado = np.reshape(estado, [1, tamanho_estado])
        for turno in range((env.tamanhoTabuleiro[0] * env.tamanhoTabuleiro[1]) + 1):
            # env.render()
            # IA joga
            acao = agent.act(estado)
            while (env.proximasJogadas[acao] < 0):
                acao = agent.act(estado)
            proximo_estado, reward, done = env.efetuaJogada(acao)
            # reward = reward if not done else -10
            proximo_estado = np.reshape(proximo_estado, [1, tamanho_estado])
            agent.remember(estado, acao, reward, proximo_estado, done)

            # Jogador joga
            acaoJogador = jogador.act(estado)
            while (env.proximasJogadas[acaoJogador] < 0):
                acaoJogador = jogador.act(estado)
            env.efetuaJogada(acaoJogador)

            estado = proximo_estado

            if done:
                print("episode: {}/{}, turno: {}, e: {:.2}"
                      .format(e, EPISODES, turno * 2, agent.epsilon))
                break
            if len(agent.memoria) > batch_size:
                agent.replay(batch_size)
        if e % 10 == 0:
            agent.save("save/4emLinha-dql.h5")