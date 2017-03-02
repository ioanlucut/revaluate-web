function StatesHandlerService($state, STATES) {
  'ngInject';

  function call(callback) {
    if (callback && typeof (callback) === 'function') {
      callback();
    }
  }

  this.goToSetUp = () => {
    this.go(STATES.setUp);
  };

  this.goToAddPayment = () => {
    this.go(STATES.addPayment);
  };

  this.goToLogin = () => {
    this.go(STATES.account);
  };

  this.go = state => {
    $state.go(state);
  };

  this.goToExpenses = (callback) => {
    this.go(STATES.expenses);

    call(callback);
  };

  this.goHome = (callback) => {
    this.go(STATES.home);

    call(callback);
  };
}

export default StatesHandlerService;
