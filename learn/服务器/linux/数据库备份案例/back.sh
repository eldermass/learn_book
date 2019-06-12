#!/bin/bash
  
BACK_PATH=/home/cy/back
DATE_TIME=$(date +%Y_%m_%d)

# 没有就创建一个备份目录
[ ! -d "$BACK_PATH/$DATE_TIME" ] && mkdir -p "$BACK_PATH/$DATE_TIME"

HOST=localhost
USER=root
PWD=root
DB_NAME=60late

echo "==========开始备份=============="
echo "=============创建数据文件================="
# mysqldump -u${USER} -p${PWD} --host=$HOST $DB_NAME | gzip > $BACK_PATH/$DATE_TIME/$DATE_TIME.gz
echo "这是MySQL的数据" | gzip > $BACK_PATH/$DATE_TIME/$DATE_TIME.gz

cd $BACK_PATH
echo "============正在打包备份================="
tar -zcvf $DATE_TIME.tar.gz $DATE_TIME

echo "=============删除零时目录========================="
rm -rf $DATE_TIME

echo "=============删除10天前的备份====================="
find $BACK_PATH -mtime +10 -name "*.tar.gz" -exec rm -rf {} \;

echo "===============备份结束================"

# 之后再把shell脚本加入crontab定时任务
