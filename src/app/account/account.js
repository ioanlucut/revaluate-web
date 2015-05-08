/**
 * Main account module declaration including ui templates.
 */
angular
    .module("account", [
        "common",
        "currencies",
        "categories"
    ])
    .config(function ($stateProvider, $httpProvider) {

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

                        AuthService.validatePasswordResetToken($stateParams.email, $stateParams.token)
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
                isPublicPage: true
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:validatePasswordResetToken.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/validate_password_reset_token_invalid.html",
                controller: "ValidatePasswordResetTokenInvalidController",
                title: "Reset password - Revaluate",
                isPublicPage: true
            })

            // ---
            // Account - second step of registration (set up).
            // ---
            .state("setup", {
                url: "/setup",
                templateUrl: 'app/account/partials/signup_setup.html',
                controller: "SignUpSetUpRegistrationController",
                title: "Setup - Revaluate",
                resolve: {
                    currencies: function (CurrencyService) {
                        return CurrencyService.getAllCurrencies();
                    },
                    colors: function (ColorService) {
                        return ColorService.getAllColors();
                    },
                    predefinedCategories: function (CategoriesSetupProvider) {
                        return CategoriesSetupProvider.getPredefinedCategories();
                    }
                }
            });
    })

    .run(function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    });