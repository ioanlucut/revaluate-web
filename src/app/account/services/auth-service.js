'use strict';

/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("revaluate.account")
    .service("AuthService", function ($rootScope, $q, $http, $location, redirectToUrlAfterLogin, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

        /**
         * Is user already authenticated ?
         */
        this.isAuthenticated = function () {
            return !_.isUndefined(SessionService.sessionExists());
        };

        function connectWith(url, payload) {
            return $http
                .post(url, payload)
                .then(function (response) {

                    SessionService.create(response.data, response.headers()[AUTH_TOKEN_HEADER]);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

                    return $q.when(response);
                })
                .catch(function (response) {

                    SessionService.destroy();
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

                    return $q.reject(response);
                });
        }

        /**
         * Login functionality
         */
        this.login = function (email, password) {

            return connectWith(URLTo.api(AUTH_URLS.login), { email: email, password: password });
        };

        /**
         * Connect via oauth
         */
        this.connectViaOauth = function (email, payload) {

            return connectWith(URLTo.api(AUTH_URLS.connectViaOauth, { ":email": email }), payload);
        };

        /**
         * Logout functionality
         */
        this.logout = function () {
            SessionService.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        /**
         * Request password reset functionality
         */
        this.requestPasswordReset = function (email) {
            return $http
                .post(URLTo.api(AUTH_URLS.requestPasswordReset, { ":email": email }));
        };

        this.requestConfirmationEmail = function (email) {
            return $http
                .post(URLTo.api(AUTH_URLS.requestConfirmationEmail, { ":email": email }))
                .then(function (response) {
                    return response.data;
                });
        };

        this.validateConfirmationEmailToken = function (email, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.validateConfirmationEmailToken, { ":email": email, ":token": token }), {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Reset password with token.
         */
        this.resetPasswordWithToken = function (email, password, passwordConfirmation, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, { ":email": email, ":token": token }),
                {
                    password: password,
                    passwordConfirmation: passwordConfirmation
                },
                {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Validate password reset token.
         */
        this.validatePasswordResetToken = function (email, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.validatePasswordResetToken, { ":email": email, ":token": token }),
                {
                    skipAuthorization: true
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update password.
         */
        this.updatePassword = function (oldPassword, newPassword, newPasswordConfirmation) {
            return $http
                .put(URLTo.api(AUTH_URLS.updatePassword),
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirmation: newPasswordConfirmation
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Cancel account.
         */
        this.cancelAccount = function () {
            return $http
                .delete(URLTo.api(AUTH_URLS.cancel))
                .then(function (response) {
                    return response.data;
                });
        };

        this.saveAttemptUrl = function () {
            if ( $location.path().toLowerCase() !== '/account' ) {
                redirectToUrlAfterLogin.url = $location.path();
            }
        };

        this.redirectToAttemptedUrl = function () {
            if ( redirectToUrlAfterLogin.url ) {
                $location.path(redirectToUrlAfterLogin.url);

                redirectToUrlAfterLogin.url = undefined;
            }
        }
    });
