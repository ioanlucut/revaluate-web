require('./index.utils.js');

import revaluateAppConfig from './config/revaluateAppConfig';
import revaluateSite from './components/site/site';
import revaluateFeedback from './components/feedback/feedback';
import revaluateContact from './components/contact/contact';
import revaluateCategories from './components/categories/categories';
import revaluateGoals from './components/goals/goals';
import revaluateExpensesImport from './components/import/import';
import revaluateExpenses from './components/expenses/expenses';
import revaluateStatistics from './components/statistics/statistics';
import revaluateAccount from './components/account/account';
import revaluateSettings from './components/settings/settings';
import revaluateInsights from './components/insights/insights';
import revaluateIntegrations from './components/integrations/integrations';
import revaluateIntercom from './components/intercom/intercom';
import indexConfig from './index.config';
import IndexController from './index.controller';

export default angular
  .module('revaluate', [
    'braintree-angular',
    'angular-cache',
    'angularFileUpload',
    'angular-loading-bar',
    'ngAnimate',
    'ngMessages',
    'ngStorage',
    'ngSanitize',
    'ngIntercom',
    'ui.gravatar',
    'angularPayments',
    'pascalprecht.translate',
    'ngToast',
    'ui.select',
    'infinite-scroll',
    'snap',
    'ajoslin.promise-tracker',
    'ui.bootstrap.accordion',
    'duScroll',
    revaluateAppConfig,
    revaluateSite.name,
    revaluateAccount.name,
    revaluateFeedback.name,
    revaluateContact.name,
    revaluateCategories.name,
    revaluateGoals.name,
    revaluateExpensesImport.name,
    revaluateExpenses.name,
    revaluateStatistics.name,
    revaluateSettings.name,
    revaluateInsights.name,
    revaluateIntegrations.name,
    revaluateIntercom.name,
  ])
  .config(indexConfig)
  .run(ENV => {
    URLTo.apiBase(ENV.apiEndpoint);
  })
  .controller('IndexController', IndexController);
