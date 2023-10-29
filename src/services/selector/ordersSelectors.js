// Заказ целиком (со всеми параметрами), найденный по номеру 
// через ordersFeedReducer (редьюсер ленты заказов)
export function orderSelector(someNumber) {
  return function (state) {
    const allOrdersFromFeed = state.ordersFeedState.allOrders;

    const orderFromFeed = allOrdersFromFeed.find((order) => order.number == someNumber);

    return orderFromFeed;
  };
}

