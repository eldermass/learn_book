import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


# 常用它来采集数据在一个页面的情况
class CrawlSpiderSpider(CrawlSpider):
    name = 'crawl_spider'
    allowed_domains = ['cqrc.net']
    start_urls = ['https://www.cqrc.net/hr/search/work.html']

    # 连接应用规则, tuple
    rules = (
        # LinkExtractor 连接提取器，allow 将提取正则 deny 不提取的正则，follow 是否在响应中继续应用规则
        Rule(LinkExtractor(allow=r'/hr/work/\d+.html'), callback='parse_item', follow=False),
        # 设置页码规则，用于翻页
        Rule(LinkExtractor(allow=r'/hr/search/work.html\?page=\d+'), follow=True)
    )

    def parse_item(self, response):
        print(response.url)
        item = {}
        # item['domain_id'] = response.xpath('//input[@id="sid"]/@value').get()
        # item['name'] = response.xpath('//div[@id="name"]').get()
        # item['description'] = response.xpath('//div[@id="description"]').get()
        return item
