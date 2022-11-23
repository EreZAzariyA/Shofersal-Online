import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import CredentialsModel from "../03-Models/credentials-model";
import CustomerModel from "../03-models/customer-model";
import dal from "../04-DAL/dal";


async function register(customer: CustomerModel): Promise<string> {

      //Check if username or email available:
      const allCustomersSql = "SELECT * FROM customers";
      const allCustomers: CustomerModel[] = await dal.execute(allCustomersSql);
      if (allCustomers.find(c => c.customerId === customer.customerId)) {
            throw new ClientError(400, "Customer Id already registered");
      }
      if (allCustomers.find(c => c.email === customer.email)) {
            throw new ClientError(400, "Email already registered");
      }
      if (allCustomers.find(c => c.username === customer.username)) {
            throw new ClientError(400, "Username already registered");
      }

      //Register:
      const registerSql = `INSERT INTO customers 
                                          VALUES(
                                                '${customer.customerId}',
                                                '${customer.firstName}',
                                                '${customer.lastName}',
                                                '${customer.email}',
                                                '${customer.cityId}',
                                                '${customer.address}',
                                                '${customer.username}',
                                                '${customer.password}',
                                                '1'
                                                )`;
      await dal.execute(registerSql);

      //Create new token:
      const token = jwt.getNewToken(customer);

      return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

      //Find the current credentials:
      const sql = `SELECT * FROM customers WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

      const customers: CustomerModel[] = await dal.execute(sql);
      if (customers.length === 0) {
            throw new ClientError(401, "Incurrent username or password");
      }

      const customer = customers[0];
      const token = jwt.getNewToken(customer);
      return token;
}


export default {
      register,
      login
}