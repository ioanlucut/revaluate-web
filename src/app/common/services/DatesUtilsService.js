(function () {
  'use strict';

  /**
   * Dates utils service.
   */
  angular
    .module('revaluate.common')
    .service('DatesUtils', function () {

      this.fromLastMonthsToNow = function (intervalMonths) {
        var from = moment().subtract(intervalMonths - 1, 'M').startOf('month'),
          to = moment().add(1, 'month').startOf('month');

        return {
          from: from,
          to: to,
        };
      };

      this.getFromToOfMonthYear = function (monthDate) {
        var from = moment(monthDate).startOf('month'),
          to = moment(monthDate).add(1, 'month').startOf('month');

        return {
          from: from,
          to: to,
        };
      };

      this.formatDate = function (givenDate) {
        return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
      };

      this.formatStartOfMonthInclusive = function (givenDate) {
        return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss.hhh');
      };

      this.formatEndOfMonthExclusive = function (givenDate) {
        return moment(givenDate).subtract(1, 's').format('YYYY-MM-DDTHH:mm:ss.hhh');
      };

      this.formatDateExpectedForEndOfMonth = function (givenDate) {
        return moment(givenDate).add(1, 's').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
      };

    });
}());
