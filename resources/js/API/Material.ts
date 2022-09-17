import axios from 'axios';
const v1 = '/api/v1';

export default (token: string) => ({
   all() {
      return axios.get(`${v1}/materials`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   job_lines(material_id: string) {
      return axios.get(`${v1}/materials/job_lines/` + material_id, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then(x => x.data.data);
   },

   create(material) {
      return axios.post(`${v1}/materials`, material, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   update(material_id: string, material) {
      return axios.put(`${v1}/materials/${material_id}`, material, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   },

   delete(material_id: string) {
      return axios.delete(`${v1}/materials/${material_id}`, {
         headers: {
            Authorization: `Bearer ${token}`
         },
      });
   }
});
