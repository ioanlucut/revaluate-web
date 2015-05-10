/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
angular
    .module("revaluate.expensesImport")
    .service("ImportService", function (IMPORT_URLS, $q, $http, ImportTransformerService) {

        this.performMintImport = function (expensesImport) {

            return importExpenses(IMPORT_URLS.importMint, expensesImport);
        };

        this.performSpendeeImport = function (expensesImport) {

            return importExpenses(IMPORT_URLS.spendeeImport, expensesImport);
        };

        function importExpenses(targetUrl, expensesImport) {
            return $http
                .post(URLTo.api(targetUrl), ImportTransformerService.toImportDto(expensesImport))
                .then(function (response) {
                    ImportTransformerService.toImport(response.data, expensesImport);

                    return response;
                });
        };

    });