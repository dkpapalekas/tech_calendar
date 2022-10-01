import { BFormGroup, BFormSelect } from 'bootstrap-vue';
import { Job, JobWithExtra } from '../API/Job';
import AddressSelect from './AddressSelect';
import ApplianceSelect from './ApplianceSelect';
import { h } from 'vue';

export interface Methods {
   submit: () => void;
}

export interface EmitMap {
   input: Props['copy'];
}

export interface Props {
   value: JobWithExtra;
   copy: Omit<JobWithExtra, 'date'> & { date: Date };
   client_statuses: Array<{
      value: Job['client_status'];
      text: string;
   }>;
   job_statuses: Array<{
      value: Job['is_completed'];
      text: string;
   }>;
}

interface This extends Methods, Props {
   $emit: <K extends keyof EmitMap>(event: K, value: EmitMap[K]) => void;
}

export default {
   props: [
      'value',
   ],

   data(this: This) {
      return {
         copy: {
            address_id: this.value?.address_id || undefined,
            appliance_id: this.value?.appliance_id || undefined,
            client_status: this.value?.client_status || 'pending',
            date: this.value?.date || undefined,
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
      copy(x: JobWithExtra) {
         this.copy = {
            address_id: x?.address_id || undefined,
            appliance_id: x?.appliance_id || undefined,
            client_status: x?.client_status || 'pending',
            date: x?.date || undefined,
            agreed_price: x?.agreed_price || 0,
            is_completed: x?.is_completed || 0,
         };
      },
   },

   methods: {
      submit(this: This) {
         this.$emit('input', this.copy);
      },
   },

   render(this: This) {
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
            },
            scopedSlots: {
               default: () => h('input', {
                  domProps: {
                     id: 'date-input',
                     type: 'datetime-local',
                     name: 'date-input',
                     value: this.copy.date,
                  },
                  on: { change: x => this.copy.date = new Date(x.target.value) },
               }),
            },
         }),

         h(BFormGroup, {
            props: {
               label: 'Διάρκεια',
               'invalid-feedback': 'date is required',
            },
            scopedSlots: {
               default: () => h('input', {
                  domProps: {
                     id: 'duration-input',
                     type: 'number',
                     name: 'duration-input',
                  },
                  props: {
                     value: this.copy.duration,
                  },
                  on: { change: x => this.copy.duration = x.target.value },
               }),
            },
         }),
      ]);
   },
};
