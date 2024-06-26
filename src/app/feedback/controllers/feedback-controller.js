(function () {
    'use strict';

    angular
        .module('revaluate.feedback')
        .controller('FeedbackModalController', function ($scope, FeedbackModalService, Feedback, $timeout) {

            var TIMEOUT = 1500;

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

            $scope.openFeedbackModal = function () {
                FeedbackModalService.open();

                /**
                 * If send feedback modal is opened
                 */
                FeedbackModalService
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
            $scope.dismissFeedbackModal = function () {
                FeedbackModalService
                    .modalInstance
                    .dismiss('cancel');

                $scope.isModalOpened = false;
            };

            /**
             * Sends the feedback.
             * @param feedbackForm
             */
            $scope.sendFeedbackAndClose = function (feedbackForm) {
                if (feedbackForm.$valid && !$scope.isSending) {

                    // Is sending feedback
                    $scope.isSending = true;

                    $scope
                        .feedback
                        .send()
                        .then(function () {
                            $scope.isSent = true;

                            $timeout(function () {
                                $scope.isSending = false;
                                FeedbackModalService
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
