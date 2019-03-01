export class SortingService {
  constructor() {
    this.currentSortingColumn = {};
  }

  sortByColumn(name, filteredModel) {
    let output;
    switch (name) {
      case "transaction": {
        output = filteredModel.sort((a, b) => {
          if (a.transaction_id < b.transaction_id) {
            return -1;
          }
          if (a.transaction_id > b.transaction_id) {
            return 1;
          }
          return 0;
        });
        break;
      }
      case "userInfo": {
        output = filteredModel.sort((a, b) => {
          let firstUser = a.user_info.split(".")[1];
          let secondUser = b.user_info.split(".")[1];
          if (firstUser < secondUser) {
            return -1;
          }
          if (firstUser > secondUser) {
            return 1;
          }
          return 0;
        });
        break;
      }
      case "orderDate": {
        output = filteredModel.sort((a, b) => {
          let firstDate = new Date(a.order_date);
          let secondDate = new Date(b.order_date);
          if (firstDate < secondDate) {
            return -1;
          }
          if (firstDate > secondDate) {
            return 1;
          }
          return 0;
        });
        break;
      }
      case "orderAmount": {
        output = filteredModel.sort((a, b) => {
          let firstAmount = +a.order_amount.substr(1);
          let secondAmount = +b.order_amount.substr(1);
          if (firstAmount < secondAmount) {
            return -1;
          }
          if (firstAmount > secondAmount) {
            return 1;
          }
          return 0;
        });
        break;
      }
      case "cardType": {
        output = filteredModel.sort((a, b) => {
          if (a.card_type < b.card_type) {
            return -1;
          }
          if (a.card_type > b.card_type) {
            return 1;
          }
          return 0;
        });
        break;
      }
      case "location": {
        output = filteredModel.sort((a, b) => {
            if (a.location < b.location) {
              return -1;
            }
            if (a.location > b.location) {
              return 1;
            }
            return 0;
          });
      }
    }

    return output;
  }
}
