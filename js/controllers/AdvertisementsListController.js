import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'
import { advertisementView, emptyAdvertisementsList } from '../views.js';


export default class AdvertisementsListController extends BaseController {

    constructor(domElement){
        super(domElement);

        this.subscribe(this.eventsText.ADVERTISEMENT_DELETED, event => {
            this.loadAllAdvertisements();
        });
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
        if(advertisements.length <= 0) {
            const article = document.createElement('article');
            article.innerHTML = emptyAdvertisementsList;
            this.domElement.appendChild(article);
        } else{

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
                const detailButton = article.querySelector('button');
                if(detailButton) {
                    detailButton.addEventListener('click', event => {
                        window.location.href = '/detail-advertisement.html?id=' + advertisement.id;
                    })
                }
                this.domElement.appendChild(article);
            }
        }
    }

    async loadAllAdvertisements() {
        this.pubSub.publish(this.eventsText.SHOW_LOADER, {});
        try {
            const advertisements = await dataService.getAllAdvertisements();
            this.render(advertisements);
        } catch (error) {
            this.pubSub.publish(this.eventsText.DISPLAY_ERROR, error);
        } finally {
            this.pubSub.publish(this.eventsText.HIDE_LOADER, {});
        }
    }

}