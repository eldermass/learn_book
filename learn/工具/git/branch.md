
# git操作

## 分支管理

### 一、基本操作

0.基础操作

``` bash
    git --version    查看安装的版本  
    git init         初始化
    git config --global user.name 'chenyue'  
    git config --global user.email '285653184@qq.com'  

    git status  获取队列状态
    git add .   添加所有文件到队列  
    git add *.html   添加所有html文件到队列  
    git add index.html 添加到队列  
    git rm --cached index.html 移除队列中的  

    git commit  提交队列中的文件到 仓库  “vim操作流程” 写完备注后，按esc  冒号  wq 退出  
            -m '备注'       直接提交  
    分支中的所有操作都不会影响到主线
    git branch login  创建分支  
    git checkout login  跳转到某个分支  
    git merge login    合并某个分支  

    忽略一些文件或者文件夹
    创建.gitignore文件，并在里面写入要忽略的文件名

    git clone https filename                克隆分支
    git push --set-upstream origin master   第一次提交线上仓库
    git branch --set-upstream-to  origin master/origin 创建本地分支与远程分支的关联


    git checkout -- file    移除改动的文件
    git clean -n
                -df         清理追踪的变化
    git rm --cached         清理缓存文件

```

1.[分支管理](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E7%AE%A1%E7%90%86)

``` bash
git branch 显示本地分支
    -a 带上远程
    -v 分支版本信息
    -vv 查看分支跟踪状态
    -d 删除
    --merged 已经合并
    --no-merged 查看没有合并

git checkout 切换分支
    -b 创建并切换

    git clean -df #返回到某个节点
git clean 参数
    -n 显示 将要 删除的 文件 和  目录
    -f 删除 文件
    -df 删除 文件 和 目录
```

2.[远程分支](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)

在本地命名为 origin/master，就是远程分支，只有标记不可操作，fetch可得到远程指针标记

``` bash
    git remote      查看当前的远程仓库链接情况
            -v      详情
    git remote update origin -p 刷新远程分支列表

    创建远程仓库链接
    git remote add branch_name https
    git push -u origin master 新分支第一次提交

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

    git branch --set-upstream-to=origin/<branch> barnch_local

    删除远程分支
    git push origin :serverfix
```

3.[重写历史](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)

``` bash
git commit --amend          重写最近的一次提交(推送后提交会有冲突)

git rebase -i HEAD~3        重写最近3次的历史,(修改提交历史，重拍提交记录)
    解释：进入编辑器后，将需要改的版本对应的pick改为edit。编辑完成后git会重播历史提交，当进入到edit的版本时就会暂停，你可以选rebase --continue跳过，或者commit --amend重写那一次提交然后在--continue

压制(Squashing)提交 squash， 可以将提交合并到前一个记录中
```

[变基操作](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E5%8F%98%E5%9F%BA)

``` bash
git rebase branch   将branch分支当成补丁,打入到本分支，按时间顺序重播，变基,结果融入当前分支

git rebase [主分支] [特性分支]  主分支做重播基底，打入特性分支，最终结果融入特性分支
git rebase --onto master server client  多分支变基，指定基底，

```

4.[版本修订](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E4%BF%AE%E8%AE%A2%E7%89%88%E6%9C%AC%EF%BC%88Revision%EF%BC%89%E9%80%89%E6%8B%A9)

``` bash
    git log -3 查看最近三个提交
        --stat  查看修改的状态
    git reflog 查看最近三次操作

    查看HEAD中有,远程master里不同的内容
    git show origin/master..HEAD

    查看refB中有,远程refA里没有的提交
    $ git log refA..refB
    $ git log ^refA refB
    $ git log refB --not refA

    交互式添加
    git add -i

    储藏工作状态
    git stash                   把现有的修改藏起来
        git stash save “desc”   把现有的修改藏起来，并且添加一个注释
        stash list              查看储藏列表
        stash apply stash@版本   不跟版本就应用最近的，不删除
                    --index     回到之前的位置,如 保留add追踪状态
        stash drop              移除apply遗留在栈上的版本

        git stash pop           可以在应用的同时移除栈上的版本
                stash@{index}   指定版本

    git stash clear 清除所有修改

    git stash show shash@{index} 查看储藏修改了什么文件
                -p              查看里面修改了什么内容

    从储藏中创建分支
    git stash branch name
```

5.版本退回

``` bash
git reset --hard HEAD~1     回到上1个版本  
git reset --hard 版本号     切换到某个时态git reflog 查看  
        --hard              add之前,并不保留提交前的更改  
        --soft              更新add 和 commit 之间,保留更新  
        --mixed/默认        更新 add变更前,保留更新  

```

### 场景

``` bash
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
```
