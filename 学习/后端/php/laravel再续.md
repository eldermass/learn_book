# laravel 再续

## 一、核心构架

### 1. 服务容器、契约

[控制反转（IoC）和依赖注入（DI）](https://laravelacademy.org/post/769.html)

<!-- [契约解释]](https://learnku.com/articles/17638) -->

```php
// config/app.php文件 providers数组里面定义了许多的服务提供器
'providers' => [ App\Providers\TestServiceProvider::class, ]

// 服务提供者 (xxProvider文件)，负责注册服务，注册后服务才可依赖注入等
// 例如： $this->app->bind(接口，闭包或接口的实现)  第二个参数的目的是获取一个实例返回到调用者
// 在类型提示的时候，使用服务名便可实现依赖注入（注入服务），接口名就是使用时的服务名
$this->app->bind(DemoInterface::class, DemoProvider::class);

// 这里的接口一般就是指的（契约），而DemoProvider，DemoProvider2222就是该契约的实现，受到接口的约束
interface DemoInterface
{
    function demo();
}

// 通过接口约束，这样能够很轻松的切换驱动服务，而不改动使用时的逻辑代码
$this->app->bind(DemoInterface::class, DemoProvider2222::class);
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

## 其他

```bash
# ide-helper 修改单个模型帮助
art ide-helper:models -W -R "\App\Models\Shop\CountryTip"
```
