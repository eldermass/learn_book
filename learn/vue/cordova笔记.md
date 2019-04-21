# 使用cordova打包app
## 一、安装
### 1. 安装 cordova 命令行工具
        npm install -g cordova

### 2. 创建app
        cordova create hello com.example.hello HelloWorld
        文件夹   apk包名  应用名

###  3. 添加平台
        切换到到目录，添加目标平台
        $ cordova platform add ios
        $ cordova platform add android
        ：
        To check your current set of platforms:
        $ cordova platform ls
        
### 4. 安装各个平台的SDK, JDK， gradle等 (最好直接安装android studio)
        ：
        To check if you satisfy requirements for building the platform:
        $ cordova requirements // 查看缺些什么
        然后配置环境变量
        如果找不到sdk taget
        chcp 437 转换到英文格式
        如果虚拟内存超出了， 可以配置环境变量
        _JAVA_OPTIONS:-Xmx512M

### 5. 打包
        $ cordova build
        $ cordova build ios

### 6. 测试app
        $ cordova emulate android 打开模拟器
        $ cordova run android     运行app

### 7. 添加插件，看文档

### 8. 关于android studio里SDK(设置里)和AVD(进入软件右上角)的安装
        adb工具能够操作虚拟机上的软件运行情况

## 其他： 
    android 打开安卓sdk管理工具
    emulator -avd name 打开某个模拟器
    adb install 安装软件
    cordova install android //将编译好的应用程序安装到模拟器上。
    cordova emulate android //在模拟器上运行（前提是创建好AVD）
    cordova serve android //在浏览器运行
    cordova build android //打包cordova项目到android平台。
    cordova run android //通过USB直接安装到真机（该语句已经包括了build命令）
