create database if not exists xqyy character set utf8 collate utf8_general_ci;

// 用户表
create table if not exists user(
    user_id int primary key auto_increment,
    username varchar(64) unique key not null,
    password varchar(64) not null default '',
    name char(64) not null default '普通用户',
    state enum('online', 'offline', 'hidden') not null default 'offline',
    access varchar(128) not null default '[""]',
    nickname varchar(128) not null default '张三',
    avator varchar(256) not null default 'https://avatar.csdn.net/9/3/3/3_qq_41764138.jpg',
    describle varchar(258) not null default '',
    create_time char(64) not null default '0',
    last_login char(64) not null default '0',
    login_times int not null default 0,
    email varchar(128) not null default '',
    tel char(32) not null default '023-',
    auth enum('super_admin', 'admin', 'normal_user') not null default 'normal_user'
)
// 留言表
forall字段 0不公开 1对超级管理员公开，2对管理员公开，3对所有人公开
create table if not exists message(
    msg_id int primary key auto_increment,
    title char(64) not null default '信息',
    create_time char(64) not null default '0',
    state enum('unread', 'readed', 'trash') not null default 'unread',
    content text not null,
    send_user_id int not null default 1,
    get_user_id int not null default 2,
    forall enum('super_admin', 'admin', 'normal_user', 'nobody') not null default 'nobody'
)character set utf8 engine myisam

// 文章
create table if not exists article(
    id int primary key auto_increment,
    title char(64) not null default '标题',
    profile varchar(512) not null default '简介',
    content text not null,
    cateid tinyint not null default 0,
    cateindex tinyint not null default 0,
    create_time char(64) not null default '0',
    editor_id int not null default 0,
    imgUrls varchar(4096) not null default '',
    read_time int not null default 0,
    like_time int not null default 0,
    state enum('publish', 'store', 'trash') not null default 'store',
    link char(128) not null default ''
)character set utf8 engine myisam

// 图片
create table if not exists image(
    id int primary key auto_increment,
    title char(64) not null default '标题',
    profile varchar(512) not null default '简介',
    content text not null,
    cateid tinyint not null default 0,
    cateindex tinyint not null default 0,
    imgcate tinyint not null default 0,
    create_time char(64) not null default '0',
    editor_id int not null default 0,
    imgUrls varchar(4096) not null default '',
    read_time int not null default 0,
    like_time int not null default 0,
    state enum('publish', 'store', 'trash') not null default 'store',
    link char(128) not null default '',
    price int not null default 0
)character set utf8 engine myisam

// 导航数据

create table if not exists navigator(
    id int primary key auto_increment,
    title char(32) unique key not null default '未分类',
    parent char(32) not null default '未有父类',
    cateid tinyint not null default 0,
    cateindex tinyint not null default 0,
    displaytype enum('article', 'articlelist', 'image', 'imagelist', 'other') not null default 'other'
)character set utf8 engine myisam

// 展示类型
create table if not exists displaymap(
    id int primary key auto_increment,
    title char(32) unique key not null default '默认分类'
)character set utf8 engine myisam

// 轮播图 二维码 等纯图片
create table if not exists pureimage(
    id int primary key auto_increment,
    title char(32) not null default '',
    imgUrl varchar(256) not null default '',
    imagetype enum('qrcode', 'slider', 'other') not null default 'other'
)
// 底部
create table if not exists footer(
    id int primary key auto_increment,
    lineone char(64) not null default '',
    linetwo char(64) not null default '',
    linethree char(64) not null default '',
    linefour char(64) not null default ''
)
// 主页展示 图/文
create table if not exists homedata (
    id int primary key auto_increment,
    title char(32) not null default '',
    sectitle char(32) not null default '',
    describle varchar(128) not null default '',
    iconfont char(32) not null default '',
    imgUrl varchar(256) not null default '',
    displayto enum('section2', 'section3','section4','section5','section6','section7', 'other') not null default 'other',
    price int(11) not null default 0
)