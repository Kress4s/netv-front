import axios from 'axios'

axios.defaults.baseURL = "http://121.41.38.13:9090"

const baseURL = "http://121.41.38.13:9090"

const headerProtocol = "Bearer"

const service = axios.create({
    baseURL: baseURL, // 请求的接口
    timeout: 100000 // 请求超时时间
})

// 使用拦截器，定义全局请求头
service.interceptors.request.use(config => {
    // 在请求头中添加token
    config.headers.Authorization = headerProtocol + " " + window.sessionStorage.getItem("token")
    return config
})

service.interceptors.response.use(response => {
    return response
})

export default service