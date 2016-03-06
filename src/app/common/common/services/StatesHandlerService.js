function StatesHandlerService($state, $stateParams, STATES) {

  function call(callback) {
    if (callback && typeof (callback) === 'function') {
      callback();
    }
  }

  this.goToProfile = function() {
    this.go(STATES.profile);
  };

  this.goToSetUp = function() {
    this.go(STATES.setUp);
  };

  this.goToAddPayment = function() {
    this.go(STATES.addPayment);
  };

  this.goToLogin = function() {
    this.go(STATES.account);
  };

  this.goToResetPassword = function() {
    this.go(STATES.account);
  };

  this.go = state => {
    $state.go(state);
  };

  this.goToExpenses = function(callback) {
    this.go(STATES.expenses);

    call(callback);
  };

  this.goHome = function(callback) {
    this.go(STATES.home);

    call(callback);
  };

  this.goToIntegrations = function() {
    this.go(STATES.integrations);
  };

  this.refreshCurrentState = () => {
    $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true,
    });
  };
}

export default StatesHandlerService;
