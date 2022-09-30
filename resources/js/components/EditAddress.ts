import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';
import { into } from 'fpts/object';
import CustomerSelect from './CustomerSelect';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [
      'value',
   ],

   data() {
      return {
         copy: {
            name: this.value?.name || '',
            number: this.value?.number || '',
            customer_id: this.value?.customer_id || '',
            city: this.value?.city || '',
            floor: this.value?.floor || '',
            remarks: this.value?.remarks || '',
         }
      };
   },

   watch: {
      value(x) {
         this.copy = {
            name: x?.name || '',
            number: x?.number || '',
            customer_id: x?.customer_id || '',
            city: x?.city || '',
            floor: x?.floor || '',
            remarks: x?.remarks || '',
         };
      }
   },

   methods: {
      submit() {
         this.$emit('input', this.copy);
      },
   },

   render(h) {
      const copy = into(this.copy);
      return h('form', {
         ref: 'form',
         on: {
            'submit.stop.prevent': () => this.$emit('input', this.copy)
         }
      }, [
         h(BFormGroup, {
            props: {
               label: 'Πελάτης',
               'label-for': 'customer_id-input',
               'invalid-feedback': 'Name is required',
            },
            scopedSlots: {
               default: () => h(CustomerSelect, {
                  id: 'customer_id-input',
                  props: { value: this.copy.customer_id },
                  on: { input: copy('customer_id') }
               })
            }
         }),
         
         h(BFormGroup, {
            props: {
               label: 'Οδός',
               'label-for': 'name-input',
               'invalid-feedback': 'Name is required',
               state: NonEmptyString(this.copy.name),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'name-input',
                  props: {
                     value: this.copy.name,
                     state: NonEmptyString(this.copy.name),
                  },
                  on: { input: copy('name') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Αριθμός',
               'label-for': 'number-input',
               'invalid-feedback': 'number is required',
               state: NonEmptyString(this.copy.number),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'name-input',
                  props: {
                     value: this.copy.number,
                     state: NonEmptyString(this.copy.number),
                  },
                  on: { input: copy('number') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Πόλη',
               'label-for': 'city-input',
               'invalid-feedback': 'city is required',
               state: NonEmptyString(this.copy.city),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'city-input',
                  props: {
                     value: this.copy.city,
                     state: NonEmptyString(this.copy.city),
                  },
                  on: { input: copy('city') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Όροφος',
               'label-for': 'floor-input',
               'invalid-feedback': 'floor is required',
               state: NonEmptyString(this.copy.floor),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'floor-input',
                  props: {
                     value: this.copy.floor,
                     state: NonEmptyString(this.copy.floor),
                  },
                  on: { input: copy('floor') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'remarks',
               'label-for': 'remarks-input',
               'invalid-feedback': 'remarks is required',
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'name-input',
                  props: {
                     value: this.copy.remarks,
                  },
                  on: { input: copy('remarks') }
               })
            }
         }),
      ]);
   }
};
