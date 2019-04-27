LOG_FILE="/var/log/blog_deploy.log"

date >> "$LOG_FILE"
echo "Start deployment" >>"$LOG_FILE"
cd /Path/need/be/deployed/
echo "pulling source code..." >> "$LOG_FILE"
git checkout origin gh-pages
git pull origin gh-pages
echo "Finished." >>"$LOG_FILE"
echo >> $LOG_FILE

read
# 拉取git示例参考