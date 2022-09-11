import axios from 'axios';
import {
   BCollapse,
   BDropdownItem,
   BNavbar, BNavbarBrand, BNavbarNav, BNavbarToggle, BNavItem, BNavItemDropdown,
} from 'bootstrap-vue';

const AppName = 'Fridgital';

const NavItems = {
   'Home': '/',
   'Εργασίες': '/jobs',
   'Πελάτες': '/customers',
   'Διευθύνσεις': '/addresses',
   'Ανάγκες Εργασιών': '/job_lines',
   'Γενικά Υλικά': '/materials',
   'Συσκευές': '/appliances',
   'Εταιρείες': '/companies',
};

export default {
   props: ['string'],

   data() {
      return {
         dropdown_visible: false,
      };
   },

   methods: {
      logout() {
         axios.post('api/v1/revoke').then(() => {
            localStorage.removeItem('token');
            this.$router.push('/');
         }).catch((errors) => {
            console.log(errors);
         });
      },
   },

   render(h) {
      return h('div', [
         h(BNavbar, {
            props: {
               toggleable: 'lg',
               type: 'light',
               variant: 'light',
            },
         }, [
            h(BNavbarBrand, { href: '#'}, AppName),
            h('router-link', { props: { to: '/login' }}, ['Log In']),
            h(BNavbarToggle, {
               props: { target: 'nav-collapse' },
               on: {
                  click: () => this.dropdown_visible = !this.dropdown_visible
               }
            }),
            h(BCollapse, { id: 'nav-collapse', props: {
               'is-nav': true,
               visible: this.dropdown_visible,
            }}, [
               h(BNavbarNav, Object.entries(NavItems).map(([name, route]) =>
                  h(BNavItem, [
                     h('div', { class: 'menu-item'}, [
                        h('router-link', { props: { to: route }}, name)
                     ])
                  ])
               )),

               h(BNavbarNav, { class: 'ml-auto' }, [
                  h(BNavItemDropdown, {
                     props: {right: true },
                     scopedSlots: {
                        'button-content': () => h('em', 'User')
                     },
                  }, [
                     h(BDropdownItem, [
                        h('router-link', { props: { to: '/login' }}, 'Log In'),
                     ]),
                     h(BDropdownItem, [
                        h('router-link', { props: { to: '/register' }}, 'Create New'),
                     ]),
                     h(BDropdownItem, [
                        h('button', {
                           class: 'btn btn-danger',
                           on: {
                              click: this.logout,
                           },
                        }, 'Log Out'),
                     ]),
                  ])
               ])
            ]),
         ]),
      ]);
   },
};
