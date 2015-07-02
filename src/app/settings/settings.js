'use strict';

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
                controllerAs: 'vm',
                isPaymentMissingUnrestrictedPage: true,
                title: "Profile - Revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.settingsProfile
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
                        controllerAs: 'vm'
                    },
                    'cancelAccount@settings.admin': {
                        templateUrl: "/app/settings/partials/settings.admin.cancelAccount.html",
                        controller: "SettingsCancelAccountController",
                        controllerAs: 'vm'
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
                        controllerAs: 'vm'
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
                controllerAs: 'vm',
                title: "Settings setup - revaluate",
                stateEventName: USER_ACTIVITY_EVENTS.accountSetup
            });
    });
