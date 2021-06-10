import axios from 'axios'

const instance = axios.create({
    baseURL: "https://burger-builder-d34c6.firebaseio.com/"
})

export default instance;