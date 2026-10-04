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
      <h3>${service.shortName}</h3>
      <strong>
        ${service.includes}
      </strong>
      <strong>
        $${formartCurrency(service.priceCents)}
      </strong>
      <p>${service.note}</p>
      <div class="button-container">
        <button class="order-button" data-service-id="${service.id}">
          Order
        </button>
        <button class="order-button example-button" data-example-url="${service.example}">
          Example
        </button>
      </div>
    </div>
  `;
});

document.querySelector('.js-product-grid').innerHTML = servicesHTML;

document.querySelectorAll('.example-button').forEach((button) => {
  button.addEventListener('click', (buttonEvent) => {
    const exampleLink = buttonEvent.currentTarget.dataset.exampleUrl;
    window.open(exampleLink, '_blank');
  });
});

setupCart();

function setUpMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuButton || !navLinks) {
    return;
  };
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

}


setUpMenu();
