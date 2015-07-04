'use strict';

// ---
// Utilities.
// ---
var testUtils = require("helpers/tests");

describe('app/account/account', function () {

    var $rootScope, $state, $injector, state = 'account';

    beforeEach(function () {

        // ---
        // Load templates.
        // ---
        angular.mock.module("gulpAngular");

        // ---
        // Provide APP_CONFIG.
        // ---
        angular.mock.module(testUtils.mockAppConfig);

        // ---
        // Just inject the angular.mock.module and define dependencies.
        // ---
        angular.mock.module('revaluate', function () {
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
