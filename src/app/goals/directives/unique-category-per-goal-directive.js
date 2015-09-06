(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .directive('uniqueCategoryPerGoal', function (GoalService, DatesUtils) {
            return {
                require: 'ngModel',
                scope: {
                    ngModel: '=',

                    /**
                     * Represents the current category
                     */
                    uniqueCategoryExcept: '=',

                    /**
                     * The next two can be specified so that the uniqueness is computed within from/to period.
                     */
                    uniqueCategoryFrom: '=',
                    uniqueCategoryTo: '=',

                    /**
                     * If this one is specified, the other two are ignored.
                     */
                    uniqueCategoryYearMonth: '='
                },
                link: function (scope, el, attr, ngModel) {
                    scope.$watch('ngModel', function (categoryCandidate) {
                        var uniqueCategoryFrom,
                            uniqueCategoryTo,
                            period;

                        // ---
                        // Category candidate and view value should not be undefined
                        // ---
                        if (_.isUndefined(categoryCandidate) || _.isUndefined(ngModel.$viewValue)) {

                            return;
                        }

                        // ---
                        // If there is an except category, then try to check if we should apply this rule.
                        // ---
                        if (_.has(scope.uniqueCategoryExcept, 'id') && (ngModel.$viewValue.id === scope.uniqueCategoryExcept.id)) {
                            return;
                        }

                        // ---
                        // Now compute the period.
                        // ---
                        if (!_.isUndefined(scope.uniqueCategoryFrom) && !_.isUndefined(scope.uniqueCategoryTo)) {
                            uniqueCategoryFrom = scope.uniqueCategoryFrom;
                            uniqueCategoryTo = scope.uniqueCategoryTo;
                        } else if (!_.isUndefined(scope.uniqueCategoryYearMonth)) {
                            period = DatesUtils
                                .getFromToOfMonthYear(scope.uniqueCategoryYearMonth);
                            uniqueCategoryFrom = period.from;
                            uniqueCategoryTo = period.to;
                        } else {
                            return;
                        }

                        GoalService
                            .isUniqueCategoryPerGoaBetween(categoryCandidate, uniqueCategoryFrom, uniqueCategoryTo)
                            .then(function (response) {

                                // Make sure we are validating the latest categoryCandidate of the model (asynchronous responses)
                                if (response.category.id === ngModel.$viewValue.id) {
                                    ngModel.$setValidity('uniqueCategoryPerGoal', response.isUnique);
                                }
                            });
                    });

                }
            };
        });
}());
