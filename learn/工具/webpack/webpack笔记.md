## 1.全局安装webpack 
    npm install webpack -g
    4.0+版本需要安装脚手架 npm install --save-dev webpack-cli
## 2.初始化项目
    1.npm init -y
    2.npm install webpack webpack-cli --save-dev

## 3.编译打包应用
    1.创建入口文件
        src/js/ entry.js
    2.创建主页面，dist/index.html
        引入出口文件，bundle.js
    3.编译js
        webpack src/js/enty.js dist/bundle.js
    4.配置webpack.config.js

## 4.由于webpack只能识别js和json文件，所以需要下载css和file 的loader
    1.npm install css-loader style-loader --save-dev
        npm install file-loader url-loader --save-dev
    2.配置loader
        module里面配置

## 5.webpack-dev-server 服务器
    1.安装 npm install webpack-dev-server --save-dev
    2.配置devServer下的contentBase基础路径
## 6.插件
    1.下载配置，
        npm install --save-dev html-webpack-plugin 
        npm install --save-dev clean-webpack-plugin


## React webpack 实例  
    1.下载 react reacd-dom 包
    2.下载babel 相关库 babel-core babel-preset-env babel-preset-react
    3.下载相关loader加载器 babel-loader css-loader style-loader file-loader url-loader
    4.**创建并配置.babelrc 文件 

> node的script配置 只有test start 可以省略run ，例 npm start  
> server库 ，server -s build 可以矫正路径
