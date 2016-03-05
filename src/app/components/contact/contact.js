import ContactController from 'src/app/components/contact/contact/ContactController';
import ContactMessage from 'src/app/components/contact/contact/ContactMessage';
import ContactService from 'src/app/components/contact/contact/ContactService';
import contactConstants from 'src/app/components/contact/contact/contactConstants';
import ContactModalService from 'src/app/components/contact/contactModal/ContactModalService';

export default angular
  .module('revaluate.contact', [])
  .controller('ContactModalController', ContactController)
  .factory('Contact', ContactMessage)
  .service('ContactService', ContactService)
  .constant('CONTACT_URLS', contactConstants)
  .service('ContactModalService', ContactModalService);
