# laravel再续

## 一、服务容器

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
