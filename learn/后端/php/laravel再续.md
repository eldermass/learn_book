# laravel 再续

## 一、核心构架

### 1. 服务容器

[控制反转（IoC）和依赖注入（DI）](https://laravelacademy.org/post/769.html)

```php
// 通过服务提供者(xxProvider)里注册一个服务
// 例如： $this->app->bind(接口名，闭包函数返回结果实例)    接口名即是使用时的服务名
// 在类型提示的时候，使用服务名便可实现依赖注入

```

```php
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

```php
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

```

## Artisan 命令

app/Console/Commands 下 commands 方法引入了两个自定义命令来源，可以加入更多

## 广播

[入门教程](https://laravelacademy.org/post/8559.html)  
[经验](https://segmentfault.com/a/1190000015772826)
