import Vue from 'vue'
import App from './App.vue'
import router from './route'
import '../src/assets/global.css'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://"


Vue.use(VueAxios, axios)
// 全局挂载
Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
