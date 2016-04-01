function StatesHandlerService($state, STATES) {
  'ngInject';

  function call(callback) {
    if (callback && typeof (callback) === 'function') {
      callback();
    }
  }

  this.goToSetUp = function () {
    this.go(STATES.setUp);
  };

  this.goToAddPayment = function () {
    this.go(STATES.addPayment);
  };

  this.goToLogin = function () {
    this.go(STATES.account);
  };

  this.go = state => {
    $state.go(state);
  };

  this.goToExpenses = function (callback) {
    this.go(STATES.expenses);

    call(callback);
  };

  this.goHome = function (callback) {
    this.go(STATES.home);

    call(callback);
  };
}

export default StatesHandlerService;
