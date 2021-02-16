import pubSub from '../services/Pubsub.js';

export default class BaseController {
    constructor(DOMElement) {
        this.domElement = DOMElement;

        /** Config events */
        this.pubSub = pubSub;
        this.eventsText= {
            SHOW_LOADER: 'showLoader',
            HIDE_LOADER: 'hideLoader',
            DISPLAY_ERROR: 'displayError'
        }
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventText, eventHandler);
    }

    publish(eventName, eventData) {  
        this.pubSub.publish(eventName, eventData);
    }
}