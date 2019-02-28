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
        let td = document.createElement("td");
        let text = document.createTextNode(obj[key]);
        td.appendChild(text);
        row.appendChild(td);
      }
    }

    return row;
  }
}
