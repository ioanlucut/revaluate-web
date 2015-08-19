(function () {
    'use strict';

    angular
        .module('revaluate.categories')
        .service('CategoryService', function (CATEGORY_URLS, $q, $http, CategoryTransformerService) {

            this.createCategory = function (category, tracker) {
                return $http
                    .post(URLTo.api(CATEGORY_URLS.create), CategoryTransformerService.categoryApiRequestTransformer(category), { tracker: tracker })
                    .then(CategoryTransformerService.categoryApiResponseTransformer);
            };

            this.updateCategory = function (category, tracker) {
                var categoryDto = CategoryTransformerService.categoryApiRequestTransformer(category);

                return $http
                    .put(URLTo.api(CATEGORY_URLS.update), categoryDto, { tracker: tracker })
                    .then(CategoryTransformerService.categoryApiResponseTransformer);
            };

            this.deleteCategory = function (category, tracker) {

                return $http
                    .delete(URLTo.api(CATEGORY_URLS.delete, { ':id': category.id }), { tracker: tracker });
            };

            this.getAllCategories = function () {
                return $http
                    .get(URLTo.api(CATEGORY_URLS.allCategories))
                    .then(CategoryTransformerService.categoryApiResponseTransformer);
            };

            /**
             * Bulk create action of a list of categories.
             */
            this.setupBulkCreateCategories = function (categories) {
                return $http
                    .post(URLTo.api(CATEGORY_URLS.setupBulkCreateCategories), CategoryTransformerService.categoryApiRequestTransformer(categories))
                    .then(CategoryTransformerService.categoryApiResponseTransformer);
            };

            /**
             * Bulk delete action of a list of categories.
             */
            this.bulkDelete = function (categories) {
                return $http
                    .put(URLTo.api(CATEGORY_URLS.bulkDelete), CategoryTransformerService.categoryApiRequestTransformer(categories));
            };

            /**
             * Check if a category name is unique.
             */
            this.isUnique = function (name) {
                var deferred = $q.defer();

                $http
                    .get(URLTo.api(CATEGORY_URLS.isUnique), { params: { name: name } })
                    .then(_.bind(function (response) {
                        deferred.resolve({
                            isUnique: response.data.isUniqueCategory,
                            name: name
                        });
                    }, this))
                    .catch(function () {
                        deferred.resolve({
                            isUnique: false,
                            name: name
                        });
                    });

                return deferred.promise;
            };
        });
}());
