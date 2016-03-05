export default angular
  .module('revaluate.expensesImport', [
    'revaluate.common',
  ])
  .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

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
          categories: function (CategoryService) {
            return CategoryService.getAllCategories();
          },

          importType: function ($q, $stateParams, IMPORT_TYPES, $state) {
            var deferred = $q.defer();

            if ( IMPORT_TYPES[$stateParams.type] ) {
              deferred.resolve(IMPORT_TYPES[$stateParams.type]);
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