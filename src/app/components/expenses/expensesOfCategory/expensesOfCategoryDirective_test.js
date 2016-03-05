export default

  // ---
  // Utilities.
  // ---
  var testUtils = require('helpers/tests');

  describe('app/expenses/expensesOfCategory', function () {

    var $rootScope, $location, $state, scope, $injector, $httpBackend, $timeout, $q, ENV, AUTH_URLS, AccountModal, DatesUtils, InsightsService, INSIGHTS_URLS, EXPENSE_URLS, CATEGORY_URLS, STATES, AuthServiceMock, UserMock, $compile;

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
      angular.mock.module('revaluate');

      inject(function (_$rootScope_, _$state_, _$location_, _$injector_, _$httpBackend_, _$timeout_, _$q_, _ENV_, _$compile_, _AccountModal_, _DatesUtils_, _InsightsService_, _INSIGHTS_URLS_, _EXPENSE_URLS_, _CATEGORY_URLS_, _STATES_, _AUTH_URLS_, $templateCache) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $location = _$location_;
        $injector = _$injector_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
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

        URLTo.apiBase(ENV.apiEndpoint);

        $compile = _$compile_;
        scope = $rootScope.$new();
      });

    });

    it('should not show anything if total per category insights is 0', function () {
      var scope = _.extend($rootScope.$new(), {
          totalPerCategory: { numberOfTransactions: 0 },
          monthYearDate: '10/2015',
        }),
        elm = $compile('<expenses-of-category total-per-category-insights="totalPerCategory" month-year-date="yearMonthDate"></expenses-of-category>')(scope);
      scope.$digest();

      expect(elm.find('.expenses__list__expand').length).toBe(0);
      expect(elm.find('.expenses__list__category__loading').length).toBe(0);
      expect(elm.find('.expenses__list__category').length).toBe(0);
    });

    it('initial transactions count should be shown if transactions > 0', function () {
      var scope = _.extend($rootScope.$new(), {
          totalPerCategory: {
            categoryDTO: {
              id: 31,
              name: 'BILLS',
              color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
            },
            biggestExpense: {
              id: 718,
              value: 730.0,
              description: 'Chiria August',
              category: {
                id: 31,
                name: 'BILLS',
                color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
              },
              spentDate: '2015-08-02T12:51:38.121',
              createdDate: '2015-08-13T09:46:23.114',
              modifiedDate: '2015-08-13T10:36:51.540',
            },
            numberOfTransactions: 7,
            totalAmountFormatted: '1212.90',
            totalAmount: 1212.9,
          },
          monthYearDate: '10/2015',
        }),
        elm = $compile('<expenses-of-category total-per-category-insights="totalPerCategory" month-year-date="yearMonthDate"></expenses-of-category>')(scope);
      scope.$digest();

      expect(elm.find('.expenses__list__expand').length).toBe(1);
      expect(elm.find('.expenses__list__expand').text().trim()).toBe('7 transactions');
      expect(elm.find('.expenses__list__category__loading').length).toBe(0);
      expect(elm.find('.expenses__list__category').length).toBe(0);
    });

    it('loads list if element is clicked, but does not show anything if nothing is returned back', function () {
      var scope = _.extend($rootScope.$new(), {
          totalPerCategory: {
            categoryDTO: {
              id: 31,
              name: 'BILLS',
              color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
            },
            biggestExpense: {
              id: 718,
              value: 730.0,
              description: 'Chiria August',
              category: {
                id: 31,
                name: 'BILLS',
                color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
              },
              spentDate: '2015-08-02T12:51:38.121',
              createdDate: '2015-08-13T09:46:23.114',
              modifiedDate: '2015-08-13T10:36:51.540',
            },
            numberOfTransactions: 7,
            totalAmountFormatted: '1212.90',
            totalAmount: 1212.9,
          },
          monthYearDate: '10/2015',
        }),
        elm = $compile('<expenses-of-category total-per-category-insights="totalPerCategory" month-year-date="yearMonthDate"></expenses-of-category>')(scope),
        period = DatesUtils.fromLastMonthsToNow(1),
        fromFormatted = DatesUtils.formatDate(period.from),
        toFormatted = DatesUtils.formatDate(period.to);
      scope.$digest();

      $httpBackend.whenGET(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
        ':categoryId': 31,
        ':from': fromFormatted,
        ':to': toFormatted,
      })).respond(200, []);

      expect(elm.find('.expenses__list__category__loading').length).toBe(0);
      expect(elm.find('.expenses__list__expand').click());
      expect(elm.find('.expenses__list__category__loading').length).toBe(1);
      expect(elm.find('.expenses__list__category').length).toBe(0);
      scope.$digest();
    });

    it('loads list if element is clicked, and shows the list', function () {
      var scope = _.extend($rootScope.$new(), {
          totalPerCategory: {
            categoryDTO: {
              id: 31,
              name: 'BILLS',
              color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
            },
            biggestExpense: {
              id: 718,
              value: 730.0,
              description: 'Chiria August',
              category: {
                id: 31,
                name: 'BILLS',
                color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
              },
              spentDate: '2015-08-02T12:51:38.121',
              createdDate: '2015-08-13T09:46:23.114',
              modifiedDate: '2015-08-13T10:36:51.540',
            },
            numberOfTransactions: 7,
            totalAmountFormatted: '1212.90',
            totalAmount: 1212.9,
          },
          monthYearDate: '10/2015',
        }),
        elm,
        period = DatesUtils.fromLastMonthsToNow(1),
        fromFormatted = DatesUtils.formatDate(period.from),
        toFormatted = DatesUtils.formatDate(period.to);

      $httpBackend
        .whenGET(URLTo.api(EXPENSE_URLS.allExpensesOfCategory, {
          ':categoryId': 31,
          ':from': fromFormatted,
          ':to': toFormatted,
        }))
        .respond(200, [{
          id: 634,
          value: 76.0,
          description: 'Asigurare',
          category: {
            id: 31,
            name: 'BILLS',
            color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
          },
          spentDate: '2015-08-03T09:57:03.099',
          createdDate: '2015-08-03T07:57:14.582',
          modifiedDate: '2015-08-03T07:57:14.582',
        }, {
          id: 799,
          value: 26.0,
          description: 'Internet UPC',
          category: {
            id: 31,
            name: 'BILLS',
            color: { id: 1, color: '#DD5440', colorName: 'red', priority: 1 },
          },
          spentDate: '2015-08-18T19:41:51.077',
          createdDate: '2015-08-18T17:36:54.737',
          modifiedDate: '2015-08-18T17:36:54.737',
        },]);

      elm = $compile('<expenses-of-category total-per-category-insights="totalPerCategory" month-year-date="yearMonthDate"></expenses-of-category>')(scope);
      scope.$digest();

      expect(elm.find('.expenses__list__category__loading').length).toBe(0);
      expect(elm.find('.expenses__list__category').length).toBe(0);
      expect(elm.find('.expenses__list__expand').click());

      // This is only shown if > 50 elements
      expect(elm.find('.expenses__list__transactions__showall').length).toBe(0);

      expect(elm.find('.expenses__list__category__loading').length).toBe(1);
      $httpBackend.flush();
      $timeout.flush();
      expect(elm.find('.expenses__list__category__loading').length).toBe(0);

      expect(elm.find('.expenses__list__category').length).toBe(1);
      expect(elm.find('.expenses__list__category__entry').length).toBe(2);
    });

  });

