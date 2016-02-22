(function () {
  'use strict';

  /**
   * Main settings module declaration including ui templates.
   */
  angular
    .module('revaluate.settings', [
      'revaluate.account',
    ])
    .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

      $stateProvider

      // ---
      // Abstract state - settings.
      // ---
        .state({
          name: 'settings',
          url: '/account/settings',
          templateUrl: '/app/components/settings/settings/settingsAbstract.html',
          abstract: true,
        })

        // ---
        // Profile page.
        // ---
        .state({
          name: 'settings.profile',
          url: '/profile',
          templateUrl: '/app/components/settings/settingsProfile/settingsProfile.html',
          controller: 'SettingsProfileController',
          controllerAs: 'vm',
          isPaymentMissingUnrestrictedPage: true,
          title: 'Profile - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.settingsProfile,
        })

        // ---
        // Payment pages.
        // ---

        .state({
          name: 'settings.payment',
          url: '/payment',
          templateUrl: '/app/components/settings/settingsPayment/settingsPaymentAbstract.html',
          abstract: true,
        })

        .state({
          name: 'settings.payment.add',
          url: '/add',
          templateUrl: '/app/components/settings/settingsPayment/settingsPaymentAdd.html',
          controller: 'SettingsPaymentMethodAddController',
          controllerAs: 'vm',
          isPaymentMissingUnrestrictedPage: true,
          resolve: {
            clientToken: function ($http, AUTH_URLS) {
              return $http
                .post(URLTo.api(AUTH_URLS.fetchPaymentToken))
                .then(function (response) {
                  return response.data.clientToken;
                });
            },

            paymentStatus: function ($http, AUTH_URLS, $state) {
              return $http
                .get(URLTo.api(AUTH_URLS.isPaymentStatusDefined))
                .then(function (response) {
                  if (response.data.paymentStatusDefined) {

                    $state.go('settings.payment.insights');
                  }

                  return response.data.paymentStatusDefined;
                });
            },

          },
          title: 'Payment method - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentAdd,
        })

        .state({
          name: 'settings.payment.method',
          url: '/method',
          templateUrl: '/app/components/settings/settingsPayment/settingsPaymentMethodUpdate.html',
          controller: 'SettingsEditPaymentMethodController',
          controllerAs: 'vm',
          isPaymentMissingUnrestrictedPage: true,
          resolve: {
            clientToken: function ($http, AUTH_URLS) {
              return $http
                .post(URLTo.api(AUTH_URLS.fetchPaymentToken))
                .then(function (response) {
                  return response.data.clientToken;
                });
            },

            paymentInsights: function ($http, $state, AUTH_URLS) {
              return $http
                .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                .then(function (response) {
                  return response.data;
                })
                .catch(function () {

                  $state.go('settings.payment.add');
                });
            },
          },
          stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentMethodEdit,
          title: 'Payment edit payment method - Revaluate',
        })

        .state({
          name: 'settings.payment.customer',
          url: '/customer',
          templateUrl: '/app/components/settings/settingsPayment/settingsPaymentCustomer.html',
          controller: 'SettingsPaymentCustomerController',
          isPaymentMissingUnrestrictedPage: true,
          resolve: {
            paymentInsights: function ($http, $state, AUTH_URLS) {
              return $http
                .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                .then(function (response) {
                  return response.data;
                })
                .catch(function () {

                  $state.go('settings.payment.add');
                });
            },
          },
          stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentMethodEditCustomer,
          title: 'Payment edit customer - Revaluate',
        })

        .state('settings.payment.insights', {
          url: '/insights',
          templateUrl: '/app/components/settings/settingsPayment/settingsPaymentInsights.html',
          controller: 'SettingsPaymentInsightsController',
          controllerAs: 'vm',
          isPaymentMissingUnrestrictedPage: true,
          resolve: {
            paymentInsights: function ($http, $state, AUTH_URLS) {
              return $http
                .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                .then(function (response) {
                  return response.data;
                })
                .catch(function () {

                  $state.go('settings.payment.add');
                });
            },
          },
          stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentInsights,
          title: 'Payment insights - Revaluate',
        })

        // ---
        // Admin page.
        // ---
        .state('settings.admin', {
          url: '/admin',
          isPaymentMissingUnrestrictedPage: true,
          views: {
            '': {
              templateUrl: '/app/components/settings/settingsAdmin/settingsAdminAbstract.html',
            },
            'updatePassword@settings.admin': {
              templateUrl: '/app/components/settings/settingsAdmin/settingsAdminUpdatePassword.html',
              controller: 'SettingsAdminUpdatePasswordController',
              controllerAs: 'vm',
            },
            'cancelAccount@settings.admin': {
              templateUrl: '/app/components/settings/settingsAdmin/settingsAdminCancelAccount.html',
              controller: 'SettingsCancelAccountController',
              controllerAs: 'vm',
            },
          },
          stateEventName: USER_ACTIVITY_EVENTS.settingsAccount,
          title: 'Admin - Revaluate',
        })

        // ---
        // Preferences.
        // ---
        .state('settings.preferences', {
          url: '/preferences',
          isPaymentMissingUnrestrictedPage: true,
          views: {
            '': {
              templateUrl: '/app/components/settings/settingsPreferences/settingsPreferencesAbstract.html',
            },
            'updateCurrency@settings.preferences': {
              templateUrl: '/app/components/settings/settingsPreferences/settingsPreferencesUpdateCurrency.html',
              controller: 'SettingsPreferencesCurrencyController',
              controllerAs: 'vm',
            },
          },
          stateEventName: USER_ACTIVITY_EVENTS.settingsPreferences,
          title: 'Preferences - Revaluate',
        })

        // ---
        // Account - second step of registration (set up).
        // ---
        .state('setup', {
          url: '/setup',
          templateUrl: '/app/components/settings/settingsSetupRegistration/settingsSetupRegistration.html',
          controller: 'SettingsSetUpRegistrationController',
          controllerAs: 'vm',
          title: 'Settings setup - revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.accountSetup,
        });
    });
}());
