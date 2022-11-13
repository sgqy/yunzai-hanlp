import hanlp


class Analyzer:
    def _log(self, s):
        print(f' * [Analyzer]{s}')

    def __init__(self):
        self._log('Load language identify model...')
        self.lit = hanlp.load('LID_176_FASTTEXT_BASE')
        self._log('Load Chinese similarity model...')
        self.sts = hanlp.load(hanlp.pretrained.sts.STS_ELECTRA_BASE_ZH)
        self._log('Load Japanese model...')
        self.ja = hanlp.load(
            hanlp.pretrained.mtl.NPCMJ_UD_KYOTO_TOK_POS_CON_BERT_BASE_CHAR_JA)
        self._log('Load Chinese model...')
        self.zh = hanlp.load(
            hanlp.pretrained.mtl.CLOSE_TOK_POS_NER_SRL_DEP_SDP_CON_ELECTRA_BASE_ZH)
        self._log('Load Multi-language model...')
        self.mu = hanlp.load(
            hanlp.pretrained.mtl.UD_ONTONOTES_TOK_POS_LEM_FEA_NER_SRL_DEP_SDP_CON_XLMR_BASE)
        self._log('Load model done.')

    def nlp(self, q):
        lang = self.lit(q)
        plot = None
        if lang == 'zh':
            plot = self.zh(q)
        elif lang == 'ja':
            plot = self.ja(q)
        else:
            plot = self.mu(q)
        return {
            'lang': lang,
            'text': q,
            'plot': {
                'data': plot.to_dict(),
                'text': plot.to_pretty(),
                'html': plot.to_pretty(html=True),
            }
        }

    def cmp(self, a, b):
        la = self.lit(a)
        lb = self.lit(b)

        s = self.sts([a, b])
        s = round(s * 100, 1)
        sts = f'{s}%'
        if la != 'zh':
            sts += f' <1:{la}>'
        if lb != 'zh':
            sts += f' <2:{lb}>'

        return {
            't1': a,
            't2': b,
            'sts': sts,
        }
