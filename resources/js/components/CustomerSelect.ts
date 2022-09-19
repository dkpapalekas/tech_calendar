import { BFormSelect } from 'bootstrap-vue';
import API from '../API';

export default {
   data() {
      return {
         api: API(),
         customers: [
            { text: 'Select Customer', value: undefined, disabled: true }
         ],
      };
   },

   props: [
      'value'
   ],

   async created() {
      this.customers = (await this.api.Customer.all()).map(x => ({
         value: x.id,
         text: `${x.name} ${x.surname}`,
      }));
      this.customers.push({ text: 'Select Customer', value: undefined, disabled: true });
   },

   render(h) {
      if (!this.customers)
         return h(BFormSelect);
      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.customers,
         },
         on: { input: x => this.$emit('input', x) },
      });
   }
};
