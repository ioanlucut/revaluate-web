'use strict';

describe('app/account/logout', function () {

    var $rootScope, $state, $injector, $httpBackend, $q, ENV, EXPENSE_URLS, CATEGORY_URLS, AuthServiceMock, UserMock, state = 'account:logout';

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

        inject(function (_$rootScope_, _$state_, _$injector_, _$httpBackend_, _$q_, _ENV_, _EXPENSE_URLS_, _CATEGORY_URLS_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            ENV = _ENV_;
            EXPENSE_URLS = _EXPENSE_URLS_;
            CATEGORY_URLS = _CATEGORY_URLS_;
            URLTo.apiBase(ENV.apiEndpoint);

            // We need add the template entry into the templateCache if we ever specify a templateUrl
            $templateCache.put('template.html', '');

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
        expect($state.current.controller).toBe("AutoLogoutController");
        expect($state.current.templateUrl).toBe("/app/account/partials/logout.html");
        expect($state.current.title).toBe("Logout - Revaluate");
        expect($state.current.isPublicPage).toBeTruthy();
    });

});
