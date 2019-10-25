# Vim 基本指令

## 移动光标

```bash
上:k nk:向上移动 n 行 9999k 或 gg 可以移到第一行 G 移到最后一行
下:j nj:向下移动 n 行
左:h nh:向左移动 n 列
右:l nl:向右移动 n 列

w：光标以单词向前移动 nw：光标向前移动 n 个单词 光标到单词的第一个字母上
b：与 w 相反
e: 光标以单词向前移动 ne：光标向前移动 n 个单词 光标到单词的最后一个字母上
ge:与 e 相反

$:移动光标到行尾 n$:移动到第 n 行的行尾
0（Num）：移动光标到行首
^:移动光标到行首第一个非空字符上去

f:移动光标到当前行的字符 a 上，nf 移动光标到当前行的第 n 个 a 字符上
F:相反

%:移动到与制匹配的括号上去（），{}，[]，<>等。

nG:移动到第 n 行上 G:到最后一行

CTRL ＋ G 得到当前光标在文件中的位置

向前翻页：CTRL+F
向下移动半屏：CTRL ＋ G

向后翻页：CTRL+B

到文件开头 gg
到文件结尾 shift+g

存盘：
:q! :不存盘退出
:e! :放弃修改文件内容，重新载入该文件编辑
:wq ：存盘退出

dw：删除一个单词,需将光标移到单词的第一个字母上，按 dw，如果光标在单词任意位置，用 daw
dnw:删除 n 个单词
dne:也可，只是删除到单词尾
dnl:向右删除 n 个字母
dnh:向左删除 n 个字母
dnj:向下删除 n 行
dnk:向上删除 n 行
d$：删除当前光标到改行的行尾的字母
dd：删除一行
cnw[word]:将n个word改变为word
cc:改变整行
C$:改变到行尾

J: 删除换行符，将光标移到改行，按 shift+j 删除行尾的换行符，下一行接上来了.
u: 撤销前一次的操作
shif+u(U):撤销对该行的所有操作。

:set showmode :设置显示工作模式

o：在当前行的下面另起一行
O（shift+o)：在当前行的上面另起一行

nk 或 nj：光标向上或向下移 n 行，n 为数字
an!【ESC】：在行后面加 n 个感叹号(!)
nx:执行 n 次 x(删除)操作

ZZ：保存当前文档并退出 VIM

:help ：查看帮助文档，在这之中，按 CTRL+] 进入超连接，按 CTRL ＋ O 返回。
:help subject :看某一主题的帮助，ZZ 退出帮助

:set number / set nonumber :显示/不显示行号
:set ruler /set noruler:显示/不显示标尺

/pattern 正方向搜索一个字符模式
?pattern 反方向搜索一个字符模式
然后按 n 继续向下找

把光标放到某个单词上面，然后按 × 号键，表示查找这个单词
查找整个单词：/\

:set hlsearch 高亮显示查找到的单词
:set nohlsearch 关闭改功能

m[a-z]:在文中做标记，标记号可为 a-z 的 26 个字母，用\`a 可以移动到标记 a 处

r:替换当前字符
nr 字符：替换当前 n 个字符

查找替换：
way1:
/【word】 :查找某个 word
cw【newword】:替换为新 word
n: 继续查找
.: 执行替换

way2:
:s/string1/string2/g:在一行中将 string1 替换为 string2,g 表示执行 用 c 表示需要确认
:num1,num2 s/string1/string2/g:在行 num1 至 num2 中间将 string1 替换为 string2
:1,\$ s/string1/string2/g:在全文中将 string1 替换为 string2

v:进入 visual 模式
【ESC】退出
V:shift+v 进入行的 visual 模式
CTRL+V:进如块操作模式用 o 和 O 改变选择的边的大小。

粘贴：p，这是粘贴用 x 或 d 删除的文本
复制：
ynw：复制 n 个单词
yy：复制一行
ynl:复制 n 个字符
y\$:复制当前光标至行尾处
nyy:拷贝 n 行
完了用 p 粘贴

:split:分割一个窗口
:split file.c ：为另一个文件 file.c 分隔窗口
:nsplit file.c: 为另一个文件 file.c 分隔窗口，并指定其行数
CTRL ＋ W 在窗口中切换
:close：关闭当前窗口

在所有行插入相同的内容如 include<，操作方法如下：
将光标移到开始插入的位置，按 CTRL+V 进入 VISUAL 模式，选择好模块后
按 I（shift+i)，后插入要插入的文本，按[ESC]完成。

:read file.c 将文件 file.c 的内容插入到当前光标所在的下面
:0read file.c 将文件 file.c 的内容插入到当前文件的开始处(第 0 行）
:nread file.c 将文件 file.c 的内容插入到当前文件的第 n 行后面
:read !cmd :将外部命令 cmd 的输出插如到当前光标所在的下面

:n1,n2 write temp.c 将本文件中的 n1,到 n2 行写入 temp.c 这个文件中去

CTRL ＋ L 刷新屏幕
shift + < 左移一行
shift + > 右移一行

u: undo
CTRL+R: re-do
J: 合并一行
CTRL+p 自动完成功能
CTRL+g 查看当前文件全路径
```
