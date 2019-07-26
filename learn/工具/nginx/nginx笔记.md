# nginx笔记

[文章地址](https://www.cnblogs.com/pyyu/p/10085444.html)

## 一. 控制命令

``` bash
# 检测配置是否正确
nginx -t
# 重新加载配置
nginx -s reload
# 立即停止
nginx -s stop
# 优雅停止
nginx -s quit
# 重新打开日志， log日志文件换名字，文件资源依然连接,所以要重新链接文件资源
nginx -s reopen
```

## nginx配置

```bash
# 配置
看nginx.conf 注释
# url重写
rewirte  (.*)$  /index.php$1;
# 文件路径重写
try_files 

```

## Location语法

``` bash
匹配符 匹配规则 优先级
=    精确匹配    1
^~    以某个字符串开头    2
~    区分大小写的正则匹配    3
~*    不区分大小写的正则匹配    4
!~    区分大小写不匹配的正则    5
!~*    不区分大小写不匹配的正则    6
/    通用匹配，任何请求都会匹配到    7

server {
    listen 80;
    server_name pythonav.cn;

    #优先级1,精确匹配，根路径
    location =/ {
        return 400;
    }

    #优先级2,以某个字符串开头,以av开头的，优先匹配这里，区分大小写
    location ^~ /av {
       root /data/av/;
    }

    #优先级3，区分大小写的正则匹配，匹配/media*****路径
    location ~ /media {
          alias /data/static/;
    }

    #优先级4 ，不区分大小写的正则匹配，所有的****.jpg|gif|png 都走这里
    location ~* .*\.(jpg|gif|png|js|css)$ {
       root  /data/av/;
        }

    #优先7，通用匹配
    location / {
        return 403;
    }
}


nginx指定文件路径有root和alias两种方法
区别在方法和作用域：

方法：

root
语法  root  路径;
默认值 root   html;
配置块  http{}   server {}   location{}

alias
语法： alias  路径
配置块  location{}


root和alias区别在nginx如何解释location后面的url，这会使得两者分别以不同的方式讲请求映射到服务器文件上

root参数是root路径+location位置

root实例：

    location ^~ /av {
        root /data/av;   注意这里可有可无结尾的   /
    }
请求url是pythonav.cn/av/index.html时
web服务器会返回服务器上的/data/av/av/index.html

root实例2：
location ~* .*\.(jpg|gif|png|js|css)$ {
       root  /data/av/;
}

请求url是pythonav.cn/girl.gif时
web服务器会返回服务器上的/data/static/girl.gif




alias实例：
alias参数是使用alias路径替换location路径
alias是一个目录的别名
注意alias必须有 "/"  结束！
alias只能位于location块中


请求url是pythonav.cn/av/index.html时
web服务器会返回服务器上的/data/static/index.html

location ^~ /av {
    alias /data/static/;
}

```
