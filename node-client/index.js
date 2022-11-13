import plugin from '../../lib/plugins/plugin.js'
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
                    fnc: 'route',
                },
                {
                    reg: '^#文似',
                    fnc: 'route',
                },
                {
                    reg: '#[Hh][Aa][Nn][Ll][Pp]',
                    fnc: 'help',
                }
            ]
        })
    };

    async route(e) {
        let obj = null;

        if (/^#文析/.test(e.msg)) {
            let s = e.msg.replace(/^#文析\s*([\s\S]*)/g, '$1');
            s = s.replace(/\s/g, '');
            obj = await hanlp.nlp(s);
        } else if (/^#文似/.test(e.msg)) {
            let s = e.msg.replace(/^#文似\s*([\s\S]*)/g, '$1');
            let l = s.split(/\s+/);
            if (l.length < 2) {
                obj = '输入句子对比语义\n#文似 句一 句二';
            } else {
                let sim = await hanlp.cmp(l[0], l[1]);
                obj = `●${l[0]}\n●${l[1]}\n相似度：${sim}`;
            }
        }

        await this.reply(obj);
    };

    async help(e) {
        const msg = 'HanLP 文本分析 AI\n'
            + '------\n'
            + '#文似 句一 句二\n判断两句相似度\n'
            + '------\n'
            + '#文析 句子\n分析句子结构';
        await this.reply(msg)
    }
}