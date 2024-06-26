(function (URLTo) {
    'use strict';

    // ---
    // Add String format prototype.
    // ---
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
    }

    // ---
    // Add Object create function.
    // ---
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
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
            'VERSION': '',
            'TRIAL_DAYS': -1,
            'PREDEFINED_CATEGORIES': [],
            'CURRENCIES': [],
            'CURRENCIES_LOCALE_MAP': {},
            'ALL_COLORS': [],
            'SETUP_MIN_CATEGORIES_TO_SELECT': -1,
            'IMPORT_MIN_CATEGORIES_TO_SELECT': 0,
            'MAX_ALLOWED_CATEGORIES': -1,
            'MIN_ALLOWED_CATEGORIES': -1,
            'MAX_ALLOWED_GOALS': 2,
            'USER_TYPES': [],
            'MIN_EXPENSES_TO_ENABLE_BULK_ACTION': -1,
            'MIN_GOALS_TO_ENABLE_BULK_ACTION': 2,
            'GOALS_TARGETS': [{ value: 'LESS_THAN', label: 'Less' }, { value: 'MORE_THAN', label: 'More' }],
            'EXPENSES_ALLOWED_MIN_DATE': moment().year(2000),
            'MAX_YEAR_TO_CREATE_GOAL': 2050
        };

    // ---
    // Bootstrap our angular app.
    // ---
    deferredBootstrapper
        .bootstrap({
            element: document.documentElement,
            module: 'revaluate',
            injectorModules: ['config', 'angular-cache'],
            resolve: {
                APP_CONFIG: ['ENV', '$http', '$q', 'CacheFactory', function (ENV, $http, $q, CacheFactory) {
                    var APP_CACHE_FACTORY_NAME = 'appCache',
                        APP_CONFIG_RESOURCE_URL = 'appconfig/fetchConfig' + '?' + ENV.name + '&' + ENV.cacheResetKey,
                        appCache;

                    URLTo.apiBase(ENV.apiEndpoint);

                    if (ENV.isMaintenanceMode) {
                        return $q.reject({});
                    }

                    if (!CacheFactory.get(APP_CACHE_FACTORY_NAME)) {
                        CacheFactory
                            .createCache(APP_CACHE_FACTORY_NAME, {
                                deleteOnExpire: 'aggressive',
                                recycleFreq: 60000
                            });
                    }

                    appCache = CacheFactory
                        .get(APP_CACHE_FACTORY_NAME);

                    return $http
                        .get(URLTo.api(APP_CONFIG_RESOURCE_URL), { cache: appCache })
                        .then(function (response) {

                            return angular
                                .extend(window.APP_CONFIG_SKELETON, response.data);
                        });
                }

                ]
            }
        });
}
(window.URLTo));
