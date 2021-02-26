import AdvertisementsListController from './controllers/AdvertisementsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewAdvertisementButton from './controllers/NewAdvertisementButton.js';
import LogoutLoginRegisterButtons from './controllers/LogoutLoginRegisterButtons.js';

window.addEventListener('DOMContentLoaded', (event) => {

  const loaderDOMElement = document.querySelector('.lds-roller');
  const loaderController = new LoaderController(loaderDOMElement);

  const advertisementsList = document.querySelector('.advertisements-list');
  const advertisementsController = new AdvertisementsListController(advertisementsList);
  advertisementsController.loadAllAdvertisements();

  const errorDOMElement = document.querySelector('.global-errors');
  new ErrorController(errorDOMElement);

  const newAdvertisementButton = document.querySelector('.new-advertisement');
  new NewAdvertisementButton(newAdvertisementButton);

  const logoutLoginRegisterButtons = document.querySelector('.login-logout-register');
  new LogoutLoginRegisterButtons(logoutLoginRegisterButtons);

})