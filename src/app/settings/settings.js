(function () {
    "use strict";

    /**
     * Main settings module declaration including ui templates.
     */
    angular
        .module("revaluate.settings", [
            "revaluate.account"
        ])
        .config(function ($stateProvider, USER_ACTIVITY_EVENTS) {

            $stateProvider

                // ---
                // Abstract state - settings.
                // ---
                .state({
                    name: "settings",
                    url: "/account/settings",
                    templateUrl: "/app/settings/partials/settings.abstract.html",
                    abstract: true
                })

                // ---
                // Profile page.
                // ---
                .state({
                    name: "settings.profile",
                    url: "/profile",
                    templateUrl: "/app/settings/partials/settings.profile.html",
                    controller: "SettingsProfileController",
                    controllerAs: "vm",
                    isPaymentMissingUnrestrictedPage: true,
                    title: "Profile - Revaluate",
                    stateEventName: USER_ACTIVITY_EVENTS.settingsProfile
                })

                // ---
                // Payment pages.
                // ---

                .state({
                    name: "settings.payment",
                    url: "/payment",
                    templateUrl: "/app/settings/partials/settings.payment.abstract.html",
                    abstract: true
                })

                .state({
                    name: "settings.payment.add",
                    url: "/add",
                    templateUrl: "/app/settings/partials/settings.payment.add.html",
                    controller: "SettingsPaymentMethodAddController",
                    controllerAs: "vm",
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
                                    if ( response.data.paymentStatusDefined ) {

                                        $state.go("settings.payment.insights");
                                    }
                                    return response.data.paymentStatusDefined;
                                });
                        }

                    },
                    title: "Payment method - Revaluate",
                    stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentAdd
                })

                .state({
                    name: "settings.payment.method",
                    url: "/method",
                    templateUrl: "/app/settings/partials/settings.payment.method.update.html",
                    controller: "SettingsEditPaymentMethodController",
                    controllerAs: "vm",
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

                                    $state.go("settings.payment.add");
                                });
                        }
                    },
                    stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentMethodEdit,
                    title: "Payment edit payment method - Revaluate"
                })

                .state({
                    name: "settings.payment.customer",
                    url: "/customer",
                    templateUrl: "/app/settings/partials/settings.payment.customer.html",
                    controller: "SettingsPaymentCustomerController",
                    isPaymentMissingUnrestrictedPage: true,
                    resolve: {
                        paymentInsights: function ($http, $state, AUTH_URLS) {
                            return $http
                                .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                                .then(function (response) {
                                    return response.data;
                                })
                                .catch(function () {

                                    $state.go("settings.payment.add");
                                });
                        }
                    },
                    stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentMethodEditCustomer,
                    title: "Payment edit customer - Revaluate"
                })

                .state("settings.payment.insights", {
                    url: "/insights",
                    templateUrl: "/app/settings/partials/settings.payment.insights.html",
                    controller: "SettingsPaymentInsightsController",
                    controllerAs: "vm",
                    isPaymentMissingUnrestrictedPage: true,
                    resolve: {
                        paymentInsights: function ($http, $state, AUTH_URLS) {
                            return $http
                                .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                                .then(function (response) {
                                    return response.data;
                                })
                                .catch(function () {

                                    $state.go("settings.payment.add");
                                });
                        }
                    },
                    stateEventName: USER_ACTIVITY_EVENTS.settingsPaymentInsights,
                    title: "Payment insights - Revaluate"
                })

                // ---
                // Admin page.
                // ---
                .state("settings.admin", {
                    url: "/admin",
                    isPaymentMissingUnrestrictedPage: true,
                    views: {
                        '': {
                            templateUrl: "/app/settings/partials/settings.admin.abstract.html"
                        },
                        'updatePassword@settings.admin': {
                            templateUrl: "/app/settings/partials/settings.admin.updatePassword.html",
                            controller: "SettingsUpdatePasswordController",
                            controllerAs: "vm"
                        },
                        'cancelAccount@settings.admin': {
                            templateUrl: "/app/settings/partials/settings.admin.cancelAccount.html",
                            controller: "SettingsCancelAccountController",
                            controllerAs: "vm"
                        }
                    },
                    stateEventName: USER_ACTIVITY_EVENTS.settingsAccount,
                    title: "Admin - Revaluate"
                })

                // ---
                // Preferences.
                // ---
                .state("settings.preferences", {
                    url: "/preferences",
                    isPaymentMissingUnrestrictedPage: true,
                    views: {
                        '': {
                            templateUrl: "/app/settings/partials/settings.preferences.abstract.html"
                        },
                        'updateCurrency@settings.preferences': {
                            templateUrl: "/app/settings/partials/settings.preferences.updateCurrency.html",
                            controller: "SettingsPreferencesCurrencyController",
                            controllerAs: "vm"
                        }
                    },
                    stateEventName: USER_ACTIVITY_EVENTS.settingsPreferences,
                    title: "Preferences - Revaluate"
                })

                // ---
                // Account - second step of registration (set up).
                // ---
                .state("setup", {
                    url: "/setup",
                    templateUrl: '/app/settings/partials/settings.setup.registration.html',
                    controller: "SettingsSetUpRegistrationController",
                    controllerAs: "vm",
                    title: "Settings setup - revaluate",
                    stateEventName: USER_ACTIVITY_EVENTS.accountSetup
                });
        });
}());
