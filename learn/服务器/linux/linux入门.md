# 基础知识

## 一、基础命令

[linux免密ssh](https://blog.csdn.net/wenyun_kang/article/details/77413714)

### 一. 开关机

``` bash
# 登录
ssh user@ip
# 注销
logout
# 无密登录，可用生成公钥私钥
ssh-keygen -t [rsa|dsa]

# 关机、重启
shutdown
    -h now          立即关机
    -h 1            一小时后关机
    -r now          立即重启
halt                直接关机
reboot              直接重启
sync                同步内存到磁盘上
```

### 二. 用户管理

```u
# 用户 -> 用户组 -> 家目录
/etc/passwd             放着所有的用户信息
/etc/shadow             放着密码相关信息

useradd username        添加用户
    -m                  自动构建相关目录
    -d /home/tiger      指定家目录
    -g groupname        添加到组

passwd username         修改某账户密码

userdel username        删除用户
    -r                  同时删除根目录

id username             查询用户信息
su - username           切换用户

```

### 三、组和权限管理

``` bash
# 用户组
/etc/sudoers            放着各个组或组员对应的权限（可以针对指令设置无权限）
                        cy      ALL=(ALL:ALL) /bin/mkdir,/usr/bin/vim
/etc/group              放着所有的组。及其成员

groups                  查看当前用户属于哪些组
        user            查看user属于哪些组


groupadd groupname      添加组
groupdel groupname      删除组
usermod -g groupname username   修改用户的组
        -G groupname     修改附加组群，逗号隔开



```

### 四、文件权限管理

``` bash
ls -l                    r是可读，w可写,x 可执行
文件属性    连接数 文件拥有者 所属群组 文件大小 文件修改时间    文件名
drwxr-xr-x    7     cy      cy      4096    Jun  7 11:46   dir
文件属性：  - 普通文件  d 目录文件 l 链接文件  c 字符设备【键盘】  b 块文件【硬盘】
         r 可读  w 可写  x 可执行 - 没有权限 (每3个一组，所有者，组权限，其他权限)


chmod 700 /home/dir         改变文件、目录权限 4(读)、2(写)、1(执行)
    u 拥有者，g组成员，o其他人，a所有人
chmod 751 file              分配file所有者7，所属组5，其他1的权限
chmod u=rwx,g=rx,o=x file   上例的另一种形式

chmod o+w   file    给o(其他)加上可写权限

chown user file             改变文件所有者
chown user:group  file      同事改变所属组
            -R              递归生效

chgrp group file            改变文件的组

```

### 五、压缩解压

1、 gzip，gunzip压缩解压缩，不保留源文件

> gzip a.txt        压缩  
> gunzip a.txt.gz   解压

2、 zip，unzip 压缩，解压

``` bash
    zip dest_name 目录或文件
        -r        递归压缩

    unzip 压缩包
        -d        目录
```

3、 tar 打包指令

``` bash
#  压缩
tar -zcvf a.tar.gz a.txt b.txt
    -c              产生压缩文件
    -v              显示详细信息
    -f              指定压缩文件名
    -z              打包同时压缩
    -x              解压zxvf  -C 指定目录

```

### 六、任务调度

``` bash
/etc/crontab            数据存放地

crontab                 定时任务
    -l                  列表
    -e                  编辑例：1 * * 1,6 * ls -l /home/cy >> /home/cy/b.txt
                        *每  1-5连续  1,5不连续   */5每隔5个单位时间
    -r                  删除
编辑内容
    第一个*             第几分钟0-59
    第二个*             每天的第几小时0-23
    第三个*             每月的第几天1-31
    第四个*             每年的第几月1-12
    第五个*             每周的周几  0-7

```

### 七、磁盘分区和挂载

``` bash
lsblk   -f            查看分区和挂载情况 sdx~   x分区块，~第几部分

# 如何增加一块硬盘
fdisk   /dev/sdb                1分区
mkfs    -t ext4  /dev/sdb1      2格式化
mount   /dev/sdb1  /home/newdisk    3挂载分区
4永久挂载
/etc/fstab      文件里添加磁盘信息,/dev/sda1磁盘   /home/cy挂载点
然后输入 mount -a 挂载

umount /dev/sda1            取消挂载

# 查看磁盘情况
df -l
# 查看目录占用磁盘
du /home
    -s                      显示总量
    -a  隐藏   -h  单位  -c 统计
    --max-depth=1           显示深度

```

[脚本任务jobs](https://www.cnblogs.com/kaituorensheng/p/3980334.html)

### 八、进程管理

[任务管理](https://www.cnblogs.com/kaituorensheng/p/3980334.html#_label6)

``` bash
#  查看进程 ps -aux
    ps
        -a 所有  -u 用户界面    -x  显示后台运行参数
        -ef         显示父进程(ppid)

# 杀死进程
    kill    pid     杀死进程
        -9          强制杀死

    killall     进程名称(可以使用通配符) 用于杀死有很多子进程的父进程

    pstree
        -p          pid的进程树
        -u          用户的进程树


查看后台有多少挂起的命令
jobs                    查看
    &                   末尾加&该命令会在后台运行 node index.js & -n 10
        -n 10               10秒后就挂到后台
    ctrl + z            挂起当前命令
    fg  %num            把第num命令调至前台
    bg  %num            将后台第num停止状态改为运行状态
    kill %num           杀死第num个命令，类似kill pid
    nohup               挂到进程，ps -aux | grep "test.sh"查看



进程监控指令  
top/atop            即时监控进程
        -d          刷新间隔
        -i          不显示闲置和僵死进程
        -p          按pid显示
    交互输入
        u   筛选user    k   杀死进程    q   退出


网络进程监控
    netstat         查看网络服务进程
        -tunlp|grep 端口号

查看文件系统的端口占用
    lsof -i(:端口号)    列出当前系统打开文件

```

### 九、服务管理

``` bash
# 查看全部服务
    service --status-all

# 查看服务详情
    service mysql status

# 管里启动服务
    setup               指令
    /etc/init.d         启动服务目录

    chkconfig --list    查看各个运行级别的服务启动情况
            -level 5 serve_name on、off     开关启动运行
# 管理系统
    systemctl

```

### 十、apt相关命令

/etc/apt/source.list    可以切换为清华软件仓库
>
apt-get update             更新源  
        install -y package  安装包  
        remove --purge package   移除包  
        -f install          修复安装  
        build-dep package   安装相关编译环境
        upgrade             更新安装的包
        dist-upgrade        系统升级
        source package      下载其源代码  
        install package --reinstall 重新安装

apt-cache search package    找查包  
        show package        显示包详情  
        depends package     查看依赖了哪些包
        rdepends package    查看被哪些包依赖了


### 十一、其他

[apt-cache使用](https://jingyan.baidu.com/article/22a299b51648e09e19376ae7.html)

``` bash

init [0-6]              指定运行级别
    /etx/inittab        修改启动级别
select-editor           切换默认编辑器
tree                    打印目录结构
telnet ip port          测试网络
/etc/profile            环境变量位置

```
