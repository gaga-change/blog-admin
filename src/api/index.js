import axios from 'axios'
export default function () {
    
    const api = {
        user: () => axios.get('/api/user')
    }

    return api
}