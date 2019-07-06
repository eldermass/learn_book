# laravel

## 基础

### 入门知识

``` base
1. 通过安装器 或 composer安装
  composer global require laravel/installer  
  laravel new blog  

  通过composer安装：  
  composer create-project laravel/laravel blog --prefer-dist

2. 读取配置
  config 目录下，通过env()函数读取到.env文件的变量。也可使用时config()函数读取值  
  如：config("services.sparkpost.secret")
      env("SPARKPOST_SECRET")

3. 基本常识
  url("/")  对应域对应的连接
  route("name", ["id" => "10"]) 命名路由的连接
  模板：  
  {{ xxx }}  {!! xxx !!} 不转义
```

### 定义路由

``` router
  routes目录下Route类设置函数
      闭包路由
        Route::get("/", function () {});       单个动作，还有post/delete等
        Route::match(['get', 'post'], '/', function () {});   多个动作
      控制器路由
        Route::get('/', 'WelcomeController@index');           传递给 App\Http\Controllers\WelcomeController 控制器的 index 方法进行处理

      路由参数
        Route::get("/user/{id}", function ($id) { return $id}) 获取动态路由参数
        Route::get("/user/{id?}", function ($id = 1) { return $id}) 可选获取动态路由参数
        正则匹配路由参数
        Route::get('page/{id}/{slug}', function ($id, $slug) {return $id . ':' . $slug;})->where(['id' => '[0-9]+', 'slug' => '[A-Za-z]+']);

  view()函数会渲染，resource/views下对应的blade页面
```
