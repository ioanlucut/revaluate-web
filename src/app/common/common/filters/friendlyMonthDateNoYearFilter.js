export default

  angular
    .module('revaluate.common')
    .filter('friendlyMonthDateNoYear', function () {
      return function (date) {

        if (!_.isDate(date)) {
          date = moment(new Date(date));
        }

        return moment(date).format('MMMM');
      };
    });

