# 基础

[常用系统模块](https://learnku.com/docs/pymotw/string-string-constants-and-templates/3360)

## 1. 常识

```bash
指定脚本运行程序，和字符编码
#!/usr/bin/python
# -*- coding: UTF-8 -*-
```

注释

```python
class Test:
    def add(self, a: int, b: int) -> int:
        """
        :type a: int
        :type b: int
        :rtype: int
        """
        return a + b
```

### 扩展类型

```python
# 枚举类型
enum

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

[详解](https://www.runoob.com/python/python-func-open.html)

```python
# 读写文件 文件名，mode(r，w，a，r+)
f = open('1.txt', 'r+'， encoding='utf-8') # 因为默认 gbk 有可能写不进去 unicode 编码
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
f.open('1.txt', 'rb')
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
# 参数分别是，模板，字符串，flags 标志位类似js里的img
re.match(pattern, string, re.M|re.I)
# group     所有匹配到的组
# groups    子匹配的元组

# 多重匹配
re.findall()

# 扫描整个字符串并返回第一个成功的匹配。
# 方法、参数同match， flags 标志位
re.search(pattern, string, flags=0)
# 例：
re.search( r'(.*) are (.*?) .*', line, re.M|re.I)

# 用于替换字符串中的匹配项。
# repl 替换为的字符串， max最大替换次数，默认0所有
re.sub(pattern, repl, string, max=0)

# 将一个表达字符串转换为一个 RegexObject
# 提前编译好，能减少运行时的开销
compile()

# 正则表达式修饰符 - 标志位  -- flags
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

# 对于支持事务的数据库， 在Python数据库编程中，当游标建立之时，就自动开始了一个隐形的数据库事务。
# commit()方法游标的所有更新操作，rollback（）方法回滚当前游标的所有操作。每一个方法都开始了一个新的事务。

# 该方法获取下一个查询结果集。结果集是一个对象
fetchone()
# 接收全部的返回结果行.
fetchall()
# 这是一个只读属性，并返回执行execute()方法后影响的行数。
rowcount

```

示例

```python
import pymysql

db = pymysql.connect('localhost', 'root', 'password', 'database')

# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

# 使用 execute()  方法执行 SQL 查询
cursor.execute("SELECT * from auth")

# 使用 fetchone() 方法获取所有数据.
data = cursor.fetchall()

for item in data:
    print(item)

# 插入/更新/删除等改变数据操作时，需要提交到数据库执行 commit
in_sql = """
    insert into auth(auth) values('{0}')
""".format('插入的值')

try:
    cursor.execute(in_sql)
# 提交到数据库执行
    db.commit()
except:
# 回滚
    db.rollback()

# 关闭数据库连接
db.close()

```

### 网络编程

[网络编程模块](https://www.w3cschool.cn/python3/python3-socket.html)

```python
# Python 提供了两个级别访问的网络服务。
# 低级别的网络服务支持基本的 Socket，它提供了标准的 BSD Sockets API，可以访问底层操作系统Socket接口的全部方法。
# 高级别的网络服务模块 SocketServer， 它提供了服务器中心类，可以简化网络服务器的开发。

```

### SMTP 发送邮件

163 端口：

![port](http://img4.cache.netease.com/help/2011/2/1/201102010936447869c.png)

QQ 端口：

| 邮箱   | POP3 服务器（端口 995） | SMTP 服务器（端口 465 或 587） |
| :----- | :---------------------- | :----------------------------- |
| qq.com | pop.qq.com              | smtp.qq.com                    |

```python
#!/usr/bin/python3

import smtplib
from email.mime.text import MIMEText
from email.header import Header

mail_from = '291825458@qq.com'
mail_to = ['285653184@qq.com']

server_host = 'smtp.qq.com'
server_user = '291825458@qq.com'
server_pass = 'password'

# 三个参数：第一个为文本内容，第二个 plain 设置文本格式，第三个 utf-8 设置编码
message = MIMEText('这是一封邮件，邮件发送...', 'plain', 'utf-8')
# 发件人
message['From'] = Header("明天就是周末", 'utf-8')
# 收件人
message['To'] = Header("你好", 'utf-8')
# 标题
subject = '明天就是周末了'
message['Subject'] = Header(subject, 'utf-8')

# try:
smtpObj = smtplib.SMTP(server_host, 25)
smtpObj.login(server_user, server_pass)

smtpObj.sendmail(mail_from, mail_to, message.as_string())
print("邮件发送成功")
# except smtplib.SMTPException:
#     print("Error: 无法发送邮件")
```

### 多线程

Python3 通过两个标准库 \_thread 和 threading 提供对线程的支持。
\_thread 提供了低级别的、原始的线程以及一个简单的锁，它相比于 threading 模块的功能还是比较有限的。

#### 原始的多线程

```python
#!/usr/bin/python3

import _thread
import time

# 为线程定义一个函数
def print_time( threadName, delay):
   count = 0
   while count < 5:
      time.sleep(delay)
      count += 1
      print ("%s: %s" % ( threadName, time.ctime(time.time()) ))

# 创建两个线程
try:
   _thread.start_new_thread( print_time, ("Thread-1", 2, ) )
   _thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
   print ("Error: 无法启动线程")

while 1:
   pass

```

#### 使用 threading 模块

```python
# threading 模块
run():          用以表示线程活动的方法。
start():        启动线程活动。
join([time]):   等待至线程中止。这阻塞调用线程直至线程的join() 方法被调用中止-正常退出或者抛出未处理的异常-或者是可选的超时发生。
isAlive():      返回线程是否活动的。
getName():      返回线程名。
setName():      设置线程名。

可以通过直接从 threading.Thread 继承创建一个新的子类，并实例化后调用 start() 方法启动新线程，即它调用了线程的 run() 方法：
```

```python
#!/usr/bin/python3

import threading
import time

exitFlag = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter
    def run(self):
        # 该线程要执行的内容
        print ("开始线程：" + self.name)
        print_time(self.name, self.counter, 1)
        print ("退出线程：" + self.name)

def print_time(threadName, counter, delay):
    while counter:
        if exitFlag:
            threadName.exit()
        time.sleep(delay)
        print ("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1

# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 5)

# 开启新线程
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print ("退出主线程")
```

#### 线程同步

```python
#!/usr/bin/python3
# 如果多个线程共同对某个数据修改，则可能出现不可预料的结果，为了保证数据的正确性，需要对多个线程进行同步。

# 使用 Thread 对象的 Lock 和 Rlock 可以实现简单的线程同步，这两个对象都有 acquire 方法和 release 方法，对于那些需要每次只允许一个线程操作的数据，可以将其操作放到 acquire 和 release 方法之间。如下：

import threading
import time


class myThread(threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter

    def run(self):
        print("开启线程： " + self.name)
        # 获取锁，用于线程同步
        threadLock.acquire()
        print_time(self.name, self.counter, 3)
        # 释放锁，开启下一个线程
        threadLock.release()


def print_time(threadName, delay, counter):
    while counter:
        time.sleep(delay)
        print("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1


threadLock = threading.Lock()
threads = []

# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# 开启新线程
thread1.start()
thread2.start()

# 添加线程到线程列表
threads.append(thread1)
threads.append(thread2)

# 等待所有线程完成
for t in threads:
    t.join()
print("退出主线程")
```

#### 线程优先级队列（ Queue）

```python
#!/usr/bin/python3

import queue
import threading
import time

exitFlag = 0


class myThread(threading.Thread):
    def __init__(self, threadID, name, q):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.q = q

    def run(self):
        print("开启线程：" + self.name)
        process_data(self.name, self.q)
        print("退出线程：" + self.name)


def process_data(threadName, q):
    while not exitFlag:
        queueLock.acquire()
        if not workQueue.empty():
            data = q.get()
            queueLock.release()
            print("%s processing %s \n" % (threadName, data))
        else:
            queueLock.release()
        time.sleep(1)


threadList = ["Thread-1", "Thread-2", "Thread-3"]
nameList = ["One", "Two", "Three", "Four", "Five"]
queueLock = threading.Lock()
workQueue = queue.Queue(10)
threads = []
threadID = 1

# 创建新线程
for tName in threadList:
    thread = myThread(threadID, tName, workQueue)
    thread.start()
    threads.append(thread)
    threadID += 1

# 填充队列
queueLock.acquire()
for word in nameList:
    workQueue.put(word)
queueLock.release()

# 等待队列清空
while not workQueue.empty():
    pass

# 通知线程是时候退出
exitFlag = 1

# 等待所有线程完成
for t in threads:
    t.join()
print("退出主线程")

```

### json 数据解析

```python
# 对数据进行编码。
json.dumps()
# 对数据进行解码。
json.loads()

# 写入 JSON 数据文件
with open('data.json', 'w') as f:
    json.dump(data, f)

# 读取数据文件
with open('data.json', 'r') as f:
    data = json.load(f)
```

### 时间函数

```python
import time

# 时间戳
time.time()

# 时间元组, 对应年月日时分秒等9个数据
time.localtime(timestamp)

# 格式化的时间
time.asctime(time_tuple)

# time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
time.strftime(format, time_tuple)
time.strptime(string, format)

# 推迟调用线程的运行，secs指秒数。
time.sleep(secs)

# 距离格林威治的偏移秒数，如 UTC-8 大于了世界时 8 小时，所以值为 -28800
# time.time() + time.timezone 总是等于 世界时
time.timezone
time.tzname     # 时区名

```
