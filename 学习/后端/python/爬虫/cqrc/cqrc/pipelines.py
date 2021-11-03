# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json
from pymongo import MongoClient


class CqrcPipeline:
    def open_spider(self, spider):
        if spider.name == 'rencai':
            self.file = open('test.json', 'w')

    def process_item(self, item, spider):
        if spider.name == 'rencai':
            print(item)
        return item

    def close_spider(self, spider):
        if spider.name == 'rencai':
            self.file.close()


# simple 的管道
class SimplePipeline:
    def open_spider(self, spider):
        if spider.name == 'simple':
            # self.file = open('test_simple.json', 'w')
            self.client = MongoClient('120.78.161.128', 27017)
            self.db = self.client['cqrc']
            self.col = self.db['simple']

    def process_item(self, item, spider):
        if spider.name == 'simple':
            item = dict(item)
            # str_data = json.dumps(item, ensure_ascii=False) + ',\n'
            # self.file.write(str_data)
            self.col.insert(item)
        return item

    def close_spider(self, spider):
        if spider.name == 'simple':
            # self.file.close()
            self.client.close()
