# -*- coding: UTF-8 -*-
import os
import re
import time
import datetime
from pyecharts.charts import Map, Pie, Bar
from pyecharts import options

default_path = './data'


# 保存 requests.content / text
def save_html(content, savefile, filename):
    if not os.path.exists(savefile):
        os.mkdir(savefile)
    f = open(os.path.join(savefile, filename), 'w', encoding='utf-8')
    f.write(str(content))
    f.close()


# 保存Cookie
def save_cookie(cookie, savefile=default_path):
    if not os.path.exists(savefile):
        print('[Warning]: {0} is not a dir'.format(savefile))
        os.mkdir(savefile)
    f = open(os.path.join(savefile, 'cookie.info'), 'w')
    f.write(str(cookie))
    f.close()


# 读取Cookie
def read_cookie(datafile=default_path):
    if not os.path.exists(datafile):
        print('[Warning]: {0} inexistence in <utils.py - ReadCookie func>...'.format(datafile))
        return None

    cookie_path = os.path.join(datafile, 'cookie.info')
    if not os.path.isfile(cookie_path):
        print('[Warning]: {0} inexistence in <utils.py - ReadCookie func>...'.format(cookie_path))
        return None

    f = open(cookie_path, 'r')
    cookie = f.read().strip()
    f.close()

    return cookie if cookie else None


# 获取header
def get_header(cookie=None):
    if cookie:
        headers = {
            "accept-language": "zh-CN,zh;q=0.9",
            "accept-encoding": "gzip, deflate, sdch, br",
            "accept": "*/*",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
            "cookie": cookie
        }
    else:
        headers = {
            "accept-language": "zh-CN,zh;q=0.9",
            "accept-encoding": "gzip, deflate, sdch, br",
            "accept": "*/*",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
        }
    return headers


# 获取gtk
def get_gtk(skey):
    thash = 5381
    for c in skey:
        thash += (thash << 5) + ord(c)
    return thash & 2147483647


# 获取 skey
def get_skey(cookie):
    item = re.findall(r'p_skey=(.*?);', cookie)
    return item[0] if len(item) > 0 else None


# 读取好友列表
def read_cared(datafile='./results/291825458/cared_list.txt'):
    friends = []
    with open(datafile) as f:
        for line in f:
            line = line.strip()
            if line:
                try:
                    int(line[0])
                except:
                    continue
                fds = line.split(' ')
                for fd in fds:
                    if fd not in friends:
                        friends.append(fd)
    return friends


