import AdvertisementsListController from './controllers/AdvertisementsListController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
  const advertisementsList = document.querySelector('.advertisements-list');
  const advertisementsController = new AdvertisementsListController(advertisementsList);
  advertisementsController.loadAllAdvertisements();
})