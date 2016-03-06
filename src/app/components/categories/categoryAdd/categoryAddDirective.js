function AddCategoryController(CATEGORY_EVENTS, $scope, promiseTracker, Category, CategoryColorService, CategoryService) {

  var _this = this;

  /**
   * Create a saving tracker.
   */
  _this.saveTracker = promiseTracker();

  _this.initOrResetAddCategory = initOrResetAddCategory;

  /**
   * Saves the category.
   */
  _this.saveCategory = saveCategory;

  /**
   * Perform the first initialization.
   */
  _this.initOrResetAddCategory();

  function initOrResetAddCategory() {
    _this.category = new Category({ color: CategoryColorService.randomizedColor(_this.colors) });

    if (_this.categoryForm) {
      _this.categoryForm.$setPristine();
    }

    _this.badPostSubmitResponse = false;
  }

  function saveCategory() {
    CategoryService
      .createCategory(_this.category, _this.saveTracker)
      .then(function (createdCategory) {
        $scope.$emit(CATEGORY_EVENTS.isCreated, { category: createdCategory });
        _this.initOrResetAddCategory();
      })
      .catch(function () {
        _this.badPostSubmitResponse = true;
        $scope.$emit(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something went wrong.' });
      });
  }

}

function categoryAddDirective($rootScope, promiseTracker, Category, CategoryService, CategoryColorService, CATEGORY_EVENTS) {
  return {
    restrict: 'A',
    scope: {
      colors: '=',
      isMaximumNumberOfAllowedCategoriesExceeded: '&',
    },
    controller: AddCategoryController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/components/categories/categoryAdd/categoryAddDirective.tpl.html',
    link: function (scope) {

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

      scope.$on(CATEGORY_EVENTS.isCreated, function () {
        scope.toggleContent();
      });
    },
  };
}

export default categoryAddDirective;
