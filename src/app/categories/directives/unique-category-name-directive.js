angular
    .module("categories")
    .directive("uniqueCategoryName", function ($q, CategoryService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                scope.$watch("ngModel", function (value) {

                    // Set validity
                    CategoryService.isUnique(value)
                        .then(function (data) {

                            // Make sure we are validating the latest value of the model (asynchronous responses)
                            if ( data.name == ngModel.$viewValue ) {
                                ngModel.$setValidity('uniqueCategoryName', data.isUnique);
                            }
                        });
                });

            }
        };
    });