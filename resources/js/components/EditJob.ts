import { BFormGroup, BFormSelect } from 'bootstrap-vue';
import AddressSelect from './AddressSelect';
import ApplianceSelect from './ApplianceSelect';

export default {
   props: [
      'value',
   ],

   data() {
      return {
         copy: {
            address_id: this.value?.address_id || undefined,
            appliance_id: this.value?.appliance_id || undefined,
            client_status: this.value?.client_status || 'pending',
            date: this.value?.date || new Date(),
            agreed_price: this.value?.agreed_price || 0,
            is_completed: this.value?.is_completed || 0,
         },

         client_statuses: [
            { value: 'pending', text: 'Αναμονή Πελάτη' },
            { value: 'OK', text: 'Συμφωνία Πελάτη' },
         ],

         job_statuses: [
            { value: 0, text: 'Εκρεμμεί' },
            { value: 1, text: 'Ολοκληρωμένη' },
         ],
      };
   },

   watch: {
      copy(x) {
         this.copy = {
            address_id: x?.address_id || undefined,
            appliance_id: x?.appliance_id || undefined,
            client_status: x?.client_status || 'pending',
            date: x?.date || new Date(),
            agreed_price: x?.agreed_price || 0,
            is_completed: x?.is_completed || 0,
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
         on: {
            'submit.stop.prevent': () => this.$emit('input', this.copy),
         },
      }, [
         h(BFormGroup, {
            props: {
               label: 'Διεύθυνση',
               'label-for': 'address_id-input',
            },
            scopedSlots: {
               default: () => h(AddressSelect, {
                  props: { value: this.copy.address_id },
                  on: { input: x => this.copy.address_id = x },
               }),
            }
         }),

         h(BFormGroup, {
            props: {
               label: 'Συσκευή',
               'label-for': 'appliance_id-input',
            },
            scopedSlots: {
               default: () => h(ApplianceSelect, {
                  props: { value: this.copy.appliance_id },
                  on: { input: x => this.copy.appliance_id = x },
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Κατάσταση Πελάτη',
               'label-for': 'client_status-input',
            },
            scopedSlots: {
               default: () => h(BFormSelect, {
                  props: {
                     value: this.copy.client_status,
                     options: this.client_statuses,
                  },
                  on: { input: x => this.copy.client_status = x },
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Ημ/νία',
               'label-for': 'date-input',
               'invalid-feedback': 'date is required',
               state: this.copy.date instanceof Date,
            },
            scopedSlots: {
               default: () => h('input', {
                  id: 'date-input',
                  domProps: {
                     type: 'datetime-local',
                     name: 'date-input',
                  },
                  props: {
                     value: this.copy.date,
                  },
                  on: { change: x => this.copy.date = new Date(x.target.value) },
               }),
            },
         }),
      ]);
   },
};
