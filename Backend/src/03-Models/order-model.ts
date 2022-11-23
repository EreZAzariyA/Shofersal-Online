export default class OrderModel {
      public orderId: number;
      public shoppingCartId: number;
      public totalPrice: number;
      public cityId: number;
      public address: string;
      public dateToSent: Date;
      public lastDigits: number;

      constructor(order: OrderModel) {
            this.orderId = order.orderId;
            this.shoppingCartId = order.shoppingCartId;
            this.totalPrice = order.totalPrice;
            this.cityId = order.cityId;
            this.address = order.address;
            this.dateToSent = order.dateToSent;
            this.lastDigits = order.lastDigits;
      }
}