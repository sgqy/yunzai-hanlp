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
    }
}

export default new cfg()