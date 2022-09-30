import Appliance from './Appliance';
import Address from './Address';
import Company from './Company';
import Customer from './Customer';
import Job from './Job';
import Material from './Material';
import Job_Line from './Job_Line';

export default () => {
   const api = {
      Customer: Customer(),
      Company: Company(),
      Address: Address(),
      Appliance: Appliance(),
      Job: Job(),
      Job_Line: Job_Line(),
      Material: Material(),
      // alljobswithextra() {
      //    Promise.all()
      // },
   }
   return api;
};
