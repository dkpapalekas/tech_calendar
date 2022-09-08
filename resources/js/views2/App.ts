import VueRouter from 'vue-router';
import routes from '../routes';

export default {
   router: new VueRouter(routes),
   render: (h) => h('router-view', { key: "$route.path" })
}
