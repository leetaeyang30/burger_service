import { renderList } from './renderList.js';
import { navController } from './nav-controller.js';
import './modal-product.js';

const init = () => {
  renderList();
  navController();
}

init();
