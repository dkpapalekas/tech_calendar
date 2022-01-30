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

let router = new VueRouter({
    mode: 'history',
    base:'/',
    routes: [
        {
            path: '/',
            component: App,
        }
    ]
});

export default router

const app = new Vue({
    router
}).$mount('#app');