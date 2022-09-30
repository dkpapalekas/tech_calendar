import { BFormSelect } from 'bootstrap-vue';
import API from '../API';

export default {
   data() {
      return {
         api: API(),
         jobs: [
            { text: 'Select job', value: undefined, disabled: true }
         ],
      };
   },

   props: [
      'value'
   ],

   async created() {
      this.jobs = (await this.api.Job.all()).map(x => ({
         value: x.id,
         text: `${x.address_name} ${x.customer_surname} ${x.appliance_name}`,
      }));
      this.jobs.push({ text: 'Select job', value: undefined, disabled: true });
   },

   render(h) {
      if (!this.jobs)
         return h(BFormSelect);
      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.jobs,
         },
         on: { input: x => this.$emit('input', x) },
      });
   }
};
