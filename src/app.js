import { Renderer } from "./render-table.module";
import { OrdersService } from "./orders.service";
import "./styles/styles.css";
import { SortingService } from "./sorting.service";

export default (function() {
  const orderService = new OrdersService();
  const renderer = new Renderer();
  const sortingService = new SortingService();

  document.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() === "a") {
      event.target.nextElementSibling.classList.toggle("isHidden");
    }
  });
  document.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() === "th" && event.target.getAttribute("data-header")) {
      startDiv.innerHTML = "";
      let columnName = event.target.getAttribute("data-header");
      let orders = orderService.getOrders();
      let filteredOrders = sortingService.sortByColumn(columnName, orders);

      startDiv.appendChild(renderer.renderTable(filteredOrders));
      let sortingArrow = document.createElement("span");
      sortingArrow.innerHTML = "&#8595;";
      let el = document.querySelector(`th[data-header = ${columnName}]`);
      el.appendChild(sortingArrow);
    }
  });

  const startDiv = document.getElementById("app");
  startDiv.appendChild(renderer.renderTable(orderService.getOrders()));
})();
