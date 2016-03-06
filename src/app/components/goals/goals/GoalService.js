export default

  function GoalService(GOAL_URLS, $q, $http, DatesUtils, GoalTransformerService) {

    this.createGoal = (goal, tracker) => $http
      .post(URLTo.api(GOAL_URLS.create), GoalTransformerService.goalApiRequestTransformer(goal), { tracker })
      .then(GoalTransformerService.goalApiResponseTransformer);

    this.updateGoal = (goal, tracker) => {
      const goalDto = GoalTransformerService.goalApiRequestTransformer(goal);

      return $http
        .put(URLTo.api(GOAL_URLS.update), goalDto, { tracker })
        .then(GoalTransformerService.goalApiResponseTransformer);
    };

    this.getAllGoalsFromTo = (from, to, tracker) => {
      const fromFormatted = DatesUtils.formatDate(from), toFormatted = DatesUtils.formatDateExpectedForEndOfMonth(to);

      return $http
        .get(URLTo.api(GOAL_URLS.allGoalsFromTo, {
          ':from': fromFormatted,
          ':to': toFormatted,
        }), { tracker })
        .then(GoalTransformerService.goalApiResponseTransformer);
    };

    this.isUniqueCategoryPerGoalBetween = (categoryCandidate, from, to) => {
      const fromFormatted = DatesUtils.formatDate(from), toFormatted = DatesUtils.formatDateExpectedForEndOfMonth(to), deferred = $q.defer();

      $http
        .get(URLTo.api(GOAL_URLS.isUniqueCategoryPerGoalBetween, {
          ':categoryId': categoryCandidate.id,
          ':from': fromFormatted,
          ':to': toFormatted,
        }))
        .then(response => {
          if (!response.data.isUniqueGoalCategory) {
            deferred.reject();
          }

          deferred.resolve({
            isUnique: response.data.isUniqueGoalCategory,
          });
        })
        .catch(() => {
          deferred.reject();
        });

      return deferred.promise;
    };

    /**
     * Bulk delete action of a list of goals.
     */
    this.bulkDelete = (goals, tracker) => $http
      .put(URLTo.api(GOAL_URLS.bulkDelete), GoalTransformerService.goalApiRequestTransformer(goals), { tracker });

  }

