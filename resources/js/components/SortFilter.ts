import { BFormGroup, BFormSelect, BInputGroup } from 'bootstrap-vue';
import { vif1 } from '../util';

export default {
   props: [
      'value',
      'options',
      'direction',
   ],

   render(h) {
      return h(BFormGroup, {
         props: {
            label: 'Ταξινόμηση',
            'label-for': 'sort-by-select',
            'label-cols-sm': 3,
            'label-align-sm': 'right',
            'label-size': 'sm',
         },
         class: 'mb-0',
         scopedSlots: {
            default: () => h(BInputGroup, {
               props: { size: 'sm' },
               scopedSlots: {
                  default: () => [
                     h(BFormSelect, {
                        props: {
                           options: this.options,
                           value: this.value,
                        },
                        on: { input: x => this.$emit('input', x) },
                        class: 'w-75',
                     }),
                     vif1(this.direction !== undefined)(() => h(BFormSelect, {
                        class: 'w-25',
                        props: {
                           size: 'sm',
                           options: [
                              { text: 'Asc', value: 'asc' },
                              { text: 'Desc', value: 'desc' },
                           ],
                           value: this.direction
                        },
                        on: { input: x => this.$emit('update:direction', x) },
                     })),
                  ]
               },
            })
         },
      });
   },
};
