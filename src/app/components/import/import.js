import ImportExpensesController from './expenses-import/ImportExpensesController';
import ImportService from './expenses-import/ImportService';
import ImportTransformerService from './expenses-import/ImportTransformerService';
import importObj from './expenses-import/import';
import importConstants from './expenses-import/importConstants';

export default angular
  .module('revaluate.expensesImport', [
    'revaluate.common',
  ])
  .controller('ImportExpensesController', ImportExpensesController)
  .service('ImportService', ImportService)
  .service('ImportTransformerService', ImportTransformerService)
  .factory('ExpensesImport', importObj)
  .constant('IMPORT_CONSTANTS', importConstants)
  .config(($stateProvider, USER_ACTIVITY_EVENTS) => {
    'ngInject';

    $stateProvider

      .state({
        name: 'settings.import',
        url: '/import',
        templateUrl: '/app/components/import/expenses-import/importAbstract.html',
        abstract: true,
      })

      .state({
        name: 'settings.import.choose',
        url: '/choose',
        templateUrl: '/app/components/import/expenses-import/importChoose.html',
        isPaymentMissingUnrestrictedPage: true,
        stateEventName: USER_ACTIVITY_EVENTS.settingsImportChoose,
        title: 'Expenses import choose - Revaluate',
      })

      .state({
        name: 'settings.import.import',
        url: '/{type}',
        templateUrl: '/app/components/import/expenses-import/importImport.html',
        controller: 'ImportExpensesController',
        isPaymentMissingUnrestrictedPage: true,
        resolve: {
          categories(CategoryService) {
            return CategoryService.getAllCategories();
          },

          importType($q, $stateParams, IMPORT_CONSTANTS, $state) {
            const deferred = $q.defer();

            if (IMPORT_CONSTANTS.IMPORT_TYPES[$stateParams.type]) {
              deferred.resolve(IMPORT_CONSTANTS.IMPORT_TYPES[$stateParams.type]);
            } else {
              $state.go('404');
            }

            return deferred.promise;
          },
        },
        stateEventName: USER_ACTIVITY_EVENTS.settingsImport,
        title: 'Expenses import - Revaluate',
      });

  });
