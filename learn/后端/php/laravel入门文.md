# laravel

[入门](https://laravelacademy.org/laravel-tutorial-5_7)
[门面列表](https://laravelacademy.org/post/9536.html#toc_6)

## 一. 入门知识

### 1. 基础入门

```bash
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
# 打印sql语句
\DB::enableQueryLog();
$users = Task::with('belongTo')->find(4);
dump(\DB::getQueryLog());

# 交互命令
# 创建控制器
php artisan make:COntroller User/Admin
# 创建迁移类
php artisan make:migration create_users_table
# 执行迁移
php artisan migrate
# 回滚迁移
php artisan migrate:rollback
# 重置迁移
php artisan migrate:reset
# 创建填充类
php artisan make:seeder UsersTableSeeder
# 执行填充
php artisan db:seed --class=UsersTableSeeder
```

### 2. 交互入口 artisan

[参考](https://laravelacademy.org/post/9684.html)

```php
// app/Console/Kernel.php  中注册
// 自定义命令
Artisan::command('welcome:message_simple', function () {
    $this->info('欢迎访问 Laravel 学院!');
})->describe('打印欢迎信息');
```

### 3. tinker 命令式操作

```php
// php artisan tinker 即可进入 Laravel Tinker 的交互式 Shell。

// doc 命令用于找查文档和辅助函数
doc config      show config


```

## 二. 脚本操作

```bash
# 通过Artisan命令,执行相应的操作
# 脚本化创建控制器
php artisan make:controller TaskController
php artisan make:controller PostController --resource
# 查看应用的所有路由
php artisan route:list

```

## 三. 定义路由

routes 目录下 Route 类设置函数
[路由教程](https://laravelacademy.org/post/9612.html)

### 1. 闭包路由

```php
// 单个动作，还有post/delete, any等
Route::get("/", function () {});
// 多个
Route::match(["get", "post"], '/', function () {});
// 视图路由
Route::view('/wel', 'wel', ['params' => 'param'])
```

### 2. 控制器路由

```php
// 传递给 App\Http\Controllers\WelcomeController 控制器的 index 方法进行处理
Route::get("/", "WelcomeController@index");
```

### 3. 路由参数

```php
// 获取动态路由参数
Route::get("user/{id}", function ($id) { return $id });
// 可选获取动态路由参数
Route::get("user/{id?}", function ($id = 1) { return $id });

// 正则匹配路由参数
Route::get("page/{id}/{slug}", function ($id, $slug) {
  return $id . ":" . $slug;
})->where(["id" => "[0-9]+", "slug" => "[A-Za-z]+"])
// 全局约束
Route::pattern('id', '[0-9]+');
```

### 4. 路由分组

```php
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

```php
// 应用会将传入参数值赋值给 {task}，然后默认以参数值作为资源 ID 在底层通过 Eloquent 查询获取对应模型实例，直接获取资源
// Task 继承自 Illuminate\Database\Eloquent\Model;
Route::get('task/{id}', function ($id) {
    $task = \App\Models\Task::findOrFail($id);
});
// 隐式绑定
Route::get('task/{user}', function (\App\Models\User $user) {
    // $user相当于User::find(user)
});
// 显示绑定到RouteServiceProvider
public function boot()
{
    Route::bind('user', function ($value) {
            return App\User::where('name', $value)->first() ?? abort(404);
    });
}
```

### 6. 兜底路由

```php
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

```php
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

```php
// 返回resource/views下的视图，并传参
view('page.show')->with("id", $id);
view('page.show', ['id' => $id, 'name' => $name]);
// 视图间共享变量, AppServiceProvider 的 boot 方法中定义如下内容，便能在说有blade页面中访问该变量
view()->share('siteName', 'Laravel学院');
```

### 2. blade 语法

```PHP
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

```php
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

```php
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

```php
// app/Providers/AppServiceProvider.php 的 boot 方法
view()->composer(['partials.header', 'partials.*'], function ($view) {
    $view->with(['posts' => $value]);
});

// app/Http/ViewComposers 目录下创建一个自定义 View Composer 类 RecentPostsComposer.php,
// 当我们在 View Composer 中调用 RecentPostsComposer 类的时候，compose 方法会被自动调用从而完成变量预设：
view()->composer( 'partials.sidebar', \App\Http\ViewComposers\RecentPostsComposer::class );
```

### 6. 注入服务

```php
@inject('analytics', 'App\Services\Analytics')
```

### 7. 自定义 blade 命令

```php
// 在 AppServiceProvider 的 boot 方法中注册这个指令
Blade::directive('datetime', function($expression) {
    return "<?php echo ($expression)->format('Y/m/d H:i:s'); ?>";
});
// 指令统一显示指定格式的日期时间了。
@datetime($time)
```

## 五. 处理请求

### 1. 注入请求对象

```php
// 门面获取
// use Illuminate\Support\facades\Input
$task->title = Input::get('title');

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

// 带着请求跳转
redirect('form')->withInput();
// 存储使用上一次请求
$request->flash();
$request->old();
```

### 2. 上传文件

```shell
# $request->file() 方法获取的是一个 Illuminate\Http\UploadedFile 对象实例
# 使用了 Storage::disk('public') 磁盘将上传文件保存到本地，关于该磁盘的自定义配置信息可以去 config/filesystems.php 文件中查看
# 如果要让上传到 storage/app/public 目录的文件可以被外部访问，还要执行以下命令
php artisan storage:link
```

```javascript
let formData = new FormData();
formData.append("picture", this.$refs.picture.files[0]);
axios.post("/form/file_upload", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
```

### 3. 表单验证

[验证规则文档](https://laravelacademy.org/post/9547.html#toc_17)
写入路由应该有@csrf 验证

```php
// Illuminate\Foundation\Validation\ValidatesRequests;
 $this->validate($request, [
        'title' => 'bail|required|string|between:2,32'
    ],  [
        'title.required' => '自定义提示',
        'title.string' => '可选',
        'title.between' => '标题长度必须介于2-32之间'
    ]);

// 类使用
\Validator::make([], [], [])
// $validator->fails();
// $validator->errors()->all();

// 继承使用
use Illuminate\Foundation\Http\FormRequest;
```

## 六. 数据库查询

### 1. 连接

```php
// config/database.php中配置
// 默认连接mysql配置，connection可以进行选择，
DB::connection('mysql_old')->table('users')->where(...)->get();

//  Eloquent 模型类 中
protected $connection = 'mysql_old';

// 读写分离, 在database.php中配置
'mysql' => [
    'driver' => 'mysql',
    'read' => [
        'host' => env('DB_HOST_READ', '127.0.0.1'),
    ],
    'write' => [
        'host' => env('DB_HOST_WRITE', '127.0.0.1')
    ],
]

// 数据库迁移
// 创建迁移类
php artisan make:migration create_users_table
// 执行迁移
php artisan migrate
// 回滚迁移
php artisan migrate:rollback

// 数据库填充
# 创建填充类
php artisan make:seeder UsersTableSeeder
# 执行填充
php artisan db:seed --class=UsersTableSeeder
// 或者加入集体执行
php artisan db:seed
// 或加入Seeder
public function run()
{
    $this->call(UsersTableSeeder::class);
}

// 通过模型工厂填充数据
// 创建工厂  database/factories 里
// 加入执行  database/seeds 加入run函数里， 执行填充时会调用
factory(\App\User::class, 5)->create();
// 执行填充
php artisan db:seed --class=UsersTableSeeder
```

### 2. 操作

```php
// DB门面用于操作数据库,  use Illuminate\Database\Eloquent\Model;
// statement 用原生sql操作数据库
DB::statement('drop table `users`');

// DB提供的原生语句方法， select， insert， update， delete等
DB::select('select * from `users` where `name` = ?', [$name]);
DB::select('select * from `users` where `name` = :name', ['name' => $name]);

// 查询构建器进行增删改查  select， insert， update， delete等
// get 获取， first 第一条
\DB::table('users')->where('name', $name)->get();
\DB::table('users')->select('id', 'name', 'email')->where('name', $name)->first();

// 插入数据
// DB::table('users')->insertGetId    这个可以返回主键
DB::table('users')->insert([
    'name' => str_random(10),
    'email' => str_random(8) . '@163.com',
    'password' => bcrypt('secret')
]);
// 插入多条记录
DB::table('users')->insert([
    ['name' => '张三', 'password' => '123'],
    ['name' => '李四', 'password' => '456']
])
// 更新一条记录
DB::table('users')->where('id', '>', $id)->update(['name' => str_random(8)])
// 更新数值 increment 和 decrement
DB::table('posts')->where('id', 100)->increment('views'); // views+1
DB::table('posts')->where('id', 100)->increment('views', 5); // views+5
// 删除
DB::table('users')->where('id', '>=', $id)->delete();
// 重置自增记录 truncate  会清空表
DB::table('users')->truncate()
```

### 3. 复杂的 sql 语句

[复杂的 sql](https://laravelacademy.org/post/9698.html)

```php
// 快速获取字段的值, 如果是数组只能获取第一个
DB::table('user')->value('name');
// 判断是否存在， 与之相对的方法 doesntExist()。
DB::table('users')->where('name', $name)->exists();
// 形成关联数组, 值在前，键在后
DB::table('user')->pluck('name', 'id');
// 数据较大时分块
DB::table('users')->orderBy('id')->chunk(5, function ($users) use (&$names) {
    foreach ($users as $user) {
        $names[] = $user->name;
    }
});

// count、sum、avg、min、max 聚合函数
DB::table('users')->count();       # 计数     9

// 高级查询
// like
DB::table('posts')->where('title', 'like', 'Laravel学院%')->get();
// and
DB::table('posts')->where('id', '<', 10)->where('views', '>', 0)->get();
DB::table('posts')->where([
    ['id', '<', 10],
    ['views', '>', 0]
])->get();
// or
DB::table('posts')->where('id', '<', 10)->orWhere('views', '>', 0)->get();
// between
DB::table('posts')->whereBetween('views', [10, 100])->get();
DB::table('posts')->whereNotBetween('views', [10, 100])->get();
// in
DB::table('posts')->whereIn('user_id', [1, 3, 5, 7, 9])->get();
// null
DB::table('users')->whereNull('email_verified_at')->get();
// notNull
DB::table('users')->whereNotNull('email_verified_at')->get();
// 日期 whereYear  whereMonth  whereDay  whereTime
DB::table('posts')->whereDate('created_at', '2018-11-28')->get();  # 具体日期
// 字段间比较
DB::table('posts')->whereColumn('updated_at', '>', 'created_at')->get();
// json字段查询，options是一个json字段
DB::table('users')->where('options->language', 'en')->get();
DB::table('users')->whereJsonContains('options->languages', ['en_US', 'zh_CN'])->get();
// 参数分组，示例对应select * from posts where id <= 10 or (views > 0 and created_at < '2018-11-28 14:00');
DB::table('posts')->where('id', '<=', 10)->orWhere(function ($query) {
    $query->where('views', '>', 0)
        ->whereDate('created_at', '<', '2018-11-28')
        ->whereTime('created_at', '<', '14:00');
})->get();
// whereExists， select * from `users` where exists (select 1 from `posts` where posts.user_id = users.id);
DB::table('users')
    ->whereExists(function ($query) {
        $query->select(DB::raw(1))
            ->from('posts')
            ->whereRaw('posts.user_id = users.id');
    })
->get();
```

### 4. 联表查询

```php
// 等值链接， inner 是交集
SELECT *, g.id as gid from users u INNER JOIN user_group g on u.group_id = g.id;
// 不等链接 < , > , <>
SELECT *, g.id as gid from users u INNER JOIN user_group g on u.group_id <> g.id;
DB::table('users')
->join('user_group', 'users.id', '=', 'user_group.id')
->select('user_group.id as gid', 'users.name', 'users.password')
->get();

// 左链接， 返回左表中的所有行，如果左表中的行在右表中没有匹配行，则返回结果中右表中的对应列返回空
SELECT *, g.id as gid from users u left JOIN user_group g on u.group_id = g.id;
DB::table('users')
->leftJoin('user_group', 'users.id', '=', 'user_group.id')
->select('user_group.id as gid', 'users.name', 'users.password')
->get();

// 右链接，返回右表中的所有行，如果右表中的行在左表中没有匹配行，则结果中左表中的对
SELECT *, g.id as gid from users u right JOIN user_group g on u.group_id = g.id;
DB::table('users')
->rightJoin('user_group', 'users.id', '=', 'user_group.id')
->select('user_group.id as gid', 'users.name', 'users.password')
->get();
// 全连接，左+右， full join
// 交叉链接，笛卡尔积，左 * 右
DB::table('users')
->crossJoin('user_group', 'users.id', '=', 'user_group.id')
->select('user_group.id as gid', 'users.name', 'users.password')
->get();
// 匿名组装
DB::table('users')
    ->join('user_group', function ($join) {
        $join->on('user_group.id', '=', 'users.group_id')
            ->whereNotNull('user_group.allowed');
    })
    ->select('user_group.id as gid', 'user_group.allowed', 'users.name', 'users.password')
    ->where('user_group.allowed', '>', 0)
    ->get();
// 联合查询, 把两次查询的内容合在一起
(select * from `users` where `group_id` <= 10) union (select * from `users` where `password` = '6666')
$posts_a = \DB::table('users')->where('password', '6666');
$posts_b = \DB::table('users')->where('group_id', '<=', 10)->union($posts_a)->get();
// 排序 desc 降序， asc 升序
DB::table('posts')
    ->orderBy('created_at', 'desc')
    ->get();
// 随机排序
DB::table('posts')->inRandomOrder()->get();

// 分组 , having()可以过滤不满足的结果
select user_id, sum(views) as total_views from `posts` group by `user_id`;
DB::table('posts')
    ->groupBy('user_id')
    ->selectRaw('user_id, sum(views) as total_views')
    ->having('total_views', '>=', 10)
    ->get();
// 分页
// skip从第几个开始，take取几条数据
DB::table('users')->skip(1)->take(5)->get();
// offset从第几个开始，limit取几条数据
DB::table('users')->offset(1)->limit(5)->get();
```

## 七. Eloquent 模型类

支持 DB 类的各种方法
[Eloquent 模型](https://laravelacademy.org/post/19531.html)

### 1. 查找

```php
// Eloquent 模型，use Illuminate\Database\Eloquent\Model;
// php artisan make:model Models/User， 然后写入
protected $connection = 'mysql';
protected $table = 'users';
protected $primaryKey = 'id';
// 获取所有表
\User::all();
// 每次获取一条
\User::first();
// 根据主键获取, firstOrFail 会直接返回404页面
\User::find(2);


foreach (\Post::cursor() as $post) {
    dump($post->title . ':' . $post->content);
}
// 获取指定查询结果
\User::where('views', '>', 0)->orderBy('id', 'desc')->offset(10)->limit(5)->get();
```

### 2. 插入

```php
// 实例化，调用save()方法
$post = new App\Post;
$post->username = '名字';
$post->password = '密码';
$post->save();

// 快捷的插入方法，比如 firstOrCreate 和 firstOrNew(不会插入数据库)，先查询，找不到就插入，需要fillable里加上对应的字段
protected $fillable = ['name', 'email'];
Post::firstOrCreate([
    'name' => '测试文章标题1',
    'email' => 1,
]);

```

### 3. 更新数据

```php
// 取出修改，然后存储。多条用循环依次修改
$post = Post::find(31);
$post->title = '测试文章标题更新';
$post->save();

// 快捷的更新方法 updateOrCreate，找不到就新建同上
$user = user::updateOrCreate(
    ['name' => '学院君'],
    ['email' => 'admin@laravelacademy.org']
);
```

### 4. 删除

```php
// 找到就删除
$user = Users::find(1);
$user->delete();

// 软删除
// 在模型类的中使用SoftDEletes，就能隐去被软删除的结果
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use SoftDeletes;
}
// withTrashed可以获取到被软删除的结果
// onlyTrashed用于只获取被软删除的结果
Post::withTrashed()->find(32);
// restore恢复被软删除的记录
Post::onlyTrashed()->where('views', 0)->restore();
// 强制删除
$post->forceDelete();
```

### 5. 批量赋值

```php
// 通过构造器写入数据库， 白名单之外的赋值不会写入
// $fillable 白名单， $guarded 黑名单
$post = new Post(['title' => '测试文章标题', 'content' => '测试文章内容']);
$post = new Post($request->all());

// 修改
$user = Users::findOrFail(2);
$user->fill(['username' => '黄油煎']);
$user->save();

```

### 6.访问器与修改器

```php
// 在模型中定义方法getDisplayNameAttribute，就能直接通过display_name属性访问
public function getDisplayNameAttribute()
{
    return $this->nickname ? $this->nickname : $this->name;
}
$user->display_name

// 放入数据库前会先修改属性，setCardNoAttribute，会将传入card_no修改
public function setCardNoAttribute($value)
{
    $value = str_replace(' ', '', $value);  // 将所有空格去掉
    $this->attributes['card_no'] = encrypt($value);
}
$user->card_no = '6222020903001483077';

// 数组 & JSON 转化，直接存取即可
$user->settings = ['city' => '杭州', 'hobby' => ['读书','撸码']];
$user->save();

```

### 7. 作用域

```php
// 使用全局作用域后，之后的操作都会带上相应的操作whereNotNull
// app/Scopes 目录下
<?php
namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class EmailVerifiedAtScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        return $builder->whereNotNull('email_verified_at');
    }
}
// 模型类里使用
protected static function boot()
{
    parent::boot();

    static::addGlobalScope(new EmailVerifiedAtScope());
}
// 移除全局作用域
User::withoutGlobalScope('email_verified_at_scope')->get();


// 局部作用域
// 模型类中编写，scopePopular 对应 popular
public function scopePopular(Builder $query)
{
    return $query->where('views', '>', '0')->orderBy('views', 'desc');
}
$post = Post::popular()->get();

// 动态作用域， 可以传如想要的type
public function scopeOfType(Builder $query, $type)
{
    return $query->where('type', $type);
}
$posts = Post::active()->ofType(Post::Article)->get();
```

### 8. 模型事件和监听方式

### 9. 关联关系,连表查询

```php
// hasOne
// 关联另一个表模型， select * from userprofile
// public function hasOne($related, $foreignKey = null, $localKey = null)，
public function profile()
{
    // params： 关联的表模型， 关联表用于连接的key，本表用于连接的key
    return $this->hasOne(UserProfile::class, 'foreignKey', 'localKey');
}
// 反查所属模型，belongsTo
// public function belongsTo($related, $foreignKey = null, $ownerKey = null, $relation = null)
public function profile()
{
    // params：关联的表，本表用于连接的key，关联表用于连接的key， 对应关联关系方法名
    return $this->belongsTo(UserProfile::class);
}

// 一对多 hasMany ，参数同上
public function posts()
{
    // params： 关联的表模型， 关联表用于连接的key，本表用于连接的key
    return $this->hasMany(Post::class);
}
// 多对多 belongsToMany， 通过本表的key找到中间表，然后中间表的关联key找到对应的关联表
// public function belongsToMany($related, $table = null, $foreignPivotKey = null, $relatedPivotKey = null, $parentKey = null, $relatedKey = null, $relation = null)
// params：关联表类，中间表名，中间表的查询key，中间表对应关联表的key， 本表的key，关联表的key

```

### 10. 渴求式加载

```php
// 先在模型里关联author
$posts = Post::with('author')
    ->where('views', '>', 0)
    ->offset(1)->limit(10)
    ->get();
```
