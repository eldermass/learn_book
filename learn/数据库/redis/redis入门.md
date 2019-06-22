# Redis

[中文文档](https://www.redis.net.cn/tutorial/3508.html)

## 登录

``` login
// 启动服务
redis-server
// 登录 6379
redis-cli -h host -p port -a password
```

## 类型

### 1.string

``` string  
set key value         设置key
setex key seconds value 设置key并赋予过期时间
setnx key value       不存在key时，设置某值
setrange key offset value 从偏移x开始插入值
mset key value key value  设置多个建值
msetnx key value key value 仅当key都不在的时候，才设置这些建值

get key               读取key
mget key1 key2        读取多个key
strlen key            获取字符串长度

getrange  key start end 获取子字符串，类似substr
getset key value      设置新值，返回老值


incr key              数值加一
incrby key increment  数值加n
decr key              数值减一
decrby key decrement  数值减n
append key value      拼接字符


```
