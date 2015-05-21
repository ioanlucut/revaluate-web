/**
 * Main settings module declaration including ui templates.
 */
angular
    .module("revaluate.settings", [
        "revaluate.account"
    ])
    .config(function ($stateProvider) {

        $stateProvider

            // ---
            // Abstract state - settings.
            // ---
            .state({
                name: "settings",
                url: "/account/settings",
                templateUrl: "app/settings/partials/settings.abstract.html",
                abstract: true
            })

            // ---
            // Profile page.
            // ---
            .state({
                name: "settings.profile",
                url: "/profile",
                templateUrl: "app/settings/partials/settings.profile.html",
                controller: "SettingsProfileController",
                title: "Profile - Revaluate"
            })

            // ---
            // Payment pages.
            // ---

            .state({
                name: "settings.payment",
                url: "/payment",
                templateUrl: "app/settings/partials/settings.payment.abstract.html",
                abstract: true
            })

            .state({
                name: "settings.payment.add",
                url: "/add",
                templateUrl: "app/settings/partials/settings.payment.add.html",
                controller: "SettingsPaymentMethodAddController",
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
                            })
                            .catch(function () {

                                $state.go("settings.payment.insights");
                            });
                    }

                },
                title: "Payment method - Revaluate"
            })

            .state({
                name: "settings.payment.method",
                url: "/method",
                templateUrl: "app/settings/partials/settings.payment.method.html",
                controller: "SettingsPaymentMethodController",
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

                                $state.go("settings.payment.insights");
                            });
                    }
                },
                title: "Payment edit payment method - Revaluate"
            })

            .state({
                name: "settings.payment.customer",
                url: "/customer",
                templateUrl: "app/settings/partials/settings.payment.customer.html",
                controller: "SettingsPaymentCustomerController",
                resolve: {
                    paymentInsights: function ($http, $state, AUTH_URLS) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function () {

                                $state.go("settings.payment.insights");
                            });
                    }
                },
                title: "Payment edit customer - Revaluate"
            })

            .state("settings.payment.insights", {
                url: "/insights",
                templateUrl: "app/settings/partials/settings.payment.insights.html",
                controller: "SettingsPaymentInsightsController",
                resolve: {
                    paymentInsights: function ($http, $state, AUTH_URLS) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function () {

                                $state.go("settings.payment.invalid");
                            });
                    }
                },
                title: "Payment insights - Revaluate"
            })

            .state("settings.payment.invalid", {
                url: "/invalid",
                templateUrl: "app/settings/partials/settings.payment.insights.invalid.html",
                title: "Payment insights invalid - Revaluate"
            })

            // ---
            // Admin page.
            // ---
            .state("settings.admin", {
                url: "/admin",
                views: {
                    '': {
                        templateUrl: "app/settings/partials/settings.admin.abstract.html"
                    },
                    'updatePassword@settings.admin': {
                        templateUrl: "app/settings/partials/settings.admin.updatePassword.html",
                        controller: "SettingsUpdatePasswordController"
                    },
                    'cancelAccount@settings.admin': {
                        templateUrl: "app/settings/partials/settings.admin.cancelAccount.html",
                        controller: "SettingsCancelAccountController"
                    }
                },
                title: "Admin - Revaluate"
            })

            // ---
            // Preferences.
            // ---
            .state("settings.preferences", {
                url: "/preferences",
                views: {
                    '': {
                        templateUrl: "app/settings/partials/settings.preferences.abstract.html"
                    },
                    'updateCurrency@settings.preferences': {
                        templateUrl: "app/settings/partials/settings.preferences.updateCurrency.html",
                        controller: "SettingsPreferencesCurrencyController",
                        resolve: {
                            currencies: function (CurrencyService) {
                                return CurrencyService.getAllCurrencies();
                            }
                        }

                    }
                },
                title: "Preferences - Revaluate"
            })
    });