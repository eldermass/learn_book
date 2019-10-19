# docker 实践

[从 0 开始](https://blog.csdn.net/bskfnvjtlyzmv867/article/details/81044217)
[github自动构建到docker-hub](https://www.jianshu.com/p/b20bcfba52a8)
[docker网络映射关系](https://www.cnblogs.com/brock0624/p/9788710.html)
[php-fmp+nginx组合环境](https://www.cnblogs.com/freefei/p/7904165.html)
[laravel部署实践](https://segmentfault.com/a/1190000013020851)

## docker 使用流程

```bash
# ubuntu下安装
apt-get install docker.io

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

使用 webhook 来实现服务端 docker 的自动 pull  
[参考](https://www.jianshu.com/p/e4cacd775e5b)  
[参考 2](https:#blog.csdn.net/auv1107/article/details/51999592)
npm github-webhook-handler

## linux 上部署示例

```bash
#!/bin/bash

LOG_PATH=~/logs/deploy_logs.txt;
FLAG=deploying;
date >> $LOG_PATH;
echo "开始重新部署\n" >> $LOG_PATH;

if [ ! -e $FLAG ]
then
    touch $FLAG;
    echo "拉取最新镜像";
    docker pull asd285653184/music;

    #echo "停止容器";
    #CONTAINERS=`docker ps -a -q`;
    #docker stop $CONTAINERS;

    #echo "清空容器";
    #docker rm $CONTAINERS;

    #echo "清除docker镜像";
    #docker rmi `docker images -a -q`;

    echo "重新部署项目";
    cd ~/project/music;

    git pull;
    docker-compose up -d;

    echo "清空悬空镜像或者容器";

    docker image prune -a -f;
    docker container prune -f;

    cd ~;
    rm $FLAG;
    echo "部署成功\n" >> $LOG_PATH;
else
    echo "正在重新部署中......";
    echo "已在重新部署中......\n停止部署\n" >> $LOG_PATH;
fi


```

## docker-desktop

1. docker 在 win10 下关机后容器会失效，一般来说重启一下 desktop，然后在重启容器就会好了。然而有些时候
   必须要重启 docker 的服务才能恢复正常，虽然没找到原因，但是写了一个脚本来简化重启服务的过程。

> 重启 docker 服务的脚本

```bat
@echo off
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (

goto UACPrompt

) else ( goto gotAdmin )



:UACPrompt

echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"

echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"

"%temp%\getadmin.vbs"

exit /B



:gotAdmin

:: 重启docker 服务
net stop com.docker.service
net start com.docker.service

:: 启动docker应用
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

```

> 启动 docker 容器的脚本

```bat
@echo off
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

if '%errorlevel%' NEQ '0' (

goto UACPrompt

) else ( goto gotAdmin )


:: 获取登录权限
:UACPrompt

echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"

echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"

"%temp%\getadmin.vbs"

exit /B



:gotAdmin

:: 查看服务是否开启

for /f "skip=3 tokens=4" %%i in ('sc query com.docker.service') do set "zt=%%i" &goto :next
:next
if /i "%zt%"=="RUNNING" (
    echo 'service is running, start container'
    goto :running
) else (
    echo 'service is stopping, start com.docker.service'
    goto :stopping
)


:stopping
net start com.docker.service
exit /B

:running
e:

cd E:\project\laradock

docker-compose up -d nginx mysql redis
```
