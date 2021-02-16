import BaseController from './BaseController.js';
import { errorView } from '../views.js';

export default class ErrorController extends BaseController {

    constructor(domElement){
        super(domElement);
        
        this.pubSub.subscribe(this.eventsText.DISPLAY_ERROR, (error) => {
            this.displayError(error);
        });

        // this.domElement.addEventListener('click', (event) => {
        //     if (event.target == this.domElement || event.target.classList.contains('delete')) {
        //         this.domElement.classList.add('hidden');
        //     }
        // })
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

}