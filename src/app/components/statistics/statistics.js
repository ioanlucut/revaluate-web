import StatisticService from './statistics/StatisticService';
import StatisticsTransformerService from './statistics/StatisticsTransformerService';
import statistics from './statistics/statistics';
import statisticsConstants from './statistics/statisticsConstants';

export default angular
  .module('revaluate.statistics', [
    'revaluate.common',
  ])
  .service('StatisticService', StatisticService)
  .service('StatisticTransformerService', StatisticsTransformerService)
  .factory('Statistics', statistics)
  .constant('STATISTIC_URLS', statisticsConstants);
