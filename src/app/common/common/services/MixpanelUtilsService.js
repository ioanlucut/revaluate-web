function MixpanelUtilsService($window, ENV) {
  'ngInject';

  this.bootMixpanel = function (user) {
    this.initMixpanel();

    // ---
    // Bootstrap mixpanel.
    // ---
    $window.mixpanel.identify(user.model.id);
    $window.mixpanel.people.set(this.getMixpanelUser(user));
  };

  this.initMixpanel = () => {
    $window.mixpanel.init(ENV.mixPanelId);
  };

  this.updateMixpanel = function (user) {

    // ---
    // Update mixpanel.
    // ---
    mixpanel.people.set(this.getMixpanelUser(user));
  };

  this.getMixpanelUser = user => ({
    $email: user.model.email,
    $last_name: user.model.lastName,
    $first_name: user.model.firstName,
    $created: moment(user.model.createdDate).format('YYYY-MM-DDTHH:mm:ss'),
  });
}

export default MixpanelUtilsService;
