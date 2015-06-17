'use strict';

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

        // ---
        // Timeout.
        // ---
        var TIMEOUT_PENDING = 1000;

        // ---
        // Server status error.
        // ---
        var BAD_RESPONSE = 400;
        var SERVER_ERROR = 500;

        /**
         * All given categories.
         * @type {categories|*}
         */
        $scope.categories = categories;

        // ---
        // The import type.
        // ---
        $scope.importType = importType;

        // ---
        // The import description.
        // ---
        $scope.importDescription = capitalizeFirstLetter(importType);

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.import;

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
            $scope.isUploadSuccessful = true;
        };

        // ---
        // On error item.
        // ---
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            if ( status === BAD_RESPONSE ) {
                flash.to($scope.alertIdentifierId).error = 'Hmmm... Are you sure the CSV export is from selected app?';
            }
            else {
                if ( status === SERVER_ERROR ) {
                    flash.to($scope.alertIdentifierId).error = 'Something went wrong. Can you please try one more time?'
                }
            }

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

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
         * Show how to block content
         * @type {boolean}
         */
        $scope.showHowToContent = false;

        /**
         * Toggle how to content
         */
        $scope.toggleHowToContent = function () {
            $scope.showHowToContent = !$scope.showHowToContent;
        };

        /**
         * Minimum categories to select
         */
        var MIN_CATEGORIES_TO_SELECT = 1;

        function getSelectedMatchingCategories() {
            return _.filter($scope.expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        $scope.isEnoughSelectedMatchingCategories = function () {
            if ( !$scope.isUploadSuccessful ) {
                return false;
            }
            return getSelectedMatchingCategories().length >= MIN_CATEGORIES_TO_SELECT;
        };

        /**
         * Update profile functionality.
         */
        $scope.submitPerformImport = function (expensesImportForm) {
            if ( expensesImportForm.$valid && !$scope.isImporting ) {

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
                    if ( expenseCategoryMatchingProfileDTO.selected ) {

                        expenseCategoryMatchingProfileDTO.categoryDTO = angular.copy(expenseCategoryMatchingProfileDTO.category.selected.model);
                    }
                    else {
                        // ---
                        // Really ugly, but we can't send back an invalid category..
                        // ---
                        expenseCategoryMatchingProfileDTO.categoryDTO = angular.copy(getSelectedMatchingCategories()[0].category.selected.model);
                    }
                });

                // ---
                // Perform import.
                // ---
                ImportService
                    .importExpenses(importType, expensesImportPrepared)
                    .then(function () {
                        expensesImportForm.$setPristine();

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully imported your expenses!';

                        // ---
                        // Import is finished.
                        // ---
                        $scope.isImporting = false;
                        $scope.importFinished = true;

                        // ---
                        // Go to expenses after 1,5 sec.
                        // ---
                        $timeout(function () {
                            StatesHandler.goHome();
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
