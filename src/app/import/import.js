angular
    .module("revaluate.expensesImport", [
        "revaluate.color",
        "revaluate.common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state({
                name: "settings.import",
                url: "/import",
                templateUrl: "app/import/partials/settings.import.abstract.html",
                abstract: true
            })

            .state({
                name: "settings.import.choose",
                url: "/choose",
                templateUrl: "app/import/partials/settings.import.choose.html",
                title: "Expenses import choose - Revaluate"
            })

            .state({
                name: "settings.import.import",
                url: "/{type}",
                templateUrl: "app/import/partials/settings.import.import.html",
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
            })

    }]);