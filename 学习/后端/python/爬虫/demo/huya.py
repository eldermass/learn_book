# coding=utf-8
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
import json

service = Service(executable_path='C:/Program Files (x86)/Google/Chrome/Application/chromedriver.exe')


class Huya:
    def __init__(self):
        self.url = 'https://www.huya.com/l'
        self.driver = webdriver.Chrome(service=service)

    def get_data(self):
        js_script = '''
            $0 = document.getElementsByClassName('js-responded-list')[0];
            $0.scrollTo(0, $0.scrollHeight);
        '''
        self.driver.execute_script(js_script)

        els = self.driver.find_elements(By.XPATH, '//*[@id="js-live-list"]/li')

        data_list = []
        for el in els:
            temp = {}
            temp['title'] = el.find_element(By.CLASS_NAME, 'title').text
            temp['link'] = el.find_element(By.CLASS_NAME, 'title').get_attribute('href')
            data_list.append(temp)

        return data_list

    def parse_data(self):
        pass

    def run(self):
        self.driver.get(self.url)

        page = 1
        while page <= 2:
            print('正在获取第{0}页的数据', page)
            # 获取数据
            data_list = self.get_data()
            print(data_list[0])
            # 保存数据
            with open('./file/huya.txt', 'a') as f:
                f.write(json.dumps(data_list, ensure_ascii=False) + '\n')

            page_next_a = self.driver.find_element(By.CLASS_NAME, 'laypage_next')
            if page_next_a:
                self.driver.execute_script('arguments[0].click()', page_next_a)
            else:
                break
            page += 1
            time.sleep(1)
        self.driver.quit()


if __name__ == '__main__':
    huya = Huya()
    huya.run()
