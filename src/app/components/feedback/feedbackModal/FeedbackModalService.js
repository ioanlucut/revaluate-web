/* Feedback modal */

function FeedbackModalService($modal) {

  /**
   * Feedback modal instance.
   * @type {null}
   */
  this.modalInstance = null;

  /**
   * Define feedback modal object.
   */
  this.open = function () {

    this.modalInstance = $modal.open({
      templateUrl: '/app/components/feedback/feedbackModal/feedbackModal.html',
      controller: 'FeedbackModalController',
      windowClass: 'modal-feedback',
    });
  };

}

export default FeedbackModalService;
