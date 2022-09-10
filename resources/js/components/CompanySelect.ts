import { BFormSelect } from 'bootstrap-vue'

import API from '../API';

export default {
   data() {
      return {
         api: API(localStorage.getItem('token')),
         companies: undefined,
      };
   },

   props: [
      'value',
   ],

   async created() {
      this.companies = await this.api.Company.all();
   },

   render(h) {
      if (!this.companies)
         return h(BFormSelect);
      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.companies,
            'value-field': 'id',
            'text-field': 'name',
         },

         on: {
            input: x => this.$emit('input', x)
         }
      })
   }
}
