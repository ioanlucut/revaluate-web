/**
 * Directive responsible for switching update profile forms between them.
 */
function profileFormToggleDirective(ProfileFormToggle, ACCOUNT_FORM_STATE) {
  'ngInject';

  return {
    restrict: 'A',
    link(scope) {
      scope.ProfileFormToggle = ProfileFormToggle;
      scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

      // ---
      // Default state.
      // ---
      scope.ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);
    },
  };
}

export default profileFormToggleDirective;
