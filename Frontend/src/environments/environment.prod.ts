export const environment = {
  production: true,
  urls: {
    auth: {
      loginUrl: "http://localhost:3001/api/auth/login",
      registerUrl: "http://localhost:3001/api/auth/register",
    },
    products: {
      allProductsUrl: "http://localhost:3001/api/products/all-products",
      allCategoriesUrl: "http://localhost:3001/api/products/all-categories",
      allProductsByCategoryIdUrl: "http://localhost:3001/api/products/products-by-category/",
      productsImagesUrl: "http://localhost:3001/api/products/images/"
    },
    shoppingCart: {
      allCarts: "http://localhost:3001/api/shopping-carts/all-carts",
      shoppingCartByCustomerId: "http://localhost:3001/api/shopping-carts/",
      createNewCartUrl: "http://localhost:3001/api/shopping-carts/new-shopping-cart",
      getAllItemsInCartByShoppingCartIdUrl: "http://localhost:3001/api/shopping-carts/items-in-cart/",
      addItemToCartUrl: "http://localhost:3001/api/shopping-carts/add-to-cart",
      updateStockInCartUrl: "http://localhost:3001/api/shopping-carts/update-stock/",
      removeItemFromCartUrl: "http://localhost:3001/api/shopping-carts/remove-from-cart/",
      makeOrder: "http://localhost:3001/api/shopping-carts/make-order"
    },
    orders: {
      getAllOrdersUrl: "http://localhost:3001/api/orders/all-orders"
    },
    cities: {
      citiesUrl: "http://localhost:3001/api/all-cities"
    }
  }
};
