(function () {
  'use strict';

  angular
    .module('revaluate.contact')
    .controller('ContactModalController', function ($scope, ContactModalService, Contact, $timeout) {

      var TIMEOUT = 1500;

      /**
       * Contact.
       */
      $scope.contact = new Contact();

      /**
       * Flags during the lifetime of the contact.
       * @type {boolean}
       */
      $scope.isSending = false;
      $scope.isSent = false;

      $scope.openContactModal = function () {
        ContactModalService.open();

        /**
         * If send contact modal is opened
         */
        ContactModalService
          .modalInstance
          .opened
          .then(function () {
              $scope.isModalOpened = true;
            }
          );
      };

      /**
       * Dismiss the create/update modal.
       */
      $scope.dismissContactModal = function () {
        ContactModalService
          .modalInstance
          .dismiss('cancel');

        $scope.isModalOpened = false;
      };

      /**
       * Sends the contact.
       * @param contactForm
       */
      $scope.sendContactAndClose = function (contactForm) {
        if (contactForm.$valid && !$scope.isSending) {

          // Is sending contact
          $scope.isSending = true;

          $scope
            .contact
            .send()
            .then(function () {
              $scope.isSent = true;

              $timeout(function () {
                $scope.isSending = false;
                ContactModalService
                  .modalInstance
                  .close();
              }, TIMEOUT);

            })
            .catch(function () {
              $scope.isSending = false;
              alert('Something went wrong. Please try again.');
            })
            .finally(function () {
              $scope.isModalOpened = false;
              $scope.isSending = false;
            });
        }
      };

    });
}());
