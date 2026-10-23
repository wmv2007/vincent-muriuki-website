import { productList } from "./data/product-list.js";
import { convertPrice } from "./data/convertprice.js";

function updateCartQuantity() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}


function renderProducts(lists) {
  let productHTML = '';
  lists.forEach((product) => {
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

renderProducts(productList);
updateCartQuantity();

const buttons = document.querySelectorAll('.add-cart-button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const card = button.closest('.product-grid');
    const quantity = Number(card.querySelector('select').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const matchingItem = cart.find((item) => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
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
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const text = searchInput.value.toLowerCase();
  const matches = productList.filter(product => 
    product.name.toLowerCase().includes(text)
  );
  renderProducts(matches);
});

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const text = searchInput.value.toLowerCase();
  const matches = productList.filter(product => 
    product.name.toLowerCase().includes(text)
  );
  renderProducts(matches);
});