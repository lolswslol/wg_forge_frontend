import { SortingService } from "./sorting.service";

export class CalculateService {
  constructor() {
    this.sortingService = new SortingService();
  }

  getOrdersCount(orders) {
    return orders.length;
  }

  getOrdersTotal(orders) {
    let count = 0;
    for (let i = 0; i < orders.length; i++) {
      count += +orders[i].order_amount.substr(1);
    }

    return count.toFixed(2);
  }

  getOrdersMedian(orders) {
    let sortedOrders = this.sortingService.sortByColumn("orderAmount", orders);

    if (sortedOrders.length === 0) return 0;

    var half = Math.floor(sortedOrders.length / 2);

    if (sortedOrders.length % 2) {
      return sortedOrders[half].order_amount.substr(1);
    } else {
      return (
        (+sortedOrders[half - 1].order_amount.substr(1) +
          +sortedOrders[half].order_amount.substr(1)) /
        2.0
      );
    }
  }

  getAvg(orders, gender) {
    let gen = gender;
    let count = 0;
    let sum = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].user_info.split(".")[0] === gen) {
        count++;
        sum += +orders[i].order_amount.substr(1);
      }
    }
    return count === 0 ? 0 : (sum / count).toFixed(2);
  }

  getTotalObject(orders) {
    return {
      counts: this.getOrdersCount(orders),
      orders_total: this.getOrdersTotal(orders),
      median: this.getOrdersMedian(orders),
      avg: (this.getOrdersTotal(orders) / this.getOrdersCount(orders)).toFixed(
        2
      ),
      female: this.getAvg(orders, "Mrs"),
      male: this.getAvg(orders, "Mr")
    };
  }
}
