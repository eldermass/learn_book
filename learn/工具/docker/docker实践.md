# docker 实践

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

使用 webhook 来实现服务端 docker 的自动 pull  
[参考](https://www.jianshu.com/p/e4cacd775e5b)  
[参考 2](https:#blog.csdn.net/auv1107/article/details/51999592)  
npm github-webhook-handler

```bash
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

\$ docker run -d --name nginx --network host nginx # host 共享主机网络，bridge 桥接主机网络

## docker-desktop

1. docker在win10下关机后容器会失效，一般来说重启一下desktop，然后在重启容器就会好了。然而有些时候
必须要重启docker的服务才能恢复正常，虽然没找到原因，但是写了一个脚本来简化重启服务的过程。

> 重启docker服务的脚本

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

> 启动docker容器的脚本

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
