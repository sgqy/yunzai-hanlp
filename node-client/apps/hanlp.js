import cfg from './cfg.js'
import fetch from 'node-fetch'

let logger = global.logger || global.Bot?.logger || {}

class hanlp {
    async nlp(s) {
        return cfg.nlpUri;
    }

    async cmp(s1, s2) {
        let res = await fetch(cfg.cmpUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                a: s1,
                b: s2,
            }),
        }).catch((err) => logger.error(err));
        if (!res) {
            logger.error('HanLP 相似度 接口错误')
            return 'HanLP 相似度 接口错误';
        }
        res = await res.json()
        logger.info(res)

        return res.data?.sts || res.msg;
    }
}

export default new hanlp();