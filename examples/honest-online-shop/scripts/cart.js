const cart = JSON.parse(localStorage.getItem('cart')) || [];
const list = document.querySelector('#order-list');
let totalPrice = 0;

cart.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${item.name} - $${(item.priceCents / 100).toFixed(2)}`;
  list.appendChild(listItem);
  totalPrice += item.priceCents;
});

document.querySelector('#total').textContent = totalPrice;