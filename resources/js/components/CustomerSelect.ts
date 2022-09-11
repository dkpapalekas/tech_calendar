import { BFormSelect } from 'bootstrap-vue';
import API from '../API';

export default {
   data() {
      return {
         api: API(localStorage.getItem('token')!),
         customers: undefined,
      }
   },

   props: [
      'value'
   ],

   async created() {
      this.customers = await this.api.Customer.all();
   },

   render(h) {
      if (!this.customers)
         return h(BFormSelect);
      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.customers.map(x => ({
               value: x.id,
               text: `${x.name} ${x.surname}`,
            })),
         },
         on: { input: x => this.$emit('input', x) },
      });
   }
}
