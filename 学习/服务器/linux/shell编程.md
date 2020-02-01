# shell 编程入门

文件头指明执行程序 #!/bin/bash  #!/usr/bin/python

## 一、变量

### 1. 一般变量

/etc/profile 里配置全局环境变量

> \$PATH 单个系统变量  
> set 所有变量  
> 在/etc/profile 里 export D='环境变量' 输出为全局变量

### 2. 申明变量

> A=100 申明变量  
> readonly B=200 申明清除和操作的变量  
> unset A 清除变量  
> echo \$A 使用变量
> C=\`ls -al\` 使用命令输出值  
> C=\$(ls -al) 同上

### 3. 位置参数变量

> ./test.sh 100 300  
> $n  例：$1 表示第一个参数，值为 100  
> ${10}  有十个参数就需要加大括号  
$# 参数的总个数
> $* 命令行中所有参数,看做整体
$@ 命令行中所有参数,区分对待

### 4. 预定义变量

> $$
> $! 最后一个开始进程的进程号
> $? 运行是否成功0、1
> $$

## 二、运算符

> $((运算式))  
$[运算式] 例: \$[1+2]  
> expr m + n 例: RES=\`expr 1 + 2\`

## 三、条件判断 和 流程控制

> [ condition ] 注意有空格
> 例：[ condition ] && echo ok || echo notOk
> =等于  
> -lt 小于  
> -le 小于等于  
> -eq 等于  
> -gt 大于  
> -ge 大于等于  
> -ne 不等于  
> -r 有读权限  
> -w 有写权限  
> -x 有执行权限  
> -f 存在是一个常规文件  
> -e 存在文件  
> -d 存在是一个目录

流程控制 - if 分支语句

```bash
if [ 2 -lt 3 ]
then
    echo 'equal'
elif
    echo 'noteq'
fi

# 判断是否有文件
if [ -e /home/cy/a.txt ]
then
    echo '存在'
fi
```

流程控制 - case 分支

```bash
case $1 in
    "10")
        echo 'i am ten'
        ;;
    "20")
        echo 'i am tweenty'
        ;;
    *)
        echo 'i am not all'
        ;;
esac

```

流程控制 - for 循坏

```bash
语法一
for i in 10 20 30              # for i in $* 传入的整体 $@传入的整体类似数组
do
    echo 'i am number $i'
done

语法二
for((初始值;条件;变量变化))     #  for((i=1; i<=100; i++))
do
    echo 'something'
done

```

流程控制 - while 循环

```bash

while [ condition ]
do
    echo "something"
done

```

## 四、其他系统指令

### 1. 读取控制台输入

> read 选项 接收参数  
> -t 等待时间  
> -p 输入提示  
> 例：read -p "请输入 NUM=" NUM

### 2. 系统函数

basename

> basename path 返回文件名
> 例：basename /home/a.txt --> a.txt
> basename /home/a.txt .txt --> a

dirname 返回完整路径
例：dirname /home/cy/a.txt --> /home/cy

### 3. 自定义函数

```bash
function getSum() {
    SUM=$[$n1+$n2]
    echo "和是$SUM"
}
# 调用
getSum $n1 $n2

```
