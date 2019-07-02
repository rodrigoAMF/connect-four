from flask import Flask
from flask import request
from flask_cors import CORS
import json
import numpy as np
from QuatroEmLinha import QuatroEmLinha

app = Flask(__name__)
CORS(app)

def encontrar_melhor_jogada(tabuleiro):
    posicao_jogada = np.random.randint(tabuleiro.shape[1])

    while tabuleiro[0][posicao_jogada] != 0:
        posicao_jogada = np.random.randint(tabuleiro.shape[1])

    return posicao_jogada


@app.route('/', methods=['GET', 'POST'])

def index():
    jsonObj = {}
    jsonObj['status'] = 200

    tamanho_tabuleiro = request.args.get('tamanho_tabuleiro')
    tabuleiro = request.args.get('tabuleiro')
    if tamanho_tabuleiro is None or tabuleiro is None:
        jsonObj['status'] = 500
        jsonObj['errorMsg'] = "Os parametros tamanho_tabuleiro e tabuleiro sao obrigatorios!"
        return json.dumps(jsonObj)

    tamanho_tabuleiro = np.array(tamanho_tabuleiro.split(",")).astype(np.int)
    tabuleiro = np.array(tabuleiro.split(",")).astype(np.int)

    if tabuleiro.shape[0] != tamanho_tabuleiro[0]*tamanho_tabuleiro[1]:
        jsonObj['status'] = 500
        jsonObj['errorMsg'] = "Os valores de tamanho_tabuleiro nao batem com o do tabuleiro passado"
        return json.dumps(jsonObj)

    tabuleiro = tabuleiro.reshape(tamanho_tabuleiro)

    jsonObj['melhorColunaParaJogar'] = encontrar_melhor_jogada(tabuleiro)

    return json.dumps(jsonObj)

if __name__ == "__main__":
    app.run()
    #app.run(host='10.14.160.110')
