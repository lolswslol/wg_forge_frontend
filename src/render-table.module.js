import { UsersService } from "./users.service";

export class Renderer {
  constructor() {
    this.usersService = new UsersService();
  }

  renderTable(arr) {
    let table = document.createElement("table");
    table.addEventListener("click", event => {
      if (event.target.tagName.toLowerCase() === "a") {
        event.target.nextElementSibling.classList.toggle("isHidden");
      }
    });
    let header = `<thead>
    <tr>
        <th>Transaction ID</th>
        <th>User Info</th>
        <th>Order Date</th>
        <th>Order Amount</th>
        <th>Card Number</th>
        <th>Card Type</th>
        <th>Location</th>
    </tr>
</thead>`;
    table.innerHTML = header;
    arr.forEach(s => {
      let row = this.createRow(s);
      table.appendChild(row);
    });
    return table;
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
