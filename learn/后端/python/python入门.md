# python入门

## 数据类型

### 运算符

``` python
运算符 + - * /除法 //除整 %模 **幂
逻辑运算符 and or not
成员运算符 in    not in
身份运算符(比较内存地址)  
          is   is not
位运算符
    & 按位与 2 & 3 = 2 (10 与 11 得 10)
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

``` python
# 整形浮点型 int float
2/2 = 1.0
2//2 = 1 # 整除
1//2 = 0
# 二进制 八进制 十六进制
0b10 0o10 0x10
# 进制转换
bin() int() oct() hex()

# bool 类型
# 空值都是false
bool([]) == false

# complex 复数 类型
36j
```

### 组

有序：str list tuple(可通过下标访问，可以[0:3]切片操作)
集合：set (无序，没有索引，不能切片)
字典：dict (key: value的概念)

list[0:length:步长]， 切片操作
hex(id(a)), a的内存地址

#### 字符串 str

``` python
# 单引号 双引号 三引号
# 三引号可以直接换行
'asd' * 2 = 'asdasd'
# 字符串加r表示原始字符串
a = r'abc\nbcd'
# 字符串截取
'hello world'[0:4] = 'hell'

```

#### 列表 list

``` python
# 引用类型
[1, 'two', true, []]
# 选取列表
[1, 2, 3, 4][0] = 1
[1, 2, 3, 4][0:2] = [1, 2] # return list
[1, 2] * 2 = [1, 2, 1, 2]
[1, 2] + [3] = [1, 2, 3]

```

#### 元组 tuple

``` python
# 值类型，不可修改
(1, 2, [3, 4])

# tu 会自己成为元组(1, 2, 3)
tu = 1, 2, 3
a, b, c = tu
```

#### 集合 set

``` python
# 引用类型， 无序的
{1, 2, 3} == {2, 3, 1}

```

#### 字典 dict

``` python
# 引用类型
{'key': 'value'}
```

## 表达式

表达式(Expression)：预算符(operator)和操作数(operand)构成的序列

### 流程控制

``` python
# 可用pass保留结构完整
# 判断
value = input() # 获取输入值
if value :
    print('大于')
else:
    pass
```

``` python
# while循环
while counter:
    counter -= 1
    print(counter))
else
    print(EOF)

# for循环
for x in range(0, 10):
    print(x)

for item in l:
    print(key)
else:
    print('遍历完了')
```

## 模块

``` python
# 包
# 让一个目录成为一个包，就需要目录下有__init__.py文件
# 这个文件下一般写 __all__ = ['需要导出的变量']
print(__package__)
print(__name__)
print(__doc__)
print(__file__)

# 模块
# 包名.文件名（__init__.py模块的模块名就是包名）
import module_name
module_name.var
# 别名
import module_name as alias

# 其他方式引入
from module_name import var/mod/*
# 导出时使用模块内置属性 __all__ = ['a'], 可以控制import * 时需要引入的变量

```

## 函数

``` python
def funcname(self, parameter_list):
    pass
# 可以返回多个参数构成元祖
return res1, res2, res3
# 解构元组
r1, r2, r3 = (res1, res2, res3)

# 必须参数 def add(x, y)
# 形参任意赋值,可以切换传参顺序 add(y = 2, x =1)

```

## 类与对象

``` python
class Stu():
    name = ''
    # 私有属性, 将被改名_Stu__private
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
s.newattr = ''
s.say()
# 打印实例的字典
print(s.__dict__)

# '私有属性、方法' 以__开头
```

``` python
# 继承
class Stu(Person):
    def __init__(self, name):
        # 调用父类构造函数 1
        Person.__init__(self, name)
        # 调用父类构造函数 2
        super(Stu, self).__init(name)
```

## 正则

``` python
# 字符串检测函数
a.index('some')
'some' in a

# 正则
import re
re.findall('parttern', a)
# 规则和其他语言差不多
# 默认贪婪匹配，量词加?即可进入非贪婪

# re.I 忽略大小写， re.S .匹配任意 
re.findall('parttern', a, re.I | re.S)

# 替换类似js replace, count替换多少个，count 为0表示无限制
re.sub('parttern', 'target', a, count)
# 回调中使用 matched = value.group() 取值
re.sub('parttern', 回调func, a, count)
# 或
string.replace('a', '')
re.match # 从头匹配
r1 = re.search # 搜索

# 获取结果
r1.group(0,1,2)
r1.groups()

```
