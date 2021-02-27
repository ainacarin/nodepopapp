import BaseController from './BaseController.js';
import { errorView } from '../views.js';
import dataService from '../services/DataService.js';

export default class ErrorController extends BaseController {

    constructor(domElement){
        super(domElement);
        
        this.pubSub.subscribe(this.eventsText.DISPLAY_ERROR, (error) => {
            this.displayError(error);
        });


        this.pubSub.subscribe(this.eventsText.ADVERTISEMENT_ERROR_DELETED, (error) => {
            this.displayUrlError(error);
        });
    }

    displayError(error) {
        this.domElement.innerHTML = errorView(error);
        this.domElement.classList.remove('hidden');
        this.domElement.addEventListener('click', (event) => {
            if (event.target == this.domElement || event.target.classList.contains('delete')) {
                this.domElement.classList.add('hidden');
            }
        })
    }

    displayUrlError(error) {
        this.domElement.innerHTML = errorView(error.message);
        this.domElement.classList.remove('hidden');
        this.domElement.addEventListener('click', (event) => {
            if (event.target == this.domElement || event.target.classList.contains('delete')) {
                this.domElement.classList.add('hidden');
                error.callback();
            }
        })
    }

}