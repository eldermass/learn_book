# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CqrcItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    name = scrapy.Field()
    salary = scrapy.Field()
    addr = scrapy.Field()


class SimpleItem(scrapy.Item):
    name = scrapy.Field()
    company = scrapy.Field()
    salary = scrapy.Field()
