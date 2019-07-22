# laravel

## 基础

[入门](https://laravelacademy.org/laravel-tutorial-5_7)

### 一. 入门知识

``` bash
# 1. 通过安装器 或 composer安装
composer global require laravel/installer  
laravel new blog  

# 通过composer安装：  
composer create-project laravel/laravel blog --prefer-dist

# 2. 读取配置
# config 目录下，通过env()函数读取到.env文件的变量。也可使用时config()函数读取值  
如：config("services.sparkpost.secret")
    env("SPARKPOST_SECRET")

# 3. 基本常识
# 对应域对应的连接
  url("/")
# 命名路由的连接
  route("name", ["id" => "10"])
# 渲染函数，resource/views下对应的blade页面
  view()
# 模板：  
    {{ xxx }}   转移
    {!! xxx !!} 不转义
```

### 二. 脚本操作

``` bash
# 通过Artisan命令,执行相应的操作
# 脚本化创建控制器
php artisan make:controller TaskController
# 查看应用的所有路由
php artisan route:list

```

### 三. 定义路由

routes目录下Route类设置函数
[路由教程](https://laravelacademy.org/post/9612.html)

#### 1. 闭包路由

``` php
// 单个动作，还有post/delete等
Route::get("/", function () {});
// 多个
Route::match(["get", "post"], function () {});
```

#### 2. 控制器路由

``` php
// 传递给 App\Http\Controllers\WelcomeController 控制器的 index 方法进行处理
Route::get("/", "WelcomeController@index");
```

#### 3. 路由参数

``` php
// 获取动态路由参数
Route::get("user/{id}", function ($id) { return $id });
// 可选获取动态路由参数
Route::get("user/{id?}", function ($id = 1) { return $id });

// 正则匹配路由参数
Route::get("page/{id}/{slug}", function ($id, $slug) {
  return $id . ":" . $slug;
})->where(["id" => "[0-9]+", "slug" => "[A-Za-z]+"])
```

#### 4. 路由分组

``` php
// 数组内提取共同特征, 然后分成多组
Route::group([], function () {
  Route::get("1", function () { return view("page1"); });
  Route::get("2", function () { return view("page2"); });
})
//  公用中间件， 定义在App\Http\Middleware里 ，在App\Http\Kernel中管理
//  其参数可用数组，如["auth", "another"]
Route::middleware("auth")->group(function () {
  Route::get("dashboard", function () {
    return "dashboard";
  })
  Route::get("account", function () {
    return "account";
  })
})
// 定义共有前缀
Route::prefix("api")->group(...)
// 共有子域名
Route::domain('admin.blog.test')->group(...)
Route::domain('{account}.blog.test')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
// 共有命名空间
// 公用命名空间默认为App\Http\Controllers，修改于app/Providers/RouteServiceProvider.php
Route::namespace('Admin')->group(function() {
    // App\Http\Controllers\Admin\AdminController       可得到该命名空间
    Route::get('/admin', 'AdminController@index');
});
// 命名路由前缀
Route::name('user.')->prefix('user')->group(function () {
    Route::get('{id?}', function ($id = 1) {
    // 处理 /user/{id} 路由，路由命名为 user.show
        return route('user.show');
    })->name('show');
});
```
