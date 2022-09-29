import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';
import { into } from 'fpts/object';
import JobSelect from './JobSelect';
import MaterialSelect from './MaterialSelect';
import Material_stateSelect from './Material_stateSelect';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [
      'value',
   ],

   data() {
      return {
         copy: {
            job_id: this.value?.job_id || '',
            material_id: this.value?.material_id || '',
            quantity: this.value?.quantity || '',
            price: this.value?.price || '',
            status: this.value?.status || '',
            remarks: this.value?.remarks || '',
         }
      };
   },

   watch: {
      value(x) {
         this.copy = {
            job_id: x?.job_id || '',
            material_id: x?.material_id || '',
            quantity: x?.quantity || '',
            price: x?.price || '',
            status: x?.status || '',
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
               label: 'Εργασία',
               'label-for': 'job_id-input',
               'invalid-feedback': 'required',
            },
            scopedSlots: {
               default: () => h(JobSelect, {
                  id: 'job_id-input',
                  props: { value: this.copy.job_id },
                  on: { input: copy('job_id') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Υλικό',
               'label-for': 'material_id-input',
               'invalid-feedback': 'required',
            },
            scopedSlots: {
               default: () => h(MaterialSelect, {
                  id: 'material_id-input',
                  props: { value: this.copy.material_id },
                  on: { input: copy('material_id') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Ποσότητα',
               'label-for': 'quantity-input',
               'invalid-feedback': 'quantity is required',
               state: NonEmptyString(this.copy.quantity),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'quantity-input',
                  props: {
                     value: this.copy.quantity,
                     state: NonEmptyString(this.copy.quantity),
                  },
                  on: { input: copy('quantity') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Τιμή',
               'label-for': 'price-input',
               'invalid-feedback': 'price is required',
               state: NonEmptyString(this.copy.price),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'price-input',
                  props: {
                     value: this.copy.price,
                     state: NonEmptyString(this.copy.price),
                  },
                  on: { input: copy('price') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Διαθεσιμότητα',
               'label-for': 'status-input',
               'invalid-feedback': 'required',
            },
            scopedSlots: {
               default: () => h(MaterialSelect, {
                  id: 'status-input',
                  props: { value: this.copy.status },
                  on: { input: copy('status') }
               })
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'remarks',
               'label-for': 'remarks-input',
               'invalid-feedback': 'remarks is required',
               state: NonEmptyString(this.copy.remarks),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'name-input',
                  props: {
                     value: this.copy.remarks,
                     state: NonEmptyString(this.copy.remarks),
                  },
                  on: { input: copy('remarks') }
               })
            }
         }),
      ]);
   }
};
