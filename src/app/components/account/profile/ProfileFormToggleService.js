/**
 * Profile form toggle responsible to keep the state of the current displayed update profile form.
 */
function ProfileFormToggleService(ACCOUNT_FORM_STATE) {
  'ngInject';

  this.state = ACCOUNT_FORM_STATE.updateProfile;

  this.setState = function (state) {
    this.state = state;
  };
}

export default ProfileFormToggleService;
