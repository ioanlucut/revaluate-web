'use strict';

describe('app/account/logout', function () {

    var $rootScope, $state, $injector, $httpBackend, $q, ENV, CURRENCY_URLS, COLOR_URLS, EXPENSE_URLS, CATEGORY_URLS, AuthServiceMock, UserMock, state = 'account:logout';

    beforeEach(function () {

        // ---
        // Just inject the module and define dependencies.
        // ---
        module("revaluate", function ($provide) {
            $provide.value('AuthService', AuthServiceMock = {});
            $provide.value('User', UserMock = {});
        });

        inject(function (_$rootScope_, _$state_, _$injector_, _$httpBackend_, _$q_, _ENV_, _CURRENCY_URLS_, _COLOR_URLS_, _EXPENSE_URLS_, _CATEGORY_URLS_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            ENV = _ENV_;
            CURRENCY_URLS = _CURRENCY_URLS_;
            COLOR_URLS = _COLOR_URLS_;
            EXPENSE_URLS = _EXPENSE_URLS_;
            CATEGORY_URLS = _CATEGORY_URLS_;
            URLTo.apiBase(ENV.apiEndpoint);

            // We need add the template entry into the templateCache if we ever specify a templateUrl
            $templateCache.put('template.html', '');

            $httpBackend.whenGET(URLTo.api(CURRENCY_URLS.allCurrencies)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(COLOR_URLS.allColors)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(EXPENSE_URLS.allExpenses)).respond(200, []);
            $httpBackend.whenGET(URLTo.api(CATEGORY_URLS.allCategories)).respond(200, []);

            AuthServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(true);
            AuthServiceMock.logout = jasmine.createSpy('logout');

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
        })
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('/account/logout');
    });

    it('should interpret values correctly', function () {
        $state.go(state);
        $rootScope.$digest();

        expect($state.current.url).toBe("/account/logout");
        expect($state.current.name).toBe("account:logout");
        expect($state.current.controller).toBe("LogoutController");
        expect($state.current.templateUrl).toBe("/app/account/partials/logout.html");
        expect($state.current.title).toBe("Logout - Revaluate");
        expect($state.current.isPublicPage).toBeTruthy();
    });

    it('should resolve data', function () {
        $state.go(state);
        $rootScope.$digest();
        expect($state.current.name).toBe(state);

        // Call invoke to inject dependencies and run function
        expect($injector.invoke($state.current.resolve.isSuccessfullyLoggedOut)).toBe(true);
    });

});
