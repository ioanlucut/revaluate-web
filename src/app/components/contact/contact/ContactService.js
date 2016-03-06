function ContactService(CONTACT_URLS, $http) {

  this.sendContact = function (contact) {
    return $http
      .post(URLTo.api(CONTACT_URLS.contact), contact.model);
  };
}

export default ContactService;
