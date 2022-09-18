import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [ 'value' ],

   data() {
      return {
         copy: {
            name: this.value?.name || '',
            remarks: this.value?.remarks || '',
         }
      };
   },

   watch: {
      value(x) {
         this.copy = {
            name: x?.name || '',
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
               label: 'Σχόλια',
               'label-for': 'remarks-input',
               'invalid-feedback': 'remarks is required',
               //state: NonEmptyString(this.copy.remarks),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'remarks-input',
                  props: {
                     value: this.copy.remarks,
                     //state: NonEmptyString(this.copy.remarks),
                     required: true,
                  },
                  on: { input: x => this.copy.remarks = x }
               }),
            },
         }),
      ]);
   }
};
