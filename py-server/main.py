#!/usr/bin/env python3
from analyzer import Analyzer
from flask import Flask
from flask import request
from flask_cors import CORS

ayz = Analyzer()
app = Flask(__name__)
CORS(app)


@app.route('/nlp', methods=['POST'])
def nlp():
    try:
        data = request.get_json()
        query = data['q'] or ''
        return {
            'code': 0,
            'msg': 'Sentence Analyze',
            'data': ayz.nlp(query),
        }
    except Exception as ec:
        return {
            'code': -2,
            'msg': str(ec),
            'data': None,
        }, 500


@app.route('/cmp', methods=['POST'])
def cmp():
    try:
        data = request.get_json()
        ta = data['a'] or ''
        tb = data['b'] or ''
        return {
            'code': 0,
            'msg': 'Sentence Compare',
            'data': ayz.cmp(ta, tb),
        }
    except Exception as ec:
        return {
            'code': -2,
            'msg': str(ec),
            'data': None,
        }, 500


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=6200)
