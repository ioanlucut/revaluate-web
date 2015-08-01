(function () {
    "use strict";

// ---
// Utilities.
// ---
    var testUtils = require("helpers/tests");

    describe('app/AuthInterceptor', function () {

        var $rootScope, $state, $httpBackend, $q, AuthInterceptor, AUTH_EVENTS;
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
            angular.mock.module("revaluate", function ($provide) {
            });

            inject(function (_$rootScope_, _$state_, _$location_, _$injector_, _$httpBackend_, _$q_, _ENV_, _AccountModal_, _AuthInterceptor_, _AUTH_EVENTS_) {
                $rootScope = _$rootScope_;
                $state = _$state_;
                $httpBackend = _$httpBackend_;
                AuthInterceptor = _AuthInterceptor_;
                $q = _$q_;
                AUTH_EVENTS = _AUTH_EVENTS_;

                spyOn($rootScope, '$broadcast').and.callThrough();
            })
        });

        it('AuthInterceptor and its responseError method should be defined', function () {
            expect(AuthInterceptor).toBeDefined();
            expect(AuthInterceptor.responseError).toBeDefined();
        });

        it('AuthInterceptor called with 401 sent proper event', function () {
            var responseError = AuthInterceptor.responseError({ status: 401 });
            expect($rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.notAuthenticated, { status: 401 });

            assertResponse(responseError, 401);
        });

        it('AuthInterceptor called with 403 sent proper event', function () {
            var responseError = AuthInterceptor.responseError({ status: 403 });
            expect($rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.notAuthorized, { status: 403 });

            assertResponse(responseError, 403);
        });

        it('AuthInterceptor called with 419 sent proper event', function () {
            var responseError = AuthInterceptor.responseError({ status: 419 });
            expect($rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.sessionTimeout, { status: 419 });

            assertResponse(responseError, 419);
        });

        it('AuthInterceptor called with 440 sent proper event', function () {
            var responseError = AuthInterceptor.responseError({ status: 440 });
            expect($rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.sessionTimeout, { status: 440 });

            assertResponse(responseError, 440);
        });

        it('AuthInterceptor called with other ids response is $q.reject()', function () {
            var responseError = AuthInterceptor.responseError({ status: 999 });

            assertResponse(responseError, 999);
        });

        function assertResponse(responseError, status) {
            expect(responseError).toBeTruthy();
            expect(responseError.$$state).toBeTruthy();
            expect(responseError.$$state.status).toBe(2);
            expect(responseError.$$state.value.status).toBe(status);
        }

    });
}());
