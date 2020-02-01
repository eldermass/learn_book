# -*- coding:UTF-8 -*-
import requests, re, time
from urllib import parse
from PIL import Image
from io import BytesIO


target = 'http://unsplash.com/'

req = requests.get(url=target, verify=False)

req.encoding = req.apparent_encoding

# decodeURI
point = parse.unquote(req.text)

pattern = r'(https://images.unsplash.com.+?q=\d+)'
match = re.findall(pattern, point)

# print(match, len(match))

for key in range(0, 5):
    u = requests.get(match[key], verify=False)
    i = Image.open(BytesIO(u.content))
    i.save('./{}.jpg'.format(key))
    i.close()
    time.sleep(1)


