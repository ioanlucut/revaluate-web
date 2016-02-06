'use strict';

import IndexUtils from './index.utils';

import revaluateConfig from './config/config';
import revaluateCommon from './common/common';
import revaluateSite from './site/site';
import revaluateFeedback from './feedback/feedback';
import revaluateContact from './contact/contact';
import revaluateCategories from './categories/categories';
import revaluateGoals from './goals/goals';
import revaluateExpensesImport from './import/import';
import revaluateExpenses from './expenses/expenses';
import revaluateStatistics from './statistics/statistics';
import revaluateAccount from './account/account';
import revaluateSettings from './settings/settings';
import revaluateInsights from './insights/insights';
import revaluateIntegrations from './integrations/integrations';
import revaluateIntercom from './intercom/intercom';
import indexConfig from './index.config';
import IndexController from './index.controller';

angular
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
        revaluateConfig,
        revaluateAccount.name,
        revaluateSite,
        revaluateFeedback,
        revaluateContact,
        revaluateCategories,
        revaluateGoals,
        revaluateExpensesImport,
        revaluateExpenses,
        revaluateStatistics,
        revaluateSettings,
        revaluateInsights,
        revaluateIntegrations,
        revaluateIntercom
    ])
    .config(indexConfig)
    .run(function (ENV) {
        URLTo.apiBase(ENV.apiEndpoint);
    })
    .controller('IndexController', IndexController);
