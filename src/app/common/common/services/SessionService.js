/**
 * Session service which encapsulates the whole logic account related to the Local storage which contains currently logged in user.
 */
function SessionService($localStorage) {

  /**
   * Local storage key for session data.
   *
   * @type {string}
   */
  const sessionDataKey = 'auth_session_data';
  const jwtTokenKey = 'auth_jwt_token';

  /**
   * Create session.
   *
   * @param data
   */
  this.create = function(data, jwtToken) {
    this.setData(data);
    this.setJwtToken(jwtToken);
  };

  /**
   * Set the session data.
   *
   * @param data
   */
  this.setData = data => {

    $localStorage[sessionDataKey] = angular.toJson(data);
  };

  /**
   * Return the session data.
   */
  this.getData = () => angular.fromJson($localStorage[sessionDataKey]);

  /**
   * Set the token data.
   *
   * @param data
   */
  this.setJwtToken = data => {
    $localStorage[jwtTokenKey] = angular.toJson(data);
  };

  /**
   * Return the session data.
   */
  this.getJwtToken = () => angular.fromJson($localStorage[jwtTokenKey]);

  this.sessionExists = () => $localStorage[sessionDataKey] && $localStorage[jwtTokenKey];

  /**
   * Destroy session.
   */
  this.destroy = () => {
    delete $localStorage[sessionDataKey];
    delete $localStorage[jwtTokenKey];
  };

}

export default SessionService;
