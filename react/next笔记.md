# next 构建 react ssr 踩坑笔记

## 一. 安装项目 
[next文档](http://nextjs.frontendx.cn/docs/)   
npm install --save next react react-dom
1. 自定义服务端路由   
  注意异步渲染和next的Handler
2. 生成页面模版   
  Head/App/Document 等
3. 编译解析  

  ts:  [参考](https://blog.csdn.net/csg547325725/article/details/86509497)
```
  安装
  npm i --save-dev express @zeit/next-typescript typescript

  配置
  .babelrc
  tsconfig.json
  next.config.js
```
  sass: [参考](https://github.com/zeit/next.js/tree/canary/examples/with-styled-jsx-scss)
```
  安装
  npm install node-sass styled-jsx-plugin-sass --save-dev
  
  配置
  .babelrc里添加即可, (presets里只接受string , array)
  styled-jsx-plugin-sass 是 styled-jsx 的插件, 添加在next/babel后就可以了
```
4. i18next
```
  安装

```

5. redux
```
  安装
  npm install redux react-redux --save-dev

  首先要写好actions, reducers, types,
  然后用redux提供的函数生成store
  使用时,用react-redux提供的Provider 和 connect
  
```