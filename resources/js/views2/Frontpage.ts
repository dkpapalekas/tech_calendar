import { BCard, BNavItem } from 'bootstrap-vue';

const header = 'Σύστημα Διαχείρισης Εργασιών';
const jobs = 'Εργασίες';

export default {
   render(h) {
      console.log(h(BCard));
      return h('div', [
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
      ]);
   },
};
