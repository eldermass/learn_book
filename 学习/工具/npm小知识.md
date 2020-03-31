# npm 一些工具和使用的小知识

## dependencies 和 devDependencies 的区别

在下载包的时候，npm install vue 只会把 vue 下 dependencies 的模块
但对于项目而言，npm install， 会下载 dependencies 和 devDependencies 的所有模块

## glob 通配符

```bash
# 在 tsconfig.json 里使用的通配符
* 匹配0或多个字符（不包括目录分隔符）
? 匹配一个任意字符（不包括目录分隔符）
**/ 递归匹配任意子目录
```

```bash
# 在 gitignore 里使用的通配符
'#'     表示注释，使用'\'转义

'!'     表示否定，前面忽略的文件/目录将会被重新包含。如果父级目录被忽略，则子文件不能被再次包含。

'/'     如果结尾有/，则表示只匹配目录。比如，a/表示a是目录。
        如果不包含/，则会全局匹配。比如a，匹配任何目录下的a。
        如果开头有/，则表示匹配根目录。比如，/a表示根目录下的a

'*'     通配符*不能跨目录。
'**'    如 **/a，表示任何目录下的a。
        如 abc/**，递归匹配abc下的所有文件和目录。
        如 a/**/b，其中的**表示0到多层目录。
```

## nodemon

```json
// --watch 监听文件 -e 拓展名  -exec 需要执行的命令
{
  "scripts": {
    "watch": "nodemon  --watch ./ts/**/* -e  ts,tsx  --exec tsc",
    "test": "nodemon --watch ./ts/**/* -e ts,tex  --exec ts-node ts/index.ts"
  }
}
```
