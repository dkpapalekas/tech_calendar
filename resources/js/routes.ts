// My Vue Files
import { RouterMode } from 'vue-router';
import Frontpage from './views2/Frontpage'
import Login from './views2/Login'
import Register from './views2/Register'
// import Companies from './views/Companies.vue'
import Customers from './views2/Customers'
// import Addresses from './views/Addresses.vue'
// import Appliances from './views/Appliances.vue'
// import Jobs from './views/Jobs.vue'
// import Materials from './views/Materials.vue'
// import Job_Lines from './views/Job_Lines.vue'

export default {
   mode: 'history' as RouterMode,
   routes: [
      {
         path: '',
         component: Frontpage,
      },
      {
         path: '/login',
         component: Login,
      },
      {
         path: '/register',
         component: Register,
      },
     //   {
     //       path: '/companies',
     //       component: Companies,
     //   },
     //   {
     //       path: '/appliances',
     //       component: Appliances,
     //   },
      {
         path: '/customers',
         component: Customers,
      },
     //   {
     //       path: '/customers/:id',
     //       component: Customers,
     //   },
     //   {
     //       path: '/addresses',
     //       component: Addresses,
     //   },
     //   {
     //       path: '/addresses/:id',
     //       component: Addresses,
     //   },
     //   {
     //       path: '/jobs',
     //       component: Jobs,
     //   },
     //   {
     //       path: '/jobs/:id',
     //       component: Jobs,
     //   },
     //   {
     //       path: '/job_lines',
     //       component: Job_Lines,
     //   },
     //   {
     //       path: '/job_lines/:id',
     //       component: Job_Lines,
     //   },
     //   {
     //       path: '/materials',
     //       component: Materials,
     //   },
     //   {
     //       path: '/materials/:id',
     //       component: Materials,
     //   },
   ]
};
