import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/companies`).then(x => x.data.data);
   },

   customers(company_id: string) {
      return axios.get(`${v1}/companies/customers/` + company_id).then(x => x.data.data);
   },

   create(company) {
      return axios.post(`${v1}/companies`, company);
   },

   update(company_id: string, company) {
      return axios.put(`${v1}/companies/${company_id}`, company);
   },

   delete(company_id: string) {
      return axios.delete(`${v1}/companies/${company_id}`);
   }
});
