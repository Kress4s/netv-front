import Vue from 'vue'
import App from './App.vue'
import router from './route'
import '../src/assets/global.css'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
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


// 全局挂载
Vue.prototype.$http = service



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
