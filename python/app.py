from flask import Flask
from flask import request
from flask_cors import CORS
import json
import numpy as np
from QuatroEmLinha import QuatroEmLinha

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    json_obj = {}

    jogadas = request.args.get('jogadas')
    dificuldade = request.args.get('dificuldade')

    jogo = QuatroEmLinha()

    jogo.estado_atual.carrega_sequencia_jogadas(jogadas)

    pontuacao, coluna = jogo.encontrar_solucao()

    json_obj['pontuacao'] = pontuacao
    json_obj['coluna'] = coluna

    return json.dumps(json_obj)

'''
@app.route('/vencedor', methods=['GET'])
def index():
    jogo = QuatroEmLinha()
    jsonObj = {}

    jogadas = request.args.get('jogadas')

    jogo.estado_atual.carrega_sequencia_jogadas(jogadas)

    # TODO: retornar vencedor certo
    vencedor = jogo.estado_atual.eh_jogada_vitoriosa()

    # TODO: dizer quem venceu
    jsonObj['vencedor'] = vencedor

    return json.dumps(jsonObj)
'''

if __name__ == "__main__":
    app.run()
    #app.run(host='10.14.160.110')
