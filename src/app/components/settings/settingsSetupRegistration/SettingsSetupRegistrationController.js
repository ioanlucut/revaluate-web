export default

function SettingsSetUpRegistrationController(
  ALERTS_EVENTS,
  APP_CONFIG,
  AUTH_EVENTS,
  ALERTS_CONSTANTS,
  USER_ACTIVITY_EVENTS,
  $q,
  $scope,
  $rootScope,
  $timeout,
  CategoryService,
  CategoryColorService,
  SessionService,
  StatesHandler,
  Category) {

  const vm = this;

  /**
   * All given currencies.
   */
  vm.currencies = APP_CONFIG.CURRENCIES;

  /**
   * Alert identifier
   */
  vm.alertId = ALERTS_CONSTANTS.signUpSetUp;

  /**
   * Current user.
   */
  vm.user = $rootScope.currentUser;

  // ---
  // Detected locale.
  // ---
  const detectedLocale = window.navigator.userLanguage || window.navigator.language, detectedLocaleFormatted = detectedLocale.replace(new RegExp('-', 'g'), '_'), detectedCodeKey = _.findKey(APP_CONFIG.CURRENCIES_LOCALE_MAP, currencyLocaleMap => currencyLocaleMap.indexOf(detectedLocaleFormatted) > -1);

  /**
   * Selected currency
   */
  vm.currency = {};

  // ---
  // Try to auto detect currency.
  // ---
  vm.currency.selected = _.find(vm.currencies, currencyCandidate => currencyCandidate.currencyCode === detectedCodeKey);

  /**
   * Existing predefined colors.
   */
  vm.colors = APP_CONFIG.ALL_COLORS;

  /**
   * Existing predefined categories.
   */
  vm.categories = APP_CONFIG.PREDEFINED_CATEGORIES;

  // ---
  // Populate predefined categories with colors.
  // ---
  vm.categories = _.map(vm.categories, category => ({
    name: category,
    selected: false,
    color: vm.colors[vm.categories.indexOf(category)]
  }));

  /**
   * Category to be added on the fly
   */
  vm.categoryOnTheFly = '';

  /**
   * Show block content
   */
  vm.showCategoryOnTheFlyInput = false;

  /**
   * Toggle content
   */
  vm.toggleContent = () => {
    vm.showCategoryOnTheFlyInput = !vm.showCategoryOnTheFlyInput;
  };

  /**
   * Trigger submit of the category on the fly nested form
   */
  vm.triggerSubmit = () => {
    $scope.$broadcast('category-add-on-the-fly-event');
  };

  /**
   * To be called when on blur.
   */
  vm.cancelAddCategoryOnTheFly = () => {
    resetCategoryOnTheFlyForm();
  };

  /**
   * Reset the category on the fly
   */
  function resetCategoryOnTheFlyForm() {
    vm.showCategoryOnTheFlyInput = false;
    vm.categoryOnTheFly = '';
    vm.setUpForm.categoryOnTheFlyForm.$setPristine();
    vm.badPostSubmitResponse = false;

    // ---
    // If there was a previously error, just clear it.
    // ---
    $scope.$emit(ALERTS_EVENTS.CLEAR, {
      alertId: vm.alertId,
    });
  }

  /**
   * Add a custom category to existing ones (only if name is unique)
   */
  vm.onSubmitted = $event => {
    $event.stopPropagation();

    vm.setUpForm.categoryOnTheFlyForm.$submitted = true;
    if (vm.setUpForm.categoryOnTheFlyForm.$invalid) {
      return;
    }

    const result = _.some(vm.categories, category => category.name.toUpperCase() === vm.categoryOnTheFly.toUpperCase());

    if (result) {
      $scope.$emit(ALERTS_EVENTS.DANGER, {
        message: 'Category is not unique',
        alertId: vm.alertId,
      });
    } else {
      vm.categories.push({
        name: vm.categoryOnTheFly,
        color: CategoryColorService.randomizedColor(vm.colors),
        selected: true,
      });

      // ---
      // Reinitialize the value and form.
      // ---
      resetCategoryOnTheFlyForm();
    }
  };

  /**
   * Toggle category selection
   */
  vm.toggleCategorySelection = index => {
    vm.categories[index].selected = !vm.categories[index].selected;
  };

  function getSelectedCategories() {
    return _.filter(vm.categories, 'selected', true);
  }

  vm.selectAll = () => {

    if (getSelectedCategories().length < vm.categories.length) {

      setAllCategoriesWithSelectedStatusOf(true);
    }
  };

  vm.clearAll = () => {

    if (getSelectedCategories().length > 0) {

      setAllCategoriesWithSelectedStatusOf(false);
    }
  };

  function setAllCategoriesWithSelectedStatusOf(status) {
    _.each(vm.categories, category => {
      category.selected = status;
    });
  }

  /**
   * Is enough selected categories
   */
  vm.isEnoughSelectedCategories = () => getSelectedCategories().length >= APP_CONFIG.SETUP_MIN_CATEGORIES_TO_SELECT;

  /**
   * Update profile functionality.
   */
  vm.setUp = () => {
    let selectedCategories, selectedCategoriesToBeSaved, deferred, userProfileToBeUpdated;

    if (vm.setUpForm.$invalid || vm.isSaving) {

      return;
    }

    selectedCategories = angular.copy(getSelectedCategories());
    userProfileToBeUpdated = {
      currency: angular.copy(vm.currency.selected),
      initiated: true,
    };

    // ---
    // We perform a bulk create.
    // ---
    selectedCategoriesToBeSaved = _.map(selectedCategories, categoryDTO => new Category(categoryDTO));

    // ---
    // This is the final deferred to update the user.
    // ---
    deferred = $q.defer();

    // ---
    // Flag is saving flag.
    // ---
    vm.isSaving = true;

    // ---
    // Try to save them at once and if successfully, update the user.
    // ---
    CategoryService
      .setupBulkCreateCategories(selectedCategoriesToBeSaved)
      .then(() => {
        vm.user
          .updateInitiatedStatus(userProfileToBeUpdated)
          .then(response => {
            deferred.resolve(response);
          })
          .catch(response => deferred.reject(response));
      })
      .catch(response => deferred.reject(response));

    // ---
    // Wait for the final deferred.
    // ---
    deferred
      .promise
      .then(response => {
        // ---
        // We need to set the data and refresh the user.
        // ---
        SessionService.setData(response.data);
        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, {
          intercomAttributes: {
            initiated: true,
            countCategories: selectedCategoriesToBeSaved.length,
          },
        });

        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.accountSetupFinished);

        // ---
        // Show some feedback.
        // ---
        vm.isSaving = false;
        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Set up successfully! Preparing expenses..');

        /**
         * Finally, go to expenses.
         */
        StatesHandler.goToExpenses();
      })
      .catch(() => {
        vm.badPostSubmitResponse = true;
        vm.isSaving = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Ups, something went wrong.',
          alertId: vm.alertId,
        });
      });
  };

}
