import moment from "moment";
import AddedItemModel from "../03-Models/added-item-model";
import { CartItemDetails } from "../03-Models/cart-item-details";
import ClientError from "../03-Models/client-error";
import CustomerModel from "../03-models/customer-model";
import OrderModel from "../03-Models/order-model";
import ShoppingCartModel from "../03-Models/shopping-cart-model";
import dal from "../04-DAL/dal";


async function getAllShoppingCarts(): Promise<ShoppingCartModel> {
      const sql = "SELECT * FROM shoppingCarts"
      const shoppingCarts = await dal.execute(sql);
      return shoppingCarts;
}

async function getShoppingCartByCustomerId(customerId: number): Promise<ShoppingCartModel> {
      const sql = "SELECT * FROM shoppingCarts WHERE customerId = " + customerId;
      const shoppingCarts = await dal.execute(sql);
      const shoppingCart = shoppingCarts[0];
      return shoppingCart;
}

async function createNewShoppingCartForNewCustomer(customer: CustomerModel): Promise<ShoppingCartModel> {

      //Get all shopping-carts:
      const shoppingCartsSql = "SELECT * FROM shoppingCarts";
      const shoppingCarts: ShoppingCartModel[] = await dal.execute(shoppingCartsSql);

      if (shoppingCarts.find(shoppingCart => shoppingCart.customerId === customer.customerId)) {
            throw new ClientError(400, "Customer already have cart in process");
      }

      //Create new shopping-cart:
      const shoppingCart = new ShoppingCartModel();
      const date = new Date()

      shoppingCart.shoppingCartId = shoppingCarts.length + 1;
      shoppingCart.customerId = customer.customerId;
      shoppingCart.creatingDate = (moment(date).format("YYYY-MM-DD") as any);

      //Insert into DB:
      const sql = `INSERT INTO shoppingCarts
                                          VALUES(
                                                '${shoppingCart.shoppingCartId}',
                                                '${shoppingCart.customerId}',
                                                '${shoppingCart.creatingDate}'
                                          )`;
      await dal.execute(sql);
      return shoppingCart;
};

async function getAllItemsFromCartByShoppingCartId(shoppingCartId: number): Promise<CartItemDetails[]> {
      const sql = "SELECT * FROM cartItems AS CI INNER JOIN products AS P ON CI.productId = P.productId WHERE CI.shoppingCartId = " + shoppingCartId;

      const itemsInCart = await dal.execute(sql);
      return itemsInCart;
}

async function addItemToShoppingCart(item: AddedItemModel): Promise<AddedItemModel> {
      const sql = `INSERT INTO cartItems
                                    VALUES(
                                          '${item.productId}',
                                          '${item.stock}',
                                          '${item.shoppingCartId}'
                                    )`;
      await dal.execute(sql);
      return item;
}


async function updateStockInCart(itemToUpdate: AddedItemModel): Promise<AddedItemModel> {
      const sql = `UPDATE cartItems SET stock = ${itemToUpdate.stock} WHERE productId = ${itemToUpdate.productId} AND shoppingCartId = ${itemToUpdate.shoppingCartId}`;

      await dal.execute(sql);
      return itemToUpdate
}

async function removeItemFromCart(itemIdToRemove: number,shoppingCartId:number): Promise<void> {
      const sql = `DELETE FROM cartItems WHERE productId = ${itemIdToRemove} AND shoppingCartId = ${shoppingCartId}`;
      await dal.execute(sql);
}



async function makeOrder(order: OrderModel): Promise<void> {
      const sql = `INSERT INTO orders 
                                    VALUES(DEFAULT,
                                          '${order.shoppingCartId}',
                                          '${order.totalPrice}',
                                          '${order.cityId}',
                                          '${order.address}',
                                          '${order.dateToSent}',
                                          '${order.lastDigits}')`

      await dal.execute(sql);
};


export default {
      getAllShoppingCarts,
      getShoppingCartByCustomerId,
      createNewShoppingCartForNewCustomer,
      getAllItemsFromCartByShoppingCartId,
      addItemToShoppingCart,
      updateStockInCart,
      removeItemFromCart,
      makeOrder
}