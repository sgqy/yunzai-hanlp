class cfg {
    constructor() {
        this.uri = 'http://127.0.0.1:6200';
        this.nlpUri = this.uri + '/nlp';
        this.cmpUri = this.uri + '/cmp';
        this.reqObj = (o) => {
            return {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(o),
            }
        };
        this.e500 = 'HanLP 服务端接口错误';

        this.tpl = './plugins/hanlp/resources/html/';
        this.nlpTpl = this.tpl + 'nlp.html';
        this.cmpTpl = this.tpl + 'cmp.html';
        this.nlpHlp = '● #文似 句子 [语种]\n分析句子结构。语种选填，可指定 zh ja，此外均自动识别';
        this.cmpHlp = '● #文似 句一 句二\n对比句子语义。';
    }
}

export default new cfg()