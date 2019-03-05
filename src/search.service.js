export class SearchService {
  constructor() {}

  filterModel(orders, value) {
    return orders.filter(order => {
      let trigger = false;
      for (let key in order) {
        if (
          key != "order_date" &&
          key != "card_number" &&
          order[key]
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1
        ) {
          trigger = true;
          break;
        }
      }
      return trigger;
    });
  }
}
