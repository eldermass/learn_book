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

### 基础命令

``` base
dump.rdb快照
type key
del key
```

### 1.字符串 string

``` string  
// 设置值
set key value         设置key
setex key seconds value 设置key并赋予过期时间，秒计
psetex key milliseconds value  同上，毫秒计
setnx key value       不存在key时，设置某值
setrange key offset value 从偏移x开始插入值
mset key value key value  设置多个建值
msetnx key value key value 仅当key都不在的时候，才设置这些建值

// 读取值
get key               读取key
mget key1 key2        读取多个key
strlen key            获取字符串长度

getrange  key start end 获取子字符串，类似substr
getset key value      设置新值，返回老值

// 改变值
incr key              数值加一
incrby key increment  数值加n
decr key              数值减一
decrby key decrement  数值减n
append key value      追加字符串之前的值

```

### 2. 哈希 hash

``` 哈希表
// 设置表值
hset key field value            设置或追加某个字段
hmset key field value [field value ...] 设置或追加给定的字段
hsetnx key field value          不存在时设置值

// 获取
hgetall key           获取某键下的所有值
hget key field        获取键下的某个字段值
hmget key field field2 获取给定字段的值
hkeys key             获取所有键
hvals key             获取所有的值
hlen key              获取键的数量

hexists key field     查看是否有该字段

hscan key cursor [match pattern] [count number] 根据游标cursor(数字)来迭代遍历

// 修改
hincrby key field increment 某字段增加n
hincrbyfloat key field increment 某字段增加n的浮点值

// 删除
hdel key field [field] 删除某个字段的值

```

### 3.列表 list

``` list
// 设置
lset key index value    通过索引设置值
lpush key value value2  放入一些值到头部
lpushx key value        把已存在的值放到头部，或新加
rpush key value         添加值
rpushx key value        为已存在的列表添加值

// 获取
lrange key start end    获取一定范围的值
lindex key index        读取index位置的值
llen key                读取列表长度

blpop key [key] timeout 弹出第一个元素，没有元素会阻塞n秒
brpop key [key] timeout 弹出最后一个元素，没有元素会阻塞n秒

brpoplpush source destination timeout 弹出值并放入另外的列表，阻塞
rpoplpush source destination 弹出最后值并放入另外的列表

// 修改
linsert key before|after pivot value  在某值(pivot)前或后插入value

lpop key                移除，返回第一个元素
rpop                    移除，返回最后(最右)元素
lrem key count value    删除count个等值数据，count>0尾部开始搜，=0删除所有, <0头部开始
ltrim key start end     删除不在范围内的元素[)

```

### 4. 集合 set

``` set

```
