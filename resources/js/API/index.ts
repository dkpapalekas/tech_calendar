import Appliance from './Appliance';
import Address from './Address';
import Company from './Company';
import Customer from './Customer';
import Job from './Job';
import JobLine from './JobLine';
import File from './File';

export default () => ({
   Customer: Customer(),
   Company: Company(),
   Address: Address(),
   Appliance: Appliance(),
   Job: Job(),
   JobLine: JobLine(),
   File: File(),
});
