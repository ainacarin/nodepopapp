import BaseController from "./BaseController.js";
import dataService from '../services/DataService.js'

export default class NewAdvertisementController extends BaseController {

    constructor(domElement) {
        super(domElement);
        // user control
        this.checkIfUserIsLogged();
        // config input price
        this.configInputPrice();
        // config listerners
        this.configListeners();
        // explicit focus field form
        this.focusInInputName();
    }

    
    async checkIfUserIsLogged() {
        const isUserLogged = await dataService.isUserLogged();
        if (isUserLogged) {
            this.publish(this.eventsText.HIDE_LOADER);
        } else {
            window.location.href = '/login.html?next=/new-advertisement.html';
        }
    }

    configInputPrice(){
        const inputPrice = this.domElement.querySelector('.input-price');
        inputPrice.setAttribute('step','0.01');
        inputPrice.setAttribute('min', '0');
    }

    configNewAdvertisementButtonListeners() {
        const buttonNewAdvertisement = this.domElement.querySelector('.button-new-advertisement');
        buttonNewAdvertisement.addEventListener('submit', event => {
            event.preventDefault();
            //disable or not button

            // check input name
            // check radio sale
            // check price
        })
    }

    changeColorElementSuccessToDanger(element) {
        element.classList.remove("is-success");
        element.classList.add("is-danger");
    }

    changeColorElementDangerToSuccess(element) {
        element.classList.remove("is-danger");
        element.classList.add("is-success");
    }

    // configChangeColorElement(element){
    //     if(element.validity.valid) {
    //         this.changeColorElementDangerToSuccess(element);
    //         // element.classList.add("is-success");
    //         // element.classList.remove("is-danger");
    //     } else{
    //         this.changeColorElementSuccessToDanger(element);
    //         // element.classList.remove("is-success");
    //         // element.classList.add("is-danger");
    //     }
    // }

    configInputNameListeners() {
        const inputName = this.domElement.querySelector('.input-name');
        inputName.addEventListener('focusout', event => {
            if(inputName.validity.valid) {
                this.changeColorElementDangerToSuccess(inputName);
            } else {
                this.changeColorElementSuccessToDanger(inputName);
            }
        })
        inputName.addEventListener('keyup', event => {
            if(inputName.validity.valid) {
                this.changeColorElementDangerToSuccess(inputName);
            } else {
                this.changeColorElementSuccessToDanger(inputName);
            }
        })
    }

    configSelectSaleListeners() {
        const selectSale = this.domElement.querySelector('.select-sale');
        selectSale.addEventListener('focusout', event => {
            if(event.target.value == "") {
                this.changeColorElementSuccessToDanger(selectSale);
            } else{
                this.changeColorElementDangerToSuccess(selectSale);
            }
        })
        selectSale.addEventListener('change', event => {
            if(event.target.value == "") {
                // rojo
                this.changeColorElementSuccessToDanger(selectSale);
            } else {
                // verde
                this.changeColorElementDangerToSuccess(selectSale);
            }
        })
    }

    configInputPriceListeners() {
        const inputPrice = this.domElement.querySelector('.input-price');
        inputPrice.addEventListener('focusout', event => {
            if(inputPrice.validity.valid) {
                this.changeColorElementDangerToSuccess(inputName);
            } else {
                this.changeColorElementSuccessToDanger(inputName);
            }
        });
        inputPrice.addEventListener('keyup', event => {
            if(inputPrice.validity.valid) {
                this.changeColorElementDangerToSuccess(inputName);
            } else {
                this.changeColorElementSuccessToDanger(inputName);
            }
        })
    }

    configListeners() {
        // submit form
        this.configNewAdvertisementButtonListeners();
        // input name
        this.configInputNameListeners();
        // select sale
        this.configSelectSaleListeners();
        // input price
        this.configInputPriceListeners();
        // input image
    }

    focusInInputName() {
        const inputName = this.domElement.querySelector('.input-name');
        inputName.focus();
    }

}