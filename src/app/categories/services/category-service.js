/**
 * Categories service which encapsulates the whole logic related to categories.
 */
angular
    .module("categories")
    .service("CategoryService", function (CATEGORY_URLS, $q, $http, CategoryTransformerService) {

        /**
         * Update a category.
         * @param category
         * @returns {*}
         */
        this.createCategory = function (category) {
            return $http
                .post(URLTo.api(CATEGORY_URLS.create), CategoryTransformerService.toCategoryDto(category))
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response;
                });
        };

        /**
         * Update a category.
         * @param category
         * @returns {*}
         */
        this.updateCategory = function (category) {
            var categoryDto = CategoryTransformerService.toCategoryDto(category);

            return $http
                .put(URLTo.api(CATEGORY_URLS.update, { ":id": categoryDto.id }), categoryDto)
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response;
                });
        };

        /**
         * Delete a category.
         * @param category
         * @returns {*}
         */
        this.deleteCategory = function (category) {
            var categoryDto = CategoryTransformerService.toCategoryDto(category);

            return $http
                .delete(URLTo.api(CATEGORY_URLS.delete, { ":id": categoryDto.id }), categoryDto)
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response.data;
                });
        };

        /**
         * Get all categories of current user
         * @returns {*}
         */
        this.getAllCategories = function () {
            return $http
                .get(URLTo.api(CATEGORY_URLS.allCategories))
                .then(function (response) {

                    return CategoryTransformerService.toCategories(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Check if a category name is unique.
         *
         * @param name
         * @returns {*}
         */
        this.isUnique = function (name) {
            var deferred = $q.defer();

            $http
                .get(URLTo.api(CATEGORY_URLS.isUnique), { params: { name: name } })
                .then(_.bind(function () {
                    deferred.resolve({
                        isUnique: true,
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