angular
    .module("revaluate.expensesImport", [
        "revaluate.color",
        "revaluate.common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // ---
            // expensesImport.
            // ---
            .state("settings.expensesImport", {
                url: "/expensesImport/{type}",
                templateUrl: "app/import/partials/import.importExpenses.html",
                controller: "ExpensesImportController",
                resolve: {
                    categories: function (CategoryService) {
                        return CategoryService.getAllCategories();
                    },
                    importType: function ($q, $stateParams, IMPORT_TYPES, $state) {
                        var deferred = $q.defer();

                        if ( IMPORT_TYPES[$stateParams.type] ) {
                            deferred.resolve(IMPORT_TYPES[$stateParams.type])
                        }
                        else {
                            $state.go("404");
                        }

                        return deferred.promise;
                    }
                },
                title: "Expenses import - Revaluate"
            });

    }]);