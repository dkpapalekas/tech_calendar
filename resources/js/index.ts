// Vue & Vue-Router
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './views2/App';

Vue.use(VueRouter);

new Vue(App).$mount('#app');
// import App from './views2/App';
// new Vue(App).$mount('#app')
