import Appliance from './Appliance';
import Address from './Address';
import Company from './Company';
import Customer from './Customer';
import Job from './Job';
import JobLine from './JobLine';

export default (token: string) => ({
   Customer: Customer(token),
   Company: Company(token),
   Address: Address(token),
   Appliance: Appliance(token),
   Job: Job(token),
   JobLine: JobLine(token),
});
