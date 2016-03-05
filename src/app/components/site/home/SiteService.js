export default

function SiteService($http) {

  this.fetchInstant = function () {
    return $http
      .get(URLTo.api('appstats/fetchInstant'));
  };
}
