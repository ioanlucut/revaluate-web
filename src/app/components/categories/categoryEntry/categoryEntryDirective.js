function CategoryEntryController(CATEGORY_EVENTS, $scope, $rootScope, promiseTracker, CategoryService) {
  'ngInject';

  const _this = this;

  /**
   * Work with a copy - keep the master backup
   */
  _this.categoryEntry = angular.copy($scope.category);

  /**
   * Create an updating tracker.
   */
  _this.updateTracker = promiseTracker();

  /**
   * Update the category.
   */
  _this.updateCategory = updateCategory;

  /**
   * Create an deleting tracker.
   */
  _this.deleteTracker = promiseTracker();

  /**
   * Delete category;
   */
  _this.deleteCategory = deleteCategory;

  function updateCategory() {
    CategoryService
      .updateCategory(_this.categoryEntry, _this.updateTracker)
      .then(updatedCategory => {
        $rootScope.$broadcast(
          CATEGORY_EVENTS.isUpdated,
          { category: _.extend(_this.categoryEntry, updatedCategory) }
        );
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $rootScope.$broadcast(
          CATEGORY_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

  function deleteCategory() {
    CategoryService
      .deleteCategory(_this.categoryEntry, _this.deleteTracker)
      .then(() => {
        _this.isSuccessfullyDeleted = true;
        $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, { category: _this.categoryEntry });
      })
      .catch(() => {
        $rootScope.$broadcast(
          CATEGORY_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }
}

function categoryEntryDirective($rootScope, CATEGORY_EVENTS) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      category: '=',
      colors: '=',
      isMinimumNumberOfAllowedCategoriesExceeded: '&',
    },
    controller: CategoryEntryController,
    controllerAs: 'vm',
    templateUrl: '/app/components/categories/categoryEntry/categoryEntryDirective.html',
    link(scope, el, attrs, _this) {

      /**
       * Show block content
       */
      scope.showContent = false;

      /**
       * Toggle content
       */
      scope.toggleContent = () => {
        scope.showContent = !scope.showContent;
      };

      /**
       * Toggle and discard changes.
       */
      scope.cancel = () => {
        scope.toggleContent();

        _this.categoryEntry = angular.copy(scope.category);
      };

      /**
       * On category updated/deleted
       */
      $rootScope.$on(CATEGORY_EVENTS.isUpdated, (event, args) => {
        if (scope.category.id === args.category.id) {
          scope.toggleContent();

          // ---
          // Update the master category.
          // ---
          scope.category = angular.copy(_this.categoryEntry);
          _this.categoryEntry = angular.copy(scope.category);
        }
      });

      scope.$on(CATEGORY_EVENTS.isDeleted, (event, args) => {
        if (scope.category.id === args.category.id) {
          scope.toggleContent();
        }
      });
    },
  };
}

export default categoryEntryDirective;
