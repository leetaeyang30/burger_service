const navList = document.querySelector('.navigation__list');
const navButtonsList = document.querySelectorAll('.navigation__button');
const catalogTitle = document.querySelector('.catalog__title');

const navController = (cb) => {
  navList.addEventListener('click', (evt) => {
    const itemCategory = evt.target.closest('.navigation__button');

    if(!itemCategory) return ;

    navButtonsList.forEach((item) => {
      if (item === itemCategory) {
        item.classList.add('navigation__button_active');
        catalogTitle.textContent = item.textContent;
        cb(item.dataset.category)
      } else {
        item.classList.remove('navigation__button_active');
      }
    })
  })
};

export { navController }
