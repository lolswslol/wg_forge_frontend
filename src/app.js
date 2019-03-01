import { Renderer } from "./render-table.module";
import { OrdersService } from "./orders.service";
import "./styles/styles.css";

export default (function() {
  const renderer = new Renderer();
  const orderService = new OrdersService();
  const startDiv = document.getElementById("app");
  startDiv.appendChild(renderer.renderTable(orderService.getOrders()));
})();
