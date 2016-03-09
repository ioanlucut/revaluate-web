((() => {
  // ---
  // Add String format prototype.
  // ---
  if (!String.prototype.format) {
    String.prototype.format = function () {
      const args = arguments;
      return this.replace(/{(\d+)}/g, (match, number) => typeof args[number] !== 'undefined' ? args[number] : match);
    };
  }

  // ---
  // Add Object create function.
  // ---
  if (typeof Object.create !== 'function') {
    Object.create = o => {
      function F() {
      }

      F.prototype = o;
      return new F();
    };
  }

  // ---
  // This is the app config skeleton.
  // ---
  window
    .APP_CONFIG_SKELETON = window.APP_CONFIG_SKELETON || {
      VERSION: '',
      TRIAL_DAYS: -1,
      PREDEFINED_CATEGORIES: [],
      CURRENCIES: [],
      CURRENCIES_LOCALE_MAP: {},
      ALL_COLORS: [],
      SETUP_MIN_CATEGORIES_TO_SELECT: -1,
      IMPORT_MIN_CATEGORIES_TO_SELECT: 0,
      MAX_ALLOWED_CATEGORIES: -1,
      MIN_ALLOWED_CATEGORIES: -1,
      MAX_ALLOWED_GOALS: 2,
      USER_TYPES: [],
      MIN_EXPENSES_TO_ENABLE_BULK_ACTION: -1,
      MIN_GOALS_TO_ENABLE_BULK_ACTION: 2,
      GOALS_TARGETS: [{ value: 'LESS_THAN', label: 'Less' }, { value: 'MORE_THAN', label: 'More' }],
      EXPENSES_ALLOWED_MIN_DATE: moment().year(2000),
      MAX_YEAR_TO_CREATE_GOAL: 2050,
    };

  window
    .APP_STATS_SKELETON = window.APP_STATS_SKELETON || {
      EXPENSES_COUNTS: 0,
    };
})());
