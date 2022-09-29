import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/job_lines`).then(x => x.data.data);
   },

   create(job_line) {
      return axios.post(`${v1}/job_lines`, job_line);
   },

   update(job_line_id: string, job_line) {
      return axios.put(`${v1}/job_lines/${job_line_id}`, job_line);
   },

   delete(job_line_id: string) {
      return axios.delete(`${v1}/job_lines/${job_line_id}`);
   }
});
