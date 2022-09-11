import axios from 'axios';
const v1 = '/api/v1';

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/addresses`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }).then(x => x.data.data);
   },

   create(address) {
      return axios.post(`${v1}/addresses`, address, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(address_id: string, address) {
      return axios.put(`${v1}/addresses/${address_id}`, address, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(address_id: string) {
      return axios.delete(`${v1}/addresses/${address_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },
});
