# docker

[docker 官网](https://www.docker.com)  
[w3c school](https://www.w3cschool.cn/reqsgr/1jlu2ozt.html)  
[中文入门教程](http://www.docker.org.cn/book/docker/what-is-docker-16.html)  
[命令大全](https://www.runoob.com/docker/docker-command-manual.html)  
[docker run](https://www.cnblogs.com/yfalcon/p/9044246.html)

## 用户

```bash
# 登录
  docker login -u "$DOCKER_USERNAME" --password-stdin # 然后输入密码

```

## 镜像相关

```bash
# 找查镜像
  docker search image

# 拉取镜像
  docker pull image:tag

# 运行镜像
  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
                -P                    是容器内部端口随机映射到主机的高端口(无参数))
                -p ip:端口:容器端口    指定映射端口
                -d                    后台运行
                -it                   交互式,伪终端
                -v                    映射文件目录,linux里的路径
                --network host        指定容器的网络连接类型，支持 bridge/host/none/container:            四种类型
                --link=[]             添加链接到另一个容器
                --expose=[]           开放一个端口或一组端口

# 如：  docker run -d -p 80:80  ubuntu ping www.baidu.com
# (sh -c '... && ...' 可执行多条命令)

# dockerfile构建镜像, docker build [选项] <上下文路径/URL/->
# 使用Git repo路径时，指定默认的 master 分支，构建目录为 url#path 。
# 还可使用tar路径 docker build http://server/context.tar.gz
  docker build -t image:tag .
              -f                      指定Dockerfile

# 容器生成镜像
  docker commit container_id image:tag
              -a                      作者
              -m                      描述

# 设置镜像标签
  docker tag image runoob/centos:dev

# 镜像列表
  docker image ls
  docker images

# 发布镜像
  docker push image

# 移除镜像
  docker rmi image
```

## 容器相关

```bash
# container 可以是容器名，也可以是4位以上的id
# 查看容器列表
  docker ps         运行中的
          -a        全部
          -l        最近修改

# 查看容器的详情
  docker inspect container
          -f        按模板找查 {{.NetworkSettings.Ports}}

# 查看映射端口
  docker port container

# 查看容器里的进程
  docker top container

# 停/启容器
  docker stop/start container

# 移除容器
  docker rm container

# 进入容器
  docker exec -it container /bin/bash

# 查看容器日志
  docker logs container

# 将容器的内容拷贝到宿主
  docker cp mysql:/var/lib/mysql /www/docker/mysql/data
```

## Dockfile 文件

[Dockfile 文件指令](https://www.cnblogs.com/lighten/p/6900556.html)

## docker-compose 使用

[docker-compose.yml 的使用](https://www.jianshu.com/p/658911a8cff3)  
[各个参数的解释](https:#blog.csdn.net/qq_36148847/article/details/79427878)
[启动命令](https://www.cnblogs.com/moxiaoan/p/9299404.html)

```bash
# 检查配置是否ok
docker-compose config  -q

# 运行
  docker-compose up       执行当前目录的.yml文件
              -d        后台运行
              --force-recreate 可以强制重建容

  docker-compose down 停止所有容器，并删除容器

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

## 数据拷贝

```bash
# 从容器里拷贝数据到主机
  docker cp container:/var/www/html /var/www/

# 主机拷贝到容器里
  cp docker/docker-start.sh /var/lib/docker/aufs/mnt/a77a72ac178c1e35708d2af446197c10239b0b1bd8932104578e334b83eb93a2/root/

```

## win 里虚拟机

```bash
  因为docker只能运行在linux系统,所以在windows7里,docker是运行在虚拟机里,如向docker容器里映射文件,应当先把文件映射到虚拟机,然后在把虚拟系统的目录映射到docker容器里面， e:盘对应 /e/

  docker-machine ls 虚拟机配置, 访问这里面的ip:端口就能访问到容器里的内容
  docker-machine ssh machineName 连接搭载docker的虚拟机

```

## docker 使用流程

```bash
# 根据目录下dockerfile构建镜像
  docker build -t image_name .

# -p ip:端口:容器端口, -d 后台运行 -P映射路由 it: 可命令行交互 -v 映射目录
  docker run -it -d -P --name tag -v /www:/var image_name node index

# 查看日志
  docker logs container

# 进入容器
  docker exec -it container /bin/bash     bash 或 sh
# 查看映射端口
  docker port containerId

  docker images   查看镜像
  docker ps       查看容器
  docker rm       移除容器
  docker rmi      移除镜像
  docker stop id  停止容器
  docker start -i containerName #重启启动一个运行过的容器
```

1. 编写 dockerfile 文件

2. 根据 dockerfile 打包镜像

3. 本地运行,并映射端口 (访问 docker 地址:端口,即访问容器内的东西)

使用 webhook 或 ssh 来实现服务端 docker 的自动 pull  
[webhook + node自动化部署](https://www.jianshu.com/p/e4cacd775e5b)  
[webhook自动化部署](https://blog.csdn.net/auv1107/article/details/51999592)  
npm github-webhook-handler

\$ docker run -d --name nginx --network host nginx # host 共享主机网络，bridge 桥接主机网络
