import BaseController from "./BaseController.js";
import dataService from '../services/DataService.js';
import { advertisementDetailView } from '../views.js';

export default class DetailAdvertisementController extends BaseController {

    constructor(domElement) {
        super(domElement);
        this.loadDetailAdvertisement();
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
                try {
                    const isUserLogged = await dataService.isUserLogged();
                    if(isUserLogged) {
                        const deleteConfirmed = confirm('¿Seguro que desea borrar el artículo?');
                        const userCurrent = await dataService.getUser();
                        if (deleteConfirmed && advertisement.userId == userCurrent.userId) {
                            this.publish(this.eventsText.SHOW_LOADER);
                            await dataService.deleteAdvertisement(advertisementModified.id);

                            console.log('');
                            window.location.href = '/';
                        }
                    } else{

                        const conf = {
                            message: 'Anuncio no borrado. Debe de estar logueado para borrar el anuncio',
                            callback: function() {
                                window.location.href = '/login.html';
                            }
                        }
                        this.publish(this.eventsText.ADVERTISEMENT_ERROR_DELETED, conf);

                    }
                } catch (error) {
                    this.publish(this.eventsText.DISPLAY_ERROR, error);
                } finally {
                    this.publish(this.eventsText.HIDE_LOADER);
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

    }

}