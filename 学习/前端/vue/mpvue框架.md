mpvue框架
## 第一步：下载框架
vue init mpvue/mpvue-quickstart  project_name
## 第二步：安装依赖并运行

## 第三步：配置腾讯云后台
1. 在腾讯后台下载 后台demo
2. 在mpvue的project.config.json里加上
    "qcloudRoot":"./server"  这是为了上传测试代码
3. 下载一个客户端的sdk,前端用的
    npm install wafer2-client-sdk --save


## 第四步：搭建本地开发后台
[腾讯云文档](https://cloud.tencent.com/document/product/619/11442)

[腾讯云控制台](https://console.cloud.tencent.com/developer)  
账号appid
1. server/config.js 添加以下配置：
    const CONF = {
        // 其他配置 ...
        serverHost: 'localhost',
        tunnelServerUrl: '',
        tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
        // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
        qcloudAppId: '您的腾讯云 AppID',
        qcloudSecretId: '您的腾讯云 SecretId',
        qcloudSecretKey: '您的腾讯云 SecretKey',
        wxMessageToken: 'weixinmsgtoken',
        networkTimeout: 30000
    }
2. 修改本目录（server/config.js）下mysql相关事项
3. 初始化环境
    配置好 config.js 之后，就要开始初始化环境，初始化环境分为两步：
    安装依赖 - 打开 CMD 输入如下命令：
    # 切换到服务端代码目录
    cd server
    # 安装依赖
    npm install
    # 安装全局依赖
    npm install -g nodemon
    初始化数据库 - 打开 CMD 输入如下命令：
    node tools/initdb.js