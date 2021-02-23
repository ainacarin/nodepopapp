import BaseController from "./BaseController.js";
import dataService from '../services/DataService.js'

export default class NewAdvertisementController extends BaseController {

    constructor(domElement) {
        super(domElement);
        this.eventsNames = {
            FOCUSOUT: 'focusout',
            KEYUP: 'keyup',
            CHANGE: 'change'
        }
        // user control
        this.checkIfUserIsLogged();
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


    configNewAdvertisementButtonListeners() {
        this.domElement.addEventListener('submit', async event => {
            event.preventDefault();
            const sale = this.domElement.elements.selectSale.options[selectSale.selectedIndex].value;
            const advertisement = {
                name: this.domElement.elements.name.value,
                sale: sale,
                price: this.domElement.elements.price.value,
                image: null
            }
            if (this.domElement.elements.image.files.length > 0) {
                advertisement.image = this.domElement.elements.image.files[0];
            } 
            this.publish(this.eventsText.SHOW_LOADER);
            try {
                await dataService.saveNewAdvertisement(advertisement);
                window.location.href = '/?note=newadvOk';
            } catch (error) {
                this.publish(this.eventsText.DISPLAY_ERROR, error);
            } finally {
                this.publish(this.eventsText.HIDE_LOADER);
            }
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

    checkValidityForm() {
        const button = this.domElement.querySelector('button');
        if (this.domElement.checkValidity()) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }
    }

    configDefaultInputColorListeners(eventName, element){
        element.addEventListener(eventName, event => {
            if(element.validity.valid) {
                this.changeColorElementDangerToSuccess(element);
            } else {
                this.changeColorElementSuccessToDanger(element);
            }
            this.checkValidityForm();
        });
    }

    configInputNameListeners() {
        const inputName = this.domElement.querySelector('.input-name');

        this.configDefaultInputColorListeners(this.eventsNames.FOCUSOUT, inputName);
        this.configDefaultInputColorListeners(this.eventsNames.KEYUP, inputName);

        inputName.addEventListener(this.eventsNames.KEYUP, event => {
            const inputNameTrim = inputName.value.trim();
            if(inputNameTrim.length == 0) {
                this.changeColorElementSuccessToDanger(inputName);
                inputName.setCustomValidity('El nombre no puede estar vacío');
            } else{
                this.changeColorElementDangerToSuccess(inputName);
                inputName.setCustomValidity('');
            }
            this.checkValidityForm();
        });
    }

    configSelectSaleListeners() {
        const selectSale = this.domElement.querySelector('.select-sale');
        selectSale.addEventListener(this.eventsNames.FOCUSOUT, event => {
            if(event.target.value == "true" || event.target.value == "false") {
                this.changeColorElementDangerToSuccess(selectSale);
            } else{
                this.changeColorElementSuccessToDanger(selectSale);
            }
            this.checkValidityForm();
        })
        selectSale.addEventListener(this.eventsNames.CHANGE, event => {
            if(event.target.value == "true" || event.target.value == "false") {
                // verde
                this.changeColorElementDangerToSuccess(selectSale);
            } else {
                // rojo
                this.changeColorElementSuccessToDanger(selectSale);
            }
            this.checkValidityForm();
        })
    }

    configInputPriceListeners() {
        const inputPrice = this.domElement.querySelector('.input-price');

        this.configDefaultInputColorListeners(this.eventsNames.FOCUSOUT, inputPrice);
        this.configDefaultInputColorListeners(this.eventsNames.KEYUP, inputPrice);

        inputPrice.addEventListener(this.eventsNames.KEYUP, event => {
            if(inputPrice.value < 0) {
                this.changeColorElementSuccessToDanger(inputPrice);
                inputPrice.setCustomValidity('El precio no puede ser menor de 0€');
            } else{
                this.changeColorElementDangerToSuccess(inputPrice);
                inputPrice.setCustomValidity('');
            }
            this.checkValidityForm();
        })
    }

    configListeners() {
        // submit form
        this.configNewAdvertisementButtonListeners();
        // inputs: name and price
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