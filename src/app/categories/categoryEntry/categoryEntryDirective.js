(function () {
  'use strict';

  function CategoryEntryController(CATEGORY_EVENTS, $scope, $rootScope, promiseTracker, CategoryService) {

    var vm = this;

    /**
     * Work with a copy - keep the master backup
     */
    vm.categoryEntry = angular.copy($scope.category);

    /**
     * Create an updating tracker.
     */
    vm.updateTracker = promiseTracker();

    /**
     * Update the category.
     */
    vm.updateCategory = updateCategory;

    /**
     * Create an deleting tracker.
     */
    vm.deleteTracker = promiseTracker();

    /**
     * Delete category;
     */
    vm.deleteCategory = deleteCategory;

    function updateCategory() {
      CategoryService
        .updateCategory(vm.categoryEntry, vm.updateTracker)
        .then(function (updatedCategory) {
          $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, { category: _.extend(vm.categoryEntry, updatedCategory) });
        })
        .catch(function () {
          vm.badPostSubmitResponse = true;
          $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }

    function deleteCategory() {
      CategoryService
        .deleteCategory(vm.categoryEntry, vm.deleteTracker)
        .then(function () {
          vm.isSuccessfullyDeleted = true;
          $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, { category: vm.categoryEntry });
        })
        .catch(function () {
          $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
        });
    }
  }

  angular
    .module('revaluate.categories')
    .directive('categoryEntry', function ($rootScope, promiseTracker, CategoryService, CATEGORY_EVENTS) {
      return {
        restrict: 'A',
        scope: {
          category: '=',
          colors: '=',
          isMinimumNumberOfAllowedCategoriesExceeded: '&',
        },
        controller: CategoryEntryController,
        controllerAs: 'vm',
        templateUrl: '/app/categories/categoryEntry/categoryEntryDirective.tpl.html',
        link: function (scope, el, attrs, vm) {

          /**
           * Show block content
           */
          scope.showContent = false;

          /**
           * Toggle content
           */
          scope.toggleContent = function () {
            scope.showContent = !scope.showContent;
          };

          /**
           * Toggle and discard changes.
           */
          scope.cancel = function () {
            scope.toggleContent();

            vm.categoryEntry = angular.copy(scope.category);
          };

          /**
           * On category updated/deleted
           */
          $rootScope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
            if (scope.category.id === args.category.id) {
              scope.toggleContent();

              // ---
              // Update the master category.
              // ---
              scope.category = angular.copy(vm.categoryEntry);
              vm.categoryEntry = angular.copy(scope.category);
            }
          });

          scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
            if (scope.category.id === args.category.id) {
              scope.toggleContent();
            }
          });
        },
      };
    });
}());
