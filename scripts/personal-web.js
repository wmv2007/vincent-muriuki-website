import { services } from "../data/services.js";
import { formartCurrency } from "./utils/money.js";
import { homeTabContent } from "../data/homeTab.js";
import { setupCart } from "./cart.js";

function renderHomeTab () {
  return `
    <h2 class="head">
      ${homeTabContent.head}
    </h2>
  
    <h1>
      ${homeTabContent.intro}
    </h1>
    <p>
      ${homeTabContent.description}
    </p>
    <p class="mission">
      ${homeTabContent.mission}
    </p>
  `;
}

document.querySelector('.js-home-content').innerHTML = renderHomeTab();

let servicesHTML = '';

services.forEach ((service) => {
  servicesHTML += 
  `
    <div class="service-cards">
      <h3>
        ${service.name}
      </h3>
      <strong>
        $${formartCurrency(service.priceCents)}
      </strong>
      <button class="order-button" data-service-id="${service.id}">
        Order
      </button>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = servicesHTML;

setupCart();

