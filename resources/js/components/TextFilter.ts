import { BFormGroup, BFormInput, BInputGroup } from "bootstrap-vue"

export default {
   props: ['value'],

   render(h) {
      return h(BFormGroup, {
         class: 'mb-0',
         props: {
            label: 'Φίλτρο',
            'label-for': 'filter-input',
            'label-cols-sm': 3,
            'label-align-sm': 'right',
            'label-size': 'sm',
         },
         scopedSlots: {
            default: () => h(BInputGroup, {
               class: 'filter-class',
               props: { size: 'sm' },
               scopedSlots: {
                  default: () => h(BFormInput, {
                     props: {
                        type: 'search',
                        placeholder: 'Type to Search',
                     },
                     id: 'filter-input',
                     value: this.value,
                     on: { input: x => this.$emit('input', x) },
                  })
               }
            })
         }
      });
   }
}
