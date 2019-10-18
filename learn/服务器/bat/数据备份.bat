@echo off  

set "Ymd=%date:~,4%%date:~5,2%%date:~8,2%"  

C:/wamp64/bin/mysql/mysql5.7.9/bin/mysqldump --opt -u root --password= site > C:/db_backup/db_%Ymd%.sql  

@echo on  
