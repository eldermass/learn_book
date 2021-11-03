# coding:utf-8
import requests
import json
import sys


class King:
    def __init__(self, word):
        self.url = 'http://dict.iciba.com/dictionary/word/query/web'
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
        }
        self.data = {
            "client": 6,
            "key": 1000006,
            "timestamp": 1634711974961,
            "signature": "d12c6446d382319978e62bed432e8591",
            "word": word
        }

    def get_data(self):
        response = requests.get(self.url, self.data, headers=self.headers)
        response.encoding = 'utf-8'
        return response.content

    def parse_data(self, data):
        dict_data = json.loads(data)
        try:
            print(dict_data['message']['bidec']['parts'][0]['means'][0]['word_mean'])
        except:
            print(dict_data['message'], data)

    def run(self):
        data = self.get_data()
        self.parse_data(data)


if __name__ == '__main__':
    king = King(sys.argv[1])
    king.run()
