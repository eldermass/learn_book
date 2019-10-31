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

### 文件操作

```python
# 读写文件 文件名，mode(r，w，a，r+)
f = open('1.txt', 'r+')
string = f.read(size) # size 默认为负
# 单行读取readline， 多行读取 readlines(sizehint)
# 迭代 for line in f:

f.write(string)     # 写入
f.close()           # 释放资源
f.tell()            # 返回位置
f.seek()            # 指定位置
f.flush()           # 刷新文件缓冲

# 预定义清理行为
with open("myfile.txt") as f:
    for line in f:
        print(line, end="")



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

### 模块

os 模块

```python
# 检测文件权限，os.access('1.txt', os.F_OK)是否存在path mode: xrwf
os.access(path, mode)
os.chdir()      # 切换目录
os.system(command) # 执行脚本命令
os.mkdir() # ... 有很多，具体看文档

# 文件通配符 glob
glob.glob('*.py')
```

sys 模块

```python
import sys

sys.argv
# sys 还有 stdin，stdout 和 stderr 属性，
sys.stderr.write('warnning!')


还有许多模块，如 math/random/urllib 网路库/smtplib 邮件库/datetime/ zlib 数据压缩 / timeit 性能度量
/doctest 测试/ unittest 细粒度测试
from urllib.request import urlopen
for line in urlopen('http://www.baidu.com/'):

t = zlib.compress(s) # 压缩
zlib.decompress(t)   # 解压
```

### 错误和异常

```python
while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again   ")
        # raise 可以再次抛出被捕获的异常
        raise
    else:
        print('这句话将在没有捕获到异常时执行')
    finally:
        print('无论什么情况都会走到这里')

# 处理多个异常时用元组，或省略通配所有类型的错误
except (RuntimeError, TypeError, NameError):
    pass

# 使用 raise 抛出异常
raise NameError('fuck')
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

```

## 2. 系统模块
