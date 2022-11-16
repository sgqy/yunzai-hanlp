import cfg from './cfg.js'
import fetch from 'node-fetch'

let logger = global.logger || global.Bot?.logger || {}

class hanlp {
    async nlp(s, t) {
        let res = await fetch(cfg.nlpUri, cfg.reqObj({ q: s, l: t, }))
            .catch((err) => logger.error(err));
        if (!res) {
            logger.error(cfg.e500);
            return { msg: cfg.e500 };
        }
        res = await res.json();
        logger.info(`hanlp.nlp: ${res.code} ${res.msg}`);

        return res;
    }

    async cmp(s1, s2) {
        let res = await fetch(cfg.cmpUri, cfg.reqObj({ a: s1, b: s2, }))
            .catch((err) => logger.error(err));
        if (!res) {
            logger.error(cfg.e500);
            return { msg: cfg.e500 };
        }
        res = await res.json();
        logger.info(`hanlp.cmp: ${res.code} ${res.msg}`);

        return res;
    }
}

export default new hanlp();