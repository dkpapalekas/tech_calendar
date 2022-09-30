import axios from 'axios';
const v1 = '/api/v1';

export default () => ({
   all() {
      return axios.get(`${v1}/files`).then(x => x.data.sort().reverse());
   },

   create(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post(`${v1}/files`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         }
      });
   },
});
