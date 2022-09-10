import Card from '../components/Card';
import LabelForm from '../components/LabelForm';
import Warning from '../components/Warning';
import axios from 'axios';

const name_form = (h, fd, errors) =>
   h(LabelForm, {
      props: { for: 'name', label: 'Name'},
      scopedSlots: { default: () => [
         h('input', {
            domProps: {
               name: 'name',
               type: 'text',
            },
            class: 'form-control',
            value: fd.name,
            on: {
               input: (e) => fd.name = e.target.value,
            },
         }),
         h(Warning, { props: { text: errors.name }}),
      ] }
   });

const email_form = (h, fd, errors) =>
   h(LabelForm, {
      props: { for: 'email', label: 'Email'},
      scopedSlots: { default: () => [
         h('input', {
            domProps: {
               name: 'email',
               type: 'text',
            },
            class: 'form-control',
            value: fd.email,
            on: {
               input: (e) => fd.email = e.target.value
            },
         }),
         h(Warning, { props: { text: errors.email }}),
      ] }
   });

const password_form = (h, fd, errors) =>
   h(LabelForm, {
      props: { for: 'password', label: 'Password'},
      scopedSlots: { default: () => [
         h('input', {
            domProps: {
               name: 'password',
               type: 'password',
            },
            class: 'form-control',
            value: fd.password,
            on: {
               input: (e) => fd.password = e.target.value
            },
         }),
         h(Warning, { props: { text: errors.password }}),
      ] }
   });

const confirm_password_form = (h, fd, errors) =>
   h(LabelForm, {
      props: { for: 'password_confirmation', label: 'Confirm Password'},
      scopedSlots: { default: () => [
         h('input', {
            domProps: {
               name: 'password_confirmation',
               type: 'password',
            },
            class: 'form-control',
            value: fd.password_confirmation,
            on: {
               input: (e) => fd.password_confirmation = e.target.value,
            },
         }),
         h(Warning, { props: { text: errors.password_confirmation }}),
      ] }
   });

const action = (h, onClick) =>
   h('div', { class: 'row '}, [
      h('div', { class: 'col-md-6 '}, [
         h('div', { class: 'form-group' }, [
            h('button', {
               on: {
                  click: onClick,
               },
               class: 'btn btn-primary',
            }, 'Register'),
         ]),
      ]),
      h('div', { class: 'col-md-6 text-right' }, [
         h('router-link', { props: { to: '/login' }}, 'Already have an account!'),
      ]),
   ]);

export default {
   render(h) {
      return h('div',  {
         class: 'row justify-content-center'
      }, [
         h(Card, {
            scopedSlots: {
               header: () => 'Register' ,
               default: () => [
                  name_form(h, this.formData, this.errors),
                  email_form(h, this.formData, this.errors),
                  password_form(h, this.formData, this.errors),
                  confirm_password_form(h, this.formData, this.errors),
                  action(h, this.registerUser),
               ]
            }
         })
      ]);
   },

   data() {
      return {
         formData: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
         },

         errors: {
            name: undefined,
            email: undefined,
            password: undefined,
            password_confirmation: undefined,
         }
      };
  },

  methods: {
      registerUser(){
         axios.post('api/v1/register', this.formData).then((response) => {
            console.log(response.data)
            this.formData.name = this.formData.email = this.formData.password = this.formData.password_confirmation = ''
            this.errors = {}
            this.$router.push('/login')
            this.$toaster.success('Account created successfully, now you can login!')
         }).catch((errors) => {
            this.errors = errors.response.data.errors
            console.error(errors.response.data.errors)
         });
      }
  },
}
