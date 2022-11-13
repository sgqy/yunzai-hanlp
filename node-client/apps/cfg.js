class cfg {
    constructor() {
        this.uri = 'http://127.0.0.1:6200';
        this.nlpUri = this.uri + '/nlp';
        this.cmpUri = this.uri + '/cmp';
    }
}

export default new cfg()