export function setupCart() {

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }

  console.log('setupCart is running');

    document.querySelectorAll('.order-button[data-service-id]').forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(button.dataset.serviceId);
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
        order_total: `$${formartCurrency(getTotalCents())}`
      });

      cart = [];
      form.reset();
      updateCartQuantity();
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