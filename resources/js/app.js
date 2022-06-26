// Vue & Vue-Router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// My Vue Files
import App from './views/App.vue'
import Test from './views/Test.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Companies from './views/Companies.vue'
import Customers from './views/Customers.vue'


let router = new VueRouter({
    mode: 'history',
    base:'/',
    routes: [
        {
            path: '/',
            component: App,
        },
        {
            path: '/test',
            component: Test,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/companies',
            component: Companies,
        },
        {
            path: '/customers',
            component: Customers,
        },
    ]
});

export default router

const app = new Vue({
    router
}).$mount('#app');