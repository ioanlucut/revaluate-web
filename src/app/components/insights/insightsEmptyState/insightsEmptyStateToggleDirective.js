function insightsEmptyStateToggleDirective() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      showEmptyState: '=',
    },
    templateUrl: '/app/components/insights/insightsEmptyState/insightsEmptyStateToggleDirective.tpl.html',
    link() {
    },
  };
}

export default insightsEmptyStateToggleDirective;
