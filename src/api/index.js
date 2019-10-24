import http from "./http";

export const authCurrent = params => http.get("/api/auth/current", { params });
export const authLogin = params => http.post("/api/auth/login", params);
export const authLogout = params => http.get("/api/auth/logout", params);
/** 获取用户总数 */
export const usersTotal = params => http.get("/api/users/total", { params });
/** 标签 */
export const tagsList = params => http.get("/api/tags", { params });
export const tagsCreate = params => http.post("/api/tags", params);
export const tagsShow = id => http.get(`/api/tags/${id}`);
export const tagsDestroy = id => http.delete(`/api/tags/${id}`);
export const tagsUpdate = (params, id) => http.put(`/api/tags/${id}`, params);
/** 分类 */
export const categoriesList = params => http.get("/api/categories", { params });
export const categoriesCreate = params => http.post("/api/categories", params);
export const categoriesShow = id => http.get(`/api/categories/${id}`);
export const categoriesDestroy = id => http.delete(`/api/categories/${id}`);
export const categoriesUpdate = (params, id) =>
  http.put(`/api/categories/${id}`, params);
/** 主内容 */
export const postsList = params => http.get("/api/posts", { params });
export const postsCreate = params => http.post("/api/posts", params);
export const postsShow = id => http.get(`/api/posts/${id}`);
export const postsDestroy = id => http.delete(`/api/posts/${id}`);
export const postsUpdate = (params, id) => http.put(`/api/posts/${id}`, params);
/** 站点设置 */
export const webSetsList = params => http.get("/api/webSets", { params });
export const webSetsCreate = params => http.post("/api/webSets", params);
export const webSetsShow = id => http.get(`/api/webSets/${id}`);
export const webSetsDestroy = id => http.delete(`/api/webSets/${id}`);
export const webSetsUpdate = (params, id) =>
  http.put(`/api/webSets/${id}`, params);

/** 导航栏 */
export const pageMenusList = params => http.get("/api/pageMenus", { params });
export const pageMenusCreate = params => http.post("/api/pageMenus", params);
export const pageMenusShow = id => http.get(`/api/pageMenus/${id}`);
export const pageMenusDestroy = id => http.delete(`/api/pageMenus/${id}`);
export const pageMenusUpdate = (params, id) =>
  http.put(`/api/pageMenus/${id}`, params);
