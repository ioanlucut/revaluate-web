export default

  /**
   * Goals constants.
   */
  {
      create: 'goals',
      update: 'goals',
      details: 'goals/:id',
      delete: 'goals/:id',
      bulkDelete: 'goals/bulkDelete',
      allGoalsFromTo: 'goals/retrieve_from_to?from=:from&to=:to',
      isUniqueCategoryPerGoalBetween: 'goals/isUnique/:categoryId?from=:from&to=:to',
    };
