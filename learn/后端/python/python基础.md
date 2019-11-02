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

### re 模块

```python
import re
# 尝试从字符串的起始位置匹配一个模式
# 参数分别是，模板，字符串，标志位类似js里的img
re.match(pattern, string, re.M|re.I)
# group     所有匹配到的组
# groups    子匹配的元组

# 扫描整个字符串并返回第一个成功的匹配。
# 方法、参数同match
re.search(pattern, string, flags=0)

# 用于替换字符串中的匹配项。
# repl 替换为的字符串， max最大替换次数，默认0所有
re.sub(pattern, repl, string, max=0)

# 正则表达式修饰符 - 标志位
re.I  使匹配对大小写不敏感
re.L  做本地化识别（locale-aware）匹配
re.M  多行匹配，影响 ^ 和 $
re.S  使 . 匹配包括换行在内的所有字符
re.U  根据Unicode字符集解析字符。这个标志影响 \w, \W, \b, \B.
re.X  该标志通过给予你更灵活的格式以便你将正则表达式写得更易于理解。

```

python 的匹配模式

| 模式        | 描述                                                                                                                                                                      |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ^           | 匹配字符串的开头                                                                                                                                                          |
| \$          | 匹配字符串的末尾。                                                                                                                                                        |
| .           | 匹配任意字符，除了换行符，当 re.DOTALL 标记被指定时，则可以匹配包括换行符的任意字符。                                                                                     |
| [...]       | 用来表示一组字符,单独列出：[amk] 匹配 'a'，'m'或'k'                                                                                                                       |
| [^...]      | 不在[]中的字符：[^abc] 匹配除了 a,b,c 之外的字符。                                                                                                                        |
| re\*        | 匹配 0 个或多个的表达式。                                                                                                                                                 |
| re+         | 匹配 1 个或多个的表达式。                                                                                                                                                 |
| re?         | 匹配 0 个或 1 个由前面的正则表达式定义的片段，非贪婪方式                                                                                                                  |
| re{ n}      | 匹配 n 个前面表达式。例如，"o{2}"不能匹配"Bob"中的"o"，但是能匹配"food"中的两个 o。                                                                                       |
| re{ n,}     | 精确匹配 n 个前面表达式。例如，"o{2,}"不能匹配"Bob"中的"o"，但能匹配"foooood"中的所有 o。"o{1,}"等价于"o+"。"o{0,}"则等价于"o\*"。                                        |
| re{ n, m}   | 匹配 n 到 m 次由前面的正则表达式定义的片段，贪婪方式                                                                                                                      |
| a\| b       | 匹配 a 或 b                                                                                                                                                               |
| (re)        | G 匹配括号内的表达式，也表示一个组                                                                                                                                        |
| (?imx)      | 正则表达式包含三种可选标志：i, m, 或 x 。只影响括号中的区域。                                                                                                             |
| (?-imx)     | 正则表达式关闭 i, m, 或 x 可选标志。只影响括号中的区域。                                                                                                                  |
| (?: re)     | 类似 (...), 但是不表示一个组                                                                                                                                              |
| (?imx: re)  | 在括号中使用 i, m, 或 x 可选标志                                                                                                                                          |
| (?-imx: re) | 在括号中不使用 i, m, 或 x 可选标志                                                                                                                                        |
| (?#...)     | 注释.                                                                                                                                                                     |
| (?= re)     | 前向肯定界定符。如果所含正则表达式，以 ... 表示，在当前位置成功匹配时成功，否则失败。但一旦所含表达式已经尝试，匹配引擎根本没有提高；模式的剩余部分还要尝试界定符的右边。 |
| (?! re)     | 前向否定界定符。与肯定界定符相反；当所含表达式不能在字符串当前位置匹配时成功                                                                                              |
| (?> re)     | 匹配的独立模式，省去回溯。                                                                                                                                                |
| \w          | 匹配字母数字                                                                                                                                                              |
| \W          | 匹配非字母数字                                                                                                                                                            |
| \s          | 匹配任意空白字符，等价于 [\t\n\r\f].                                                                                                                                      |
| \S          | 匹配任意非空字符                                                                                                                                                          |
| \d          | 匹配任意数字，等价于 [0-9].                                                                                                                                               |
| \D          | 匹配任意非数字                                                                                                                                                            |
| \A          | 匹配字符串开始                                                                                                                                                            |
| \Z          | 匹配字符串结束，如果是存在换行，只匹配到换行前的结束字符串。c                                                                                                             |
| \z          | 匹配字符串结束                                                                                                                                                            |
| \G          | 匹配最后匹配完成的位置。                                                                                                                                                  |
| \b          | 匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。                                                      |
| \B          | 匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。                                                                                            |
| \n, \t, 等. | 匹配一个换行符。匹配一个制表符。等                                                                                                                                        |
| \1...\9     | 匹配第 n 个分组的子表达式。                                                                                                                                               |
| \10         | 匹配第 n 个分组的子表达式，如果它经匹配。否则指的是八进制字符码的表达式。                                                                                                 |

### GUI 编程

```python
# 使用 python 自带的服务器快速启动一个cgi服务
# 启动目录即是根目录，cgi-bin/ 目录下放置cgi文件
# 根路径默认会访问根目录的 index 文件
python -m http.server --cgi 8000

```

### 连接数据库

<!-- 使用pycharm下载会有问题，建议你在pycharm里的File>setting>Project untitled>Project Interpreter>点击右边的+号  然后搜索PyMySQL然后点击左下角的Install 进行下载   -->
```python
# 安装、使用提供的驱动库
pip install PyMySQL

```
