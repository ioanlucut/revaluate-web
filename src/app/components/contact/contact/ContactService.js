function ContactService(CONTACT_URLS, $http) {
  'ngInject';

  this.sendContact = contact => $http
    .post(URLTo.api(CONTACT_URLS.contact), contact.model);
}

export default ContactService;
