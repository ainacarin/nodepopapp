
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import DetailAdvertisementController from './controllers/DetailAdvertisementController.js';
import LogoutLoginRegisterButtons from './controllers/LogoutLoginRegisterButtons.js';
import NodepopButton from './controllers/NodepopButton.js'

window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const detailAdvertisementDOMElement = document.querySelector('.advertisement-detail');
    new DetailAdvertisementController(detailAdvertisementDOMElement);
  
    const errorDOMElement = document.querySelector('.global-url-errors');
    new ErrorController(errorDOMElement);

    const logoutLoginRegisterButtons = document.querySelector('.login-logout-register');
    new LogoutLoginRegisterButtons(logoutLoginRegisterButtons);

    const nodepopButton = document.querySelector('.list-nodepop-button');
    new NodepopButton(nodepopButton);

})
