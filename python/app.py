from flask import Flask
from flask import request
from flask_cors import CORS
import json
from QuatroEmLinha import QuatroEmLinha

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    json_obj = {}

    jogadas = request.args.get('jogadas')
    dificuldade = int(request.args.get('dificuldade'))

    jogo = None
    if dificuldade == 3:
        # Difícil, explora 11 níveis
        jogo = QuatroEmLinha()
    elif dificuldade == 2:
        # Difícil, explora 6 níveis
        jogo = QuatroEmLinha(6)
    else:
        # Difícil, explora 3 níveis
        jogo = QuatroEmLinha(3)

    jogo.estado_atual.carrega_sequencia_jogadas(jogadas)

    pontuacao, melhor_coluna_para_jogar, responsavel_pela_jogada = jogo.encontrar_solucao()

    json_obj['pontuacao'] = str(pontuacao)
    json_obj['melhor_coluna_para_jogar'] = str(melhor_coluna_para_jogar)
    json_obj['responsavel_pela_jogada'] = responsavel_pela_jogada

    return json.dumps(json_obj)


@app.route('/verifica_vencedor', methods=['GET'])
def verifica_vencedor():
    json_obj = {}

    jogadas = request.args.get('jogadas')

    jogo = QuatroEmLinha()

    jogo.estado_atual.carrega_sequencia_jogadas(jogadas[:-1])
    vencedor = jogo.estado_atual.verifica_vencedor(int(jogadas[-1]))

    json_obj['vencedor'] = vencedor

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
