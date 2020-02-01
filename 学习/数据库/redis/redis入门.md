# Redis

[中文文档](https://www.redis.net.cn/tutorial/3508.html)

## 登录

```bash
# 启动服务
redis-server
# 登录 6379
redis-cli -h host -p port -a password
# 查看所有数据
keys *
```

```bash
AUTH password 验证密码是否正确
ECHO message 打印字符串
PING 查看服务是否运行
QUIT 关闭当前连接
SELECT index 切换到指定的数据库
INFO
```

## 类型

### 基础命令

```bash
dump.rdb快照
type key
del key
```

### 1.字符串 string

```bash
# 设置值
set key value         设置key
setex key seconds value 设置key并赋予过期时间，秒计
psetex key milliseconds value  同上，毫秒计
setnx key value       不存在key时，设置某值
setrange key offset value 从偏移x开始插入值
mset key value key value  设置多个建值
msetnx key value key value 仅当key都不在的时候，才设置这些建值

# 读取值
get key               读取key
mget key1 key2        读取多个key
strlen key            获取字符串长度

getrange  key start end 获取子字符串，类似substr
getset key value      设置新值，返回老值

# 改变值
incr key              数值加一
incrby key increment  数值加n
decr key              数值减一
decrby key decrement  数值减n
append key value      追加字符串之前的值

```

### 2. 哈希 hash

```bash
# 设置表值
hset key field value            设置或追加某个字段
hmset key field value [field value ...] 设置或追加给定的字段
hsetnx key field value          不存在时设置值

# 获取
hgetall key           获取某键下的所有值
hget key field        获取键下的某个字段值
hmget key field field2 获取给定字段的值
hkeys key             获取所有键
hvals key             获取所有的值
hlen key              获取键的数量

hexists key field     查看是否有该字段

hscan key cursor [match pattern] [count number] 根据游标cursor(数字)来迭代遍历

# 修改
hincrby key field increment 某字段增加n
hincrbyfloat key field increment 某字段增加n的浮点值

# 删除
hdel key field [field] 删除某个字段的值

```

### 3.列表 list

```bash
# 设置
lset key index value    通过索引设置值
lpush key value value2  放入一些值到头部
lpushx key value        把已存在的值放到头部，或新加
rpush key value         添加值
rpushx key value        为已存在的列表添加值

# 获取
lrange key start end    获取一定范围的值
lindex key index        读取index位置的值
llen key                读取列表长度

blpop key [key] timeout 弹出第一个元素，没有元素会阻塞n秒
brpop key [key] timeout 弹出最后一个元素，没有元素会阻塞n秒

brpoplpush source destination timeout 弹出值并放入另外的列表，阻塞
rpoplpush source destination 弹出最后值并放入另外的列表

# 修改
linsert key before|after pivot value  在某值(pivot)前或后插入value

lpop key                移除，返回第一个元素
rpop                    移除，返回最后(最右)元素
lrem key count value    删除count个等值数据，count>0尾部开始搜，=0删除所有, <0头部开始
ltrim key start end     删除不在范围内的元素[)

```

### 4. 集合 set

```bash
# 设置
sadd key member [member]  添加到集合

# 获取
smembers key              获取集合的所有成员

sismember key member      判断是否存在member
scard key                 获取集合的成员数

sunion key [key ...]      返回给定几个的合并集
sunionstore destinantion key [key ...] 返回给定几个的合并集，并储存
sdiff key [key]           比较两集合的差集
sdiffstore destination key [key]  比较两集合的差集,并储存在dest里
sinter key [key]          返回两集合的交集
sinterstore destination key [key]     返回两几个的交集，并储存

# 修改
smove source destination member 把某成员从集合a移动到集合b
spop key [count]          随机移除n个成员
srandmember key [count]   随机返回n个成员
srem key member [member]  移除成员

sscan key cursor [match pattern] [count n] 迭代集合

```

### 5. 有序集合 sorted set

```bash
# 添加
zadd key score member [ socre member]   像集合添加成员

# 获取
zrange key start end [withscores] 获取所有成员
zrangebylex key min max           按字典区间获取
zrangebyscore key min max [withscores]  分数区间获取成员
zrevrange key start stop [WITHSCORES] 返回有序集中指定区间内的成员，通过索引，分数从高到底(和zrange方向相反)
zrevrangebyscore key max min [WITHSCORES] 返回有序集中指定分数区间内的成员，分数从高到低排序
zrevrank key member 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序

zscore key member             返回成员分数值
zrank key member              获取指定成员的索引
zcard key                     获取成员数量
zcount key min max            获取区间分数的成员数量
zlexcount key min max         在有序集合中计算指定字典区间内成员数量


# 修改
zrem key member [member]      移除成员案例
zremrangebylex key min max    移除有序集合中给定的字典区间的所有成员
zremrangebyrank key min max   移除有序集合中给定的排名区间的所有成员
ZREMRANGEBYSCORE key min max  移除有序集合中给定的分数区间的所有成员

zincrby key increment member  成员排序分数增加n

zinterstore destination numkeys key [key ...] 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
ZUNIONSTORE destination numkeys key [key ...] 计算给定的一个或多个有序集的并集，并存储在新的 key 中
ZSCAN key cursor [MATCH pattern] [COUNT count] 迭代有序集合中的元素（包括元素成员和元素分值）
```

### 6. HyperLogLog

```bash
pfaddd key element element              添加到基数集
pfcount key                             基数数量
pfmerge destkey sourcekey [sourcekey]   合并到基数集
```

### 7. 发布订阅

[教程](https://www.redis.net.cn/tutorial/3514.html)

```bash
# 订阅
subscribe channel [channel] 订阅指定频道
psubscribe pattern [pattern]  订阅符合指定标准的频道

# 退订
unsubscribe channel [channel] 退订指定频道
PUNSUBSCRIBE [pattern [pattern ...]] 退订所有给定模式的频道。

# 发布
publish channel message   给指定频道发送信息

# 查看系统订阅状态
pubsub <subcommand> [argument] 可选channels

```

### 8. 事务

```bash
multi   标记事务的开始
exec    执行事务块中的命令
discard 取消事务
watch key [key ...] 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。
unwatch key 取消监听

```
