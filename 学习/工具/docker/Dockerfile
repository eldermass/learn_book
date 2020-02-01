# 指定基础镜像， scratch为空白镜像
FROM scratch

# set the environment to honour SAP's proxy servers
# 设置环境变量
ENV http_proxy http://sap.corp:8080 \
    https_proxy http://sap.corp:8080 \
    no_proxy .sap.corp
# ARG 构建参数, 运行时不会存在的环境变量
ARG name=test
# 指定挂载卷 <路径> 或 ["<路径1>", "<路径2>"...]
VOLUME /data

# WORKDIR 指定工作目录
WORKDIR /app

# 简历和切换用户
RUN groupadd -r mysql && useradd -r -g mysql mysql
USER mysql

# give yourself some credit
LABEL maintainer="hello world"

# 复制当前上下文(.)目录的文件
COPY ./package.json /app/
# add and unpack an archive that contains a Debian root filesystem
# 更强的copy，原路径可为路径，压缩包。可自动下载，解压
ADD rootfs.tar.xz /

# use the apt-get package manager to install nginx and wget
# 执行命令，两种格式。
# 1、shell：RUN npm install
# 2、exec： RUN ["可执行文件", "参数1", "参数2"]
RUN apt-get update && \
    apt-get -y install nginx wget

# use wget to download a custom website into the image
RUN wget --no-check-certificate -O /usr/share/nginx/html/cheers.jpg https://github.wdf.sap.corp/raw/slvi/docker-k8s-training/master/docker/res/cheers.jpg && \
    wget --no-check-certificate -O /usr/share/nginx/html/index.html https://github.wdf.sap.corp/raw/slvi/docker-k8s-training/master/docker/res/cheers.html

# copy the custom nginx configuration into the image
COPY nginx.conf /etc/nginx/nginx.conf

# link nginx log files to Docker log collection facility
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# expose port 80 - the standard port for webservers
# 申明提供服务的端口，并不会在运行时开启这个端口
EXPOSE 80

# and make sure that nginx runs when a container is created
# 容器启动命令
# shell 格式： CMD <命令>
# exec 格式： CMD ["可执行文件", "参数1", "参数2"...]
# 参数列表格式： CMD ["参数1", "参数2"...] 。在指定了 ENTRYPOINT 指令后，用 CMD 指定具体的参数。
CMD ["nginx", "-g", "daemon off;"]
# 指定了 ENTRYPOINT 指令后， CMD就成了参数， 而且还能从docker run image cmd1 cmd2 传入参数
ENTRYPOINT [ "curl", "-s", "http://ip.cn" ]

