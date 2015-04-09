angular
    .module("categories")
    .directive("uniqueCategoryName", function ($q, CategoryService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "=",
                except: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidCategoryName(categoryName) {
                    return /^([A-Za-z\d\s]){2,20}$/.test(categoryName);
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidCategoryName(value) && ngModel.$viewValue !== scope.except ) {

                        // Set validity
                        CategoryService
                            .isUnique(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.name === ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueCategoryName', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    });