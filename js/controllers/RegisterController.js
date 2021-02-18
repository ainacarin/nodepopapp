import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class RegisterController extends BaseController {

    constructor(domElement) {
        super(domElement);
        this.submitButton = this.domElement.querySelector('button');

        //config Listeners
        this.configAllListeners();
    }

    configSubmitListener() {
        this.domElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            // get form data
            const user = {
                username: this.domElement.elements.username.value,
                password: this.domElement.elements.password.value
            }
            // send data
            this.publish(this.eventsText.SHOW_LOADER);
            try {
                const registeredUser = await dataService.registerUser(user);
                alert('Usuario creado');
                window.location.href = '/register.html'; 
            } catch (error) {
                this.publish(this.eventsText.DISPLAY_ERROR, error);
            } finally {
                this.publish(this.eventsText.HIDE_LOADER);
            }
        });
    }

    checkValidityRegisterForm() {
        if(this.domElement.checkValidity()) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', true);
        }
    }
    
    // configOneInputListener(inputElement) {
    //     inputElement.addEventListener('keyup', (event) => {
    //         if(inputElement.validity.valid) {
    //             inputElement.classList.add('is-success');
    //             inputElement.classList.remove('is-danger');
    //         } else {
    //             inputElement.classList.add('is-danger');
    //             inputElement.classList.remove('is-success');
    //         }
    //         // after each keyup validates the form to change disabled attribute
    //         this.checkValidityRegisterForm();
    //     })
    // }

    configAllInputsListeners() {
        this.domElement.querySelectorAll('input').forEach(inputElement => {
            inputElement.addEventListener('keyup', (event) => {
                if(inputElement.validity.valid) {
                    inputElement.classList.add('is-success');
                    inputElement.classList.remove('is-danger');
                } else {
                    inputElement.classList.add('is-danger');
                    inputElement.classList.remove('is-success');
                }
                // after each keyup validates the form to change disabled attribute
                this.checkValidityRegisterForm();
            })
        })
    }


    configAllListeners() {
        // const button = this.domElement.querySelector('button');
        // button.removeAttribute('disabled');

        // submit form listener
        this.configSubmitListener();
        // inputs listener
        this.configAllInputsListeners();
    }
}