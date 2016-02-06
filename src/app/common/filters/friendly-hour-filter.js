'use strict';

export default angular
    .module('revaluate.common')
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format('h:mm A');
        };
    })
    .name;
