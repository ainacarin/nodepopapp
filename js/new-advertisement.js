
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NewAdvertisementController from './controllers/NewAdvertisementController.js';
import LogoutLoginRegisterButtons from './controllers/LogoutLoginRegisterButtons.js';
import NodepopButton from './controllers/NodepopButton.js'


window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const newAdvertisementDOMElement = document.querySelector('.new-advertisement-form');
    new NewAdvertisementController(newAdvertisementDOMElement);
  
    const errorDOMElement = document.querySelector('.global-errors');
    new ErrorController(errorDOMElement);

    const logoutLoginRegisterButtons = document.querySelector('.login-logout-register');
    new LogoutLoginRegisterButtons(logoutLoginRegisterButtons);

    const nodepopButton = document.querySelector('.list-nodepop-button');
    new NodepopButton(nodepopButton);
})
