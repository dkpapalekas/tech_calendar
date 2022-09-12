import { BFormSelect } from 'bootstrap-vue';

import API from '../API';

export default {
   data() {
      return {
         api: API(localStorage.getItem('token')!),
         addresses: [
            { text: 'Select Address', value: undefined, disabled: true },
         ],
      };
   },

   props: [
      'value',
   ],

   async created() {
      this.addresses = (await this.api.Address.all()).map(x => ({
         text: x.fullname,
         value: x.id
      }));
      this.addresses.push({ text: 'Select Address', value: undefined, disabled: true });
   },

   render(h) {
      if (!this.addresses)
         return h(BFormSelect);


      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.addresses,
         },
         on: { input: x => this.$emit('input', x) }
      });
   },
};
