import commonModule from './../../common/common';

import HomePageController from './home/HomePageController';
import AbstractErrorPageController from './error/AbstractErrorPageController';
import Error404PageController from './error/404/Error404PageController';
import Error500PageController from './error/500/Error500PageController';
import SiteService from './home/SiteService';

/**
 * Main site module declaration including ui templates.
 */
export default angular
  .module('revaluate.site', [
    commonModule.name,
  ])
  .controller('HomePageController', HomePageController)
  .controller('AbstractErrorPageController', AbstractErrorPageController)
  .controller('AbstractErrorPageController', Error404PageController)
  .controller('AbstractErrorPageController', Error500PageController)
  .service('SiteService', SiteService)
  .config(($stateProvider, $urlRouterProvider, USER_ACTIVITY_EVENTS) => {

    // Otherwise
    $urlRouterProvider.otherwise('/404');

    // Home
    $stateProvider

    // Home page
      .state('home', {
        url: '/',
        templateUrl: '/app/components/site/home/home.html',
        title: 'Change the way you spend your money - Revaluate',
        controller: 'HomePageController',
        stateEventName: USER_ACTIVITY_EVENTS.homePage,
        pageId: 'home',
        isPublicPage: true,
      })
      .state('pricing', {
        url: '/pricing',
        templateUrl: '/app/components/site/pricing/pricing.html',
        title: 'Change the way you spend your money - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.pricingPage,
        pageId: 'pricing',
        isPublicPage: true,
      })
      .state('privacy', {
        url: '/privacy',
        templateUrl: '/app/components/site/privacy/privacy.html',
        title: 'Privacy - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.privacyPage,
        pageId: 'privacy',
        isPublicPage: true,
      })
      .state('terms', {
        url: '/terms',
        templateUrl: '/app/components/site/terms/terms.html',
        title: 'Terms of Use - Revaluate',
        pageId: 'terms',
        isPublicPage: true,
      })
      .state('404', {
        url: '/404',
        templateUrl: '/app/components/site/error/404/404.html',
        controller: 'Error404PageController',
        title: 'Hmm... looks like a 404',
        stateEventName: USER_ACTIVITY_EVENTS.error404,
        isPublicPage: true,
      })
      .state('500', {
        url: '/500',
        templateUrl: '/app/components/site/error/500/500.html',
        controller: 'Error500PageController',
        title: 'Oops... You found a 500',
        stateEventName: USER_ACTIVITY_EVENTS.error500,
        isPublicPage: true,
      });
  });
