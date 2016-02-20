(function () {
  'use strict';

  function InsightsProgressFactory(InsightsAbstract) {

    /**
     * Progress factory function.
     */
    function insightsProgress(data) {

      return _.extend(InsightsAbstract.build(data), {
        insightsMonthlyDTO: data.insightsMonthlyDTO,
      });
    }

    return {
      build: insightsProgress,
    };
  }

  angular
    .module('revaluate.insights')
    .factory('InsightsProgress', InsightsProgressFactory);
}());
