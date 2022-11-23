import OrderModel from "../03-Models/order-model";
import dal from "../04-DAL/dal";


async function getAllOrders(): Promise<OrderModel[]> {
      const sql = "SELECT * FROM orders";
      const orders = await dal.execute(sql);
      return orders;
}




export default {
      getAllOrders
}