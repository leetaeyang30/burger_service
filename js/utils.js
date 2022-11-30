const catalogList = document.querySelector('.catalog__list');

const getData = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
}

const closeModal = ({target, currentTarget}) => {

  if(target.closest('.modal__close') || target === currentTarget) {
    currentTarget.classList.remove('modal_open');
    currentTarget.removeEventListener('click', closeModal);
  }
};

const onEscPress = ({key, currentTarget}) => {
  if (key === 'Esc' || key === 'Escape') {
    currentTarget.classList.remove('modal_open');
    document.removeEventListener('keydown', onEscPress);
  }
}

export {
  catalogList,
  getData,
  closeModal,
  onEscPress
}
