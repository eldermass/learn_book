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

## 2. 系统模块
