import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [ 'value' ],

   data() {
      return {
         copy: {
            name: this.value?.name || '',
            brand: this.value?.brand || '',
            model: this.value?.model || '',
            year: this.value?.year || '',
            remarks: this.value?.remarks || '',
         }
      };
   },

   watch: {
      value(x) {
         this.copy = {
            name: x?.name || '',
            brand: x?.brand || '',
            model: x?.model || '',
            year: x?.year || '',
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
      return h('form', {
         ref: 'form',
         on: {
            'submit.stop.prevent': () => this.$emit('input', this.copy),
         },
      }, [
         h(BFormGroup, {
            props: {
               label: 'Ονομασία',
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
                     required: true,
                  },
                  on: { input: x => this.copy.name = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Μάρκα',
               'label-for': 'brand-input',
               'invalid-feedback': 'brand is required',
               state: NonEmptyString(this.copy.brand),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'brand-input',
                  props: {
                     value: this.copy.brand,
                     state: NonEmptyString(this.copy.brand),
                     required: true,
                  },
                  on: { input: x => this.copy.brand = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Μοντέλο',
               'label-for': 'model-input',
               'invalid-feedback': 'model is required',
               state: NonEmptyString(this.copy.model),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'model-input',
                  props: {
                     value: this.copy.model,
                     state: NonEmptyString(this.copy.model),
                     required: true,
                  },
                  on: { input: x => this.copy.model = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Χρονολογία',
               'label-for': 'year-input',
               'invalid-feedback': 'year is required',
               state: NonEmptyString(this.copy.year),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'year-input',
                  props: {
                     value: this.copy.year,
                     state: NonEmptyString(this.copy.year),
                     required: true,
                  },
                  on: { input: x => this.copy.year = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Σχόλια',
               'label-for': 'remarks-input',
               'invalid-feedback': 'remarks is required',
               state: NonEmptyString(this.copy.remarks),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'remarks-input',
                  props: {
                     value: this.copy.remarks,
                     state: NonEmptyString(this.copy.remarks),
                     required: true,
                  },
                  on: { input: x => this.copy.remarks = x }
               }),
            },
         }),
      ]);
   }
};
