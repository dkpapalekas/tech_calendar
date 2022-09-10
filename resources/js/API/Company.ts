import axios from 'axios';
const v1 = '/api/v1';

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/companies`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   customers(company_id: string) {
      return axios.get(`${v1}/companies/customers/` + company_id, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   create(company) {
      return axios.post(`${v1}/companies`, company, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(company_id: string, company) {
      return axios.put(`${v1}/companies/${company_id}`, company, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(company_id: string) {
      return axios.delete(`${v1}/companies/${company_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         },
      });
   }
});
