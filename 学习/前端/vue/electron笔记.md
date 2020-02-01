## 一. electron 能直接打包index.html文件


## 二. vue中使用electron// 不建议build后再使用electron
1.  安装依赖
>    npm install electron --save-dev  
    npm install electron-packager --save-dev  
    //这个是打成exe文件的插件，之后要用，提前下载好

2.  添加入口
>   把electron-quick-start项目中的main.js搬到vue的build文件中，并改个名字electron.js并修改其打包文件位置例如： ../dist/index.html  
    注： 这里loadFile会载入他源码的路径， 要使用loadURL
        vue里 assetsPublicPath 改为相对路径

3. 添加启动命令和打包命令
>    "electron_dev": "npm run build && electron build/electron.js"  
    "electron_build": "electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite"

4.  打包exe文件
>    build时，先手动在dist文件夹下增加electron.js和package.json。  
    这两个文件都可参照electron-quick-start， 注意要修改两个文件的入口路径  
    然后package的main指向从build文件夹中复制来的electron.js（记得把electron.js中index.html的路径做修改）
    