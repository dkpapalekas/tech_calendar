import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/addresses`).then(x => x.data.data);
   },

   create(address) {
      return axios.post(`${v1}/addresses`, address);
   },

   update(address_id: string, address) {
      return axios.put(`${v1}/addresses/${address_id}`, address);
   },

   delete(address_id: string) {
      return axios.delete(`${v1}/addresses/${address_id}`);
   },

   jobs(address_id: string) {
      return axios.get(`${v1}/addresses/jobs/${address_id}`).then(x => x.data.data);
   },
});
