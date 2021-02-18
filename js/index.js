import AdvertisementsListController from './controllers/AdvertisementsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewAdvertisementLoginRegisterButtons from './controllers/NewAdvertisementLoginRegisterButtons.js'

window.addEventListener('DOMContentLoaded', (event) => {

  const loaderDOMElement = document.querySelector('.lds-roller');
  const loaderController = new LoaderController(loaderDOMElement);

  const advertisementsList = document.querySelector('.advertisements-list');
  const advertisementsController = new AdvertisementsListController(advertisementsList);
  advertisementsController.loadAllAdvertisements();

  const errorDOMElement = document.querySelector('.global-errors');
  new ErrorController(errorDOMElement);

  const newAdvertisementButtons = document.querySelector('.new-advertisement');
  new NewAdvertisementLoginRegisterButtons(newAdvertisementButtons);
})