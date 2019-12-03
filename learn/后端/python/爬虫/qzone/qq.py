import os
import cookie
import requests
from utils import *
from getpass import getpass
import time

results_path = './results'


# 初始化目录
def init():
    if not os.path.exists(default_path):
        os.mkdir(default_path)
    if not os.path.exists('./results'):
        os.mkdir('./results')


# 谁在意我
def get_cared_me(qq, gtk, headers):
    url = 'https://h5.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/tfriend/friend_ship_manager.cgi?uin={}&do=1&rd=0.11376390567557748&fupdate=1&clean=0&g_tk={}'
    url = url.format(qq, gtk)
    print('ready to get who cared me')
    res = requests.get(url, headers=headers)
    print(res.encoding, res.apparent_encoding)
    res.encoding = res.apparent_encoding

    if res.status_code != 200:
        print('[Error]: Failed to get who cared me in qq.py')
        exit(-1)

    content = res.text
    save_html(content, './results/{}'.format(qq), 'cared_me.txt')
    return content


# 我在意谁
def get_me_cared(qq, gtk, headers):
    url = 'https://h5.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/tfriend/friend_ship_manager.cgi?uin={}&do=1&rd=0.11376390567557748&fupdate=1&clean=0&g_tk={}'
    url = url.format(qq, gtk)
    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        print('[Error]: Failed to get me cared')
        exit(-1)

    content = res.text
    save_html(content, './results/{}'.format(qq), 'me_cared.txt')
    return content


# 下载 关心 id 列表
def get_cared_info(qq, gtk, headers, savefile=results_path):
    savefile = os.path.join(savefile, qq, 'cared_list.txt')
    cared_me = get_cared_me(qq, gtk, headers)
    me_cared = get_me_cared(qq, gtk, headers)
    f_cared_me = re.findall(r'"uin":(.*?),', str(cared_me))
    f_me_cared = re.findall(r'"uin":(.*?),', str(me_cared))

    f = open(savefile, 'w', encoding='utf-8')
    f.write('cared_me: \n')
    for f_id in f_cared_me:
        f_id = f_id.strip()
        if f_id:
            f.write(str(f_id) + ' ')
    f.write('\n\n\n')

    f.write('me_cared: \n')
    for f_id in f_me_cared:
        f_id = f_id.strip()
        if f_id:
            f.write(str(f_id) + ' ')
    print('[INFO]: Get care and cared successfully')


# 下载单个好友数据
def get_friends_info(qq, t_qq, gtk, headers, faillog=results_path):
    url = 'https://h5.qzone.qq.com/proxy/domain/base.qzone.qq.com/cgi-bin/user/cgi_userinfo_get_all?uin={}&vuin={}&fupdate=1&g_tk={}'
    url = url.format(t_qq, qq, gtk)
    res = requests.get(url, headers=headers)
    results_path = os.path.join(faillog, qq)

    if (res.status_code != 200):
        print('[Error]: Failed to get friends info')
        # 写入错误日志
        f = open(os.path.join(results_path, '{}_fail.txt'.format(qq), 'a'))
        f.write(str(t_qq) + '\n')
        f.close()
        return None

    content = res.text
    save_html(content, results_path, '{}_info.txt'.format(t_qq))
    return content


# 解析获取所有好友信息
def get_all_friends_info(qq, friends):
    friends_info_dict = {}
    for friend in friends:
        info_dict = parse_friends_info(qq, friend)
        if info_dict is not None:
            friends_info_dict[friend] = info_dict
    return friends_info_dict


if __name__ == '__main__':
    init()
    username = '291825458'
    password = 'password'
    # password = getpass('请输入密码:')
    # qq, gtk, headers = cookie.get(username, password)
    # 下载好友qq列表
    # get_cared_info(qq, gtk, headers)
    # 从文件里读qq列表
    friends = read_cared()

    # 下载好友信息文件
    # for friend_id in friends:
    #     get_friends_info(qq, friend_id, gtk, headers)
    #     time.sleep(0.2)
    friends_info_dict = get_all_friends_info(username, friends)
    # print(friends_info_dict)

    # 处理数据
    # 地区
    # data = count_area(friends_info_dict, 'province')
    # draw_map(data)

    # 性别
    # data = count_sex(friends_info_dict)
    # draw_pie([['boy', 'girl', 'other'], list(data)])
    # print(data)

    # 年龄
    data = count_age(friends_info_dict)
    draw_bar(data)
    print(data)
