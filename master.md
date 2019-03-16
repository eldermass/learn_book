
## 分支管理: 
    git branch 查看本地
        -a 远程
        -v 分支版本信息
        -d 删除
        --merged 已经合并
        --no-merged 查看没有合并
### 场景
    1. 切换到新的分支开始工作
        git checkout -b branchname  
    2. 当有紧急问题来了,需要提交/回到主干/切换到新的分支
        git add/commit
        git checkout master
        git branch -b hotbranch
    3. 当修复完紧急事件可以提前提交
        git add/commit
        git checkout master
        git merge hotbranch
        git branch -d hotbranch
        git push
    4. 继续回到之前的分支继续
        git checkout branchname
    5. 完成之前的事情之后,提交合并
        git add/commit
        git checkout master
        git merge branchname
    6. 解决冲突之后上传代码
