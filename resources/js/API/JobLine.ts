import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/job_lines`).then(x => x.data.data);
   },
});
