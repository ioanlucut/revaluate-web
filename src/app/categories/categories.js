(function () {
    'use strict';

    angular
        .module('revaluate.categories', [
            'revaluate.common'
        ])
        .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

            $stateProvider

                // ---
                // Categories page.
                // ---
                .state({
                    name: 'settings.categories',
                    url: '/categories',
                    templateUrl: '/app/categories/partials/categories.html',
                    controller: 'CategoriesController',
                    controllerAs: 'vm',
                    isPaymentMissingUnrestrictedPage: true,
                    resolve: {
                        categories: function (CategoryService) {
                            return CategoryService.getAllCategories();
                        }
                    },
                    title: 'Categories - Revaluate',
                    stateEventName: USER_ACTIVITY_EVENTS.categoriesPage
                });

        });
}());
