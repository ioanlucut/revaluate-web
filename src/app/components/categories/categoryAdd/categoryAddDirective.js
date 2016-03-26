function AddCategoryController(CATEGORY_EVENTS,
                               $scope,
                               promiseTracker,
                               Category,
                               CategoryColorService,
                               CategoryService) {
  'ngInject';

  const _this = this;

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
      .then(createdCategory => {
        $scope.$emit(CATEGORY_EVENTS.isCreated, { category: createdCategory });
        _this.initOrResetAddCategory();
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        $scope.$emit(
          CATEGORY_EVENTS.isErrorOccurred,
          { errorMessage: 'Ups, something went wrong.' }
        );
      });
  }

}

function categoryAddDirective($rootScope,
                              promiseTracker,
                              Category,
                              CategoryService,
                              CategoryColorService,
                              CATEGORY_EVENTS) {
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
    link(scope) {

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

      scope.$on(CATEGORY_EVENTS.isCreated, () => {
        scope.toggleContent();
      });
    },
  };
}

export default categoryAddDirective;
