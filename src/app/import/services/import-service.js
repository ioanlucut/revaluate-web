(function () {
    'use strict';

    /**
     * ExpensesImport service which encapsulates the whole logic related to expensesImport.
     */
    angular
        .module('revaluate.expensesImport')
        .service('ImportService', function (IMPORT_URLS, $http, ImportTransformerService) {

            this.importExpenses = function (importType, expensesImport) {
                return $http
                    .post(URLTo.api(IMPORT_URLS[importType]), ImportTransformerService.toImportDto(expensesImport))
                    .then(function (response) {
                        ImportTransformerService.toImport(response.data, expensesImport);

                        return response;
                    });
            }

        });
}());
