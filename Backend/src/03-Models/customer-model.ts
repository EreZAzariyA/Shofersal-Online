import Role from "./role";

class CustomerModel {
      public customerId: number;
      public firstName: string;
      public lastName: string;
      public email: string;
      public cityId: number;
      public address: string;
      public username: string;
      public password: number;
      public roleId: Role;

      public constructor(customer: CustomerModel) {
            this.customerId = customer.customerId;
            this.firstName = customer.firstName;
            this.lastName = customer.lastName;
            this.email = customer.email;
            this.cityId = customer.cityId;
            this.address = customer.address;
            this.username = customer.username;
            this.password = customer.password;
            this.roleId = customer.roleId;
      }
}
export default CustomerModel;