import scrapy
from cqrc.items import SimpleItem


class SimpleSpider(scrapy.Spider):
    name = 'simple'
    allowed_domains = ['cqrc.net']
    start_urls = ['https://www.cqrc.net/hr/search/work.html']

    def parse(self, response):
        item_list = response.xpath('//*[@id="hr_search"]/section/div/div[2]/ul/li')
        for item in item_list:
            temp = SimpleItem()
            temp['name'] = item.xpath('./a/span[@class="t1"]/text()').get()
            temp['company'] = item.xpath('./a/span[@class="t2"]/text()').get()
            temp['salary'] = item.xpath('./a/span[@class="t3"]/text()').get()
            yield temp
