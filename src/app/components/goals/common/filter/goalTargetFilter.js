function goalTargetFilter(APP_CONFIG) {
  'ngInject';

  return actual => _.find(APP_CONFIG.GOALS_TARGETS, 'value', actual).label;
}

export default goalTargetFilter;
