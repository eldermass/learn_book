import requests
import urllib
import time
import pymysql
from bs4 import BeautifulSoup
from openpyxl import Workbook

userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3298.4 Safari/537.36'


# 获取分类
def get_category_list(cookies={}):
    """
    获取二级的分类列表
    :param cookies:
    :return:
    """
    headers = {
        'User-Agent': userAgent
    }
    url = 'https://book.douban.com/tag/?view=type&icn=index-sorttags-hot'

    category_list = {}

    res = requests.get(url=url, cookies=cookies, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')

    soup_list = soup.find('div', class_='article')
    parent_class = soup_list.find_all('a', class_='tag-title-wrapper')
    child_class = soup_list.find_all('table', attrs={'class': 'tagCol'})

    # 大类
    parent_class_list = []
    for pc in parent_class:
        parent_class_list.append(pc.attrs['name'])

    # 子类
    for i in range(len(child_class)):
        second_class_list = []
        sc = child_class[i]
        sc = sc.findAll('a')
        for sc_i in sc:
            second_class_list.append(sc_i.string.strip())

        category_list[parent_class_list[i]] = second_class_list

    return category_list


# 爬取书籍信息
def get_book_list(book_tag):
    headers = {
        'User-Agent': userAgent
    }
    books_list = []
    page_number = 0
    book_tag = urllib.parse.quote(book_tag)
    url_pattern = 'https://book.douban.com/tag/{tag}?start={start}&type=T'

    url = url_pattern.format(tag=book_tag, start=page_number * 20)
    res = requests.get(url=url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')

    paginator = soup.find('div', attrs={'class': 'paginator'})
    paginator = paginator.find_all('a')
    max_page_num = paginator[-2].string.strip()
    time.sleep(0.5)

    while True:
        url = url_pattern.format(tag=book_tag, start=page_number * 20)
        res = requests.get(url=url, headers=headers)
        soup = BeautifulSoup(res.text, 'html.parser')
        soup_list = soup.find_all('li', attrs={'class': 'subject-item'})

        for book_item in soup_list:
            title = book_item.find('a', attrs={'title': True})
            book_url = title.attrs['href']
            book_title = title.attrs['title']

            book_info = book_item.find('div', attrs={'class': 'pub'}).string.strip()
            book_info_list = book_info.split('/')
            try:
                book_author = '/'.join(book_info_list[0: -3])
            except:
                book_author = '暂无'

            try:
                book_pub = '/'.join(book_info_list[-3:])
            except:
                book_pub = '暂无'

            # 评分
            book_rating = book_item.find('span', attrs={'class': 'rating_nums'}).string.strip()
            # 评论人数
            try:
                book_review = book_item.find('span', attrs={'class': 'pl'}).string.strip() \
                    .replace('(', '').replace(')', '')
            except:
                book_review = '0'

            try:
                book_desc = book_item.find('p').string.strip()
            except:
                book_desc = '暂无描述'

            books_list.append([book_title, book_url, book_author, book_pub, book_rating, book_review, book_desc])
            print(book_title, book_url, book_author, book_pub, book_rating, book_review)
        print('第{}页采集完毕，共{}页'.format(page_number + 1, max_page_num))
        time.sleep(0.5)
        page_number += 1

        # page_number == max_page_num 爬到最后页
        if page_number >= 1:
            break
    return books_list


# save_to_excel
def save_to_excel(book_list, filename='1'):
    wb = Workbook()
    ws = wb.active
    ws.append(['序号', 'book_title', 'book_url', 'book_author', 'book_pub', 'book_rating', 'book_review', 'book_desc'])

    count = 1
    for b in book_list:
        ws.append([count] + b)
        count += 1

    wb.save('./' + filename + '.xlsx')
    print('成功存储到文件')


# save_to_db
def save_to_db(book_list):
    db = pymysql.connect('localhost', 'root', 'root', 'test')
    try:
        cursor = db.cursor()
        for b in book_list:
            cursor.execute('insert into book values(null, "{}", "{}"\
            , "{}", "{}", "{}", "{}", "{}")'.format(*b))
        db.commit()
        cursor.close()
        db.close()
        print('添加到数据库成功')
    except:
        print('添加到数据失败')


if __name__ == '__main__':
    category_list = get_category_list()

    print('*' * 65)
    print('图书大类有：')
    for key in category_list.keys():
        print(key, end=' ')
    print(' ')
    print('*' * 65)

    parent_class_choice = input('请输入你想选择的大类：')

    for key, value in category_list.items():
        if key == parent_class_choice:
            print('*' * 65)
            print('该大类的细分类有：')
            for i in value:
                print(i, end='--')
            print(' ')
            print('*' * 65)
    child_class_choice = input('请输入你选择的细分类：')

    book_list = get_book_list(child_class_choice)
    # save_to_excel(book_list, '小说')
    save_to_db(book_list)
    exit()
