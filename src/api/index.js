import axios from 'axios'
export default function () {
    
    const api = {
        user: () => get('/api/user')
    }


    function get(...args) {
        return axios.get(...args).then(middleware)
    }

    function middleware(res) {
        return res.data
    }
    return api
}