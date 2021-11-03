# coding=utf-8
import requests
import json
import sys
from lxml import etree
import time

with open(sys.path[0] + './header.json') as f:
    headers = json.load(f)

proxies = {
    'http': '47.98.183.59:3128'
}


class Tieba:
    def __init__(self, name='lol'):
        self.url = 'https://tieba.baidu.com/f?ie=utf-8&kw={0}&fr=search'.format(name)
        self.headers = headers
        self.proxies = proxies

    def get_data(self):
        response = requests.get(self.url, headers=self.headers)
        # print(response.encoding)
        return response.content

    def parse_data(self, data):
        data = data.decode().replace('<!--', '').replace('-->', '')
        # 创建 element 对象
        html = etree.HTML(data)
        # etree.tostring(html) # 转换回源码
        els = html.xpath('//li[contains(@class, " j_thread_list")]/div/div['
                         '2]/div[1]/div[1]/a')

        # 取出当前页数据
        data_list = []
        for el in els:
            temp = {}
            temp['title'] = el.xpath('./text()')[0]
            temp['link'] = 'http://tieba.baidu.com/' + el.xpath('./@href')[0]
            data_list.append(temp)

        # 获取下一页连接
        try:
            next_url = 'http:' + html.xpath('//a[@class="next pagination-item "]/@href')[0]
        except:
            next_url = None
        return data_list, next_url

    def save_data(self, data_list):
        for data in data_list:
            with open('./file/1.txt', 'a') as f:
                try:
                    f.write(data['title'] + '  ' + data['link'] + '\n\n')
                except:
                    print('lost one item')

    def run(self):
        i = 0
        while True:
            print('begin: {0}'.format(i), self.url)
            res_html = self.get_data()
            data_list, next_url = self.parse_data(res_html)
            print(i, len(data_list), next_url)
            # 存储数据
            self.save_data(data_list)
            self.url = next_url
            time.sleep(1)

            if next_url is None:
                break
            i = 1 + i
            if i >= 2:
                break


if __name__ == '__main__':
    tieba = Tieba()
    tieba.run()
