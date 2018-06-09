import axios from 'axios'
const base = '/api'
export default function () {
    const vm = this
    const api = {
        user: params => get(`${base}/user`, params), // 获取当前登入用户
        login: params => post(`${base}/user/login`, params), // 登入
        posts: params => get(`${base}/posts`, params), // 获取所有笔记
        postGet: params => get(`${base}/posts/${params.id}`, params), // 获取笔记
        postDel: params => del(`${base}/posts/${params.id}`, params), // 删除笔记
        postMod: params => put(`${base}/posts/${params.id}`, params), // 修改笔记
        postAdd: params => post(`${base}/posts`, params), // 增加笔记
    }

    function get(url, params) {
        return axios.get(url, {params}).then(middleware)
    }

    function post(...args) {
        return axios.post(...args).then(middleware)
    }

    function del(url, params) {
        return axios.delete(url, {params}).then(middleware)
    }
    
    function put(url, params) {
        return axios.put(url, params).then(middleware)
    }

    function middleware(res) {
        if (res.data.err) {
            vm.$message({
                showClose: true,
                message: res.data.err,
                type: 'error'
            })
        }
        return res.data
    }
    return api
}