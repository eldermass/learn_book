# laravel

[入门](https://laravelacademy.org/laravel-tutorial-5_7)
[门面列表](https://laravelacademy.org/post/9536.html#toc_6)

## 一. 入门知识

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

## 二. 脚本操作

``` bash
# 通过Artisan命令,执行相应的操作
# 脚本化创建控制器
php artisan make:controller TaskController
php artisan make:controller PostController --resource
# 查看应用的所有路由
php artisan route:list

```

## 三. 定义路由

routes目录下Route类设置函数
[路由教程](https://laravelacademy.org/post/9612.html)

### 1. 闭包路由

``` php
// 单个动作，还有post/delete等
Route::get("/", function () {});
// 多个
Route::match(["get", "post"], function () {});
```

### 2. 控制器路由

``` php
// 传递给 App\Http\Controllers\WelcomeController 控制器的 index 方法进行处理
Route::get("/", "WelcomeController@index");
```

### 3. 路由参数

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

### 4. 路由分组

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

### 5. 路由模型绑定

``` php
// 应用会将传入参数值赋值给 {task}，然后默认以参数值作为资源 ID 在底层通过 Eloquent 查询获取对应模型实例，直接获取资源
// Task 继承自 Illuminate\Database\Eloquent\Model;
Route::get('task/{id}', function ($id) {
    $task = \App\Models\Task::findOrFail($id);
});
// 隐式绑定
Route::get('task/{task}', function (\App\Models\Task $task) {
    dd($task); // 打印 $task 明细
});
```

### 6. 兜底路由

``` php
// 兜底路由
Route::fallback(function () {
    return '我是最后的屏障';
});
// 路由屏障
// 在 Laravel 中该功能通过内置的 throttle 中间件来实现，该中间件接收两个参数，第一个是次数上限，第二个是指定时间段（单位：分钟）：
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
Route::middleware('throttle:rate_limit,1')->group(function () {
    Route::get('/user', function () {
        // 在 User 模型中设置自定义的 rate_limit 属性值
    });
    Route::get('/post', function () {
        // 在 Post 模型中设置自定义的 rate_limit 属性值
    });
});
```

### 7. 路由请求伪造

``` php
// _method隐藏域，传出的方法会被当做真正的路由
<form action="/task/1" method="POST">
    <input type="hidden" name="_method" value="DELETE">
</form>
// 避免[跨站请求伪造攻击]（CSRF）
// 默认所有的路由均是   只读， 如果写入需要传入_token
<input type="hidden" name="_token" value="{{ csrf_token() }}">
```

## 四. 视图模型

### 1. view

``` php
// 返回resource/views下的视图，并传参
view('page.show')->with("id", $id);
view('page.show', ['id' => $id, 'name' => $name]);
// 视图间共享变量, AppServiceProvider 的 boot 方法中定义如下内容，便能在说有blade页面中访问该变量
view()->share('siteName', 'Laravel学院');
```

### 2. blade语法

``` PHP
// blade页面会被编译然后缓存到storage/framework/views
// 通过 {{ }} 渲染 PHP 变量（最常用）
{{ $name }}
// 通过 {!! !!} 渲染原生 HTML 代码（用于富文本数据渲染）
{!! $name !!}
// 通过以 @ 作为前缀的 Blade 指令执行一些控制结构和继承、引入之类的操作
@php
// Blade 引擎编译时会移除 @，保留 {{ $vueData }} 结构
@{{ $vueData }}
// 注释
{{-- 注释内容 --}}
```

### 3. 结构控制

``` php
// 条件语句
@if、@else、@elseif
// 除非
@unless
@isset、@empty
// 分支语句
@switch、@case、@break、@default 和 @endswitch
// 循环语句 ， 自带$loop变量
@for、@foreach 和 @while
@forelse
```

### 4. 模板继承 和 组件引入

``` php
// 定义插槽
// @yield
@yield('title', '默认值')
// @section/@show 可以将子视图传递给继承模板
@section/@show

// 继承插槽
@extends("layout")
// 内容 @parent 能继上级承传过来的内容
@section/@endsection

// 引入其他组件试图,(就是一个blade片段)
@include("com.view", ['text' => '这是传入组件的值'])
// @each 指令支持多个参数，第一个参数用于指定要循环引入的组件名，第二个参数是要遍历的集合变量，第三个参数是在引入组件中使用的变量名（对应 $modules 集合中单个元素），最后一个参数是集合数据为空时引入的默认组件。
@each('partials.module', $modules, 'module', 'partials.empty-module')

// 插槽分发 @component类似include引入一个组件
@slot 和 @component('模板', ['title' => '传值'])
```

### 5. 预设视图组件数据变量

``` php
// app/Providers/AppServiceProvider.php 的 boot 方法
view()->composer(['partials.header', 'partials.*'], function ($view) {
    $view->with(['posts' => $value]);
});

// app/Http/ViewComposers 目录下创建一个自定义 View Composer 类 RecentPostsComposer.php,
// 当我们在 View Composer 中调用 RecentPostsComposer 类的时候，compose 方法会被自动调用从而完成变量预设：
view()->composer( 'partials.sidebar', \App\Http\ViewComposers\RecentPostsComposer::class );
```

### 6. 注入服务

``` php
@inject('analytics', 'App\Services\Analytics')
```

### 7. 自定义blade命令

``` php
// 在 AppServiceProvider 的 boot 方法中注册这个指令
Blade::directive('datetime', function($expression) {
    return "<?php echo ($expression)->format('Y/m/d H:i:s'); ?>";
});
// 指令统一显示指定格式的日期时间了。
@datetime($time)
```

## 五. 处理请求

### 1. 注入请求对象

``` php
// use Illuminate\Http\Request; 和 request() 门面
$request->all();    // 全部
$request->except('id'); // 排除
$request->only(['name', 'site', 'domain']); // 只要
// 先行判断has, exists
$request->has('id') ? $request->get('id') : 0;
// 获取某一值 get, post, input, 获取数组中的某一个
$request->input('books.0.author', "设置默认值");
// 基数从1开始
$request->segments()
```

### 2. 上传文件

``` shell
# $request->file() 方法获取的是一个 Illuminate\Http\UploadedFile 对象实例
# 使用了 Storage::disk('public') 磁盘将上传文件保存到本地，关于该磁盘的自定义配置信息可以去 config/filesystems.php 文件中查看
# 如果要让上传到 storage/app/public 目录的文件可以被外部访问，还要执行以下命令
php artisan storage:link
```

``` javascript
let formData = new FormData();
formData.append('picture', this.$refs.picture.files[0]);
axios.post(
    '/form/file_upload',
    formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
)
```
