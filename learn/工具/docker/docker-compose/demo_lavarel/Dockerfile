FROM php:7.3-fpm
# 镜像里的php没有扩展
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd bcmath zip opcache iconv mcrypt pdo pdo_mysql mysqli
EXPOSE 9000