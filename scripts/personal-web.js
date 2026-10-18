import { services } from "../data/services.js";
import { formartCurrency } from "./utils/money.js";
import { homeTabContent } from "../data/homeTab.js";
import { setupCart } from "./cart.js";

function renderHomeTab () {
  return `
    <h2 class="head">
      ${homeTabContent.head}
    </h2>
  
    <h1 class="hero-title">
      ${homeTabContent.intro}
    </h1>
    <p class="hero-text">
      ${homeTabContent.description}
    </p>
    <p class="mission hero-tagline">
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

function typeText(element, duration) {

  const text = element.textContent;
  const speed = duration / text.length;

  element.style.minHeight = element.offsetHeight + 'px';
  element.textContent = '';
  element.style.visibility = 'visible';

  let i = 0;
  const timer = setInterval(() => {
    i++;
    element.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, speed);

}

function playHeroAnimation() {
  typeText(document.querySelector('.hero-title'), 2000);
  typeText(document.querySelector('.hero-text'), 2000);
  typeText(document.querySelector('.hero-tagline'), 2000);
}

playHeroAnimation();


setUpMenu();
