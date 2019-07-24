FROM php:7.3-fpm
# 装几个php扩展
RUN docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install pdo