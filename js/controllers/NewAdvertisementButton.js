import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'


export default class NewAdvertisementButton extends BaseController{

    constructor(domElement) {
        super(domElement);

        this.checkUserLogged();
    }

    async checkUserLogged() {
        const isUserLogged = await dataService.isUserLogged();
        // manage display buttons
        if(isUserLogged){
            const newAdvertisementButton = this.domElement.querySelector('.new-advertisement-button');
            newAdvertisementButton.classList.remove('is-hidden');
        }
        // } else {
        //     const loginRegisterButtons = this.domElement.querySelector('.login-register-buttons');
        //     loginRegisterButtons.classList.remove('is-hidden');
        // }
    }

}