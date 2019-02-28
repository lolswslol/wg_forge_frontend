export class Renderer {
  constructor() {}

  renderTable(arr) {
    let table = document.createElement("table");
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
          anchor.appendChild(text);
          anchor.setAttribute("href", "#");
          td.appendChild(anchor);
          row.appendChild(td);
        }
      }
    }

    return row;
  }
}
