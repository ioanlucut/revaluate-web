'use strict';

describe('app/account/account', function () {

    var $rootScope, $state, $injector, state = 'account';

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
        })

        // ---
        // Just inject the module and define dependencies.
        // ---
        module('revaluate', function () {
        });

        inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            // We need add the template entry into the templateCache if we ever specify a templateUrl
            $templateCache.put('template.html', '');
        })
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('/account');
    });

    it('should interpret values correctly', function () {
        $state.go(state);
        $rootScope.$digest();

        expect($state.current.url).toBe("/account");
        expect($state.current.name).toBe("account");
        expect($state.current.controller).toBe("LoginController");
        expect($state.current.templateUrl).toBe("/app/site/partials/home.html");
        expect($state.current.title).toBe("Login - Revaluate");
        expect($state.current.isPublicPage).toBeTruthy();
    });

});
