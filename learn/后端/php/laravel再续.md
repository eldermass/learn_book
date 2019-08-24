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

## 模型关联

[文档](https://learnku.com/docs/laravel/5.8/eloquent-relationships/3932)  

``` php
// $with = [] 自动带上关联属性
// 一对一 hasOne
// params： 关联的表模型， 关联表的key，本表的key
$this->hasOne(UserProfile::class, 'foreignKey', 'localKey');


// 一对多 hasMany
// params： 关联的表模型， 关联表的key，本表的key
return $this->hasMany(Post::class);

// 一对x反查，belongsTo
// params：关联的表，本表的key，关联表的key， 对应关联关系方法名
$this->belongsTo(UserProfile::class);

// 多对多， belongsToMany
// params：关联表类，中间表名或类，中间表对应本地的key，中间表对应关联的key， 本表的key，关联表的key
$this->belongsToMany(User::class, Groups::class)

// 远程一对x，通过中间关联模型
// params: 关联表， 中间表，中间表对应本地key，关联表key， 本地的key，中间表对关联表的key，
$this->hasManyThrough(User::class, Groups::class)

...

```

