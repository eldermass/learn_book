# nginx 笔记

<!-- [location 匹配语法](https://www.cnblogs.com/pyyu/p/10085444.html) -->

[nginx 文档](http://www.nginx.cn/doc/index.html)
[nginx 与 php-cgi](https://www.cnblogs.com/donghui521/p/10334776.html)

## 一. 控制命令

```bash
# 检测配置是否正确
nginx -t
# 重新加载配置
nginx -s reload
# 立即停止
nginx -s stop
# 优雅停止，会等待现有连接都断掉
nginx -s quit
# 重新打开日志，如：log日志文件换名字，文件资源依然连接,所以要重新链接文件资源
nginx -s reopen
```

## 二、 nginx 配置

### 1. 路径重写

```bash
# 配置
看nginx.conf 注释
# url重写
rewirte  (.*)$  /index.php$1;
# 先尝试文件路径，不行就重写路径
try_files $uri /index.php?$uri

```

### 2. 反向代理

```bash
# 代理到某个地址
proxy_pass 192.168.0.1:80;
# 人为在头信息挂上用户真实地址
proxy_set_headr X_Forwarded_For $remote_addr;
```

## 三、 集群和负载均衡

```bash
# 集群，申明上游服务器组
upstream servers_name {
  server 192.168.0.1:80 weight=1 max_fails=2 fail_timeout=30s;
  server 192.168.0.2:80 weight=1 max_fails=2 fail_timeout=30s;
}
# 通过proxy_pass 代理到服务器组
proxy_pass http://servers_name;

```

## Location 语法

```bash
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
```

> nginx 指定文件路径有 root 和 alias 两种方法，区别在方法和作用域：

```bash
方法：

root
语法  root  路径;
默认值 root   html;
配置块  http{}   server {}   location{}

alias
语法： alias  路径
配置块  location{}


root和alias区别在nginx如何解释location后面的url，这会使得两者分别以不同的方式讲请求映射到服务器文件上

root参数是root路径 + location位置

root实例：

    location ^~ /av {
        root /data/av;   注意这里可有可无结尾的   /
    }
请求url是pythonav.cn/av/index.html时
web服务器会返回服务器上的/data/av/av/index.html

root实例2：
location ~* .*\.(jpg|gif|png|js|css)$ {
       root  /data/static/;
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

### 示例 conf 文件

```conf

user  nginx;
# 工作进程 一般cpu数 * 核数
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

# 一个work能保持的链接数
events {
    worker_connections  1024;
}
# 集群，申明上游服务器组, 通过proxy_pass 代理到本服务器组
upstream servers_name {
  server 192.168.0.1:80 weight=1 max_fails=2 fail_timeout=30s;
  server 192.168.0.2:80 weight=1 max_fails=2 fail_timeout=30s;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # 日志的格式
    # http_x_forwarded_for 被代理用户的真实ip
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # access_log 日志写入路径 使用的格式
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    # gzip 相关配置
    gzip  on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;

    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    # 一个虚拟主机， 以上配置均可单独写入以下虚拟主机配置
    server {
      listen 80;
      # 可以放多个域名
      server_name test.com bb.com;
      #charset koi8-r;

      location / {
        root   /www;
        index   index.html index.php;

        # 不存在这个文件时， url重写到index.php
        if ( !-e $request_filename) {
          rewirte (.*)$ /index.php$1;
        }
        # 先尝试文件路径，不行就重写路径
        try_files $uri /index.php?$uri;

        # 代理到某个地址
        proxy_pass 192.168.0.1:80;

        # 人为在头信息挂上用户真实地址
        proxy_set_headr X_Forwarded_For $remote_addr;

      }

      location ~.*\.(js|css)?$ {
        # 过期时间
        expires 1h;
        proxy_pass http://127.0.0.1;
      }
      #error_page  404              /404.html;

      # 重定向到静态错误页 /50x.html
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }

      # proxy the PHP scripts to Apache listening on 127.0.0.1:80
      #
      # location ~ \.php$ {
      #     proxy_pass   http://127.0.0.1;
      # }

      #  pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
      #
      # location ~ \.php$ {
      #     root           html;
      #     fastcgi_pass   127.0.0.1:9000;
      #     fastcgi_index  index.php;

      #     反向引用传参    SCRIPT_FILENAME 一般是 $document_root$fastcgi_script_name;
      #
      #     fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
      #     fastcgi_param  PATH_INFO $1;

      #     引入参数配置文件
      #     include        fastcgi_params;
      # }

      #  deny access to .htaccess files, if Apache's document root
      #  concurs with nginx's one
      #
      # location ~ /\.ht {
      #     deny  all;
      # }

      # HTTPS server
      #
      # server {
      #    listen       443 ssl;
      #    server_name  localhost;

      #    ssl_certificate      cert.pem;
      #    ssl_certificate_key  cert.key;

      #    ssl_session_cache    shared:SSL:1m;
      #    ssl_session_timeout  5m;

      #    ssl_ciphers  HIGH:!aNULL:!MD5;
      #    ssl_prefer_server_ciphers  on;

      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      # }
    }

    include /etc/nginx/conf.d/*.conf;
}

```
