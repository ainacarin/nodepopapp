import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'
import { advertisementView } from '../views.js';


export default class AdvertisementsListController extends BaseController {

    constructor(domElement){
        super(domElement);
    }

    customizeView(advertisement) {
        advertisement.name = advertisement.name.toUpperCase();
        if(advertisement.sale){
            advertisement.saleText = 'Se vende';
        } else{
            advertisement.saleText = 'Se busca';
        }
        return advertisement;
    }

    render(advertisements) {
        for (const advertisement of advertisements) {
            const article = document.createElement('article');

            //customize view
            const advertisementModified = this.customizeView(advertisement);
            article.innerHTML = advertisementView(advertisementModified);
            const advertisementImage = article.querySelector('img');
            if(advertisementImage) {
                advertisementImage.addEventListener('error', event => {  
                    advertisementImage.setAttribute("src", "https://bulma.io/images/placeholders/1280x960.png")
                });
            }
            this.domElement.appendChild(article);
        }
    }

    async loadAllAdvertisements() {
        this.pubSub.publish(this.eventsText.SHOW_LOADER, {});
        try {
            const advertisements = await dataService.getAllAdvertisements();
            this.render(advertisements);
        } catch (error) {
            console.error("Se ha producido un error en loadAllAdvertisements",error);
            this.pubSub.publish('displayError', error);
        } finally {
            this.pubSub.publish(this.eventsText.HIDE_LOADER, {});
        }
    }

}