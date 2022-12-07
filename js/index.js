import { renderList } from './renderList.js';
import { navController } from './nav-controller.js';
import { cartInit } from './cart.js';
import './modal-product.js';

const init = () => {
  renderList();
  navController(renderList);
  cartInit();
}

init();
