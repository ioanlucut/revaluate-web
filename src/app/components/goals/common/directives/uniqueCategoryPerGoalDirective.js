function uniqueCategoryPerGoalDirective($q, GoalService, DatesUtils) {
  return {
    require: 'ngModel',
    scope: {
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
      uniqueCategoryYearMonth: '=',
    },
    link(scope, el, attr, ngModel) {
      // ---
      // Async validator.
      // ---
      ngModel
        .$asyncValidators
        .uniqueCategoryPerGoal = categoryCandidate => {
          let uniqueCategoryFrom, uniqueCategoryTo, period;

          // ---
          // Category candidate and view value should not be undefined
          // ---
          if (_.isUndefined(categoryCandidate) || _.isUndefined(ngModel.$viewValue)) {
            return $q.when();
          }

          // ---
          // If there is an except category, then try to check if we should apply this rule.
          // ---
          if (_.has(scope.uniqueCategoryExcept, 'id') && (ngModel.$viewValue.id === scope.uniqueCategoryExcept.id)) {
            return $q.when();
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
            return $q.when();
          }

          return GoalService
            .isUniqueCategoryPerGoalBetween(categoryCandidate, uniqueCategoryFrom, uniqueCategoryTo);
        };
    },
  };
}

export default uniqueCategoryPerGoalDirective;
