import axios from 'axios';
const v1 = '/api/v1';

export interface Job {
   id: number;
   agreed_price: number;
   is_completed: 0 | 1;
   date: string;
   client_status: 'OK' | 'pending';
}

export interface JobWithExtra extends Job {
   address_id: number;
   appliance_id: number;
}

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/jobs`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   create(job) {
      return axios.post(`${v1}/jobs`, job, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(job_id: string, job) {
      return axios.put(`${v1}/jobs/${job_id}`, job, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(job_id: string) {
      return axios.delete(`${v1}/jobs/${job_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },
});
