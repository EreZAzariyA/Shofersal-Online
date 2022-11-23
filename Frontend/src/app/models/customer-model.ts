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
}
export default CustomerModel;