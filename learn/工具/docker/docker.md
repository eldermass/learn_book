# docker

[中文入门教程](http://www.docker.org.cn/book/docker/what-is-docker-16.html)
[命令大全](https://www.runoob.com/docker/docker-command-manual.html)

## 镜像相关

``` images
// 找查镜像
  docker search image

// 拉取镜像
  docker pull image:tag

// 运行镜像
  docker run image command
                -P                    是容器内部端口随机映射到主机的高端口
                -p ip:端口:容器端口    指定映射端口  
                -d                    后台运行
                -it                   交互式,伪终端
                -v                    映射文件目录,linux里的路径
                --network host        指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型
                --link=[]             添加链接到另一个容器
                --expose=[]           开放一个端口或一组端口

// dockerfile构建镜像
  docker build -t image:tag .

// 容器生成镜像
  docker commit container_id image:tag
              -a                      作者
              -m                      描述

// 设置镜像标签
  docker tag image runoob/centos:dev

// 镜像列表
  docker image ls
  docker images

// 发布镜像
  docker push image

// 移除镜像
  docker rmi image
```

## 容器相关

``` container
// 查看容器列表
  docker ps         运行中的
            -a      全部
            -l      最近修改

// 查看容器的详情
  docker inspect container
            -f      按模板找查 {{.NetworkSettings.Ports}}

// 查看映射端口
  docker port container

// 查看容器里的进程
  docker top container

// 停/启容器
  docker stop/start container

// 移除容器
  docker rm container

// 进入容器
  docker exec -it container /bin/bash

// 查看容器日志
  docker logs container

```

## Dockfile 文件
[Dockfile文件指令](https://www.cnblogs.com/lighten/p/6900556.html)

## docker-compose使用

[docker-compose.yml的使用](https://www.jianshu.com/p/658911a8cff3)

```docker-compose指令

// 运行
  docker-compose up       执行当前目录的.yml文件
              -d        后台运行

// 列出所运行的容器
  docker-compose ps

// 查看服务日志
  docker-compose logs

// 某服务里3000端口，映射的公共端口
  docker-compose port service_name 3000

// 构建或重构某服务
  docker-compose build service_name

// 启动/停止/删除/指令停止 服务
docker-compose start/stop/rm/kill service_name

// 在一个服务上执行命令
docker-compose run service_name command

```

## 数据拷贝

``` 其他操作
// 从容器里拷贝数据到主机
  docker cp a77a72ac178c:/var/www/html /var/www/

// 主机拷贝到容器里
 cp docker/docker-start.sh /var/lib/docker/aufs/mnt/a77a72ac178c1e35708d2af446197c10239b0b1bd8932104578e334b83eb93a2/root/

```

## win里虚拟机

``` vbox
  因为docker只能运行在linux系统,所以在windows7里,docker是运行在虚拟机里,如向docker容器里映射文件,应当先把文件映射到虚拟机,然后在把虚拟系统的目录映射到docker容器里面， e:盘对应 /e/

  docker-machine ls 虚拟机配置, 访问这里面的ip:端口就能访问到容器里的内容
  docker-machine ssh machineName 连接搭载docker的虚拟机

```

## docker使用流程

``` docker构建时，开始到结束可能使用到的命令
// 根据目录下dockerfile构建镜像
  docker build -t image_name .

// -p ip:端口:容器端口, -d 后台运行 -P映射路由 it: 可命令行交互 -v 映射目录
  docker run -it -d -P --name tag -v /www:/var image_name node index  

// 查看日志
  docker logs container

// 进入容器
  docker exec -it container /bin/bash     bash 或 sh
// 查看映射端口
  docker port containerId
  
  docker images   查看镜像
  docker ps       查看容器
  docker rm       移除容器
  docker rmi      移除镜像
  docker stop id  停止容器
  docker start -i containerName //重启启动一个运行过的容器
```

  1. 编写dockerfile文件

  2. 根据dockerfile打包镜像

  3. 本地运行,并映射端口 (访问docker地址:端口,即访问容器内的东西)

使用webhook来实现服务端docker的自动pull
[参考](https://www.jianshu.com/p/e4cacd775e5b)
[参考2](https://blog.csdn.net/auv1107/article/details/51999592)
npm github-webhook-handler

``` sh 脚本 看koa.sh
#!/bin/bash
echo "正在停止所有docker里面的容器ing..."
docker stop $(docker ps -a -q)
echo "停止成功,正在删除容器ing..."
docker rm $(docker ps -a -q)
dockerlist=`docker images`
echo "$dockerlist"
docker rmi $(docker images -q)
echo "清除所有镜像完毕"
echo "正在进行新的文件打包部署..."
cd docker/Adventure
mvn package docker:build
echo "打包构建成功"
docker run -p 80:80 -t adventure/docker
echo `docker ps`
echo "end ..."
```

$ docker run -d --name nginx --network host nginx // host共享主机网络，bridge桥接主机网络
