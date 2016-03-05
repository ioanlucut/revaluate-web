export default

  angular
    .module('revaluate.common')
    .filter('friendlyMonthShortDateNoYear', function () {
      return function (date) {

        if (!_.isDate(date)) {
          date = moment(new Date(date));
        }

        return moment(date).format('MMM');
      };
    });

