import Company from './Company';
import Customer from './Customer';

export default (token: string) => ({
   Customer: Customer(token),
   Company: Company(token),
});
