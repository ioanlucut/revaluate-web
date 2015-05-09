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

            // ---
            // Import.
            // ---
            .state("settings.import", {
                url: "/import",
                views: {
                    '': {
                        templateUrl: "app/settings/partials/settings.import.abstract.html"
                    },
                    'importExpenses@settings.import': {
                        templateUrl: "app/settings/partials/settings.import.importExpenses.html",
                        controller: "SettingsImportController",
                        resolve: {
                            currencies: function (CurrencyService) {
                                return CurrencyService.getAllCurrencies();
                            }
                        }

                    }
                },
                title: "Import - Revaluate"
            });
    });