import { productList } from "./data/product-list.js";
import { convertPrice } from "./data/convertprice.js";

let productHTML = '';

function renderProducts() {
  productList.forEach((product) => {
    productHTML += `
      <section class="product-grid">
        <div class="image">
          <img src="${product.image}" alt="">
        </div>
        <div class="product-details">
          ${product.name}
        </div>
        <p class="product-price">$${convertPrice(product.priceCents)}</p>
        <div class="quantity-option-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <button class="add-cart-button" data-name="${product.name}" data-price-cents="${product.priceCents}" data-product-id="${product.id}">Add To Cart</button>
      </section>
    `;
  });

  document.querySelector('.js-main').innerHTML = productHTML;
}

renderProducts();

const buttons = document.querySelectorAll('.add-cart-button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    document.querySelector('.cart-quantity').innerHTML = parseInt(document.querySelector('.cart-quantity').innerHTML) + 1;
  });

  button.addEventListener('click', () => {
    button.textContent = 'Added to Cart';
    button.classList.add('added');
    button.disabled = true;
    setTimeout(() => {
      button.textContent = 'Add To Cart';
      button.classList.remove('added');
      button.disabled = false;
    }, 500);
  });

  const name = button.dataset.name;
  const priceCents = button.dataset.priceCents;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push({ name: name, priceCents: priceCents });
  localStorage.setItem('cart', JSON.stringify(cart));
});

