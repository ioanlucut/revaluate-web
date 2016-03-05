export default

  angular
    .module('revaluate.contact')
    .service('ContactService', function (CONTACT_URLS, $http) {

      this.sendContact = function (contact) {
        return $http
          .post(URLTo.api(CONTACT_URLS.contact), contact.model);
      };
    });

