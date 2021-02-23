
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import DetailAdvertisementController from './controllers/DetailAdvertisementController.js';


window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const detailAdvertisementDOMElement = document.querySelector('.advertisement-detail');
    new DetailAdvertisementController(detailAdvertisementDOMElement);
  
    const errorDOMElement = document.querySelector('.global-errors');
    new ErrorController(errorDOMElement);



})
