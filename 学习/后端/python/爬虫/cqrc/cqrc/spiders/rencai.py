import scrapy
from cqrc.items import CqrcItem


class RencaiSpider(scrapy.Spider):
    name = 'rencai'
    allowed_domains = ['www.cqrc.net']
    start_urls = ['https://www.cqrc.net/hr/search/work.html']

    def parse(self, response):
        # 发送post请求，以登录
        # yield scrapy.FormRequest(url='xx.login', callback=self.parse, formdata={'username': 'username'})
        item_list = response.xpath('//*[@id="hr_search"]/section/div/div[2]/ul/li')

        for item in item_list:
            temp = CqrcItem()
            temp['name'] = item.xpath('./a/span[@class="t1"]/text()').get()
            temp['salary'] = item.xpath('./a/span[@class="t3"]/text()').get()

            # 进入详情页
            detail_url = item.xpath('./a/@href').get()
            yield scrapy.Request(url=detail_url, callback=self.parse_detail, meta={'item': temp})

        # next_url = response.xpath('//*[@id="hr_search"]/section/div/ul/li[last()-1]')
        next_url = response.xpath('//a[text()="下一页"]/@href').get()

        yield scrapy.Request(
            url=next_url,
            callback=self.parse
        )

    def parse_detail(self, response):
        # 合并详情页和列表页数据
        item = response.meta['item']
        addr = response.xpath('//*[@id="hr_work"]/section[2]/div/div[1]/div[3]/p/text()').get()
        item['addr'] = addr
        yield item
