function HomePageController(APP_STATS, AUTH_EVENTS, SiteService, $scope, $interval, AuthService) {
  let currentUpdateAppStatsPromise;
  const INTERVAL_DELAY = 60000;

  this.isUserAuthenticated = AuthService.isAuthenticated();

  if (!this.isUserAuthenticated) {
    currentUpdateAppStatsPromise = $interval(updateAppStats, INTERVAL_DELAY);
  }

  $scope.$on('$destroy', () => {
    cancelUpdateAppStatsPromise();
  });

  // ---
  // private methods.
  // ---

  function cancelUpdateAppStatsPromise() {
    if (currentUpdateAppStatsPromise) {
      $interval.cancel(currentUpdateAppStatsPromise);

      currentUpdateAppStatsPromise = null;
    }
  }

  function updateAppStats() {
    SiteService
      .fetchInstant()
      .then(response => {
        $scope.$broadcast('update-app-stats', { appStats: response.data });
      });
  }
}

export default HomePageController;
