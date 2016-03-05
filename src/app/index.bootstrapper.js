'use strict';

// ---
// Bootstrap our angular app.
// ---
export default deferredBootstrapper
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

        if ( ENV.isMaintenanceMode ) {
          return $q.reject({});
        }

        if ( !CacheFactory.get(APP_CACHE_FACTORY_NAME) ) {
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
      ],
      APP_STATS: ['ENV', '$http', function (ENV, $http) {
        var STATS_RESOURCE_URL = 'appstats/fetch' + '?' + ENV.name + '&' + ENV.cacheResetKey;

        return $http
          .get(URLTo.api(STATS_RESOURCE_URL))
          .then(function (response) {

            return angular
              .extend(window.APP_STATS_SKELETON, response.data);
          })
          .catch(function () {
            return window.APP_STATS_SKELETON;
          });
      }
      ]
    }
  });
