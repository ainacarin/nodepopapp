
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewAdvertisementController from './controllers/NewAdvertisementController.js';


window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const newAdvertisementDOMElement = document.querySelector('.new-advertisement-form');
    new NewAdvertisementController(newAdvertisementDOMElement);
  
    const errorDOMElement = document.querySelector('.global-errors');
    new ErrorController(errorDOMElement);



})
