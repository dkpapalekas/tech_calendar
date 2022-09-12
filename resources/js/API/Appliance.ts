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
});
