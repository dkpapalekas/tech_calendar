import axios from 'axios';
const v1 = '/api/v1';

export interface Job {
   id: number;
   agreed_price: number;
   is_completed: 0 | 1;
   date: string | null | undefined;
   client_status: 'OK' | 'pending';
   duration: number | null;
}

export interface JobWithExtra extends Job {
   address_id: number;
   address_name: string;
   address_number: number;
   appliance_name: string;
   appliance_id: number;
   customer_name: string;
   customer_surname: string;
}

export default () => ({
   all() {
      return axios.get(`${v1}/jobs`).then(x => x.data.data);
   },

   create(job) {
      return axios.post(`${v1}/jobs`, job);
   },

   update(job_id: string, job) {
      return axios.put(`${v1}/jobs/${job_id}`, job);
   },

   delete(job_id: string) {
      return axios.delete(`${v1}/jobs/${job_id}`);
   },
});
