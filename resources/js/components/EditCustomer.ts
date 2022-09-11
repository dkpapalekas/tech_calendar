import { BFormGroup, BFormInput } from 'bootstrap-vue';
import { Text } from 'ts-validate';
import CompanySelect from './CompanySelect';

const NonEmptyString = Text(1, Infinity);

const form_name = (h, self) => h(BFormGroup, {
   props: {
      label: 'Όνομα',
      'label-for': 'name-input',
      'invalid-feedback': 'Name is required',
      state: NonEmptyString(self.copy.name),
   },
   scopedSlots: {
      default: () => h(BFormInput, {
         id: 'name-input',
         props: {
            value: self.copy.name,
            state: NonEmptyString(self.copy.name),
            required: true,
         },
         on: {
            input: x => self.copy.name = x,
         },
      }),
   },
});

const form_surname = (h, self) => h(BFormGroup, {
   props: {
      label: 'Επώνυμο',
      'label-for': 'surname-input',
      'invalid-feedback': 'Surname is required',
      state: NonEmptyString(self.copy.surname),
   },
   scopedSlots: {
      default: () => h(BFormInput, {
         id: 'name-input',
         props: {
            value: self.copy.surname,
            state: NonEmptyString(self.copy.surname),
            required: true,
         },
         on: {
            input: x => self.copy.surname = x,
         },
      }),
   },
});

const form_company = (h, self) => h(BFormGroup, {
   props: {
      label: 'Εταιρεία',
      'label-for': 'company_id-input',
   },

   scopedSlots: {
      default: () => h(CompanySelect, {
         props: {
            value: self.copy.company_id,
         },

         on: {
            input: x => self.copy.company_id = x,
         },
      }),
   },
});

const form_tel = (h, self) => h(BFormGroup, {
   props: {
      label: 'Τηλέφωνο',
      'label-for': 'telephone-input',
      'invalid-feedback': 'Telephone is required',
      state: NonEmptyString(self.copy.telephone),
   },

   scopedSlots: {
      default: () => h(BFormInput, {
         id: 'telephone-input',
         props: {
            value: self.copy.telephone,
            state: NonEmptyString(self.copy.telephone),
         },
         on: {
            input: x => self.copy.telephone = x,
         }
      }),
   }
});

const form_remarks = (h, self) => h(BFormGroup, {
   props: {
      label: 'Σχόλια',
      'label-for': 'remarks-input',
      'invalid-feedback': 'remarks is required',
      state: NonEmptyString(self.copy.remarks),
   },
   scopedSlots: {
      default: () => h(BFormInput, {
         id: 'remarks-input',
         props: {
            value: self.copy.remarks,
            state: NonEmptyString(self.copy.remarks),
            required: true,
         },
         on: {
            input: x => self.copy.remarks = x,
         }
      }),
   },
});


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

   render(h) {
      return h('form', {
         ref: 'form',
         on: {
            'submit.stop.prevent': () => this.$emit('input', this.copy),
         },
      }, [
         form_name(h, this),
         form_surname(h, this),
         form_company(h, this),
         form_tel(h, this),
         form_remarks(h, this),
      ]);
   }
};
