import BaseController from './BaseController.js';
import dataService from '../services/DataService.js'
import { advertisementView } from '../views.js';


export default class AdvertisementsListController extends BaseController {

    render(advertisements) {
        for (const advertisement of advertisements) {
            const article = document.createElement('article');
            article.innerHTML = advertisementView(advertisement);
            this.domElement.appendChild(article);
        }
    }

    async loadAllAdvertisements() {
        try {
            const advertisements = await dataService.getAllAdvertisements();
            this.render(advertisements);
        } catch (error) {
            console.error("Se ha producido un error en loadAllAdvertisements",error);
        }
    }

}