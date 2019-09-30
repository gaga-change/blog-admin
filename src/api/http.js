import axios from "axios";
import { Notification, Message } from "element-ui";

let newAxios = axios.create({
  timeout: 15000 // 请求超时时间
});

// 响应拦截器
newAxios.interceptors.response.use(
  function(response) {
    let data = response.data;
    return data;
  },
  function(error) {
    let data = error.response.data;
    let message = data.message || data.errorMsg || "";
    if (error.message === "timeout of 1500ms exceeded") {
      Notification({
        title: "错误信息",
        message: "请求超时，请稍后再试！",
        type: "error",
        duration: 5000
      });
    } else if (data.login) {
      location.href = "/admin/login";
    } else {
      Message({
        type: "error",
        message: message || "系统异常",
        duration: 3000
      });
    }
  }
);

const http = {
  get(...params) {
    return newAxios
      .get(...params)
      .then(res => res)
      .catch(() => null);
  },
  post(...params) {
    return newAxios
      .post(...params)
      .then(res => res)
      .catch(() => null);
  },
  delete(...params) {
    return newAxios
      .delete(...params)
      .then(res => res)
      .catch(() => null);
  },
  put(...params) {
    return newAxios
      .put(...params)
      .then(res => res)
      .catch(() => null);
  }
};

export default http;
