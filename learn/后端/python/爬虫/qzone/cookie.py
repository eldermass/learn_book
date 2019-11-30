from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import requests
from lxml.html import etree
from utils import *
import html


# 检查 cookie 是否有效
def check_cookie(qq, gtk, headers):
    url = 'https://h5.qzone.qq.com/proxy/domain/r.qzone.qq.com/cgi-bin/tfriend/friend_ship_manager.cgi?uin={}&do=1&rd=0.11376390567557748&fupdate=1&clean=0&g_tk={}'
    url = url.format(str(qq), str(gtk))
    res = requests.get(url, headers=headers)
    status = res.status_code
    res.encoding = res.apparent_encoding

    if status != 200 or '请先登录' in str(res.text):
        return False
    return True


# 获取一个新的cookie
def get_new_cookie(usr, pwd):
    chrome_options = Options()
    # 不用隐藏浏览器，因为要托滑块
    # chrome_options.add_argument('--headless')
    # chrome_options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('http://qzone.qq.com')

    driver.switch_to.frame(driver.find_element_by_id('login_frame'))
    driver.find_element_by_id('switcher_plogin').click()
    # 输入账号
    driver.find_element_by_id('u').clear()
    driver.find_element_by_id('u').send_keys(usr)
    # 输入密码
    driver.find_element_by_id('p').clear()
    driver.find_element_by_id('p').send_keys(pwd)
    driver.find_element_by_id('login_button').click()

    time.sleep(10)
    driver.switch_to.default_content()
    page = etree.HTML(driver.page_source)
    nick = page.xpath('//*[@id="headContainer"]/div[2]/div/span[1]')

    if len(nick) > 0:
        print('[INFO]: %s Login Successfully...' % usr)
    else:
        print('[Error]: Fail to login %s in <cookie.py - _GetNewCookie func>...' % usr)
        driver.quit()
        exit(-1)
    items = [item['name'] + '=' + item['value'] for item in driver.get_cookies()]
    cookie = ';'.join(items)
    print('[INFO]: Get Cookie %s' % cookie)
    driver.quit()

    return cookie


# 获取QQ号, gtk和Header
def get_qgh(username, cookie):
    headers = get_header(cookie=cookie)
    skey = get_skey(cookie)
    if skey is None:
        print('[Error]: skey in not existence')
        exit(-1)
    try:
        int(username)
    except:
        print('[Error]: username must be qq number')
        exit(-1)
    qq = username
    gtk = get_gtk(skey)
    return qq, gtk, headers


# 外部调用函数
def get(username, password=None, datafile=default_path, savefile=default_path):
    # 读取 cookie
    cookie = read_cookie()
    if cookie is None:
        print('[INFO]: No cookie saved before, get new one...')
        cookie = get_new_cookie(username, password)
        if cookie is None:
            print('[Error]: Fail to get cookie')
            exit(-1)
        save_cookie(cookie)
        qq, gtk, headers = get_qgh(username, cookie)
        return qq, gtk, headers

    qq, gtk, headers = get_qgh(username, cookie)
    if not check_cookie(qq, gtk, headers):
        print('[INFO]: cookie is out of date, get new one...')
        cookie = get_new_cookie(username, password)
        if cookie is None:
            print('[Error]: Fail to get cookie')
            exit(-1)
        save_cookie(cookie)
        qq, gtk, headers = get_qgh(username, cookie)
        return qq, gtk, headers
    print('saved cookie can be used')
    return qq, gtk, headers


if __name__ == '__main__':
    ret = get('291825458', 'password')
    print(ret)
