function SocialConnectService(ENV, OAUTH2_URLS, OAUTH2_SCOPE, $q) {

  // ---
  // Initialize HELLO.
  // ---
  hello
    .init({
      facebook: ENV.OAUTH2_CLIENT_IDS.FACEBOOK,
      google: ENV.OAUTH2_CLIENT_IDS.GOOGLE,
      slack: ENV.OAUTH2_CLIENT_IDS.SLACK,
    }, {
      redirect_uri: ENV.redirectUri,
      oauth_proxy: URLTo.api('oauth/grant'),
    });

  /**
   * Connect with provided provider
   */
  this.connect = function (provider) {
    var deferred = $q.defer();

    hello(provider)
      .login({ scope: OAUTH2_SCOPE }, function () {

        hello(provider)
          .api(provider === 'google' ? '/me' : '/me?fields=id,first_name,last_name,email,locale,verified,picture')
          .then(function (me) {
            deferred.resolve({
              firstName: me.first_name,
              lastName: me.last_name,
              email: me.email,
              picture: me.picture,
            });
          }, function (response) {

            deferred.reject(response);
          });
      });

    return deferred.promise;
  };

  /**
   * Connect with app to integrate and get profile.
   */
  this.connectWithAppGet = function (provider) {
    return hello(provider)
      .login({ scope: 'identify', response_type: 'code' })
      .then(function (authCallResponse) {
        return hello(provider)
          .api('/me')
          .then(function (me) {
            return {
              accessToken: authCallResponse.authResponse.access_token,
              scopes: authCallResponse.authResponse.scope,
              userId: me.user_id,
              teamId: me.team_id,
              teamName: me.team,
            };
          });
      });
  };
}

export default SocialConnectService;
