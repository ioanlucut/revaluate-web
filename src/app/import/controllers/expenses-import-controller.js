/**
 * Setting import controller.
 */
angular
    .module("revaluate.expensesImport")
    .controller("ExpensesImportController", function ($q, $scope, $rootScope, $timeout, IMPORT_PARSE_ANALYSE_URLS, importType, FileUploader, ImportService, ExpensesImport, StatesHandler, SessionService, AUTH_EVENTS, flash, categories, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        // ---
        // Configure uploader.
        // ---
        var QUEUE_LIMIT = 1;
        var AUTO_UPLOAD = true;
        var IS_EMPTY_AFTER_SELECTION = true;

        /**
         * Saving timeout
         */
        var TIMEOUT_PENDING = 300;

        /**
         * All given categories.
         * @type {categories|*}
         */
        $scope.categories = categories;

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

        // ---
        // Flag which says if the upload is finished. Does not matter if successful/not.
        // ---
        $scope.isUploadFinished = false;

        // ---
        // Flag which says if the upload is successful.
        // ---
        $scope.isUploadSuccessful = false;

        // ---
        // This is the answer we get from server after analysing the import.
        // ---
        $scope.expensesImportAnswer = {};

        // ---
        // Define uploader.
        // ---
        var uploader = $scope.uploader = new FileUploader({
            url: URLTo.api(IMPORT_PARSE_ANALYSE_URLS[importType]),
            headers: {
                'Authorization': 'Bearer ' + SessionService.getJwtToken()
            },
            autoUpload: AUTO_UPLOAD,
            queueLimit: QUEUE_LIMIT
        });

        // ---
        // We want to have the input cleared after upload.
        // ---
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return IS_EMPTY_AFTER_SELECTION;
        };

        // ---
        // We only allow CSV files.
        // ---
        uploader.filters.push({
            name: 'csvFilter',
            fn: function (item, options) {
                return '|text/csv|application/vnd.ms-excel|text/plain|text/tsv|'.indexOf(item.type) !== -1;
            }
        });

        // ---
        // If file does not pass the filter, show an error message.
        // ---
        uploader.onWhenAddingFileFailed = function (item, filter, options) {

            flash.to($scope.alertIdentifierId).error = 'Hmm.. are you trying to upload anything but a CSV file?'
        };

        // ---
        // If successful, take the answer.
        // ---
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // ---
            // If there was a previously error, just clear it.
            // ---
            flash.to($scope.alertIdentifierId).error = '';

            // ---
            // Build the import answer, and toggle view.
            // ---
            $scope.expensesImportAnswer = ExpensesImport.build(response);
            $timeout(function () {
                $scope.isUploadSuccessful = true;
            }, TIMEOUT_PENDING);
        };

        // ---
        // On error item.
        // ---
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            flash.to($scope.alertIdentifierId).error = 'Something went wrong. Can you please try one more time?';

            // ---
            // Reset previously added file.
            // ---
            $scope.uploader.clearQueue();
        };

        // ---
        // Mark upload completed.
        // ---
        uploader.onCompleteItem = function (fileItem, response, status, headers) {

            $scope.isUploadFinished = true;
        };

        /**
         * Update profile functionality.
         */
        $scope.submitPerformImport = function () {
            if ( $scope.expensesImportForm.$valid && !$scope.isImporting ) {

                // Show the loading bar
                $scope.isImporting = true;

                // ---
                // Detach from scope.
                // ---
                var expensesImportPrepared = angular.copy($scope.expensesImportAnswer);

                // ---
                // We need to perform a transform of the selected categories.
                // ---
                _.each(expensesImportPrepared.model.expenseCategoryMatchingProfileDTOs, function (expenseCategoryMatchingProfileDTO) {
                    expenseCategoryMatchingProfileDTO.categoryDTO = angular.copy(expenseCategoryMatchingProfileDTO.category.originalObject.model);
                });

                // ---
                // Perform import.
                // ---
                ImportService
                    .importExpenses(importType, expensesImportPrepared)
                    .then(function () {
                        $scope.expensesImportForm.$setPristine();

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully imported your expenses!';

                        $timeout(function () {
                            $scope.isImporting = false;
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isImporting = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to import your expenses.';
                    });
            }
        };

    });