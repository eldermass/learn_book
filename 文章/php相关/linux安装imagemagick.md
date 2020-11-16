# 安装 Imagemagick 和 php imagick

1. 安装 imagemagick 软件

   ```bash
   # 获取源码包
   wget https://www.imagemagick.org/download/ImageMagick.tar.gz

   # 解压源码包
   tar -zxvf ImageMagick.tar.gz
   cd ImageMagick-7.0.8-27

   # 安装配置，这里可以看到支持的格式，和配置的内容
   ./configure
   # 指定安装目录，可以不指定 默认是 /usr/local/lib/ImageMagick-7.0.9
   --prefix=/usr/local/ImageMagick

   make && make install

   # 安装成功后，检查
   convert -list format
   ```

2. 重新配置 imagick 扩展指向 imagemagick 软件

   (1). 通过 pecl 安装

   ```bash
   # 安装
   pecl install imagick

   # 写入 imagemagick 安装路径， 在安装时配置，默认是以下路径
   /usr/local/lib/ImageMagick-7.0.9

   ```

   (2). 通过源码包安装

   ```bash
   # 在 http://pecl.php.net 网站可搜到源码包下载连接
   wget http://pecl.php.net/get/imagick-3.4.4.tgz

   # 解压
   tar -zxvf imagick-3.4.4.tar.gz
   cd imagick-3.4.4

   # 指定 php-config 路径一般在 /usr/local/php/bin/ 目录，和 imagemagick 的路径
   ./configure --with-php-config=/usr/local/php/bin/php-config --with-imagick=/usr/local/lib/ImageMagick-7.0.9

   # 调用phpize程序生成编译配置文件
   /usr/local/php/bin/phpize

   make && make install

   # 移入 生成的 .so 文件 到 php 扩展路径， php-config 里可查到
   cp modules/imagick.so /usr/local/php/lib/php/extensions/no-debug-zts-20170718/

   # 打开扩展
   /usr/local/php/etc/php.ini 里 打开 extension=imagick

   ```

3. 重启 php-fpm

   ```bash
   ps -aux 找到 php-fpm 的 master 进程
   kill -USR2 pid 杀掉后就能重启
   ```

4. 检测

   ```bash
   # 使用 convert -list format 查看是否支持 常见图片格式
   # php -m 查看扩展是否安装成功

   # 尝试转换图片
   convert arrow.jpg arrow.webp
   ```

5. 在安装 imagemagick 时，./configure 后发现缺少支持格式，可能需要的库大概有以下

   ```bash
   # 可能缺少的 libwebp, 使用 yum 安装
   yum install libwebp-devel


   # 以下库通过 yum 或 apt 装过 imagemagick 都应该已经装过
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
