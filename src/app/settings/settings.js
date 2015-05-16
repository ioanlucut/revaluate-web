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
            // Payment page.
            // ---
            .state({
                name: "settings.payment",
                url: "/payment",
                templateUrl: "app/settings/partials/settings.payment.html",
                controller: "SettingsPaymentController",
                resolve: {
                    clientToken: function () {
/*
                        return $braintree
                            .getClientToken();
*/

                        return "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJiNjJhZmMyNDBjMmQ3NjVhNDRhNzhmYTFiNzQyOWE1MDY5NGRiMzFkMTFmNjc5ODY1MzhiYjQ4YWU2MmE2MTFmfGNyZWF0ZWRfYXQ9MjAxNS0wNS0xNlQxODowNzozNC43MDAzMDUzODkrMDAwMFx1MDAyNmN1c3RvbWVyX2lkPTYxNzE0MjA5XHUwMDI2bWVyY2hhbnRfaWQ9Njc0OHRwN2d4eGJqMmN2OFx1MDAyNnB1YmxpY19rZXk9eTV3OWp0cTdyMzV3NmZ5MyIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy82NzQ4dHA3Z3h4YmoyY3Y4L2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvNjc0OHRwN2d4eGJqMmN2OC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20ifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwidGhyZWVEU2VjdXJlIjp7Imxvb2t1cFVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy82NzQ4dHA3Z3h4YmoyY3Y4L3RocmVlX2Rfc2VjdXJlL2xvb2t1cCJ9LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJyZXZhbHVhdGUuaW8iLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoicXZzOHhkaGs0dmszano5eSIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiNjc0OHRwN2d4eGJqMmN2OCIsInZlbm1vIjoib2ZmIn0";
                    }
                },
                title: "Payment - Revaluate"
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