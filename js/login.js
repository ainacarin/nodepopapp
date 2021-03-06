import LoginController from './controllers/LoginController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import NodepopButton from './controllers/NodepopButton.js'


window.addEventListener('DOMContentLoaded', () => {

    const loaderDOMElement = document.querySelector('.lds-roller');
    new LoaderController(loaderDOMElement);
  
    const loginDOMElement = document.querySelector('.login-form');
    new LoginController(loginDOMElement);
  
    const errorDOMElement = document.querySelector('.global-errors');
    new ErrorController(errorDOMElement);

    const nodepopButton = document.querySelector('.list-nodepop-button');
    new NodepopButton(nodepopButton);
})
