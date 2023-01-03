import { cartController, getCart, renderCartList} from './order-cards.js';

const order = document.querySelector('.order');
const orderList = document.querySelector('.order__list');
const orderTitle = document.querySelector('.order__wrap-title');
const orderSubmit = document.querySelector('.order__submit');
const delivery = document.querySelector('.modal_delivery');
const deliveryForm = document.querySelector('.modal-delivery__form');
const body = document.querySelector('body');

const closeDelivery = (evt) => {
  if(evt.target.closest('.modal__close') || delivery === evt.target) {
    delivery.classList.remove('modal_open');
  }
};

const cartModify = () => {
  orderTitle.addEventListener('click', () => {
    order.classList.toggle('order_open')
  });

  orderSubmit.addEventListener('click', () => {
    delivery.classList.add('modal_open');
  });

  delivery.addEventListener('click', closeDelivery);
}

const resetCart = () => {
  localStorage.removeItem('cart');
  renderCartList();
};

const success = (id) => {
  const modal = document.createElement('div');
    modal.classList.add('modal', 'modal-success');

    modal.innerHTML = `
    <div class="modal__main modal__success">
      <div class="modal-success__container">
        <h2 class="modal-success__title">Еда уже в пути!</h2>
        <p class="modal-success__text">Ваш номер заказа ${id}</p>

        <button class="modal__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)" />
            <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)" />
          </svg>
        </button>
      </div>
    </div>
    `;

  return modal;
};

const orderController = () => {
  deliveryForm.addEventListener('change', () => {
    if(deliveryForm.format.value === 'pickup') {
      deliveryForm['address-info'].classList.add('modal-delivery__fieldset-input--hidden');
    }

    if(deliveryForm.format.value === 'delivery') {
      deliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input--hidden');
    }
  });

  deliveryForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(deliveryForm);
    const data = Object.fromEntries(formData);
    data.order = getCart();

    fetch('https://reqres.in/api/users', {
      method: 'post',
      body: JSON.stringify(data),
    }).then (response => response.json())
    .then((data) => {
      let successNotification = success(data.id);
      body.append(successNotification);
      successNotification.classList.add('modal_open');
      const closeNotification = () => {
        const button = successNotification.querySelector('.modal__close');
        button.addEventListener('click', () => {
          successNotification.classList.remove('modal_open');
        })
      };
      closeNotification();
    });

    resetCart();
    delivery.removeEventListener('click', closeDelivery);
    delivery.classList.remove('modal_open');
    order.classList.toggle('order_open');
  });
}

const cartInit = () => {
  orderController();
  cartController();
  renderCartList();
};

export {cartModify, orderSubmit, cartInit }
