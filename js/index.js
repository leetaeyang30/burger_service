const modalProduct = document.querySelector('.modal__product');
const catalogList = document.querySelector('.catalog__list');

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

const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector('.modal-product__description');
const modalProductIngredients = document.querySelector('.ingredients__list');
const modalProductPrice = document.querySelector('.modal-product__price-count');
const modalProductCalories = document.querySelector('.ingredients__calories');

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
modalProductDescription.textContent = product.description;
modalProductPrice.textContent = product.price;
modalProductCalories.textContent = `${product.weight}г, ккал ${product.calories}`;

modalProductIngredients.textContent = '';
const ingredients = product.ingredients.map((item) => {
  const li = document.createElement('li');
  li.classList.add('ingredients__item');
  li.textContent = item;
  return li;
})

modalProductIngredients.append(...ingredients);


catalogList.addEventListener('click', (evt)=>{
  if(evt.target.closest('.product__detail')
      || evt.target.closest('.product__image'))
  modalProduct.classList.add('modal_open');
});

modalProduct.addEventListener('click', (evt)=>{
  const targetEvent = evt.target;

  if(targetEvent.closest('.modal__close') || targetEvent === modalProduct) {
    modalProduct.classList.remove('modal_open');
  }
});
