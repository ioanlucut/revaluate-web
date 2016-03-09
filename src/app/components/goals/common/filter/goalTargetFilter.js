function goalTargetFilter(APP_CONFIG) {
  return actual => _.find(APP_CONFIG.GOALS_TARGETS, 'value', actual).label;
}

export default goalTargetFilter;
