# linux 安装 ImageMagick

```bash
# 安装软件
wget https://www.imagemagick.org/download/ImageMagick.tar.gz
tar -zxvf ImageMagick.tar.gz

cd ImageMagick-7.0.8-27
./configure --with-webp // 查看是否支持需要的格式
make && make install

convert -list format

```

```bash
# 安装扩展
# 如果 imagemagick 有改动就重装一下
pecl install imagick

# 写入 imagemagick 安装路径
/usr/local/lib/ImageMagick-版本
```

```bash
# 还要格式支持需要的库
./configure --enable-shared --enable-lzw --without-perl --with-modules


libwebp
libjpeg-turbo
libpng

libjpeg-dev/stable,now 1:1.5.2-2 all [installed]
libjpeg62-turbo/stable,now 1:1.5.2-2+b1 amd64 [installed,automatic]
libjpeg62-turbo-dev/stable,now 1:1.5.2-2+b1 amd64 [installed,automatic]

libpng-dev/stable,now 1.6.36-6 amd64 [installed]
libpng16-16/stable,now 1.6.36-6 amd64 [installed,automatic]

libwebp-dev
libwebp6/stable,now 0.6.1-2 amd64 [installed,automatic]
libwebpmux3/stable,now 0.6.1-2 amd64 [installed,automatic]

libtiff-dev/stable,now 4.0.10-4 amd64 [installed,automatic]
libtiff5/stable,now 4.0.10-4 amd64 [installed,automatic]
libtiffxx5/stable,now 4.0.10-4 amd64 [installed,automatic]

```

```bash
# 解决 convert 执行时找不到文件
ldconfig /usr/local/lib
```

## 使用 yum

``` bash
libwebp
libwebp-devel

```
