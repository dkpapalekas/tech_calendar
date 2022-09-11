import VueRouter from 'vue-router';
import routes from '../routes';
import Navbar from '../components/Navbar';

export default {
   router: new VueRouter(routes),
   render: (h) => h('div', [
      h(Navbar),
      h('router-view', { key: '$route.path' }),
   ]),
};
