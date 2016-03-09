function FeedbackController($scope, FeedbackModalService, Feedback, $timeout) {

  const TIMEOUT = 1500;

  /**
   * Feedback.
   */
  $scope.feedback = new Feedback();

  /**
   * Flags during the lifetime of the feedback.
   * @type {boolean}
   */
  $scope.isSending = false;
  $scope.isSent = false;

  $scope.openFeedbackModal = () => {
    FeedbackModalService.open();

    /**
     * If send feedback modal is opened
     */
    FeedbackModalService
      .modalInstance
      .opened
      .then(() => {
        $scope.isModalOpened = true;
      });
  };

  /**
   * Dismiss the create/update modal.
   */
  $scope.dismissFeedbackModal = () => {
    FeedbackModalService
      .modalInstance
      .dismiss('cancel');

    $scope.isModalOpened = false;
  };

  /**
   * Sends the feedback.
   * @param feedbackForm
   */
  $scope.sendFeedbackAndClose = feedbackForm => {
    if (feedbackForm.$valid && !$scope.isSending) {

      // Is sending feedback
      $scope.isSending = true;

      $scope
        .feedback
        .send()
        .then(() => {
          $scope.isSent = true;

          $timeout(() => {
            $scope.isSending = false;
            FeedbackModalService
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

export default FeedbackController;
