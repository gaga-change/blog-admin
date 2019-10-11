import http from "./http";
import axios from "axios";
const base = "/api";

export const authCurrent = params => http.get("/api/auth/current", { params });
export const authLogin = params => http.post("/api/auth/login", params);
export const authLogout = params => http.get("/api/auth/logout", params);
/** 获取用户总数 */
export const usersTotal = params => http.get("/api/users/total", { params });
/** 标签 */
export const tagsList = params => http.get("/api/tags", { params });
export const tagsCreate = params => http.post("/api/tags", params);
export const tagsShow = (params, id) => http.get(`/api/tags/${id}`, { params });
export const tagsDestroy = id => http.delete(`/api/tags/${id}`);
export const tagsUpdate = (params, id) => http.put(`/api/tags/${id}`, params);
/** 分类 */
export const categoriesList = params => http.get("/api/categories", { params });
export const categoriesCreate = params => http.post("/api/categories", params);
export const categoriesShow = (params, id) =>
  http.get(`/api/categories/${id}`, { params });
export const categoriesDestroy = id => http.delete(`/api/categories/${id}`);
export const categoriesUpdate = (params, id) =>
  http.put(`/api/categories/${id}`, params);
/** 主内容 */
export const postsList = params => http.get("/api/posts", { params });
export const postsCreate = params => http.post("/api/posts", params);
export const postsShow = (params, id) =>
  http.get(`/api/posts/${id}`, { params });
export const postsDestroy = id => http.delete(`/api/posts/${id}`);
export const postsUpdate = (params, id) => http.put(`/api/posts/${id}`, params);

export default function() {
  const vm = this;
  const api = {
    user: params => get(`${base}/user`, params), // 获取当前登入用户
    posts: params => get(`${base}/posts`, params), // 获取所有笔记
    postGet: params => get(`${base}/posts/${params.id}`, params), // 获取笔记
    postDel: params => del(`${base}/posts/${params.id}`, params), // 删除笔记
    postMod: params => put(`${base}/posts/${params.id}`, params), // 修改笔记
    postAdd: params => post(`${base}/posts`, params), // 增加笔记
    getSite: params => get(`${base}/site`, params), // 获取站点信息
    setSite: params => post(`${base}/site`, params) // 配置站点信息
  };

  function get(url, params) {
    return axios.get(url, { params }).then(middleware);
  }

  function post(...args) {
    return axios.post(...args).then(middleware);
  }

  function del(url, params) {
    return axios.delete(url, { params }).then(middleware);
  }

  function put(url, params) {
    return axios.put(url, params).then(middleware);
  }

  function middleware(res) {
    if (res.data.err) {
      vm.$message({
        showClose: true,
        message: res.data.err,
        type: "error"
      });
    }
    if (res.data.login) {
      location.href = "/admin/login";
    }
    return res.data;
  }
  return api;
}
