import axios from 'axios'
const base = '/api'
export default function () {
    const vm = this
    const api = {
        user: params => get(`${base}/user`, params), // 获取当前登入用户
        login: params => post(`${base}/user/login`, params), // 登入
        posts: params => get(`${base}/posts`, params), // 登入
        getPost: params => get(`${base}/post`, params), // 登入

    }

    function get(url, params) {
        return axios.get(url, {params}).then(middleware)
    }

    function post(...args) {
        return axios.post(...args).then(middleware)
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