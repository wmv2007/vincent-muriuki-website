import { productList } from "./data/product-list.js";
import { convertPrice } from "./data/convertprice.js";

const EMAILJS_PUBLIC_KEY = 'WyjD1F1_cxd4JPVOg';
const EMAILJS_SERVICE_ID = 'service_57rhyg8';
const EMAILJS_TEMPLATE_ID = 'template_kp8fnmr';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function renderOrderItems() {
  let orderHtml = '';
  let totalCents = 0;

  cart.forEach((item) => {
      function getProduct(productId) {
        return productList.find((product) => product.id === productId);
      }
    const product = getProduct(item.productId);
    const lineCents = Number(product.id) * item.quantity

    orderHtml += `
      <li>
        <span>${item.quantity} &times; ${product.name}</span>
        <span class="order-item-price">$${convertPrice(lineCents)}</span>
        <button class="remove-item js-remove-item" type="button" data-service-id="${item.productId}">Remove</button>
      </li>
    `;

    totalCents += lineCents;
  });

  if (cart.length === 0) {
    orderHtml = '<li>Your cart is empty. Click Order on a service to add it.</li>';
  }

  document.querySelector('.js-order-items').innerHTML = orderHtml;
  document.querySelector('.js-order-total').innerHTML = convertPrice(totalCents);

}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function addToCart(processId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === processId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: processId,
      quantity: 1
    });
  }

  updateCartQuantity();
  renderOrderItems();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => {
    return item.productId !== productId;
  });
  updateCartQuantity();
  localStorage.setItem('cart', JSON.stringify(cart));
  renderOrderItems();
}

function setStatus(message, isError = false) {
  const status = document.querySelector('.js-order-status');
  status.textContent = message;
  status.classList.toggle('is-error', isError);
}

function getTotalCents() {
  let total = 0;

  cart.forEach((item) => {
    const product = getProduct(item.productId);
    total += Number(product.priceCents) * item.quantity;
  });

  return total;
}

function buildOrderText() {
  return cart.map((item) => {
    const product = getProduct(item.productId);
    const lineCents = Number(product.priceCents) * item.quantity;

    return `${item.quantity} x ${product.name} - $${convertPrice(lineCents)}`;
  }).join('\n');
}

export function setupCart() {

  updateCartQuantity();
  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }

  console.log('setupCart is running');

    document.querySelectorAll('.order-button[data-product-id]').forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.productId);
      });
    });

  const modal = document.querySelector('.js-order-modal');

  document.querySelector('.js-cart-button').addEventListener('click', () => {
    setStatus('');
    renderOrderItems();
    modal.hidden = false;
  });

  function closeModal() {
    modal.hidden = true;
  }

  document.querySelector('.js-modal-close').addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  document.querySelector('.js-order-items').addEventListener('click', (event) => {
    const removeButton = event.target.closest('.js-remove-item');

    if (removeButton) {
      removeFromCart(removeButton.dataset.serviceId);
    }
  });

  const form = document.querySelector('.js-order-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      setStatus('Your cart is empty. Add a service first.', true);
      return;
    }

    const formData = new FormData(form);
    const countryCode = formData.get('countryCode');
    const rawPhone = formData.get('phone').trim();
    const digits = rawPhone.replace(/\D/g, '').replace(/^0+/, '');
    let fullPhone = 'Not provided';

    if (rawPhone.startsWith('+')) {
      fullPhone = `+${digits}`;
    } else if (digits) {
      fullPhone = `${countryCode}${digits}`;
    }

    const submitButton = form.querySelector('.send-order-button');

    submitButton.disabled = true;
    setStatus('Sending your order...');

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: fullPhone,
        message: formData.get('message'),
        order_items: buildOrderText(),
        order_total: `$${convertPrice(getTotalCents())}`
      });

      cart = [];
      form.reset();
      updateCartQuantity();
      localStorage.setItem('cart', JSON.stringify(cart));
      renderOrderItems();
      setStatus('Order sent! I will contact you soon.');
    } catch (error) {
      console.error('Send failed:', error.message, error);
      setStatus('The order could not be sent. Please try again or contact me on WhatsApp.', true);
    } finally {
      submitButton.disabled = false;
    }
  });

}

setupCart();
