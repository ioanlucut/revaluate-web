'use strict';

function SiteService($http) {

    this.fetchInstant = function () {
        return $http
            .get(URLTo.api('appstats/fetchInstant'));
    };
}

export default angular
    .module('revaluate.goals')
    .service('SiteService', SiteService)
    .name;
