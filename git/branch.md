
## 分支管理
### 一、基本操作
1. [分支管理](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E7%AE%A1%E7%90%86)
```     
git branch 显示本地分支   
    -a 带上远程
    -v 分支版本信息
    -d 删除
    --merged 已经合并
    --no-merged 查看没有合并

git checkout 切换分支
    -b 创建并切换
```
2. [远程分支](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)    
在本地命名为 origin/master，就是远程分支，只有标记不可操作，fetch可得到远程指针标记
```
    创建远程仓库链接
    git remote add branch_name https.. 

    推送到某分支 本地：远程
    git push origin serverfix
    git push origin serverfix:serverfix

    远程分支的内容合并到当前分支
    git merge origin/serverfix

    创建/切换并拷贝远程分支内容
    git checkout -b serverfix origin/serverfix
    git checkout -b local_name origin/serverfix
    
    追踪某个远程分支 可以简化使用git pull/git push
    git checkout --track origin/serverfix
    
    删除远程分支
    git push origin :serverfix
```
3. [变基操作](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E5%8F%98%E5%9F%BA)
```
    在某个分支, 然后把其变基到主干
    ![rebase](https://git-scm.com/figures/18333fig0329-tn.png)
    git checkout experiment 
    git rebase master
```
4. [版本修订](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E4%BF%AE%E8%AE%A2%E7%89%88%E6%9C%AC%EF%BC%88Revision%EF%BC%89%E9%80%89%E6%8B%A9)
```
    查看HEAD中有,远程master里不同的内容
    git show origin/master..HEAD

    查看refB中有,远程refA里没有的提交
    $ git log refA..refB
    $ git log ^refA refB
    $ git log refB --not refA

    交互式添加
    git add -i

    储藏工作状态
    git stash
        stash list 查看储藏列表
        stash apply stash@版本 不跟版本就应用最近的
                            --index 回到之前的位置,如 保留add追踪状态
        stash drop 移除apply遗留在栈上的版本
        
    git stash pop 可以在应用的同时移除栈上的版本

    
```
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
