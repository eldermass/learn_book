# docker-compose 使用

[docker-compose.yml 的使用](https://www.jianshu.com/p/658911a8cff3)  
[各个参数的解释](https:#blog.csdn.net/qq_36148847/article/details/79427878)  
[启动命令](https://www.cnblogs.com/moxiaoan/p/9299404.html)

## docker-compose 命令

```bash
# 检查配置是否ok
  docker-compose config  -q

# 运行
  docker-compose up           执行当前目录的.yml文件
            -d                后台运行
            --force-recreate  可以强制重建容

  docker-compose down         停止所有容器，并删除容器

# 列出所运行的容器
  docker-compose ps

# 查看服务日志
  docker-compose logs

# 某服务里3000端口，映射的公共端口
  docker-compose port service_name 3000

# 构建或重构某服务
  docker-compose build service_name

# 启动/停止/删除/指令停止 服务
  docker-compose start/stop/rm/kill service_name

# 在一个服务上执行命令
  docker-compose run service_name command

```

## Dockerfile 文件

[php-fpm的拓展](https://my.oschina.net/jack088/blog/3006794)
[Dockerfile语法]](https://blog.csdn.net/wo18237095579/article/details/80540571)

 docker build 命令会将该目录下的内容打包交给 Docker 引擎以帮助构建镜像构建时传给 Docker 引擎。为避免传输上下文目录过大，可以用 .gitignore 一样的语法写一个 .dockerignore ，该文件是用于剔除不需要作为上下文传递给 Docker 引擎的。

```Dockerfile

```

## docker-compose.yml 文件

长语法表示展开表示  
[语法参数详解](https://blog.csdn.net/qq_36148847/article/details/79427878)

```yml
# 格式的版本
version: "3"

services:
  # 服务名
  service_nginx:
    # 生成的容器名
    container_name: nginx
    # 重启策略，默认no， always表示报错总会重启
    restart: always
    # 指定使用镜像，如果你还指定了build，它将使用指定的build选项构建它，并使用image指定的名字和标记对其进行标记。
    image: nginx:stable
    # 从Dockerfile 构建镜像，参数可以在Dockerfile中通过$buildno访问
    build:
      context: ./dir
      dockerfile: Dockerfile
      args:
          buildno: 1
    # 映射网路 （HOST:CONTAINER）
    ports:
      - "80:80"
      - "127.0.0.1:8080:8080"
      - "127.0.0.1:3000-3010:3000-3010"
    # 卷挂载路径设置，win下 e盘对应 /e/, HOST:CONTAINER:ro，最后一个参数 ro：只读， rw：读写
    volumes:
      - /e/test/docker:/etc/nginx/conf.d
    # 链接到指定服务名称和链接别名  SERVICE：ALIAS
    # /etc/hosts 通过 服务名或别名 能访问到node服务暴露的网络
    links:
      - node:node
    # 链接到非docker-compose管理的容器
    external_links:
      - mysql
      - redis_1:redis
    # 桥接时在容器里访问宿主网络，会在/etc/hosts 里写入 域名解析到宿主 172.21.0.1  api.firmoo.test
    # 容器里通过 ip addr 可查看到宿主网络
    extra_hosts:
      - "api.firmoo.test:172.21.0.1"
    # 覆盖容器启动后默认执行的命令
    command: sh -c 'ping www.baidu.com'
    # 环境变量
    environment:
      - SECRET=development
    # 读取env文件作为环境变量
    env_file:
      - ./web.env
    # 暴露端口，但不映射到宿主机，只被连接的服务访问。
    expose:
      - "80"
      - "443"
    # 共享容器与主机之间的PID地址空间，容器将能够访问和操作主机的命名空间中的其他容器
    pid: "host"
    # dns也可以是一个值
    dns:
      - 8.8.8.8
      - 9.9.9.9
    networks:
      lnmp-network:
        aliases:
          - service_nginx
    # 是否以最高权限开启容器
    privileged: true
    # 本服务依赖的服务，顺序在其后启动
    depends_on:
      - node
    ulimits:
      nproc: 65535
      nofile:
        soft: 20000
        hard: 40000
  node:
    container_name: node
    build: .
    expose:
      - "3000"
    ports:
      - "3000:3000"
    command: npm start
    networks:
      lnmp-network:
        aliases:
          - node
    privileged: true
    ulimits:
      nproc: 65535
      nofile:
        soft: 20000
        hard: 40000
# 网络别名
networks:
  lnmp-network:

```
