function JwtHelperService() {

  this.urlBase64Decode = str => {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
      {
        break;
      }

      case 2:
      {
        output += '==';
        break;
      }

      case 3:
      {
        output += '=';
        break;
      }

      default:
      {
        throw 'Illegal base64url string!';
      }
    }
    return window.atob(output);
  };

  this.decodeToken = function (token) {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  };

  this.getTokenExpirationDate = function (token) {
    let decoded;
    decoded = this.decodeToken(token);

    if (!decoded.exp) {
      return null;
    }

    const d = new Date(0); // The 0 here is the key, which sets the date to the epoch
    d.setUTCSeconds(decoded.exp);

    return d;
  };

  this.isTokenExpired = function (token) {
    const d = this.getTokenExpirationDate(token);

    if (!d) {
      return false;
    }

    // Token expired?
    return !(d.valueOf() > new Date().valueOf());
  };
}

export default JwtHelperService;
