# 基础

## 1. 常识

```bash
指定脚本运行程序，和字符编码
#!/usr/bin/python
# -*- coding: UTF-8 -*-
```

### 迭代器和生成器

```python
# iter() 和 next() 迭代器
import sys

list=[1,2,3,4]
it = iter(list)    # 创建迭代器对象

while True:
    try:
        print(next(it))
    except StopIteration:
        sys.exit()
```

```python
# 在 Python 中，使用了 yield 的函数被称为生成器（generator）。
import sys

def fibonacci(n): # 生成器函数 - 斐波那契
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n):
            return
        yield a
        a, b = b, a + b
        counter += 1
f = fibonacci(10) # f 是一个迭代器，由生成器返回生成

while True:
    try:
        print (next(f), end=" ")
    except StopIteration:
        sys.exit()
```

### 输入和输出

[详解](https://www.w3cschool.cn/python3/python3-inputoutput.html)

```python
# 输出
print()
sys.stdout()
# str(), repr()显示特殊字符，参数可以是所有对象
# 格式化输出 rjust ljust center zfill str.format
for x in range(1, 11):
    print('{0:2d} {1:3d} {2:4d}'.format(x, x*x, x*x*x))



# 读写文件 文件名，mode(r，w，a，r+)
f = open('1.txt', 'r+')
string = f.read(size) # size 默认为负
# 单行读取readline， 多行读取 readlines(sizehint)
# 迭代 for line in f:

f.write(string)     # 写入
f.close()           # 释放资源
f.tell()            # 返回位置
f.seek()            # 指定位置



# pickle 模块， 序列化和反序列化
import pickle
f = open('1.txt', 'wb')
pickle.dump({'name': 'zahngsan','age': 18,'hobby': 'sleeping'}, f)
f.close()

# 反序列化
import pickle
f.open('1.txt', 'wb')
data = pickle.load(f)
f.close()


```

## 2. 系统模块
