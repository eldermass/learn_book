import re
import html
from urllib import request

class Spider():
    url = 'https://www.huya.com/l'

    pattern = '<textarea id="data-preview" style="display: none;">.*?</textarea>'

    def __fetch_content(self):
        r = request.urlopen(self.url)
        htmls = r.read()
        # 将bytes转为str
        html = str(htmls, encoding='utf-8')
        # html = html.encode('utf-8').decode('utf-8')
        return html
        
    def __anylysis(self, htmls):
        # 解析html转义字符
        htmls = html.unescape(htmls)
        match = re.findall(self.pattern, htmls, re.S)
        string = match[0]

        # 转义部分unicode到中文
        string = string.encode().decode('unicode-escape')

    def go(self):
        htmls = self.__fetch_content()
        self.__anylysis(htmls)

spider = Spider()

spider.go()