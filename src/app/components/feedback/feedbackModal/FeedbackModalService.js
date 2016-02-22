(function () {
  'use strict';

  /* Feedback modal */

  angular
    .module('revaluate.feedback')
    .service('FeedbackModalService', function ($modal) {

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

    });
}());
