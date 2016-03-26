// ---
// Bootstrap our angular app.
// ---
export default deferredBootstrapper
  .bootstrap({
    element: document.documentElement,
    module: 'revaluate',
    bootstrapConfig: {
      strictDi: true
    },
    injectorModules: ['config', 'angular-cache'],
    resolve: {
      APP_CONFIG: ['ENV', '$http', '$q', 'CacheFactory', (ENV, $http, $q, CacheFactory) => {
        const APP_CACHE_FACTORY_NAME = 'appCache';
        const APP_CONFIG_RESOURCE_URL = `appconfig/fetchConfig?${ENV.name}&${ENV.cacheResetKey}`;
        let appCache;

        URLTo.apiBase(ENV.apiEndpoint);

        if (ENV.isMaintenanceMode) {
          return $q.reject({});
        }

        if (!CacheFactory.get(APP_CACHE_FACTORY_NAME)) {
          CacheFactory
            .createCache(APP_CACHE_FACTORY_NAME, {
              deleteOnExpire: 'aggressive',
              recycleFreq: 60000,
            });
        }

        appCache = CacheFactory
          .get(APP_CACHE_FACTORY_NAME);

        return $http
          .get(URLTo.api(APP_CONFIG_RESOURCE_URL), { cache: appCache })
          .then(response => angular
            .extend(window.APP_CONFIG_SKELETON, response.data));
      },
      ],
    },
  });
