FROM tautvydas/nodegit as shark-vue-build
ARG QINIU_ACCESS_KEY=test
ARG QINIU_SECRET_KEY=test
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
RUN node ./cdn.js
FROM nginx:1.15-alpine
COPY --from=shark-vue-build /usr/src/app/dist /usr/share/nginx/html
COPY --from=shark-vue-build /usr/src/app/mysite.template /etc/nginx/conf.d/mysite.template
EXPOSE 80
CMD envsubst '$NGINX_PROXY_URL' < /etc/nginx/conf.d/mysite.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'