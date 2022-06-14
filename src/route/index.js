import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import whileList from "../views/witheList/white.vue"

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: 'home/welcome',
        children: [
            // 首页
            { path: 'welcome', component: Welcome },
            // 白名单
            { path: 'whileList', component: whileList },
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
// 配合后端的token做接口的权限验证
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    // 其他接口需要获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
        // 清除token
        window.sessionStorage.removeItem('token')
        return next('/login')
    }
    next()
})

export default router