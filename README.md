# 博客系统后台管理页面（Vue）

博客系统后台：当前仓库

## 主要依赖

``` json
{
    "axios": "^0.18.0",
    "element-ui": "^2.4.0",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
}
```

## 运行&打包

``` bash
# install dependencies 下载依赖
npm install

# serve with hot reload at localhost:8080 运行开发环境
npm run serve

# build for production with minification 打包
npm run build

# 自动格式化代码
npm run lint --fix

```
## 部署时nginx 配置（大致）

> router采用的是`history`模式，所以在nginx下需要进行相关配置。

``` nginx
server {
    listen 80;
    server_name www.yanjd.top;
    location /admin {
        alias /var/www/html;
        try_files $uri $uri/ /admin/index.html;
    }
    location / {
        proxy_pass http://blog.api.junn.top;
    }
}
```
