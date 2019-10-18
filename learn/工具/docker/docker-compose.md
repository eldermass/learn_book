# docker-compose 使用

[docker-compose.yml 的使用](https://www.jianshu.com/p/658911a8cff3)  
[各个参数的解释](https:#blog.csdn.net/qq_36148847/article/details/79427878)
[启动命令](https://www.cnblogs.com/moxiaoan/p/9299404.html)

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
