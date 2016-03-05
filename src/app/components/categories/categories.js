import CategoryService from './category/CategoryService';
import categoryFactory from './category/category';
import CategoryTransformerService from './category/CategoryTransformerService';
import categoryAddDirective from './categoryAdd/categoryAddDirective';
import CategoriesController from './categories/CategoriesController';
import categoriesEventsConstants from './categories/categoriesEventsConstants';
import categoriesUrlsConstants from './categories/categoriesUrlsConstants';
import categoryEntryDirective from './categoryEntry/categoryEntryDirective';
import colorPickerDirective from './colorPicker/colorPickerDirective';
import removeCategoryConfirmationDirective from './removeCategoryConfirmation/removeCategoryConfirmationDirective';
import CategoryColorGenerator from './common/services/CategoryColorGenerator';
import uniqueCategoryNameDirective from './common/directives/uniqueCategoryNameDirective';
import validCategoryColorDirective from './common/directives/validCategoryColorDirective';
import validCategoryNameDirective from './common/directives/validCategoryNameDirective';

export default angular
  .module('revaluate.categories', [
    'revaluate.common',
  ])
  .service('CategoryService', CategoryService)
  .service('CategoryTransformerService', CategoryTransformerService)
  .directive('categoryAdd', categoryAddDirective)
  .controller('CategoriesController', CategoriesController)
  .constant('CATEGORY_EVENTS', categoriesEventsConstants)
  .constant('CATEGORY_URLS', categoriesUrlsConstants)
  .directive('categoryEntry', categoryEntryDirective)
  .directive('colorPicker', colorPickerDirective)
  .directive('removeCategoryConfirmation', removeCategoryConfirmationDirective)
  .service('CategoryColorService', CategoryColorGenerator)
  .directive('uniqueCategoryName', uniqueCategoryNameDirective)
  .directive('validCategoryColor', validCategoryColorDirective)
  .directive('validCategoryName', validCategoryNameDirective)
  .factory('Category', categoryFactory)
  .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

    $stateProvider

    // ---
    // Categories page.
    // ---
      .state({
        name: 'settings.categories',
        url: '/categories',
        templateUrl: '/app/components/categories/categories/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        isPaymentMissingUnrestrictedPage: true,
        resolve: {
          categories: function (CategoryService) {
            return CategoryService.getAllCategories();
          },
        },
        title: 'Categories - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.categoriesPage,
      });

  });
