function UserService($http, $q, USER_URLS) {
  'ngInject';

  /**
   * The list of already verified email addresses.
   *
   * @type {{}}
   */
  this.uniqueEmailCache = {};

  /**
   * Check if an email address is unique.
   *
   * @param email
   * @returns {*}
   */
  this.isUnique = function (email) {
    // Create deferred
    const deferred = $q.defer();

    if (!_.isUndefined(this.uniqueEmailCache[email])) {

      // Use the value from cache
      deferred.resolve({
        isUnique: this.uniqueEmailCache[email],
        email,
      });
    } else {
      $http
        .get(URLTo.api(USER_URLS.userUnique), { params: { email } })
        .then(_.bind(function (response) {
          this.uniqueEmailCache[email] = response.data.isUniqueEmail;
          deferred.resolve({
            isUnique: response.data.isUniqueEmail,
            email,
          });
        }, this))
        .catch(() => {
          deferred.resolve({
            isUnique: false,
            email,
          });
        });
    }

    return deferred.promise;
  };

}

export default UserService;
