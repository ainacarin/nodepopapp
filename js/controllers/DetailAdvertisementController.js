import BaseController from "./BaseController.js";
import dataService from '../services/DataService.js';
import { advertisementDetailView } from '../views.js';

export default class DetailAdvertisementController extends BaseController {

    constructor(domElement) {
        super(domElement);
        // this.checkIfUserIsLogged();
        this.loadDetailAdvertisement();
    }

    // async checkIfUserIsLogged() {
    //     const isUserLogged = await dataService.isUserLogged();
    //     if (isUserLogged) {
    //         this.publish(this.eventsText.HIDE_LOADER);
    //     } else {
    //         window.location.href = '/login.html?next=/new-advertisement.html';
    //     }
    // }

    customizeView(advertisement) {
        advertisement.name = advertisement.name.toUpperCase();
        if(advertisement.sale){
            advertisement.saleText = 'Se vende';
        } else{
            advertisement.saleText = 'Se busca';
        }
        return advertisement;
    }

    render(advertisement) {
        const article = document.createElement('article');

        //customize view
        const advertisementModified = this.customizeView(advertisement);
        article.innerHTML = advertisementDetailView(advertisementModified);
        const advertisementImage = article.querySelector('img');
        if(advertisementImage) {
            advertisementImage.addEventListener('error', event => {  
                advertisementImage.setAttribute("src", "https://bulma.io/images/placeholders/1280x960.png")
            });
        }
        const deleteButton = article.querySelector('button');
        if(deleteButton) {
            deleteButton.addEventListener('click', async event => {
                const deleteConfirmed = confirm('¿Seguro que desea borrar el artículo?');
                if (deleteConfirmed) {
                    await dataService.deleteAdvertisement(advertisementModified.id);
                    this.publish(this.eventsText.ADVERTISEMENT_DELETED, {});
                    window.location.href = '/';
                }
            })
        }
        this.domElement.appendChild(article);
    }

    async loadDetailAdvertisement() {
        this.pubSub.publish(this.eventsText.SHOW_LOADER, {});
        try {
            let idAdvertisement = null; 
            const idAdvertisementParam = window.location.search.replace('?', '');  // ?id=idAdvertisement -> id=idAdvertisement
            const idAdvertisementParamParts = idAdvertisementParam.split('=');
            if (idAdvertisementParamParts.length == 2 && idAdvertisementParamParts[0] === 'id') {
                idAdvertisement = idAdvertisementParamParts[1];
            }
            const advertisement = await dataService.getOneAdvertisement(idAdvertisement);
            this.render(advertisement);
          } catch (error) {
            this.publish(this.eventsText.DISPLAY_ERROR, error);
          } finally {
            this.publish(this.eventsText.HIDE_LOADER);
          }


        // try {
        //     const advertisement = await dataService.getOneAdvertisement();
        //     this.render(advertisement);
        // } catch (error) {
        //     console.error("Se ha producido un error en loadOneAdvertisement",error);
        //     this.pubSub.publish('displayError', error);
        // } finally {
        //     this.pubSub.publish(this.eventsText.HIDE_LOADER, {});
        // }
    }

}