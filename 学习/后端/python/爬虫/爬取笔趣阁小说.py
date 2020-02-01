# -*- coding:UTF-8 -*-
import requests, sys, re
from bs4 import BeautifulSoup


class Scryper:
    host = 'https://www.biquga.com'  # 域名
    target = 'https://www.biquga.com/5_5693/'  # 爬取地址

    def __init__(self):
        self.items = []
        self.total = 0

    def writer(self):
        for (index, item) in enumerate(self.items):
            with open('story.txt', 'a', encoding='utf-8') as f:
                sys.stdout.write("  已下载:%.3f%%" % float(index / self.total) + '\r')
                sys.stdout.flush()
                f.write(item['name'] + '\n')
                f.writelines(self.get_content(item['link']))
                f.write('\n\n')

    """
        获取章节 及 链接
    """

    def get_chapter(self):
        req = requests.get(self.target)
        req.encoding = req.apparent_encoding

        html = req.text

        bs = BeautifulSoup(html, 'html.parser')

        texts = bs.find_all('div', id='list')

        bs_a = BeautifulSoup(str(texts[0]), 'html.parser')

        a = bs_a.find_all('a')

        for item in a:
            self.items.append({
                "name": item.string,
                "link": self.host + item.get('href')
            })

        self.total = len(self.items)

    """
        获取文章内容
    """

    def get_content(self, target):
        req = requests.get(url=target)
        req.encoding = req.apparent_encoding  # 保持实际编码和脚本编码一致

        html = req.text

        bs = BeautifulSoup(html, 'html.parser')

        texts = bs.find_all('div', id='content')

        rp = texts[0].text.replace('\xa0' * 4, '\n\n')

        return re.sub('\t', '', rp)


if __name__ == '__main__':
    url = 'https://www.biquga.com/5_5693/1631396.html'

    scryper = Scryper()

    scryper.get_chapter()

    print('《一年永恒》开始下载：')

    scryper.writer()

    print('《一年永恒》下载完成')
