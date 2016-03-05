export default

  /**
   * Goals constants.
   */
  angular
    .module('revaluate.goals')
    .constant('GOAL_URLS', {
      create: 'goals',
      update: 'goals',
      details: 'goals/:id',
      delete: 'goals/:id',
      bulkDelete: 'goals/bulkDelete',
      allGoalsFromTo: 'goals/retrieve_from_to?from=:from&to=:to',
      isUniqueCategoryPerGoalBetween: 'goals/isUnique/:categoryId?from=:from&to=:to',
    })
    .constant('GOAL_EVENTS', {
      isCreated: 'goal-is-created',
      isDeleted: 'goal-is-deleted',
      isUpdated: 'goal-is-updated',
    });

