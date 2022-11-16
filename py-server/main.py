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
    '''
    post json object. { q: query text, l: specify language }
    '''
    try:
        data = request.get_json()
        query = data.get('q')
        lang = data.get('l')
        return {
            'code': 0,
            'msg': 'Sentence Analyze',
            'data': ayz.nlp(query, lang),
        }
    except Exception as ec:
        return {
            'code': -2,
            'msg': repr(ec),
            'data': None,
        }, 500


@app.route('/cmp', methods=['POST'])
def cmp():
    '''
    post json object { a: sentence to compare, b: sentence to compare }
    '''
    try:
        data = request.get_json()
        ta = data.get('a')
        tb = data.get('b')
        return {
            'code': 0,
            'msg': 'Sentence Compare',
            'data': ayz.cmp(ta, tb),
        }
    except Exception as ec:
        return {
            'code': -2,
            'msg': repr(ec),
            'data': None,
        }, 500


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=6200)
