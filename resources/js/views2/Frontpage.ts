import { BCard, BNavItem } from 'bootstrap-vue';

const header = 'Σύστημα Διαχείρισης Εργασιών';
const jobs = 'Εργασίες';

export default {
   render(h) {
      console.log(h(BCard));
      return h('div', [
         h(BCard, {
            class: 'm-3 text-center',
            props: {
               'bg-variant': 'outline-primary',
               header: header,
            },
            scopedSlots: {
               default: () => h(BNavItem, {
                  scopedSlots: {
                     default: () => [
                        h('div', { class: 'menu-item' }, [
                           h('router-link', { props: { to: './jobs' }}, jobs)
                        ])
                     ],
                  },
               })
            },
         }),
      ]);
   },
};
