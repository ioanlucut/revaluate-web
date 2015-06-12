angular
    .module("revaluate.account")
    .controller("EmailConfirmationResendController", function ($scope, $rootScope, $timeout, flash, AuthService, StatesHandler, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.validatePassword;

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        var sendConfirmationEmailData = {
            email: $scope.user.model.email
        };

        $scope.sendConfirmationEmail = function (sendConfirmationEmailForm) {
            if ( sendConfirmationEmailForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .requestConfirmationEmail(sendConfirmationEmailData.email)
                    .then(function () {
                        $timeout(function () {
                            $scope.isRequestPending = false;
                            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully sent the confirmation email!';
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    });
