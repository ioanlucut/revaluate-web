'use strict';

angular
    .module("revaluate.categories")
    .controller("CategoryEntryController", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, APP_CONFIG, MIXPANEL_EVENTS) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Edit/update timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Update the category.
         */
        vm.updateCategory = function (categoryForm, category) {
            if ( categoryForm.$valid && !vm.isUpdating ) {

                // Is saving category
                vm.isUpdating = true;

                category
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryUpdated);

                        $timeout(function () {
                            vm.isUpdating = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, {
                                category: category
                            });

                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        vm.isUpdating = false;
                        vm.badPostSubmitResponse = true;
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {
                            errorMessage: "We've encountered an error while trying to update this category."
                        });
                    });
            }
        };

        /**
         * Remove category;
         */
        vm.deleteCategory = function (category) {
            if ( vm.isDeleting ) {
                return;
            }

            // Is deleting category
            vm.isDeleting = true;

            // Destroy category
            category
                .destroy()
                .then(function () {
                    vm.isSuccessfullyDeleted = true;

                    mixpanel.track(MIXPANEL_EVENTS.categoryDeleted);
                    $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, {
                        category: category
                    });
                })
                .catch(function () {

                    // Error
                    vm.isDeleting = false;
                    $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {
                        errorMessage: "We've encountered an error while trying to delete this category."
                    });
                });
        };

    });
