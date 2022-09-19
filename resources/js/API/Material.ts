import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/materials`).then(x => x.data.data);
   },

   job_lines(material_id: string) {
      return axios.get(`${v1}/materials/job_lines/` + material_id).then(x => x.data.data);
   },

   create(material) {
      return axios.post(`${v1}/materials`, material);
   },

   update(material_id: string, material) {
      return axios.put(`${v1}/materials/${material_id}`, material);
   },

   delete(material_id: string) {
      return axios.delete(`${v1}/materials/${material_id}`);
   }
});
