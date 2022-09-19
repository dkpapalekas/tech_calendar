import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/appliances`).then(x => x.data.data);
   },

   jobs(appliance_id: string) {
      return axios.get(`${v1}/appliances/jobs/` + appliance_id).then(x => x.data.data);
   },

   create(appliance) {
      return axios.post(`${v1}/appliances`, appliance);
   },

   update(appliance_id: string, appliance) {
      return axios.put(`${v1}/appliances/${appliance_id}`, appliance);
   },

   delete(appliance_id: string) {
      return axios.delete(`${v1}/appliances/${appliance_id}`);
   }
});
