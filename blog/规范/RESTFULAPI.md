# RESTful API 设计规范

由于前后端数据通信的场景越来越常见，通信间的规范就显得重要起来。一般来说，后端负责 `数据编造` ,而前端则负责 `数据渲染` ，前端静态页面调用指定 api 获取到有固定格式的数据，再将数据展示出来，这样呈现给用户的就是一个”动态“的过程，为了加强约束和规范数据交互过程中的统一， 就需要一个 `restful` 这样的规范来统一风格。

## rest 设计原则

1. 客户端-服务器：通过将用户 UI 与数据存储分开，我们可以简化服务器组件来提高跨多个平台的用户界面的可移植性并提高可伸缩性。 它可以比表现成前后端分离的思想。
2. 无状态：从客户端到服务器的每个请求都必须包含理解请求所需的所有信息，并且不能利用服务器上任何存储的上下文。 这表示你应该尽可能的避免使用 session，由客户端自己标识会话状态。（token）
3. 规范接口：REST 接口约束定义：资源识别; 请求动作; 响应信息; 它表示通过 uri 标出你要操作的 `资源` ，通过请求动作（http method）标识要执行的操作，通过返回的状态码来表示这次请求的执行结果。
4. 可缓存： 缓存约束要求将对请求的响应中的数据隐式或显式标记为可缓存或不可缓存。如果响应是可缓存的，则客户端缓存有权重用该响应数据以用于以后的等效请求。 它表示 get 请求响应头中应该表示有是否可缓存的头（Cache-Control)

## 协议

在通信过程中，尽量使用 `https` 协议

## 根路径

`API` 的根入口点应尽可能保持足够简单，这里有两个常见的 `URL` 根例子：

-   api.example.com/\*
-   example.com/api/\*

## 版本

所有的 `API` 必须保持向后兼容，你 `必须` 在引入新版本 `API` 的同时确保旧版本 `API` 仍然可用。所以 `应该` 为其提供版本支持。

1. 在 URL 中嵌入版本编号

    ```bash
    api.example.com/v1/*
    ```

2. 将版本号放在 `HTTP Header` 头中, 通过媒体类型来指定版本信息

```bash
Accept: application/vnd.example.com.v1+json
```

其中 `vnd` 表示 `Standards Tree` 标准树类型，有三个不同的树: `x`，`prs` 和 `vnd`。你使用的标准树需要取决于你开发的项目

-   未注册的树（`x`）主要表示本地和私有环境
-   私有树（`prs`）主要表示没有商业发布的项目
-   供应商树（`vnd`）主要表示公开发布的项目

后面几个参数依次为应用名称（一般为应用域名）、版本号、期望的返回格式。

## 端点

端点就是指向特定资源或资源集合的 `URL`。在端点的设计中，你 `必须` 遵守下列约定：

-   URL 的命名 `必须` 全部小写
-   URL 中资源（`resource`）的命名 `必须` 是名词，并且 `必须` 是复数形式
-   `必须` 优先使用 `Restful` 类型的 URL
-   URL `必须` 是易读的
-   URL `一定不可` 暴露服务器架构

> 至于 URL 是否必须使用连字符（`-`） 或下划线（`_`），不做硬性规定，但 `必须` 根据团队情况统一一种风格。

例如：

```bash
https://api.example.com/zoos
https://api.example.com/animals
https://api.example.com/zoos/{zoo}/animals
https://api.example.com/animal_types
https://api.example.com/employees
```

## HTTP 动词

对于资源的具体操作类型，由 `HTTP` 动词表示。常用的 `HTTP` 动词有下面五个（括号里是对应的 `SQL` 命令）。

-   GET（SELECT）：从服务器取出资源（一项或多项）。
-   POST（CREATE）：在服务器新建一个资源。
-   PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
-   PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
-   DELETE（DELETE）：从服务器删除资源。

## 筛选

> 如果记录数量很多，服务器不可能都将它们返回给用户。API `应该` 提供参数，过滤返回结果。下面是一些常见的参数。

-   ?limit=10：指定返回记录的数量
-   ?offset=10：指定返回记录的开始位置。
-   ?page=2&per_page=100：指定第几页，以及每页的记录数。
-   ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
-   ?animal_type_id=1：指定筛选条件

## 认证

`应该` 使用 `OAuth2.0` 的方式为 API 调用者提供登录认证。`必须` 先通过登录接口获取 `Access Token` 后再通过该 `token` 调用需要身份认证的 `API`。

Oauth 的端点设计示列

-   RFC 6749 /token
-   Twitter /oauth2/token
-   Fackbook /oauth/access_token
-   Google /o/oauth2/token
-   Github /login/oauth/access_token
-   Instagram /oauth/authorize

客户端在获得 `access token` 的同时 `必须` 在响应中包含一个名为 `expires_in` 的数据，它表示当前获得的 `token` 会在多少 `秒` 后失效。例如：

```json
{
    "access_token": "token....",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

客户端在请求需要认证的 `API` 时，`必须` 在请求头 `Authorization` 中带上 `access_token`。

```bash
Authorization: Bearer token...
```

当超过指定的秒数后，`access token` 就会过期，再次用过期/或无效的 `token` 访问时，服务端 `应该` 返回 `invalid_token` 的错误或 `401` 错误码。

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
    "error": "invalid_token"
}
```

## 响应

所有的 `API` 响应，`必须` 遵守 `HTTP` 设计规范，`必须` 选择合适的 `HTTP` 状态码。`一定不可` 所有接口都返回状态码为 `200` 的 `HTTP` 响应

下表列举了常见的 `HTTP` 状态码

| 状态码 | 描述                                                 |
| ------ | ---------------------------------------------------- |
| 1xx    | 代表请求已被接受，需要继续处理                       |
| 2xx    | 请求已成功，请求所希望的响应头或数据体将随此响应返回 |
| 3xx    | 重定向                                               |
| 4xx    | 客户端原因引起的错误                                 |
| 5xx    | 服务端原因引起的错误                                 |

必须强调的是，所有 `API` `一定不可` 返回 `1xx` 类型的状态码。当 `API` 发生错误时，`必须` 返回出错时的详细信息。目前常见返回错误信息的方法有两种：

1、将错误详细放入 `HTTP` 响应首部；

```bash
X-MYNAME-ERROR-CODE: 4001
X-MYNAME-ERROR-MESSAGE: Bad authentication token
X-MYNAME-ERROR-INFO: http://docs.example.com/api/v1/authentication
```

2、直接放入响应实体中；

```bash
HTTP/1.1 401 Unauthorized
Server: nginx/1.11.9
Content-Type: application/json
Transfer-Encoding: chunked
Cache-Control: no-cache, private
Date: Sun, 24 Jun 2018 10:02:59 GMT
Connection: keep-alive

{"error_code":40100,"message":"Unauthorized"}
```

> `error_code` 对应响应的业务错误码

3、`200` 状态码是最常见的 `HTTP` 状态码，在所有 **成功** 的 `GET` 请求中，`必须` 返回此状态码。`HTTP` 响应实体部分 `必须` 直接就是数据，不要做多余的包装。

```json
{
    "id": 1,
    "user": "Bob",
    "age": 18
}
```

如果有额外媒体信息：

```json
{
    "data": [
        {
            "id": 1,
            "user": "Bob",
            "age": 18
        }
    ],
    "meta": {
        "pagination": {
            "total": 101,
            "count": 2,
            "per_page": 2,
            "current_page": 1
        }
    }
}
```

http 状态码应当符合当前逻辑，切不可都返回 200
