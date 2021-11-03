# coding=utf-8
import hashlib
import time
import random
import requests
import json
import sys

proxies = {
    'http': 'http://211.65.197.93:80'
}

app_version = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'


class Youdao:
    def __init__(self, word='人生苦短'):
        # url
        self.url = 'http://nmt.youdao.com/translate_o?smartresult=dict&smartresult=rule'
        # headers
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
            "Cookie": "OUTFOX_SEARCH_USER_ID=910147220@10.169.0.83; JSESSIONID=abcGhhP1PkNVYcadjxM-w; _ntes_nnid=ab323f65e35f29fddc7a24972b0e0d08,1614611075889; OUTFOX_SEARCH_USER_ID_NCOO=999304676.7184899; fanyi-ad-id=118539; fanyi-ad-closed=1; ___rl__test__cookies=1634911135575",
            "Host": "nmt.youdao.com",
            "Referer": "http://nmt.youdao.com /",
            "Origin": "http://nmt.youdao.com"
        }
        # formdata
        self.word = word
        self.data = self.generate_formdata()

    def generate_formdata(self):
        """
            <e>: 输入的content
            ts<r>: "" + (new Date).getTime()
            salt<i>: r + parseInt(10 * Math.random(), 10)
            sign: n.md5("fanyideskweb" + e + i + "Y2FYu%TNSbMCxc3t2u^XT")
        """
        ts = str(int(time.time() * 1000))
        salt = ts + str(random.randint(0, 9))

        md5 = hashlib.md5()
        md5.update(("fanyideskweb" + self.word + salt + "Y2FYu%TNSbMCxc3t2u^XT").encode())
        sign = md5.hexdigest()

        return {
            'i': self.word,
            'from': 'AUTO',
            'to': 'AUTO',
            'smartresult': "dict",
            'client': 'fanyideskweb',
            'salt': salt,
            'sign': sign,
            'lts': ts,
            'bv': '318dde5ec635786619012045ee59bf8a',
            'doctype': 'json',
            'version': '2.1',
            'keyfrom': 'fanyi.web',
            'action': 'FY_BY_REALTlME',
        }

    def send_request(self):
        session = requests.session()
        response = session.post(self.url, data=self.data, headers=self.headers, proxies=proxies)
        return response.content

    def parse_data(self, data):
        try:
            res_dict = json.loads(data)
            return res_dict['translateResult'][0][0]['tgt']
        except:
            return None

    def run(self):
        # send request
        res_data = self.send_request()
        # parse response
        parse_data = self.parse_data(res_data)
        print(parse_data)


if __name__ == '__main__':
    youdao = Youdao(sys.argv[1])
    youdao.run()
