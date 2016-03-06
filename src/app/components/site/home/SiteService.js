export default

function SiteService($http) {

  this.fetchInstant = () => $http
    .get(URLTo.api('appstats/fetchInstant'));
}
