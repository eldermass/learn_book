import re
a = 'aaaabababc'

r = re.search('aba(.*)c', a)

print(r.group())