import Card from '../components/Card';
import LabelForm from '../components/LabelForm';
import Warning from '../components/Warning';
import axios from 'axios';

const login = (h, fd, errors) =>
   h(LabelForm, {
      props: {
         for: 'email',
         label: 'Email',
      },
      scopedSlots: {
         default: () => [
            h('input', {
               domProps: { type: 'text', name: 'email' },
               class: 'form-control',
               value: fd.email,
               on: {
                  input: e => fd.email = e.target.value,
               },
            }),
            h(Warning, { props: { text: errors.email }})
         ]
      },
   });

const password = (h, fd, errors) =>
   h(LabelForm, {
      props: {
         for: 'password',
         label: 'Password',
      },
      scopedSlots: {
         default: () => [
            h('input', {
               domProps: { type: 'password', name: 'password' },
               class: 'form-control',
               value: fd.password,
               on: {
                  input: e => fd.password = e.target.value,
               },
            }),
            h(Warning, { props: { text: errors.password }})
         ]
      },
   });

const action = (h, onClick) =>
   h('div', { class: 'row' }, [
      h('div', { class: 'coll-md-6' }, [
         h('div', { class: 'form-group' }, [
            h('button', {
               class: 'btn btn-primary',
               on: {
                  click: onClick,
               }
            }, 'Login')
         ])
      ]),
      h('div', { class: 'col-md-6 text-right' }, [
         h('router-link', { props: { to: '/register' }}, 'Create New Account!'),
      ]),
   ]);

export default {
   render(h) {
      return h('div', {
         class: 'row justify-content-center',
      }, [
         h('div', {
            class: 'col-md-6',
         }, [
            h(Card, {
               scopedSlots: {
                  header: () => 'Login',
                  default: () => [
                     login(h, this.formData, this.errors),
                     password(h, this.formData, this.errors),
                     action(h, this.login),
                  ]
               }
            }),
         ]),
      ]);
   },

   data() {
      return {
         formData: {
            email: '',
            password: '',
            device_name: 'browser'
         },
         errors: {},
      };
   },

   methods: {
      login() {
         axios.post('api/v1/authenticate', this.formData).then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
            this.$router.push('/jobs');
         }).catch((errors) => {
            this.errors = errors.response.data.errors;
         });
      },
   },
};
