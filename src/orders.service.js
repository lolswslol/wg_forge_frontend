import orders from "../data/orders";

export class OrdersService {
  constructor() {}

  getOrders() {
    return orders.map(s => {
      return {
        transaction_id: s.transaction_id,
        user_info: s.user_id,
        order_date: this.formateDate(s.created_at),
        order_amount: `$ ${s.total}`,
        card_number: this.formateCardNumber(s.card_number),
        card_type: s.card_type,
        location: `${s.order_country} (${s.order_ip})`
      };
    });
  }

  formateCardNumber(string) {
    let startRange = 2;
    let endRange = 4;
    let starsRange = string.length - startRange - endRange;
    let startValue = string.slice(0, startRange);
    let endvalue = string.slice(-endRange);
    let stars = "*".repeat(starsRange);
    return startValue + stars + endvalue;
  }

  formateDate(msDate) {
    let incomingDate = new Date(+msDate);
    let year = incomingDate.getFullYear();
    let month = this.formateDateValue(incomingDate.getMonth());
    let day = this.formateDateValue(incomingDate.getDay());
    let time = incomingDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });

    return `${day}/${month}/${year} ${time}`;
  }

  formateDateValue(date) {
    return ("0" + date).slice(-2);
  }
}
