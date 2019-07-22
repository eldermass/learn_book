# laravel视

## 视图

``` php
// 传参
Route::get("page", function () {
  return view("page", ["msg" => "message"]);
})
```

## blade语法

### 流程控制

``` php
// 判断语句
@if @elseif @else @endif
// for循环
@for @endfor  
// swich语句
// @switch @case @break @default @enswitch
// 除非
@unless
// 判断
@isset @empty
// 是否登录
@auth @guest
// 指令判断某个 section
@hasSection
@csrf

```

### 视图关系

``` php
// 包含子视图
@include
// 传递额外数据
@include('view.name', ['some' => 'data'])
// 可能不纯在的子视图
@includeIf
// 根据关系包含视图
@includeWhen($boolean, 'view.name', ['some' => 'data'])


```

``` php
// 其他
@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
// $loop变量
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile

```
