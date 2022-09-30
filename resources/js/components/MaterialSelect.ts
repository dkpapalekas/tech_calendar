import { BFormSelect } from 'bootstrap-vue';
import API from '../API';

export default {
   data() {
      return {
         api: API(),
         materials: [
            { text: 'Select material', value: undefined, disabled: true }
         ],
      };
   },

   props: [
      'value'
   ],

   async created() {
      this.materials = (await this.api.Material.all()).map(x => ({
         value: x.id,
         text: `${x.name} ${x.surname}`,
      }));
      this.materials.push({ text: 'Select material', value: undefined, disabled: true });
   },

   render(h) {
      if (!this.materials)
         return h(BFormSelect);
      return h(BFormSelect, {
         props: {
            value: this.value,
            options: this.materials,
         },
         on: { input: x => this.$emit('input', x) },
      });
   }
};
