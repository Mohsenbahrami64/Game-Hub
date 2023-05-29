import axios from 'axios'



export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'd3490221140b41fe8f8bf3ae6f0de691'
    }
})