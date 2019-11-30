import os
import re

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


if __name__ == '__main__':
    # save_cookie(cookie)
    c = read_cookie()
    print(c)
