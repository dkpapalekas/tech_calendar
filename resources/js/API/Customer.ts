import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/customers`).then(x => x.data.data);
   },

   create(customer) {
      return axios.post(`${v1}/customers`, customer);
   },

   update(customer_id: string, customer) {
      return axios.put(`${v1}/customers/${customer_id}`, customer);
   },

   delete(customer_id: string) {
      return axios.delete(`${v1}/customers/${customer_id}`);
   },

   addresses(customer_id: string) {
      return axios.get(`${v1}/customers/addresses/${customer_id}`).then(x => x.data.data);
   },
});
