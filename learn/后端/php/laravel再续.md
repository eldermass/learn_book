# laravel再续

## 一、核心构架

### 1. 服务容器

[控制反转（IoC）和依赖注入（DI）](https://laravelacademy.org/post/769.html)  

``` php
// 可通过app辅助函数访问，可以依赖注入等
app(IService::class);
// 新加一个服务容器过程
// 1. 注册 服务提供者
php artisan make:Provider ServiceProvider
// 2. 把 服务提供者 注册到config/app中
// 3. 编写IService服务
// 4. 在服务提供者中register里绑定服务，bind， singleton等
// $this->app->singleton(IService::class, function ($app) { return new IService('9IIII'); });

```

## 二、基础功能

### 1. 中间件

``` php
// 创建中间建
php artisan make:middleware Name
// 注册中间件
// app/Http/Kernel.php 文件内为该中间件分配一个键
// 使用中间建
Route::get('/', function () {})->middleware('first', 'second');
// 或者直接使用类名无须注册
Route::get('/', function () {})->middleware(\App\Http\Middleware\Name);

```
