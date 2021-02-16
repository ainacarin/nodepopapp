import BaseController from "./BaseController.js";
import pubSub from '../services/Pubsub.js'

export default class LoaderController extends BaseController {

    constructor(domElement){
        super(domElement);

        pubSub.subscribe(this.eventsText.SHOW_LOADER, (event) => {
            this.showLoader()});
        pubSub.subscribe(this.eventsText.HIDE_LOADER, (event) => { 
            this.hideLoader();});
    }

    showLoader() {
        this.domElement.classList.remove('hidden');
    }

    hideLoader() {
        this.domElement.classList.add('hidden');
    }

}