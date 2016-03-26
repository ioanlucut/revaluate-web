export default

function SettingsSetUpRegistrationController(ALERTS_EVENTS,
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
  'ngInject';

  const _this = this;

  /**
   * All given currencies.
   */
  _this.currencies = APP_CONFIG.CURRENCIES;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.signUpSetUp;

  /**
   * Current user.
   */
  _this.user = $rootScope.currentUser;

  // ---
  // Detected locale.
  // ---
  const detectedLocale = window.navigator.userLanguage || window.navigator.language, detectedLocaleFormatted = detectedLocale.replace(new RegExp('-', 'g'), '_'), detectedCodeKey = _.findKey(APP_CONFIG.CURRENCIES_LOCALE_MAP, currencyLocaleMap => currencyLocaleMap.indexOf(detectedLocaleFormatted) > -1);

  /**
   * Selected currency
   */
  _this.currency = {};

  // ---
  // Try to auto detect currency.
  // ---
  _this.currency.selected = _.find(_this.currencies, currencyCandidate => currencyCandidate.currencyCode === detectedCodeKey);

  /**
   * Existing predefined colors.
   */
  _this.colors = APP_CONFIG.ALL_COLORS;

  /**
   * Existing predefined categories.
   */
  _this.categories = APP_CONFIG.PREDEFINED_CATEGORIES;

  // ---
  // Populate predefined categories with colors.
  // ---
  _this.categories = _.map(_this.categories, category => ({
    name: category,
    selected: false,
    color: _this.colors[_this.categories.indexOf(category)],
  }));

  /**
   * Category to be added on the fly
   */
  _this.categoryOnTheFly = '';

  /**
   * Show block content
   */
  _this.showCategoryOnTheFlyInput = false;

  /**
   * Toggle content
   */
  _this.toggleContent = () => {
    _this.showCategoryOnTheFlyInput = !_this.showCategoryOnTheFlyInput;
  };

  /**
   * Trigger submit of the category on the fly nested form
   */
  _this.triggerSubmit = () => {
    $scope.$broadcast('category-add-on-the-fly-event');
  };

  /**
   * To be called when on blur.
   */
  _this.cancelAddCategoryOnTheFly = () => {
    resetCategoryOnTheFlyForm();
  };

  /**
   * Reset the category on the fly
   */
  function resetCategoryOnTheFlyForm() {
    _this.showCategoryOnTheFlyInput = false;
    _this.categoryOnTheFly = '';
    _this.setUpForm.categoryOnTheFlyForm.$setPristine();
    _this.badPostSubmitResponse = false;

    // ---
    // If there was a previously error, just clear it.
    // ---
    $scope.$emit(ALERTS_EVENTS.CLEAR, {
      alertId: _this.alertId,
    });
  }

  /**
   * Add a custom category to existing ones (only if name is unique)
   */
  _this.onSubmitted = $event => {
    $event.stopPropagation();

    _this.setUpForm.categoryOnTheFlyForm.$submitted = true;
    if (_this.setUpForm.categoryOnTheFlyForm.$invalid) {
      return;
    }

    const result = _.some(_this.categories, category => category.name.toUpperCase() === _this.categoryOnTheFly.toUpperCase());

    if (result) {
      $scope.$emit(ALERTS_EVENTS.DANGER, {
        message: 'Category is not unique',
        alertId: _this.alertId,
      });
    } else {
      _this.categories.push({
        name: _this.categoryOnTheFly,
        color: CategoryColorService.randomizedColor(_this.colors),
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
  _this.toggleCategorySelection = index => {
    _this.categories[index].selected = !_this.categories[index].selected;
  };

  function getSelectedCategories() {
    return _.filter(_this.categories, 'selected', true);
  }

  _this.selectAll = () => {

    if (getSelectedCategories().length < _this.categories.length) {

      setAllCategoriesWithSelectedStatusOf(true);
    }
  };

  _this.clearAll = () => {

    if (getSelectedCategories().length > 0) {

      setAllCategoriesWithSelectedStatusOf(false);
    }
  };

  function setAllCategoriesWithSelectedStatusOf(status) {
    _.each(_this.categories, category => {
      category.selected = status;
    });
  }

  /**
   * Is enough selected categories
   */
  _this.isEnoughSelectedCategories = () => getSelectedCategories().length >= APP_CONFIG.SETUP_MIN_CATEGORIES_TO_SELECT;

  /**
   * Update profile functionality.
   */
  _this.setUp = () => {
    let selectedCategories, selectedCategoriesToBeSaved, deferred, userProfileToBeUpdated;

    if (_this.setUpForm.$invalid || _this.isSaving) {

      return;
    }

    selectedCategories = angular.copy(getSelectedCategories());
    userProfileToBeUpdated = {
      currency: angular.copy(_this.currency.selected),
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
    _this.isSaving = true;

    // ---
    // Try to save them at once and if successfully, update the user.
    // ---
    CategoryService
      .setupBulkCreateCategories(selectedCategoriesToBeSaved)
      .then(() => {
        _this.user
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
        _this.isSaving = false;
        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Set up successfully! Preparing expenses..');

        /**
         * Finally, go to expenses.
         */
        StatesHandler.goToExpenses();
      })
      .catch(() => {
        _this.badPostSubmitResponse = true;
        _this.isSaving = false;

        $scope.$emit(ALERTS_EVENTS.DANGER, {
          message: 'Ups, something went wrong.',
          alertId: _this.alertId,
        });
      });
  };

}
