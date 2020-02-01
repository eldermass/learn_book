# python 入门

[w3c 教程](https://www.w3cschool.cn/python3)

## 数据类型

### 运算符

```python
运算符 + - * /除法 //除整 %模 **幂
赋值运算符 += ...   同上
比较运算符 > < != == <= >=
逻辑运算符 and / or / not
成员运算符 in / not in
身份运算符(比较内存地址)
          is / is not
位运算符
    & 按位与 2 & 3 = 2 (0b10 与 0b11 得 0b10)
    | 按位或
    ^ 按位异或
    ~ 按位取反
    << 按位左移
    >> 按位右移

判断是否是某类型
isinstance(a, int)
isinstance(a, (int, str, float))
```

### 数字类型

int float bool complex

```python
# 整型浮点型
a, b = 1, 1.1
# 二进制 八进制 十六进制
0b10 0o10 0x10

# bool 类型
# 空值都是False
bool([]) == False

# complex 复数 类型
n = 4 + 4j
print(n ** 2) # 32 + 16j + 16j + 32j^2  = 32j

# 进制转换
bin() int() oct() hex()
 # 整除
1//2 = 0

```

### 组

有序序列(sequence)：str list tuple (可通过下标访问，可以[0:3]切片操作)
集合：set (无序，没有索引，不能切片)
字典：dict (key: value 的概念)

list[0:length:步长]， 切片操作
list[start, end, step]
hex(id(a)), a 的内存地址

#### 字符串 str

```python
# 单引号 双引号 三引号
# 三引号可以指定多行字符串

# r 表示 原始字符串 \n 不转义
a = r'abc\nbcd'

# unicode 相互转换
chr(9)
ord(' ')
# \d：十进制；\o：八进制；\x 十六进制
# \u unicode码
# \xaa ⇒ chr(0xaa) ⇒ chr(16*a+a)

# 字符串可以直接运算
b ='python' * 2 # 'pythonpython'

# 从前至后，和从后至前的索引方式
# 字符串不可改变，不可通过索引赋值, 如 b[0] = 'h'
b[0] # p
b[-1] # n

# 字符串切片，变量[头下标:尾下标]， 前闭后开
'hello world'[2:4] # 'll'

# 格式占位符%s，这是老的格式化，现在一般用str.format()
# https://blog.csdn.net/jiangbo721/article/details/78468571
c = 'place %s' % 'holder' # 传入单值
c = 'i am %s, age is %s}' % ('zhangsan', '23')  # 传入元组
c = "I'm %(name)s. I'm %(age)d year old" % {'name':'Vamei', 'age':99} # 传入字典
e = 'i am {0}, age is {1}'.format('z3', 23)
e = 'i am {}, age is {}'.format(*('z3', 23)) # 传入元组
e = 'i am {name:s}, age is {age:d}'.format(**{'name': '张三', 'age': 23})       # 传入字典
```

#### 列表 list

```python
# 引用类型
a = [1, 'two', true, []]

# 选取列表，前闭后开区间
a[0] = 2
a[0:2] # return [1, 'two']

# 运算
[1, 2] * 2      # [1, 2, 1, 2]
[1, 2] + [3]    # [1, 2, 3]

# 修改区间的值
a[1:2] = [7, 7] # 插入
a[1:2] = []     # 删除

# 方法
a.append(val)   # 入栈一个值，push
a.extend(list)  # 扩展数组，concat
a.insert(i, val)# 插入值到i位置
a.remove(n)     # 移除第n个元素
a.pop(n)        # pop出第n个值
a.clear()
a.index(val)    # 找出value值的index
a.count(val)    # val出现次数
a.reverse()     # 倒序
a.sort()        # 排序
a.copy()        # 复制

# 列表推导式
a = [1,2,3,4]
a1 = [5,10]
b = [x*3 for x in a] # [3, 6, 9, 12]
c = [[x, x*3] for x in a ] # [[1, 3], [2, 6], [3, 9], [4, 12]]
# 使用 if 过滤
d = [x*3 for x in a if x > 3] # [12]
e = [x+y for x in a for y in a1] # [6, 11, 7, 12, 8, 13, 9, 14]

# 例：3*4 矩阵替换为4*3
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

b = [[row[i] for row in matrix] for i in range(4)]
```

队列

```python
from collections import deque

q = deque([1, 2, 3, 4])

q.append(5)

q.popleft()

print(list(q))
```

#### 元组 tuple

```python
# 值类型，不可修改
(1, 2, [3, 4])

# tu 会自己成为元组(1, 2, 3)
tu = 1, 2, 3
a, b, c = tu

# 元组 可以切片(同上),可以相加
tu + tu # (1,2,3,1,2,3)

# 方法
len()
max()
min()
tuple() # 把列表转化为元组
```

#### 集合 set

```python
# 引用类型，无序、不重复的
{1, 2, 3} == {2, 3, 1，2，1}

# 集合的比较
a = {1,2,3,4}
b = {3,4,5,6}

# 差集
a - b # {1,2}
# 并集
a | b # {1, 2, 3, 4, 5, 6}
# 交集
a & b # {3, 4}
# 不同时存在
a ^ b # {1, 2, 5, 6}

# 支持 列表推导式
```

#### 字典 dict

```python
# 引用类型
users = {'Tom': 1320, 'Jack': 1557, 'Rose': 1886}
# 删除
del users['Rose']

# 可以从sequence中构建字典
dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])

# 内置方法
dict.keys()    # keys 的 list
dict.values()
dict.items()   # 返回 (key, value) 元组
dict.clear()

dict.copy()    # 浅拷贝
dict.fromkeys(seq, value) # 根据序列生成字典
dict.get(key, default)    # 获取指定字段，没有返回默认值
dict.setdefault(key, default)
dict.update(dict2) # 把dict2 更新到dict

# 成员测试
"Tom" in users # True

# 方法
len() str()

# 支持 列表推导式
```

#### 枚举类型

```python
# 继承自类, 并不是单独的类型
from enum import Enum

class VIP(Enum):
    yellow = 1
    yellow_alias = 1
    green = 2
    black = 3
# 使用for in 遍历
# 使用VIP.__members__遍历别名
VIP.yellow VIP[VIP.yellow.name] VIP(1)
# 限制标签类型， 并唯一
from enum import IntEnum, unique

@unique
class VIP(IntEnum):
```

## 表达式

表达式(Expression)：预算符(operator)和操作数(operand)构成的序列

```bash
# 单行注释
'''
多行注释
'''
"""
多行注释
"""
```

### 流程控制

```python
# 可用pass保留结构完整

# 获取输入值
value = input()

# 判断
if condition:
    print('something', end = '\n')
elif condition:
    pass
else:
    pass
```

```python
# while循环
while counter:
    counter -= 1
    print(counter))
else
    print(EOF)

# range(start, end, step))
# for循环
for x in range(0, 10, 2):
    print(x)
    if x > 5:
        break

for item in l:
    print(key)
else:
    print('遍历完了')
```

## 包与模块

```python
# 模块 会找查sys.path的路径
# 引入模块全部内容
import module_name # 使用 module_name.var
# 部分引入，var可使用 *(不含_开头的属性)
from module_name import var # 直接使用 var

# 模块中 __name__ 判断是否是引入调用，__main__为自己执行
dir(module_name) # 获取模块所定义的名称

# 别名
import module_name as alias


# 包是一种管理 Python 模块命名空间的形式，采用"点模块名称"。
# 目录下有__init__.py文件，就会被 python 当做包
sound/                          顶层包
      __init__.py               初始化 sound 包
      formats/                  文件格式转换子包
              __init__.py
              wavread.py
              wavwrite.py

# 引入同模块， 可以直接引入模块或变量
from sound.formats import wavread

# __init__.py 文件下一般写 __all__ = ['需要导出的模块']， 对应使用时的ipmort *
# 包名.文件名（__init__.py模块的模块名就是包名）
print(__package__)
print(__name__)
print(__doc__)
print(__file__)

# 其他方式引入
from module_name import var/mod/*
# 导出时使用模块内置属性 __all__ = ['a'], 可以控制import * 时需要引入的变量

```

## 函数

### 函数申明

```python
def funcname(parameter_list):
    pass

# 可变参数
def add(*args):
    # args is a tuple 剩余参数，当做元组
    for x in args:
        print(x, end=' ')

# 关键字参数
def add(**kargs):
    # karg is type of dict 指定关键字的参数，如：x=1
    pass

# 可以返回多个参数构成元祖
return res1, res2, res3

# 解构元组
r1, r2, r3 = func()

# 函数参数为必须参数 def add(x, y)
# 形参任意赋值对应,可以切换传参顺序
add(y = 2, x =1)

```

### 局部变量

```python
# 局部可以访问上级的变量，但是不能像js那样修改
# 闭包变量被赋值时就会被认为是局部变量
def curve_pre():
    # 使用global关键字可以改变全局变量
  global name
  name = 'curve_pre'
  def curve():
    # 申明非本地变量
    nonlocal name
    print('i am curve and ' + name)
  return curve

curve_pre()
```

## 类与对象

```python
class Stu():
    name = ''
    # 私有属性、方法,以__开头, 将被改名_Stu__private
    __private = '私有属性，只是改了个名字而已，并没法阻止访问'
    def __init__(self, name):
        # 构造函数
        pass
        # 访问类属性(静态属性)
        self.__class__.name

    # 装饰器，静态函数，可以不要参数
    @staticmethod
    def funcname():
        pass

    # 类方法
    @classmethod
    def funname(cls):
        pass
# 实例化
s = Stu()

# 类似js，直接添加属性
s.newattr = '新属性'
s.say()

# 打印实例的字典
print(s.__dict__)

```

继承

```python
# 继承
class Stu(Person):
    def __init__(self, name):
        # 调用父类构造函数 1
        Person.__init__(self, name)
        # 调用父类构造函数 2
        super(Stu, self).__init__(name)

# 多重继承
# 同名的属性、方法会由左至有查找
class Stu(Person, Animal):
    def __init__(self):
        pass

```

类专有方法

```python
__init__ : 构造函数，在生成对象时调用
__del__ : 析构函数，释放对象时使用
__repr__ : 打印，转换
__setitem__ : 按照索引赋值
__getitem__: 按照索引获取值
__len__: 获得长度
__cmp__: 比较运算
__call__: 函数调用
__add__: 加运算
__sub__: 减运算
__mul__: 乘运算
__div__: 除运算
__mod__: 求余运算
__pow__: 乘方
```

运算符重载

```python
def __add__(self, other):
    return self.age + other.age

```

## 正则

```python
# 字符串检测函数
a.index('some')
'some' in a

# 正则，使用re模块
import re
re.findall('parttern', a)
# 规则和其他语言差不多
# 默认贪婪匹配，量词加?即可进入非贪婪
a = re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')

# re.I 忽略大小写， re.S .匹配任意
re.findall('parttern', string, re.I | re.S)

# 替换类似js replace, count替换多少个，count 为0表示无限制
re.sub('parttern', 'target', string, count)
# 回调中使用 matched = value.group() 取值
re.sub('parttern', 回调func, string, count)
# 或
string.replace('a', '')
re.match # 从头匹配
r1 = re.search # 搜索

# 获取结果
r1.group(0,1,2)
r1.groups()

```

## JSON

```python
import json
# 序列化 为 string
json.dumps()
# 反序列化
json.loads()

```

## 函数式、闭包

### 闭包变量

```python
# 局部可以访问上级的变量，但是不能像js那样修改
# 闭包变量被赋值时就会被认为是局部变量
def curve_pre():
    # 使用global关键字可以改变全局变量
  global name
  name = 'curve_pre'
  def curve():
    # 申明非本地变量
    nonlocal name
    print('i am curve and ' + name)
  return curve

curve_pre()
```

### 匿名函数

```python

def add(x, y):
    return x + y
# 匿名函数
# lambda prama_list: expr
lambda x, y: x + y
# 三元表达式
# x > y ? x : y
x if x > y else y

# map 遍历
map(func, list)
map(lambda x, y: x * x + y, listx, listy)
# reduce 遍历
from functools import reduce
reduce(lambda x,y: x+y, listx, first)
# filter
filter(lambda x: x > 3, a)
```

## 装饰器

```python
import time
def decorator(func):
    # args 参数列表，kw 关键字参数(以字典接收剩余参数)
    def wrapper(*args, **kw):
        print(time.time())
        func(*args, **kw)
    return wrapper
# 使用装饰器
@decorator
def f1():
    print('this is a func')
```

## 其他

### 调试技巧

```python
# 当 assert 后面跟的是 False 时， 将抛出错误
assert False, 'blabla'

 locals: 执行 locals() 之后, 返回一个字典, 包含(current scope)当前范围下的局部变量。
 globals: 执行 globals() 之后, 返回一个字典, 包含(current scope)当前范围下的全局变量。
```

### 列表推导式

```python
# 列表推到式，适用list, set, tuple, dict
# 平方为例
a = [1,2,3,4,5,6]
b = [i**2 for i in a]
# 加入条件过滤
b = [i**2 for i in a if i>5]

# 字典中使用
stu = {
    '张三': 12,
    '李四': 15,
    '王五': 18
}
# 取key
b = [key for key, value in stu.items()]
print(b) # ['张三', '李四', '王五']
# 翻转key-value
b = {value:key for key, value in stu.items()}
```

### None 类型

```python
None 不等于 '' | 0 | [] | False
# None 是属于 NoneType对象
if None: # 这里的等同于  bool(None)

# 自定义类的判断
class Test():
    def __len__(self):
        return False
    def __bool__(self):
        return False
# 判断时，会先尝试调用__bool__, 不行时再调用__len__
test = Test()
bool(test) # 就是 False
```

### with as 预定义清理语句

```python
# 基本思想是with所求值的对象必须有一个enter()方法，一个exit()方法。
with open("/tmp/foo.txt") as file:
    data = file.read()

# 例如
class He:
    def __enter__(self):
        print('you are in')
        return 'VALUE'

    def __exit__(self, type, value, trace):
        print('you are out')

with He() as L:
    print(L)
```
