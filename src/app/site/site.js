(function () {
  'use strict';

  /**
   * Main site module declaration including ui templates.
   */
  angular
    .module('revaluate.site', [
      'revaluate.common',
    ])
    .config(function ($stateProvider, $urlRouterProvider, USER_ACTIVITY_EVENTS) {

      // Otherwise
      $urlRouterProvider.otherwise('/404');

      // Home
      $stateProvider

      // Home page
        .state('home', {
          url: '/',
          templateUrl: '/app/site/home/home.html',
          title: 'Change the way you spend your money - Revaluate',
          controller: 'HomePageController',
          stateEventName: USER_ACTIVITY_EVENTS.homePage,
          pageId: 'home',
          isPublicPage: true,
        })
        .state('pricing', {
          url: '/pricing',
          templateUrl: '/app/site/pricing/pricing.html',
          title: 'Change the way you spend your money - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.pricingPage,
          pageId: 'pricing',
          isPublicPage: true,
        })
        .state('privacy', {
          url: '/privacy',
          templateUrl: '/app/site/privacy/privacy.html',
          title: 'Privacy - Revaluate',
          stateEventName: USER_ACTIVITY_EVENTS.privacyPage,
          pageId: 'privacy',
          isPublicPage: true,
        })
        .state('terms', {
          url: '/terms',
          templateUrl: '/app/site/terms/terms.html',
          title: 'Terms of Use - Revaluate',
          pageId: 'terms',
          isPublicPage: true,
        })
        .state('404', {
          url: '/404',
          templateUrl: '/app/site/error/404/404.html',
          controller: 'Error404PageController',
          title: 'Hmm... looks like a 404',
          stateEventName: USER_ACTIVITY_EVENTS.error404,
          isPublicPage: true,
        })
        .state('500', {
          url: '/500',
          templateUrl: '/app/site/error/500/500.html',
          controller: 'Error500PageController',
          title: 'Oops... You found a 500',
          stateEventName: USER_ACTIVITY_EVENTS.error500,
          isPublicPage: true,
        });
    });
}());
