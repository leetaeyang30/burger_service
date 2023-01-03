import { API_URL, PREFIX_PRODUCT } from './api.js';
import { cartModify, orderSubmit } from './cart.js';
import { modalProductBtn } from './modal-product.js';
import { catalogList, getData } from './utils.js';

const countAmount = document.querySelector('.modal-product .count__amount');
const orderCountTotal = document.querySelector('.order__count');
const orderList = document.querySelector('.order__list');
const oderTotalAmount = document.querySelector('.order__total-amount');

const getCart = () => {
  const cartList = localStorage.getItem('cart');
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
};

const renderCartList = async () => {
  const cartList = getCart();

  orderSubmit.disabled = !cartList.length;
  const allIdsOrder = cartList.map(item => item.id);
  const data = cartList.length
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdsOrder}`)
    : [];

  const countProduct = cartList.reduce((acc, item)=> acc + item.count, 0);
  orderCountTotal.textContent = countProduct;

  orderList.textContent = '';
  const orderItems = data.map((item) => {
    const li = document.createElement('li');
    li.classList.add('order__item');
    li.dataset.idProduct = item.id;
    const product = cartList.find(orderItem => orderItem.id === item.id);

    li.innerHTML = `
    <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">
    <div class="order__product">
      <h3 class="order__product-title">${item.title}</h3>
      <p class="order__product-weight">${item.weight}г</p>
      <p class="order__product-price">${item.price}₽</p>
    </div>

    <div class="order__product-count count">
      <button class="count__minus">-</button>
      <p class="count__amount">${product.count}</p>
      <button class="count__plus">+</button>
    </div>
    `;

    return li;
  });

  orderList.append(...orderItems);

  const countTotalPrice = data.reduce((acc, item) => {
    const product = cartList.find((orderItem) => {
      return orderItem.id === item.id
    });

    return acc + item.price*product.count;
    }, 0);

    oderTotalAmount.textContent = countTotalPrice;
};

const updateCart = (list) => {
  localStorage.setItem('cart', JSON.stringify(list));
  renderCartList();
};

const addOrder = (id, count = 1) => {
  const cartList = getCart();
  const product = cartList.find((item) => item.id === id);

  if (product) {
    product.count += count;
  } else {
    cartList.push({id,count})
  }

  updateCart(cartList);
};

const removeOrder = (id) => {
  const cartList = getCart();
  const productIndex = cartList.findIndex((item) => item.id === id);
  cartList[productIndex].count -= 1;

  if(cartList[productIndex].count === 0) {
    cartList.splice(productIndex, 1);
  }

  updateCart(cartList);
};

const cartController = () => {
  catalogList.addEventListener('click', ({target}) => {
    if(target.closest('.product__add')) {
      addOrder(target.closest('.product').dataset.idProduct);
    }
  });

  modalProductBtn.addEventListener('click', () => {
    addOrder(
      modalProductBtn.dataset.idProduct,
      parseInt(countAmount.textContent)
    );
  });

  orderList.addEventListener('click', ({target}) => {
    const targetPlus = target.closest('.count__plus');
    const targetMinus = target.closest('.count__minus');
    const product = target.closest('.order__item');

    if(targetPlus) {
      addOrder(product.dataset.idProduct);
    }
    if(targetMinus) {
      removeOrder(product.dataset.idProduct);
    }
  });

  cartModify();
};

export { cartController, renderCartList, getCart }
