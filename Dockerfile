FROM node:8-alpine as shark-vue-build
ARG QINIU_ACCESS_KEY
ARG QINIU_SECRET_KEY
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
RUN node ./cdn.js
FROM nginx:1.15-alpine
COPY --from=shark-vue-build /usr/src/app/dist/index.html /usr/share/nginx/html
COPY mysite.template /etc/nginx/conf.d/mysite.template
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD envsubst '$NGINX_PROXY_URL' < /etc/nginx/conf.d/mysite.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'