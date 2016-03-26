export default

function SiteService($http) {
  'ngInject';

  this.fetchInstant = () => $http
    .get(URLTo.api('appstats/fetchInstant'));
}
