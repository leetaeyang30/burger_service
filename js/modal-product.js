import { API_URL, PREFIX_PRODUCT } from './api.js';
import { catalogList, closeModal, getData, onEscPress } from './utils.js';

const modalProduct = document.querySelector('.modal__product');
const modalProductTitle = modalProduct.querySelector('.modal-product__title');
const modalProductImage = modalProduct.querySelector('.modal-product__image');
const modalProductDescription = modalProduct.querySelector('.modal-product__description');
const modalProductIngredients = modalProduct.querySelector('.ingredients__list');
const modalProductPrice = modalProduct.querySelector('.modal-product__price-count');
const modalProductCalories = document.querySelector('.ingredients__calories');
const modalProductBtn = document.querySelector('.modal-product__btn');


const renderProductDetails = async (id) => {
  const item = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);

  modalProductTitle.textContent = item.title;
  modalProductImage.src = `${API_URL}/${item.image}`;
  modalProductDescription.textContent = item.description;
  modalProductPrice.textContent = item.price;
  modalProductCalories.textContent = `${item.weight}г, ккал ${item.calories}`;
  modalProductBtn.dataset.idProduct = item.id;

  modalProductIngredients.textContent = '';
  const ingredients = item.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
  })

  modalProductIngredients.append(...ingredients);

  modalProduct.classList.add('modal_open');
};

catalogList.addEventListener('click', (evt) => {
  if(evt.target.closest('.product__detail')
    || evt.target.closest('.product__image')) {
      const id = evt.target.closest('.product').dataset.idProduct;
      renderProductDetails(id);
      document.addEventListener('keydown', onEscPress);
  }
});

modalProduct.addEventListener('click', (evt) => {
  closeModal(evt);
  onEscPress(evt);
});

export { modalProductBtn }
