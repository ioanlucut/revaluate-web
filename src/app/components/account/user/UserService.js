export default

function ($http, $q, USER_URLS) {

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
    var deferred = $q.defer();

    if (!_.isUndefined(this.uniqueEmailCache[email])) {

      // Use the value from cache
      deferred.resolve({
        isUnique: this.uniqueEmailCache[email],
        email: email,
      });
    } else {
      $http
        .get(URLTo.api(USER_URLS.userUnique), { params: { email: email } })
        .then(_.bind(function (response) {
          this.uniqueEmailCache[email] = response.data.isUniqueEmail;
          deferred.resolve({
            isUnique: response.data.isUniqueEmail,
            email: email,
          });
        }, this))
        .catch(function () {
          deferred.resolve({
            isUnique: false,
            email: email,
          });
        });
    }

    return deferred.promise;
  };

  /**
   * Reset the unique email cache.
   */
  this.resetUniqueEmailCache = function () {
    this.uniqueEmailCache = {};
  };
}