# 解析好友文件的数据
def parse_friends_info(qq, t_qq, datafile='./results'):
    info_txt = os.path.join(datafile, str(qq), str(t_qq) + '_info.txt')
    if not os.path.exists(info_txt):
        return None
    # 处理信息
    infoDict = {}
    with open(info_txt, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            # 昵称
            if line.startswith('"nickname":'):
                nickname = re.findall(r'"nickname":"(.*?)",', line)[0]
                infoDict['nickname'] = nickname
                continue
            # 空间名
            elif line.startswith('"spacename":'):
                spacename = re.findall(r'"spacename":"(.*?)",', line)[0]
                infoDict['spacename'] = spacename
                continue
            # 空间简介
            elif line.startswith('"desc":'):
                desc = re.findall(r'"desc":"(.*?)",', line)[0]
                infoDict['desc'] = desc
                continue
            # 空间签名
            elif line.startswith('"signature":'):
                signature = re.findall(r'"signature":"(.*?)",', line)[0]
                infoDict['signature'] = signature
                continue
            # 性别
            elif line.startswith('"sex":'):
                sex = re.findall(r'"sex":(.*?),', line)[0]
                infoDict['sex'] = sex
                continue
            # 出生年
            elif line.startswith('"birthyear":'):
                birthyear = re.findall(r'"birthyear":(.*?),', line)[0]
                infoDict['birthyear'] = birthyear
                continue
            # 出生月日
            elif line.startswith('"birthday":'):
                birthday = re.findall(r'"birthday":"(.*?)",', line)[0]
                infoDict['birthday'] = birthday
                continue
            # 血型
            elif line.startswith('"bloodtype":'):
                bloodtype = re.findall(r'"bloodtype":(.*?),', line)[0]
                infoDict['bloodtype'] = bloodtype
                continue
            # 星座
            elif line.startswith('"constellation":'):
                constellation = re.findall(r'"constellation":(.*?),', line)[0]
                infoDict['constellation'] = constellation
                continue
            # 国家
            elif line.startswith('"country":'):
                country = re.findall(r'"country":"(.*?)",', line)[0]
                infoDict['country'] = country
                continue
            # 省
            elif line.startswith('"province":'):
                province = re.findall(r'"province":"(.*?)",', line)[0]
                infoDict['province'] = province
                continue
            # 城市
            elif line.startswith('"city":'):
                city = re.findall(r'"city":"(.*?)",', line)[0]
                infoDict['city'] = city
                continue
            # 家乡国
            elif line.startswith('"hco":'):
                hco = re.findall(r'"hco":"(.*?)",', line)[0]
                infoDict['hco'] = hco
                continue
            # 家乡省
            elif line.startswith('"hp":'):
                hp = re.findall(r'"hp":"(.*?)",', line)[0]
                infoDict['hp'] = hp
                continue
            # 家乡城
            elif line.startswith('"hc":'):
                hc = re.findall(r'"hc":"(.*?)",', line)[0]
                infoDict['hc'] = hc
                continue
            # 婚否
            elif line.startswith('"marriage":'):
                marriage = re.findall(r'"marriage":(.*?),', line)[0]
                infoDict['marriage'] = marriage
                continue
            # 职业
            elif line.startswith('"career":'):
                career = re.findall(r'"career":"(.*?)",', line)[0]
                infoDict['career'] = career
                continue
            # 公司
            elif line.startswith('"company":'):
                company = re.findall(r'"company":"(.*?)",', line)[0]
                infoDict['company'] = company
                continue
            # 最后修改时间
            elif line.startswith('"ptimestamp":'):
                ptimestamp = re.findall(r'"ptimestamp":(.*?)}', line)[0]
                if ptimestamp != '':
                    temp = time.localtime(float(ptimestamp))
                    createtime = time.strftime('%Y-%m-%d %H:%M:%S', temp)
                else:
                    createtime = ''
                infoDict['createtime'] = createtime
                continue
    return infoDict


# 地区统计
def count_area(friends_dict, area_type):
    area_dict = {}
    for key in friends_dict:
        try:
            area = friends_dict[key][area_type]
        except:
            area = ''
        if area == '':
            area = 'unknown'
        area_dict[area] = area_dict.get(area, 0) + 1
    return [list(area_dict.keys()), list(area_dict.values())]


# 性别统计
def count_sex(friends_dict):
    boy = 0
    girl = 0
    other = 0
    for key in friends_dict:
        try:
            if friends_dict[key]['sex'] == '2':
                girl += 1
            elif friends_dict[key]['sex'] == '1':
                boy += 1
            else:
                other += 1
        except:
            other += 1
    return boy, girl, other


# 年龄统计
def count_age(friends_dict):
    age_dict = {}
    for key in friends_dict:
        try:
            birth_year = friends_dict[key]['birthyear']
        except:
            birth_year = ''
        if birth_year == '' or birth_year == '0':
            age_dict['other'] = age_dict.get('other', 0) + 1
        else:
            age_dict[birth_year] = age_dict.get(birth_year, 0) + 1

    items = sorted(age_dict.items(), key=lambda x: x[0], reverse=True)
    counts = []
    ages = []
    for item in items:
        birth_year = item[0]
        count = item[1]
        if birth_year != 'other':
            age = datetime.datetime.now().year - int(birth_year)
            ages.append(age)
            counts.append(count)
        else:
            ages.append('unknown')
            counts.append(count)
    return [ages, counts]


# 画地图
def draw_map(data, map_name='好友地图分布'):
    option = options.InitOpts(width=1200, height=1200)
    map_ = (
        Map(option)
            .add('重庆', [list(z) for z in zip(data[0], data[1])], 'china')
            .set_global_opts(title_opts=options.TitleOpts(title=map_name))
    )

    map_.render('{}.html'.format(map_name))


# 画性别饼图
def draw_pie(data, pie_name='性别统计'):
    # print([list(z) for z in zip(data[0], data[1])])
    pie = (
        Pie()
            .add('', [list(z) for z in zip(data[0], data[1])])
            .render('{}.html'.format(pie_name))
    )


# 画年龄柱状
def draw_bar(data, mark_point=['min', 'max'], bar_name='年龄图'):
    opt = options.MarkPointOpts(mark_point)
    bar = (
        Bar()
            .add_xaxis(data[0])
            .add_yaxis('A', data[1])
            .set_global_opts(title_opts=options.TitleOpts(title='标题', subtitle='我是副标题'))
            .render('{}.html'.format(bar_name))
    )
    return bar


if __name__ == '__main__':
    i = parse_friends_info(291825458, 272721580)
    print(i)
