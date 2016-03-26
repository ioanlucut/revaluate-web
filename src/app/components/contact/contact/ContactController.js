function ContactController($scope, ContactModalService, Contact, $timeout) {
  'ngInject';

  const TIMEOUT = 1500;

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

  $scope.openContactModal = () => {
    ContactModalService.open();

    /**
     * If send contact modal is opened
     */
    ContactModalService
      .modalInstance
      .opened
      .then(() => {
        $scope.isModalOpened = true;
      });
  };

  /**
   * Dismiss the create/update modal.
   */
  $scope.dismissContactModal = () => {
    ContactModalService
      .modalInstance
      .dismiss('cancel');

    $scope.isModalOpened = false;
  };

  /**
   * Sends the contact.
   * @param contactForm
   */
  $scope.sendContactAndClose = contactForm => {
    if (contactForm.$valid && !$scope.isSending) {

      // Is sending contact
      $scope.isSending = true;

      $scope
        .contact
        .send()
        .then(() => {
          $scope.isSent = true;

          $timeout(() => {
            $scope.isSending = false;
            ContactModalService
              .modalInstance
              .close();
          }, TIMEOUT);

        })
        .catch(() => {
          $scope.isSending = false;
          alert('Something went wrong. Please try again.');
        })
        .finally(() => {
          $scope.isModalOpened = false;
          $scope.isSending = false;
        });
    }
  };

}

export default ContactController;
