/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
angular
    .module("revaluate.expensesImport")
    .service("ImportService", function (IMPORT_URLS, $q, $http, ImportTransformerService) {

        /**
         * Update a expensesImport.
         * @param expensesImport
         * @returns {*}
         */
        this.createImport = function (expensesImport) {
            return $http
                .post(URLTo.api(IMPORT_URLS.create), ImportTransformerService.toImportDto(expensesImport))
                .then(function (response) {
                    ImportTransformerService.toImport(response.data, expensesImport);

                    return response;
                });
        };

        /**
         * Update a expensesImport.
         * @param expensesImport
         * @returns {*}
         */
        this.updateImport = function (expensesImport) {
            var importDto = ImportTransformerService.toImportDto(expensesImport);

            return $http
                .put(URLTo.api(IMPORT_URLS.update), importDto)
                .then(function (response) {
                    ImportTransformerService.toImport(response.data, expensesImport);

                    return response;
                });
        };

        /**
         * Delete a expensesImport.
         * @param expensesImport
         * @returns {*}
         */
        this.deleteImport = function (expensesImport) {
            var importDto = ImportTransformerService.toImportDto(expensesImport);

            return $http
                .delete(URLTo.api(IMPORT_URLS.delete, { ":id": importDto.id }), importDto)
                .then(function (response) {
                    ImportTransformerService.toImport(response.data, expensesImport);

                    return response.data;
                });
        };

        /**
         * Get all expensesImport of current user
         * @returns {*}
         */
        this.getAllImport = function () {
            return $http
                .get(URLTo.api(IMPORT_URLS.allImport))
                .then(function (response) {

                    return ImportTransformerService.toImport(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Bulk create action of a list of expensesImport.
         * @returns {*}
         */
        this.bulkCreate = function (expensesImport) {
            return $http
                .post(URLTo.api(IMPORT_URLS.bulkCreate), ImportTransformerService.toImportDTOs(expensesImport))
                .then(function (response) {

                    return ImportTransformerService.toImport(response.data);
                });
        };

        /**
         * Bulk delete action of a list of expensesImport.
         * @returns {*}
         */
        this.bulkDelete = function (expensesImport) {
            return $http
                .put(URLTo.api(IMPORT_URLS.bulkDelete), ImportTransformerService.toImportDTOs(expensesImport))
                .then(function (response) {

                    return response.data;
                });
        };

        /**
         * Check if a expensesImport name is unique.
         *
         * @param name
         * @returns {*}
         */
        this.isUnique = function (name) {
            var deferred = $q.defer();

            $http
                .get(URLTo.api(IMPORT_URLS.isUnique), { params: { name: name } })
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