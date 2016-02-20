(function () {
  'use strict';

  // ---
  // Utilities.
  // ---
  var testUtils = require('helpers/tests');

  describe('app/AuthFilter', function () {

    var $rootScope, $location, $state, $injector, $httpBackend, $q, ENV, AUTH_URLS, AccountModal, DatesUtils, InsightsService, INSIGHTS_URLS, GOAL_URLS, EXPENSE_URLS, CATEGORY_URLS, STATES, AuthServiceMock, UserMock;

    beforeEach(function () {

      // ---
      // Load templates.
      // ---
      angular.mock.module('gulpAngular');

      // ---
      // Provide APP_CONFIG.
      // ---
      angular.mock.module(testUtils.mockAppConfig);

      // ---
      // Just inject the angular.mock.module and define dependencies.
      // ---
      angular.mock.module('revaluate', function ($provide) {
        $provide.value('AuthService', AuthServiceMock = {});
        $provide.value('User', UserMock = {});
      });

      inject(function (_$rootScope_, _$state_, _$location_, _$injector_, _$httpBackend_, _$q_, _ENV_, _AccountModal_, _DatesUtils_, _InsightsService_, _INSIGHTS_URLS_, _EXPENSE_URLS_, _GOAL_URLS_, _CATEGORY_URLS_, _STATES_, _AUTH_URLS_, $templateCache) {
        var period,
          fromFormatted,
          toFormatted,
          goalsToFormatted;

        $rootScope = _$rootScope_;
        $state = _$state_;
        $location = _$location_;
        $injector = _$injector_;
        $httpBackend = _$httpBackend_;
        AccountModal = _AccountModal_;
        $q = _$q_;
        ENV = _ENV_;
        EXPENSE_URLS = _EXPENSE_URLS_;
        CATEGORY_URLS = _CATEGORY_URLS_;
        STATES = _STATES_;
        AUTH_URLS = _AUTH_URLS_;
        DatesUtils = _DatesUtils_;
        InsightsService = _InsightsService_;
        INSIGHTS_URLS = _INSIGHTS_URLS_;
        GOAL_URLS = _GOAL_URLS_;

        URLTo.apiBase(ENV.apiEndpoint);

        // We need add the template entry into the templateCache if we ever specify a templateUrl
        $templateCache.put('template.html', '');

        period = DatesUtils.fromLastMonthsToNow(1);
        fromFormatted = DatesUtils.formatDate(period.from);
        toFormatted = DatesUtils.formatDate(period.to),
          goalsToFormatted = DatesUtils.formatDateExpectedForEndOfMonth(period.to),

          $httpBackend.whenGET(URLTo.api('expenses/retrieve_grouped?page=0&size=50')).respond(200, []);
        $httpBackend.whenGET(URLTo.api('statistics/expenses_months_per_years')).respond(200, []);
        $httpBackend.whenGET(URLTo.api('statistics/goals_months_per_years')).respond(200, []);
        $httpBackend.whenGET(URLTo.api(INSIGHTS_URLS.fetchDailyInsights, {
          ':from': fromFormatted,
          ':to': toFormatted,
        })).respond(200, []);
        $httpBackend.whenGET(URLTo.api(GOAL_URLS.allGoalsFromTo, {
          ':from': fromFormatted,
          ':to': goalsToFormatted,
        })).respond(200, []);
        $httpBackend.whenGET(URLTo.api(CATEGORY_URLS.allCategories)).respond(200, []);

        AuthServiceMock.logout = jasmine.createSpy('logout');
        AuthServiceMock.saveAttemptUrl = jasmine.createSpy('saveAttemptUrl');
      });
    });

    it('should redirect to expenses page a authenticated user', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return true;
            },

            isTrialPeriodExpired: function () {
              return false;
            },
          };
        },
      });

      $state.go(STATES.home);
      $rootScope.$digest();
      $httpBackend.flush();
      expect($state.current.name).toBe('expenses.regular');

      $state.go(STATES.account);
      $rootScope.$digest();
      expect($state.current.name).toBe('expenses.regular');
    });

    it('should redirect to non public page to account page', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(false);

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return true;
            },

            isTrialPeriodExpired: function () {
              return false;
            },
          };
        },
      });

      // ---
      // Non public redirected.
      // ---
      expect(AccountModal.isOpen).toBe(false);
      $state.go(STATES.expenses);
      $rootScope.$digest();
      expect($state.current.name).toBe(STATES.account);

      // ---
      // Public is not redirected.
      // ---
      $state.go(STATES.home);
      $rootScope.$digest();
      expect($state.current.name).toBe(STATES.home);
      expect(AccountModal.isOpen).toBe(false);
    });

    it('should not let user on the setup page once is initiated', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return true;
            },

            isTrialPeriodExpired: function () {
              return false;
            },
          };
        },
      });

      // ---
      // Non public redirected.
      // ---
      $state.go('setup');
      $rootScope.$digest();
      $httpBackend.flush();

      expect($state.current.name).toBe('expenses.regular');
    });

    it('should not let user on other pages than setup and public pages if is NOT initiated', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return false;
            },

            isTrialPeriodExpired: function () {
              return false;
            },
          };
        },
      });

      $state.go(STATES.expenses);
      $rootScope.$digest();
      expect($state.current.name).toBe('setup');
    });

    it('should not let user on other pages than settings.payment.add (if payment is not defined) / payment unrestricted pages if is NOT public page, and not isPaymentMissingUnrestrictedPage, and trial is expired', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);
      $httpBackend.whenPOST(URLTo.api(AUTH_URLS.fetchPaymentToken)).respond(200, []);
      $httpBackend.whenGET(URLTo.api(AUTH_URLS.isPaymentStatusDefined)).respond(200, { paymentStatusDefined: false });

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return true;
            },

            isTrialPeriodExpired: function () {
              return true;
            },
          };
        },
      });

      $httpBackend.flush();

      // ---
      // Try to go to non public page.
      // ---
      $state.go(STATES.expenses);
      $rootScope.$digest();
      expect($state.current.name).toBe('settings.payment.add');

      // ---
      // Try to go to a public page.
      // ---
      $state.go(STATES.pricing);
      $rootScope.$digest();
      expect($state.current.name).toBe(STATES.pricing);
    });

    it('should not let user on other pages than settings.payment.add (if payment is not defined) / payment unrestricted pages if is NOT public page, and not isPaymentMissingUnrestrictedPage, and trial is expired', function () {
      AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);
      $httpBackend.whenPOST(URLTo.api(AUTH_URLS.fetchPaymentToken)).respond(200, []);
      $httpBackend.whenGET(URLTo.api(AUTH_URLS.isPaymentStatusDefined)).respond(200, { paymentStatusDefined: true });
      $httpBackend.whenGET(URLTo.api(AUTH_URLS.fetchPaymentInsights)).respond(200, {});

      UserMock.$new = jasmine.createSpy('$new').and.returnValue({
        loadFromSession: function () {
          return {
            isInitiated: function () {
              return true;
            },

            isTrialPeriodExpired: function () {
              return true;
            },
          };
        },
      });

      $httpBackend.flush();

      // ---
      // Try to go to non public page.
      // ---
      $state.go(STATES.expenses);
      $rootScope.$digest();
      expect($state.current.name).toBe('settings.payment.insights');
    });

  });
}());
