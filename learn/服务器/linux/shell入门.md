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

useradd username        添加用户
    -d /home/tiger      指定家目录
    -g groupname        添加到组

passwd username         修改某账户密码

userdel username        删除用户
    -r                  同时删除根目录

id username             查询用户信息
su - username           切换用户

// 用户组
groupadd groupname      添加组
groupdel groupname      删除组
usermod -g groupname username   修改用户的组

```
3. 实用指令
```
init [0-6]              指定运行级别

```