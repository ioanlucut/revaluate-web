function HomePageController(APP_STATS, AUTH_EVENTS, SiteService, $scope, $interval, AuthService) {
  var currentUpdateAppStatsPromise,
    INTERVAL_DELAY = 60000; // POOL every 1 minute

  this.isUserAuthenticated = AuthService.isAuthenticated();

  if (!this.isUserAuthenticated) {
    currentUpdateAppStatsPromise = $interval(updateAppStats, INTERVAL_DELAY);
  }

  $scope.$on('$destroy', function () {
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
      .then(function (response) {
        $scope.$broadcast('update-app-stats', { appStats: response.data });
      });
  }
}

export default HomePageController;
