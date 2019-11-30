import os
import cookie
import requests
from utils import *
from getpass import getpass


# 获取谁关心我
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
    print(content)
    save_html(content, './results/{}'.format(qq), 'cared_me.txt')
    return content


# 初始化目录
def init():
    if not os.path.exists(default_path):
        os.mkdir(default_path)
    if not os.path.exists('./results'):
        os.mkdir('./results')


if __name__ == '__main__':
    init()
    username = '291825458'
    # password = 'password'
    password = getpass('请输入密码:')
    qq, gtk, headers = cookie.get(username, password)
    get_cared_me(qq, gtk, headers)
