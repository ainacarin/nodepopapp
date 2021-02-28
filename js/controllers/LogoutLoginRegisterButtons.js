import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'


export default class LogoutLoginRegisterButtons extends BaseController{

    constructor(domElement) {
        super(domElement);

        this.checkUserLogged();
        this.configLogoutButtonListener();
    }

    async checkUserLogged() {
        const isUserLogged = await dataService.isUserLogged();
        // manage display buttons
        if(isUserLogged){
            const logoutButton = this.domElement.querySelector('.logout-button');
            logoutButton.classList.remove('is-hidden');
        } else {
            const loginRegisterButtons = this.domElement.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }

    async configLogoutButtonListener() {
        const logoutButton = this.domElement.querySelector('.logout-button');
        logoutButton.addEventListener('click', async (event) => {
            const isUserLogged = await dataService.isUserLogged();
            // manage display buttons
            if(isUserLogged){
                await dataService.deleteToken();
            }
        });
    }

}