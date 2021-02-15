import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'
import { advertisementView } from '../views.js';
import pubSub from '../services/Pubsub.js';


export default class AdvertisementsListController extends BaseController {

    constructor(domElement){
        super(domElement);
    }

    render(advertisements) {
        for (const advertisement of advertisements) {
            const article = document.createElement('article');
            //customize
            advertisement.name = advertisement.name.toUpperCase();
            if(advertisement.sale){
                advertisement.saleText = 'Se vende';
            } else{
                advertisement.saleText = 'Se busca';
            }
            article.innerHTML = advertisementView(advertisement);
            this.domElement.appendChild(article);
        }
    }

    async loadAllAdvertisements() {
        pubSub.publish('showLoader', {});
        try {
            const advertisements = await dataService.getAllAdvertisements();
            this.render(advertisements);
        } catch (error) {
            console.error("Se ha producido un error en loadAllAdvertisements",error);
            pubSub.publish('displayError', error);
        } finally {
            pubSub.publish('hideLoader', {});
        }
    }

}