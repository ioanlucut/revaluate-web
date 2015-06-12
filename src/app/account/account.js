'use strict';

/**
 * Main account module declaration including ui templates.
 */
angular
    .module("revaluate.account", [
        "revaluate.common",
        "revaluate.currencies",
        "revaluate.categories"
    ])
    .config(function ($stateProvider, $httpProvider, MIXPANEL_EVENTS) {

        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

        // Home
        $stateProvider

            // Login page
            .state("account", {
                url: "/account",
                controller: "LoginController",
                templateUrl: "app/site/partials/home.html",
                title: "Login - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.account,
                isPublicPage: true
            })

            // Logout page
            .state("account:logout", {
                url: "/account/logout",
                controller: "LogoutController",
                templateUrl: "app/account/partials/logout.html",
                resolve: {
                    isSuccessfullyLoggedOut: function ($q, AuthService) {
                        AuthService.logout();

                        return true;
                    }
                },
                title: "Logout - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.accountLogout,
                isPublicPage: true
            })

            ///////////////////////////////////////////////
            /*Validate password reset token related views*/
            ///////////////////////////////////////////////

            // Validate password reset token abstract view
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/reset-password",
                templateUrl: "app/account/partials/validate_password_reset_token_abstract.html",
                abstract: true
            })
            // Validate password reset token - valid
            .state({
                name: "account:validatePasswordResetToken.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token_valid.html",
                controller: "ValidatePasswordResetTokenController",
                resolve: {
                    validateTokenResult: function ($stateParams, $q, AuthService, $state) {
                        var deferred = $q.defer();

                        AuthService
                            .validatePasswordResetToken($stateParams.email, $stateParams.token)
                            .then(function (response) {
                                deferred.resolve({ email: $stateParams.email, token: $stateParams.token });
                                return response;
                            })
                            .catch(function (response) {

                                $state.go("account:validatePasswordResetToken.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }
                },
                title: "Reset password - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.accountValidatePasswordResetTokenValid,
                isPublicPage: true
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:validatePasswordResetToken.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/validate_password_reset_token_invalid.html",
                controller: "ValidatePasswordResetTokenInvalidController",
                title: "Reset password - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.accountValidatePasswordResetTokenInvalid,
                isPublicPage: true
            })

            ///////////////////////////////////////////////
            /*Confirmation email related views*/
            ///////////////////////////////////////////////

            // Confirmation email abstract view
            .state({
                name: "account:confirmationEmail",
                url: "/account/confirm-email",
                templateUrl: "app/account/partials/email_confirmation_resend_abstract.html",
                abstract: true
            })
            // Validate confirmation email token - valid
            .state({
                name: "account:confirmationEmail.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/email_confirmation_resend_valid.html",
                resolve: {
                    validateTokenResult: function (AuthService, $rootScope, $stateParams, $q, $state, AUTH_EVENTS) {
                        var deferred = $q.defer();

                        AuthService
                            .validateConfirmationEmailToken($stateParams.email, $stateParams.token)
                            .then(function (response) {

                                // ---
                                // Update user if logged in.
                                // ---
                                if ( AuthService.isAuthenticated() ) {
                                    $rootScope
                                        .currentUser
                                        .setEmailConfirmedAndReload();
                                    $rootScope.$broadcast(AUTH_EVENTS.refreshUser, {});
                                }

                                deferred.resolve({});
                                return response;
                            })
                            .catch(function (response) {

                                $state.go("account:confirmationEmail.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }
                },
                title: "Confirm email - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.accountConfirmationEmailValid,
                isPublicPage: true
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:confirmationEmail.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/email_confirmation_resend_invalid.html",
                title: "Invalid confirmation email token - Revaluate",
                mixpanelId: MIXPANEL_EVENTS.accountConfirmationEmailInvalid,
                isPublicPage: true
            })
    })

    .run(function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    });
