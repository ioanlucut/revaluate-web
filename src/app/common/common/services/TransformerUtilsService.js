/**
 * Transformer utils service.
 */
function TransformerUtilsService() {

  /**
   * Copies keys from a sourceObject to a targetObject, except given skipKeys.
   * @param sourceObject
   * @param targetObject
   * @param skipKeys
   */
  this.copyKeysFromTo = (sourceObject, targetObject, skipKeys) => {
    _.each(_.keys(sourceObject), key => {
      if (!(skipKeys && _.contains(skipKeys, key))) {
        targetObject[key] = sourceObject[key];
      }
    });
  };

  /**
   * Sanitize recipients (remove duplicates).
   */
  this.sanitizeRecipients = recipients => _.uniq(recipients, 'email');
}

export default TransformerUtilsService;
