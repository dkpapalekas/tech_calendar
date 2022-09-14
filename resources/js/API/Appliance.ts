import axios from 'axios';
const v1 = '/api/v1';

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/appliances`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   jobs(appliance_id: string) {
      return axios.get(`${v1}/appliances/jobs/` + appliance_id, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   create(appliance) {
      return axios.post(`${v1}/appliances`, appliance, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(appliance_id: string, appliance) {
      return axios.put(`${v1}/appliances/${appliance_id}`, appliance, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(appliance_id: string) {
      return axios.delete(`${v1}/appliances/${appliance_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         },
      });
   }
});
