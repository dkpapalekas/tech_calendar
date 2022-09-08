import { BCard, BNavItem } from 'bootstrap-vue'
import Navbar from './Navbar';

const header = 'Σύστημα Διαχείρισης Εργασιών'
const jobs = 'Εργασίες'

export default {
   components:{
      BCard,
      BNavItem,
   },
   data() {
      return {
            message:'Hello World'
      }
   },
   render(h) {
      console.log(h(BCard))
      return h('div', [
         h(Navbar),

         h(BCard, {
            'bg-variant': 'outline-primary',
            header: header,
            class: 'm-3 text-center',
         }, [
            h(BNavItem, null, [
               h('div', { class: 'menu-item' }, [
                  h('router-link', { props: { to: './jobs' }}, jobs)
               ])
            ])
         ])
      ])
   },
};
