import ContactController from './contact/ContactController';
import ContactMessage from './contact/ContactMessage';
import ContactService from './contact/ContactService';
import contactConstants from './contact/contactConstants';
import ContactModalService from './contactModal/ContactModalService';

export default angular
  .module('revaluate.contact', [])
  .controller('ContactModalController', ContactController)
  .factory('Contact', ContactMessage)
  .service('ContactService', ContactService)
  .constant('CONTACT_URLS', contactConstants)
  .service('ContactModalService', ContactModalService);
