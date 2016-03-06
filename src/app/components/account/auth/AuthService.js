function AuthService(
  $rootScope,
  $q,
  $http,
  $location,
  redirectToUrlAfterLogin,
  SessionService,
  AUTH_EVENTS,
  AUTH_URLS,
  AUTH_TOKEN_HEADER) {

  /**
   * Is user already authenticated ?
   */
  this.isAuthenticated = () => !_.isUndefined(SessionService.sessionExists());

  function connectWith(url, payload, oAuthData) {
    return $http
      .post(url, payload)
      .then(response => {

        SessionService.create(_.extend(response.data, oAuthData), response.headers()[AUTH_TOKEN_HEADER]);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

        return $q.when(response);
      })
      .catch(response => {

        SessionService.destroy();
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

        return $q.reject(response);
      });
  }

  /**
   * Login functionality
   */
  this.login = (email, password) => connectWith(URLTo.api(AUTH_URLS.login), { email, password });

  /**
   * Connect via oauth
   */
  this.connectViaOauth = (email, payload, oAuthData) => connectWith(URLTo.api(AUTH_URLS.connectViaOauth, { ':email': email }), payload, oAuthData);

  /**
   * Logout functionality
   */
  this.logout = () => {
    SessionService.destroy();
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };

  /**
   * Request password reset functionality
   */
  this.requestPasswordReset = email => $http
    .post(URLTo.api(AUTH_URLS.requestPasswordReset, { ':email': email }));

  this.requestConfirmationEmail = email => $http
    .post(URLTo.api(AUTH_URLS.requestConfirmationEmail, { ':email': email }))
    .then(response => response.data);

  this.validateConfirmationEmailToken = (email, token) => $http
    .post(URLTo.api(AUTH_URLS.validateConfirmationEmailToken, { ':email': email, ':token': token }), {
      skipAuthorization: true,
    })
    .then(response => response.data);

  /**
   * Reset password with token.
   */
  this.resetPasswordWithToken = (email, password, passwordConfirmation, token) => $http
    .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, { ':email': email, ':token': token }),
      {
        password,
        passwordConfirmation,
      },
      {
        skipAuthorization: true,
      })
    .then(response => response.data);

  /**
   * Validate password reset token.
   */
  this.validatePasswordResetToken = (email, token) => $http
    .post(URLTo.api(AUTH_URLS.validatePasswordResetToken, { ':email': email, ':token': token }),
      {
        skipAuthorization: true,
      }).then(response => response.data);

  /**
   * Update password.
   */
  this.updatePassword = (oldPassword, newPassword, newPasswordConfirmation) => $http
    .put(URLTo.api(AUTH_URLS.updatePassword),
      {
        oldPassword,
        newPassword,
        newPasswordConfirmation,
      })
    .then(response => response.data);

  /**
   * Cancel account.
   */
  this.cancelAccount = () => $http
    .delete(URLTo.api(AUTH_URLS.cancel))
    .then(response => response.data);

  this.saveAttemptUrl = () => {
    if ($location.path().toLowerCase() !== '/account') {
      redirectToUrlAfterLogin.url = $location.path();
    }
  };

  this.redirectToAttemptedUrl = () => {
    if (redirectToUrlAfterLogin.url) {
      $location.path(redirectToUrlAfterLogin.url);

      redirectToUrlAfterLogin.url = undefined;
    }
  };
};

export default AuthService;
