import RegisterController from './controllers/RegisterController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';


window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const registerDOMElement = document.querySelector('.register-form');
    new RegisterController(registerDOMElement);
  
    const errorDOMElement = document.querySelector('.global-errors');
    new ErrorController(errorDOMElement);



})
