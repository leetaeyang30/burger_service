import { catalogList, closeModal, onEscPress } from './utils.js';

const modalProduct = document.querySelector('.modal__product');
const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');
const modalProductIngredients = document.querySelector('.ingredients__list');
const modalProductPrice = document.querySelector('.modal-product__price-count');
const modalProductCalories = document.querySelector('.ingredients__calories');

const product = {
  title: 'Егерь',
  price: 700,
  weight: 500,
  calories: 800,
  description: 'Бургер с олениной и немножечко егерем',
  image: '../img/burger5.jpg',
  ingredients: [
    'Булка',
    'Олень',
    'Егерь',
    'Кетчуп',
    'Холопеньо']
};

const renderProductDetails = (item) => {
  modalProductTitle.textContent = item.title;
  modalProductImage.src = item.image;
  modalProductDescription.textContent = item.description;
  modalProductPrice.textContent = item.price;
  modalProductCalories.textContent = `${item.weight}г, ккал ${item.calories}`;

  modalProductIngredients.textContent = '';
  const ingredients = item.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
  })

  modalProductIngredients.append(...ingredients);
};

catalogList.addEventListener('click', (evt) => {
  if(evt.target.closest('.product__detail')
    || evt.target.closest('.product__image')) {
      renderProductDetails(product);
      modalProduct.classList.add('modal_open');
      document.addEventListener('keydown', onEscPress);
  }
});

modalProduct.addEventListener('click', (evt) => {
  closeModal(evt);
  onEscPress(evt);
});
