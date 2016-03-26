function CategoriesController(ALERTS_EVENTS,
                              CATEGORY_EVENTS,
                              USER_ACTIVITY_EVENTS,
                              APP_CONFIG,
                              ALERTS_CONSTANTS,
                              $rootScope,
                              $scope,
                              categories) {
  'ngInject';

  const _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.createUpdateCategory;

  /**
   * The current user
   */
  _this.user = $rootScope.currentUser;

  /**
   * Existing colors
   */
  _this.colors = APP_CONFIG.ALL_COLORS;

  /**
   * Existing categories.
   */
  _this.categories = categories;

  _this.isMaximumNumberOfAllowedCategoriesExceeded = maximumNumberOfAllowedCategoriesExceeded;

  _this.isMinimumNumberOfAllowedCategoriesExceeded = isMinimumNumberOfAllowedCategoriesExceeded;

  function maximumNumberOfAllowedCategoriesExceeded() {
    return _this.categories.length >= APP_CONFIG.MAX_ALLOWED_CATEGORIES;
  }

  function isMinimumNumberOfAllowedCategoriesExceeded() {
    return _this.categories.length <= APP_CONFIG.MIN_ALLOWED_CATEGORIES;
  }

  function updateNoOfCategories() {
    $scope.$emit('updateUserStats', { args: { countCategories: _this.categories.length } });
  }

  // ---
  // EVENT LISTENERS (listen for events from e.g. entries list).
  // ---

  /**
   * On category created, display a success message, and add category to the list.
   */
  $scope.$on(CATEGORY_EVENTS.isCreated, (event, args) => {
    _this.categories.push(args.category);

    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryCreated);
    updateNoOfCategories();
  });

  /**
   * On category updated.
   */
  $scope.$on(CATEGORY_EVENTS.isUpdated, (event, args) => {
    _.remove(_this.categories, 'id', args.category.id);
    _this.categories.push(args.category);

    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryUpdated);
  });

  /**
   * On category deleted, display a success message, and remove the category from the list.
   */
  $scope.$on(CATEGORY_EVENTS.isDeleted, (event, args) => {
    _.remove(_this.categories, 'id', args.category.id);

    $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryDeleted);
    updateNoOfCategories();
  });

  $scope.$on(CATEGORY_EVENTS.isErrorOccurred, (event, args) => {
    $scope.$emit(ALERTS_EVENTS.DANGER, {
      message: args.errorMessage,
      alertId: _this.alertId,
    });
  });

}

export default CategoriesController;
