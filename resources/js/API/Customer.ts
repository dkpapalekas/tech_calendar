import axios from 'axios';
const v1 = '/api/v1';

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/customers`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   create(customer) {
      return axios.post(`${v1}/customers`, customer, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(customer_id: string, customer) {
      return axios.put(`${v1}/customers/${customer_id}`, customer, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(customer_id: string) {
      return axios.delete(`${v1}/customers/${customer_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },
});
