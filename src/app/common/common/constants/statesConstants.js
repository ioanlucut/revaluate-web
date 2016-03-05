export default angular
  .module('revaluate.common')
  .constant('STATES', {
    home: 'home',
    integrations: 'settings.integrations.main',
    profile: 'profile',
    expenses: 'expenses.regular',
    setUp: 'setup',
    pricing: 'pricing',
    addPayment: 'settings.payment.add',
    insightsPayment: 'settings.payment.insights',
    account: 'account',
  });
