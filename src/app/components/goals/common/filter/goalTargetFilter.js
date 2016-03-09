function goalTargetFilter(APP_CONFIG) {
  return function (actual) {

    return _.find(APP_CONFIG.GOALS_TARGETS, 'value', actual).label;
  };
}

export default goalTargetFilter;
