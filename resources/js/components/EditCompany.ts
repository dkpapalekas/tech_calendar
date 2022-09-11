import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [ 'value' ],

   data() {
      return {
         copy: {
            name: this.value?.name || '',
            address: this.value?.address || '',
            city: this.value?.city || '',
            profession: this.value?.profession || '',
            irs: this.value?.irs || '',
         }
      };
   },

   watch: {
      value(x) {
         this.copy = {
            name: x?.name || '',
            address: x?.address || '',
            city: x?.city || '',
            profession: x?.profession || '',
            irs: x?.irs || '',
         };
      }
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
               label: 'Διεύθυνση',
               'label-for': 'address-input',
               'invalid-feedback': 'address is required',
               state: NonEmptyString(this.copy.address),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'address-input',
                  props: {
                     value: this.copy.address,
                     state: NonEmptyString(this.copy.address),
                     required: true,
                  },
                  on: { input: x => this.copy.address = x }
               }),
            },
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
                     required: true,
                  },
                  on: { input: x => this.copy.city = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Εξειδίκευση',
               'label-for': 'profession-input',
               'invalid-feedback': 'profession is required',
               state: NonEmptyString(this.copy.profession),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'profession-input',
                  props: {
                     value: this.copy.profession,
                     state: NonEmptyString(this.copy.profession),
                     required: true,
                  },
                  on: { input: x => this.copy.profession = x }
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'ΔΟΥ',
               'label-for': 'irs-input',
               'invalid-feedback': 'irs is required',
               state: NonEmptyString(this.copy.irs),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'irs-input',
                  props: {
                     value: this.copy.irs,
                     state: NonEmptyString(this.copy.irs),
                     required: true,
                  },
                  on: { input: x => this.copy.name = x }
               }),
            },
         }),
      ]);
   }
};
