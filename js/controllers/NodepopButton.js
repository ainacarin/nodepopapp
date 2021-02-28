import BaseController from "./BaseController.js";

export default class NodepopButton extends BaseController {

    constructor(domElement){
        super(domElement);
        const nodepopButton = this.domElement.querySelector('.nodepop-button');
        nodepopButton.classList.remove('is-hidden');
    }

}