'use strict';

describe('app/AuthFilter', function () {

    var $rootScope, $location, $state, $injector, $httpBackend, $q, ENV, AccountModal, EXPENSE_URLS, CATEGORY_URLS, STATES, AuthServiceMock, UserMock;

    beforeEach(function () {

        // ---
        // Load templates.
        // ---
        module("gulpAngular");

        // ---
        // Provide APP_CONFIG.
        // ---
        module(function ($provide) {
            $provide.constant('APP_CONFIG', {
                "SETUP_MIN_CATEGORIES_TO_SELECT": 3,
                "PREDEFINED_CATEGORIES": ["Bills", "Food"],
                "CURRENCIES": [{
                    "currencyCode": "AED",
                    "displayName": "United Arab Emirates Dirham",
                    "symbol": "د.إ.‏",
                    "numericCode": 784,
                    "fractionSize": 2
                }],
                "VERSION": "1.0.0",
                "MAX_ALLOWED_CATEGORIES": 20,
                "IMPORT_MIN_CATEGORIES_TO_SELECT": 1,
                "TRIAL_DAYS": 15,
                "MIN_ALLOWED_CATEGORIES": 3,
                "MIN_EXPENSES_TO_ENABLE_BULK_ACTION": 1,
                "ALL_COLORS": [{ "id": 1, "color": "#DD5440", "colorName": "red", "priority": 1 }, {
                    "id": 2,
                    "color": "#E29C45",
                    "colorName": "orange",
                    "priority": 2
                }]
            });
        });

        // ---
        // Just inject the module and define dependencies.
        // ---
        module("revaluate", function ($provide) {
            $provide.value('AuthService', AuthServiceMock = {});
            $provide.value('User', UserMock = {});
        });

        inject(function (_$rootScope_, _$state_, _$location_, _$injector_, _$httpBackend_, _$q_, _ENV_, _AccountModal_, _EXPENSE_URLS_, _CATEGORY_URLS_, _STATES_, $templateCache) {
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
            URLTo.apiBase(ENV.apiEndpoint);

            // We need add the template entry into the templateCache if we ever specify a templateUrl
            $templateCache.put('template.html', '');

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
