import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';
import CompanySelect from './CompanySelect';

const NonEmptyString = Text(1, Infinity);

export default {
   props: [ 'value' ],

   data() {
      return {
         copy: {
            name: this.value?.name || '',
            surname: this.value?.surname || '',
            company: this.value?.company || '',
            telephone: this.value?.telephone || '',
            remarks: this.value?.remarks || '',
         },
      };
   },

   watch: {
      value(x) {
         this.copy = {
            name: x?.name || '',
            surname: x?.surname || '',
            company: x?.company || '',
            telephone: x?.telephone || '',
            remarks: x?.remarks || '',
         };
      },
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
               label: 'Όνομα',
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
                  on: {
                     input: x => this.copy.name = x,
                  },
               }),
            },
         }),
         h(BFormGroup, {
            props: {
               label: 'Επώνυμο',
               'label-for': 'surname-input',
               'invalid-feedback': 'Surname is required',
               state: NonEmptyString(this.copy.surname),
            },
            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'name-input',
                  props: {
                     value: this.copy.surname,
                     state: NonEmptyString(this.copy.surname),
                     required: true,
                  },
                  on: {
                     input: x => this.copy.surname = x,
                  },
               }),
            },
         }),
         h(BFormGroup, {
            props: {
               label: 'Εταιρεία',
               'label-for': 'company_id-input',
            },

            scopedSlots: {
               default: () => h(CompanySelect, {
                  props: {
                     value: this.copy.company_id,
                  },

                  on: {
                     input: x => this.copy.company_id = x,
                  },
               }),
            },
         }),
         h(BFormGroup, {
            props: {
               label: 'Τηλέφωνο',
               'label-for': 'telephone-input',
               'invalid-feedback': 'Telephone is required',
               state: NonEmptyString(this.copy.telephone),
            },

            scopedSlots: {
               default: () => h(BFormInput, {
                  id: 'telephone-input',
                  props: {
                     value: this.copy.telephone,
                     state: NonEmptyString(this.copy.telephone),
                  },
                  on: {
                     input: x => this.copy.telephone = x,
                  }
               }),
            }
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
                  on: {
                     input: x => this.copy.remarks = x,
                  }
               }),
            },
         }),
      ]);
   }
};
