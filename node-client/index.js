import plugin from '../../lib/plugins/plugin.js'
import puppeteer from '../../lib/puppeteer/puppeteer.js'
import cfg from './apps/cfg.js';
import hanlp from './apps/hanlp.js'

export class hanlp_wrapper extends plugin {
    constructor() {
        super({
            name: '语句分析',
            dsc: '使用 HanLP 分析结构、比较语义',
            event: 'message',
            priority: 9900,
            rule: [
                {
                    reg: '^#文析',
                    fnc: 'doNlp',
                },
                {
                    reg: '^#文似',
                    fnc: 'doCmp',
                },
                {
                    reg: '#[Hh][Aa][Nn][Ll][Pp]',
                    fnc: 'help',
                }
            ]
        })
    };

    async doCmp(e) {
        let s = e.msg.replace(/^#文似\s*([\s\S]*)/g, '$1');
        let l = s.split(/\s+/);
        if (l.length < 2) {
            await this.reply(cfg.cmpHlp);
            return;
        }
        let obj = await hanlp.cmp(l[0], l[1]);
        if (!obj.data) {
            await this.reply(obj.msg);
            return;
        }

        let img = await puppeteer.screenshot('hanlp', {
            tplFile: cfg.cmpTpl,
            s1: l[0],
            s2: l[1],
            sts: obj.data.sts
        });
        if (img) {
            await this.reply(img);
        }
    }

    async doNlp(e) {
        let s = e.msg.replace(/^#文析\s*([\s\S]*)/g, '$1');
        let l = s.split(/\s+/);
        if (l.length < 1 || !l[0]) {
            await this.reply(cfg.nlpHlp);
            return;
        }
        let obj = await hanlp.nlp(l[0], l[1]);
        if (!obj.data) {
            await this.reply(obj.msg);
            return;
        }

        let img = await puppeteer.screenshot('hanlp', {
            tplFile: cfg.nlpTpl,
            lang: obj.data.lang,
            text: l[0],
            plot: obj.data.plot.html,
        });
        if (img) {
            await this.reply(img);
        }
    };

    async help(e) {
        const msg = `HanLP 文本分析 AI\n${cfg.nlpHlp}\n${cfg.cmpHlp}`;
        await this.reply(msg);
    }
}