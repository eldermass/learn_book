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
```
