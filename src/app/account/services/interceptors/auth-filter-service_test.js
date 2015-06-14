'use strict';

describe('app/AuthFilter', function () {

    var $rootScope, $location, $state, $injector, $httpBackend, $q, ENV, AccountModal, CURRENCY_URLS, COLOR_URLS, EXPENSE_URLS, CATEGORY_URLS, STATES, AuthServiceMock, UserMock;

    beforeEach(function () {

        // ---
        // Load templates.
        // ---
        module("gulpAngular");

        // ---
        // Just inject the module and define dependencies.
        // ---
        module("revaluate", function ($provide) {
            $provide.value('AuthService', AuthServiceMock = {});
            $provide.value('User', UserMock = {});
        });

        inject(function (_$rootScope_, _$state_, _$location_, _$injector_, _$httpBackend_, _$q_, _ENV_, _AccountModal_, _CURRENCY_URLS_, _COLOR_URLS_, _EXPENSE_URLS_, _CATEGORY_URLS_, _STATES_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $location = _$location_;
            $injector = _$injector_;
            $httpBackend = _$httpBackend_;
            AccountModal = _AccountModal_;
            $q = _$q_;
            ENV = _ENV_;
            CURRENCY_URLS = _CURRENCY_URLS_;
            COLOR_URLS = _COLOR_URLS_;
            EXPENSE_URLS = _EXPENSE_URLS_;
            CATEGORY_URLS = _CATEGORY_URLS_;
            STATES = _STATES_;
            URLTo.apiBase(ENV.apiEndpoint);

            // We need add the template entry into the templateCache if we ever specify a templateUrl
            $templateCache.put('template.html', '');

            $httpBackend.whenGET(URLTo.api(CURRENCY_URLS.allCurrencies)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(COLOR_URLS.allColors)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(EXPENSE_URLS.allExpenses)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(CATEGORY_URLS.allCategories)).respond(200, []);

            AuthServiceMock.logout = jasmine.createSpy('logout');
            AuthServiceMock.saveAttemptUrl = jasmine.createSpy('saveAttemptUrl');
        })
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
                    }
                };
            }
        });

        $state.go(STATES.home);
        $rootScope.$digest();
        expect($state.current.abstract).toBe(true);

        $state.go(STATES.account);
        $rootScope.$digest();
        expect($state.current.abstract).toBe(true);
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
                    }
                };
            }
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
                    }
                };
            }
        });

        // ---
        // Non public redirected.
        // ---
        $state.go("setup");
        $rootScope.$digest();
        expect($state.current.abstract).toBe(true);
    });

    /*it('should not let user on other pages than setup and public pages if is NOT initiated', function () {
     AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);

     UserMock.$new = jasmine.createSpy('$new').and.returnValue({
     loadFromSession: function () {
     return {
     isInitiated: function () {
     return false;
     },
     isTrialPeriodExpired: function () {
     return false;
     }
     };
     }
     });

     $state.go(STATES.expenses);
     $rootScope.$digest();
     expect($state.current.name).toBe("");
     })*/
    ;

});
