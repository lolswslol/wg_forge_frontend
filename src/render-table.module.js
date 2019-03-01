import { UsersService } from "./users.service";
import { OrdersService } from "./orders.service";

export class Renderer {
  constructor() {
    this.usersService = new UsersService();
    this.ordersService = new OrdersService();
    this.orders = this.ordersService.getOrders();
    this.filteredOrders = JSON.parse(JSON.stringify(this.orders));
  }

  renderTable(orders) {
    let table = document.createElement("table");    
    let context = this.updateTableContent(orders);
    table.appendChild(context.thead);
    table.appendChild(context.tbody);
    return table;
  }

  updateTableContent(orders) {
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr>
    <th data-header= "transaction">Transaction ID</th>
    <th data-header= "userInfo">User Info</th>
    <th data-header= "orderDate">Order Date</th>
    <th data-header= "orderAmount">Order Amount</th>
    <th>Card Number</th>
    <th data-header= "cardType">Card Type</th>
    <th data-header= "location">Location</th>
</tr>`;
    let tbody = document.createElement("tbody");
    orders.forEach(s => {
      let row = this.createRow(s);
      tbody.appendChild(row);
    });
    return { thead, tbody };
  }

  createRow(obj) {
    let row = document.createElement("tr");
    row.setAttribute("id", `order_${obj.id}`);
    for (let key in obj) {
      if (key !== "id") {
        if (key !== "user_info") {
          let td = document.createElement("td");
          let text = document.createTextNode(obj[key]);
          td.appendChild(text);
          row.appendChild(td);
        } else {
          let td = document.createElement("td");
          let anchor = document.createElement("a");
          let text = document.createTextNode(obj[key]);
          let userInfo = this.usersService.getUserInfo(obj.id);
          let userInfoBlock = this.createUserInfo(userInfo);
          anchor.appendChild(text);
          anchor.setAttribute("href", "#");
          td.appendChild(anchor);
          td.appendChild(userInfoBlock);
          row.appendChild(td);
        }
      }
    }

    return row;
  }

  createUserInfo(userInfo) {
    let block = document.createElement("div");
    block.className = "user-details isHidden";
    let text = `<p>Birthday: ${userInfo.birthday}</p>
    <p><img src="${userInfo.avatar}" width="100px"></p>
    <p>Company: <a href="${userInfo.companie_url}" target="_blank">${
      userInfo.company
    }</a></p>
    <p>Industry: ${userInfo.industry}</p>`;
    block.innerHTML = text;
    return block;
  }
}
