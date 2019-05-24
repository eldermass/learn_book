# docker

[中文入门教程](http://www.docker.org.cn/book/docker/what-is-docker-16.html)
[命令大全](https://www.runoob.com/docker/docker-command-manual.html)

``` .txt
  docker search image
  docker pull image // 下载镜像

  docker run 镜像 命令

  docker ps 查看运行中的列表
  docker inspect id 查看容器详情
  docker ps -l 查看修改
  docker commit id newname // 提交修改到新镜像
  docker image ls 镜像列表

  docker push 镜像 发布到自己账号下
```

## docker使用流程

``` 可能使用到的命令
  docker build -t image_name .   // 根据目录下dockerfile构建镜像
  docker run -it -d -P --name tag -v /www:/var image_name node index  // -p ip:端口:容器端口, -d 后台运行 -P映射路由 it: 可命令行交互
  docker images   查看镜像
  docker rm       移除容器
  docker rmi      移除镜像
  docker ps       查看容器
  docker stop id  停止容器
  docker start -i containerName //重启启动一个运行过的容器

  docker exec -it containerName /bin/bash     // 进入到容器里
  docker port containerId   // 查看映射端口

  docker-machine ls 虚拟机配置, 访问这里面的ip:端口就能访问到容器里的内容
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