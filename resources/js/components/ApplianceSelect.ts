import { BFormSelect } from 'bootstrap-vue';

import API from '../API';

export default {
   data() {
      return {
         api: API(),
         appliances: [
            { text: 'Select Appliance', value: undefined, disabled: true }
         ],
      };
   },

   props: [
      'value',
   ],

   async created() {
      this.appliances = (await this.api.Appliance.all()).map(x => ({
         text: x.name,
         value: x.id
      }));
      this.appliances.push({ text: 'Select Appliance', value: undefined, disabled: true });
      console.log(this.appliances);
   },

   render(h) {
      if (!this.appliances)
         return h(BFormSelect);

      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.appliances,
         },
         on: { input: x => this.$emit('input', x) }
      });
   },
};
