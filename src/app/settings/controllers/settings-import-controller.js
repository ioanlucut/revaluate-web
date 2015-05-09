/**
 * Setting import controller.
 */
angular
    .module("settings")
    .controller("SettingsImportController", function ($q, $scope, $rootScope, $timeout, AUTH_URLS, FileUploader, StatesHandler, SessionService, AUTH_EVENTS, flash, currencies, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        // ---
        // Configure uploader.
        // ---
        var uploader = $scope.uploader = new FileUploader({
            url: URLTo.api(AUTH_URLS.importExpense),
            headers: {
                'Authorization': 'Bearer ' + SessionService.getJwtToken()
            }
        });

        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        /**
         * Saving timeout
         */
        var TIMEOUT_PENDING = 300;

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        $scope.currencies = currencies;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.import;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsImport);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Selected currency
         * @type {{}}
         */
        $scope.currency = $scope.user.model.currency;

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                currency: $scope.user.model.currency
            };
        }

        /**
         * Profile user information.
         */
        $scope.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        $scope.updatePreferences = function () {
            if ( $scope.preferencesForm.$valid && !$scope.isSaving ) {

                // Show the loading bar
                $scope.isSaving = true;

                $scope.profileData.currency = angular.copy($scope.currency.originalObject || $scope.currency);

                // Update the user
                $scope.user
                    .updateCurrency($scope.profileData)
                    .then(function (response) {
                        // ---
                        // Reload data with given response.
                        // ---
                        $scope.user
                            .loadFrom(response.data);

                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Reset the profile data with possible new data.
                        // ---
                        $scope.profileData = angular.copy(getInitialProfileData());

                        $scope.preferencesForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';

                        $timeout(function () {
                            $scope.isSaving = false;
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isSaving = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
                    });
            }
        };

    })
;