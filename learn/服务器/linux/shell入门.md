# 基础知识
## 一、基础命令
[linux免密ssh](https://blog.csdn.net/wenyun_kang/article/details/77413714)
1. 开关机
```
登录、注销
ssh 用户@ip         登录
logout              注销
无密登录，可用ssh-keygen生成公钥私钥

// 关机、重启
shutdown 
    -h now          立即关机
    -h 1            一小时后关机
    -r now          立即重启
halt                直接关机
reboot              直接重启
sync                同步内存到磁盘上
```
2. 用户管理
```
// 用户 -> 用户组 -> 家目录
/etc/passwd             放着所有的用户信息

useradd username        添加用户
    -m	                自动构建相关目录
    -d /home/tiger      指定家目录
    -g groupname        添加到组

passwd username         修改某账户密码

userdel username        删除用户
    -r                  同时删除根目录

id username             查询用户信息
su - username           切换用户

// 用户组
/etc/group              放着所有的组。及其成员

groups                  查看当前用户属于哪些组
        user            查看user属于哪些组


groupadd groupname      添加组
groupdel groupname      删除组
usermod -g groupname username   修改用户的组
        -G groupname     修改附加组群，逗号隔开

// 文件所属的组
ls -l                    r是可读，w可写,x 可执行
文件属性 连接数 文件拥有者 所属群组 文件大小 文件修改时间 文件名
也可以利用chown命令来更改某个文件或目录的所有者。利用chgrp命令来更改某个文件或目录的用户组。

chmod 700 /home/dir       改变文件、目录权限 4(读)、2(写)、1(执行)
    u 拥有者，g组成员，o其他人，a所有人
$ chmod 751 file          给file的属主分配读、写、执行(7)的权限，给file的所在组分配读、执行(5)的权限，给其他用户分配执行(1)的权限
$ chmod u=rwx,g=rx,o=x file      上例的另一种形式

```
3. 实用指令
```
init [0-6]              指定运行级别

```