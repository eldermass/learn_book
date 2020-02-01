const path = require('path')//引入一个处理路径的node系统模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

//四个核心  入口 出口 loader 插件plugins
module.exports = {
    entry:'./src/entry',//入口文件
    output:{
        filename:'bundle.js',//出口文件名字
        // publicPath:'./dist/',//改变index.html寻找资源的强制路径，会影响热加载工具
        path:path.resolve(__dirname,'dist')//出口文件地址
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader'] //style加载样式， css加载css模块
        },
        {
            test:/\.(png|jpg|gif)$/,
            use:[{
                loader:'url-loader',
                options:{
                    limit:8192  //小于8k的图片会以base64打包到项目中
                }
            }]
        }]
    },
    devServer:{
        // contentBase:'dist/' //默认加载根路径下的index.html
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./index.html'}),//在打包目录下创建新的html模板
        new CleanWebpackPlugin(['dist']) //先删除dist文件后，再打包
    ]
}