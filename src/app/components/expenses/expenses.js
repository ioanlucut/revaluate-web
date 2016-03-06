import expenseFactory from './expense/expense';
import ExpenseGroupedTransformerService from './expenseGrouped/ExpenseGroupedTransformerService';
import expenseGrouped from './expenseGrouped/expenseGrouped';
import ExpenseService from './expense/ExpenseService';
import ExpenseTransformerService from './expense/ExpenseTransformerService';
import expenseAddDirective from './expenseAdd/expenseAddDirective';
import ExpensesController from './expenses/ExpensesController';
import expensesEventsConstants from './expenses/expensesEventsConstants';
import expensesUrlsConstants from './expenses/expensesUrlsConstants';
import expensesListDirective from './expensesList/expensesListDirective';
import expenseEntryDirective from './expenseEntry/expenseEntryDirective';
import expensesOfCategoryDirective from './expensesOfCategory/expensesOfCategoryDirective';
import GreeterService from './greeter/GreeterService';
import greeterConstants from './greeter/greeterConstants';
import greeterDirective from './greeter/greeterDirective';
import greeterFilter from './greeter/greeterFilter';
import MonthlyDailyInsightsController from './monthlyDailyInsights/MonthlyDailyInsightsController';
import MonthlyGoalsController from './monthlyGoals/MonthlyGoalsController';

/**
 * Main site module declaration including ui templates.
 */
export default angular
  .module('revaluate.expenses', [
    'revaluate.common',
    'revaluate.account',
    'revaluate.goals',
    'revaluate.statistics',
  ])
  .service('ExpenseGroupedTransformerService', ExpenseGroupedTransformerService)
  .factory('ExpenseGrouped', expenseGrouped)
  .service('ExpenseService', ExpenseService)
  .service('ExpenseTransformerService', ExpenseTransformerService)
  .directive('expenseAdd', expenseAddDirective)
  .controller('ExpensesController', ExpensesController)
  .constant('EXPENSE_EVENTS', expensesEventsConstants)
  .constant('EXPENSE_URLS', expensesUrlsConstants)
  .directive('expensesList', expensesListDirective)
  .directive('expenseEntry', expenseEntryDirective)
  .directive('expensesOfCategory', expensesOfCategoryDirective)
  .service('GreeterService', GreeterService)
  .constant('GREETER_CONSTANTS', greeterConstants)
  .directive('greeter', greeterDirective)
  .filter('greets', greeterFilter)
  .controller('MonthlyDailyInsightsController', MonthlyDailyInsightsController)
  .controller('MonthlyGoalsController', MonthlyGoalsController)
  .factory('Expense', expenseFactory)
  .config(($stateProvider, USER_ACTIVITY_EVENTS) => {

    $stateProvider

      .state('expenses', {
        url: '/expenses',
        templateUrl: '/app/components/expenses/expenses/expensesAbstract.tpl.html',
        abstract: true,
      })

      // Regular case
      .state('expenses.regular', {
        url: '',
        views: {
          expensesContentView: {
            templateUrl: '/app/components/expenses/expenses/expensesContent.tpl.html',
            controller: 'ExpensesController',
            controllerAs: 'expensesVm',
            resolve: {
              expensesQueryResponse(ExpenseService) {
                return ExpenseService.getAllExpensesGrouped(0, 50);
              },

              categories(CategoryService) {
                return CategoryService.getAllCategories();
              },
            },
          },
          'expenses__daily__insights__content@expenses.regular': {
            templateUrl: '/app/components/expenses/monthlyDailyInsights/monthlyDailyInsights.tpl.html',
            controller: 'MonthlyDailyInsightsController',
            controllerAs: 'vm',
            resolve: {
              insightsDaily(DatesUtils, InsightsService) {
                const period = DatesUtils.fromLastMonthsToNow(1);

                return InsightsService
                  .fetchDailyInsightsFromTo(period.from, period.to);
              },
            },
          },
          'expenses__goals__content@expenses.regular': {
            templateUrl: '/app/components/expenses/monthlyGoals/monthlyGoals.tpl.html',
            controller: 'MonthlyGoalsController',
            controllerAs: 'vm',
            resolve: {
              goals(GoalService, DatesUtils) {
                const period = DatesUtils.fromLastMonthsToNow(1);

                return GoalService
                  .getAllGoalsFromTo(period.from, period.to);
              },
            },
          },
        },
        title: 'Expenses - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.expensesPage,
      });

  });
