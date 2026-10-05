import { menuList } from './utils/menuList.js';
import { currencyCents } from './utils/convertCents.js';
import { FAQs } from './utils/data.js';

let homeHTML;
let menuHTML = '';
let aboutHTML;
let benefitsHTML;
let openingHoursHTML;
let contactHTML;
let faqHTML;

function generateHomeHTML() {
  homeHTML = `
    <div>
      <p class="top">
        NAIROBI'S FRIENDLY LOCAL BAKERY
      </p>
      <h1>
        Freshly baked.<br>Every single morning.
      </h1>
      <p class="p2">
        Warm bread, beautiful cakes and delicious pastries made with care for our community.
      </p>
      <a class="menu-button" href="#Menu">See Our Menu</a>
    </div>
    <img src="../assets/hero.svg" alt="Sunrise Bakery">
  `
  document.querySelector('.js-main').innerHTML = homeHTML;

  menuList.forEach((menu) => {
    menuHTML += `
      <article class="card">
        <img src="${menu.Image}" alt="${menu.name}">
        <div>
          <h4>
            ${menu.name}
          </h4>
          <p>
            ${menu.description}
          </p>
          <strong>From KSh ${currencyCents(menu.priceCents)}</strong>
        </div>
      </article>
    `
    document.querySelector('.js-menu').innerHTML = menuHTML;
  })
  

  aboutHTML = `
    <div class="about-left">
      <p class="top">
        ABOUT US
      </p>
      <h2>
        Good baking, simple ingredients, happy customers.
      </h2>
    </div>
    <div class="about-right">
      <p>
        Sunrise Bakery is a local Nairobi bakery serving freshly baked bread, pastries and celebration cakes. We
        believe good food should be fresh, affordable and made with care.
      </p>
    </div>
  `
  document.querySelector('.js-about').innerHTML = aboutHTML;

  benefitsHTML = `
    <p class="top">
      WHY US
    </p>
    <h5>
      Made for your everyday moments
    </h5>
    <div class="grid">
      <div class="features">
        <b>01</b>
        <h6>Fresh Daily</h6>
        <p>
          We bake every morning so you get products at their best.
        </p>
      </div>
      <div class="features">
        <b>02</b>
        <h6>Made With Care</h6>
        <p>
          Simple ingredients and careful preparation go into every order.
        </p>
      </div>
      <div class="features">
        <b>03</b>
        <h6>Local &amp; Friendly</h6>
        <p>
          A neighbourhood bakery that values every customer.
        </p>
      </div>
    </div>
  `
  document.querySelector('.js-benefits').innerHTML = benefitsHTML;

  faqHTML = `
    <p class="top">FAQ</P>
    <h2>Questions we get a lot</h2>
    <div class="faq-list">
  `
  FAQs.forEach((faq) => {
    faqHTML += `
      <div class="faq-item">
        <button class="faq-question">${faq.question}</button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;
  });

  faqHTML += `</div>`;
  document.querySelector('.js-faq').innerHTML = faqHTML;

  const answers = document.querySelectorAll('.faq-answer');

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const wasOpen = answer.classList.contains('open');
      
      answers.forEach((item) => {
        item.classList.remove('open');
      });

      if (!wasOpen) {
        answer.classList.add('open');
      }
    });
  });

  openingHoursHTML = `
    <div class="left">
      <p class="top">COME VISIT</p>
      <h2>Opening hours</h2>
    </div>
    <div class="time-list">
      <div class="time-row" data-days="1,2,3,4,5">
        <span>Monday – Friday</span>
        <b>6:30 AM – 7:00 PM</b>
      </div>
      <div class="time-row" data-days="6">
        <span>Saturday</span>
        <b>7:00 AM – 6:00 PM</b>
      </div>
      <div class="time-row" data-days="0">
        <span>Sunday</span>
        <b>8:00 AM – 2:00 PM</b>
      </div>
    </div>
  `
  document.querySelector('.js-opening-hours').innerHTML = openingHoursHTML;

  const today = new Date().getDay();

  document.querySelectorAll('.time-row').forEach((row) => {
    const days = row.dataset.days.split(',');

    if (days.includes(String(today))) {
      row.classList.add('today');
    }
  });

  contactHTML = `
    <p class="top">
      GET IN TOUCH
    </p>
    <h2>
      Ready for something fresh?
    </h2>
    <p class="text">
      Make your order now!
    </p>
    <a class="menu-button" href="tel:+254700123456">
      Call Us
    </a>
    <a class="whatsapp" href="mailto:hello@sunrisebakery.example">
      Email Us
    </a>
    <a class="whatsapp" href="https://www.google.com/maps/search/?api=1&query=Nairobi%2C%20Kenya">
      Find Us
    </a>
  `
  document.querySelector('.js-contact').innerHTML = contactHTML;

}

generateHomeHTML();

document.querySelector('.js-year').textContent = new Date().getFullYear();

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