import { Renderer } from "./render-table.module";
import { OrdersService } from "./orders.service";
import "./styles/main.scss";
import { SortingService } from "./sorting.service";
import { SearchService } from "./search.service";
import "bootstrap";

export default (function() {
  const orderService = new OrdersService();
  const renderer = new Renderer();
  const searchService = new SearchService();
  const sortingService = new SortingService();

  const orders = orderService.getOrders();
  let filteredOrders = JSON.parse(JSON.stringify(orders));
  let sortingColumn;

  document.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() === "a") {
      event.target.nextElementSibling.classList.toggle("isHidden");
    }
  });

  document.addEventListener("click", event => {
    if (
      event.target.tagName.toLowerCase() === "th" &&
      event.target.getAttribute("data-header")
    ) {
      tableWrapper.innerHTML = "";
      sortingColumn = event.target.getAttribute("data-header");
      filteredOrders = sortingService.sortByColumn(
        sortingColumn,
        filteredOrders
      );

      tableWrapper.appendChild(renderer.renderTable(filteredOrders));
      let sortingArrow = document.createElement("span");
      sortingArrow.innerHTML = "&#8595;";
      let el = document.querySelector(`th[data-header = ${sortingColumn}]`);
      el.appendChild(sortingArrow);
    }
  });

  document.addEventListener("keyup", event => {
    if (event.target.id === "search") {
      tableWrapper.innerHTML = "";

      filteredOrders = searchService.filterModel(orders, event.target.value);

      if (sortingColumn) {
        filteredOrders = sortingService.sortByColumn(
          sortingColumn,
          filteredOrders
        );
      }

      if (filteredOrders.length > 0) {
        tableWrapper.appendChild(renderer.renderTable(filteredOrders));
      } else {
        tableWrapper.innerHTML = `<p>Nothing found</p>
        <table>
        <tr>
    <td>Orders Count</td>
    <td>n/a</td>
</tr>
<tr>
    <td>Orders Total</td>
    <td>n/a</td>
</tr>
<tr>
    <td>Median Value</td>
    <td>n/a</td>
</tr>
<tr>
    <td>Average Check</td>
    <td>n/a</td>
</tr>
<tr>
    <td>Average Check (Female)</td>
    <td>n/a</td>
</tr>
<tr>
    <td>Average Check (Male)</td>
    <td>n/a</td>
</tr>
</table>`;
      }
    }
  });

  const startDiv = document.getElementById("app");
  const tableWrapper = document.createElement("div");
  startDiv.innerHTML += `Search:
  <input type="text" id="search">`;
  startDiv.appendChild(tableWrapper);
  tableWrapper.appendChild(renderer.renderTable(orderService.getOrders()));
})();
