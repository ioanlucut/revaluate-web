'use strict';

// ---
// Utilities.
// ---
import * as testUtils from '../../../../helpers/tests';

describe('SignUpControllerSpec', () => {
  let $controller;
  let $rootScope;
  let ALERTS_EVENTS;
  let ALERTS_CONSTANTS;
  let StatesHandler;
  let User;
  let AuthService;
  let USER_ACTIVITY_EVENTS;
  let $q;
  let APP_CONFIG;
  let scope;
  let SignUpController;

  beforeEach(() => {
    // ---
    // Load templates.
    // ---
    angular.mock.module('revaluatePartials');

    // ---
    // Provide APP_CONFIG
    // ---
    angular.mock.module('revaluate', testUtils.mockAppConfig);

    inject((_$rootScope_,
            _$controller_,
            _ALERTS_EVENTS_,
            _ALERTS_CONSTANTS_,
            _StatesHandler_,
            _User_,
            _AuthService_,
            _USER_ACTIVITY_EVENTS_,
            _$q_,
            _APP_CONFIG_) => {
              $rootScope = _$rootScope_;
              $controller = _$controller_;
              ALERTS_EVENTS = _ALERTS_EVENTS_;
              ALERTS_CONSTANTS = _ALERTS_CONSTANTS_;
              StatesHandler = _StatesHandler_;
              User = _User_;
              AuthService = _AuthService_;
              USER_ACTIVITY_EVENTS = _USER_ACTIVITY_EVENTS_;
              $q = _$q_;
              APP_CONFIG = _APP_CONFIG_;
            });

    function createWithDefaultValues() {
      return $controller('SignUpController', {
        $q,
        $scope: scope,
        ALERTS_EVENTS,
        ALERTS_CONSTANTS,
        StatesHandler,
        User,
        AuthService,
        USER_ACTIVITY_EVENTS,
        APP_CONFIG,
      });
    }

    scope = $rootScope.$new();
    SignUpController = createWithDefaultValues();
  });

  it('should be injected', () => {
    expect(SignUpController).toBeDefined();
  });

  it('should have few properties defined/undefined', () => {
    expect(scope.alertId).toBeDefined();
    expect(scope.signUpData).toBeDefined();
    expect(scope.trialDays).toBeDefined();
    expect(scope.signUp).toBeDefined();
    expect(scope.isRequestPending).toBeUndefined();
    expect(scope.signUpForm).toBeUndefined();
  });

  it('should have signUpData properly initialized', () => {
    expect(scope.signUpData).toEqual({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      currency: {
        currencyCode: 'EUR',
      },
    });
  });

  it('should not create a user if form is not $valid', () => {
    const signUpForm = jasmine.createSpyObj('signUpForm', ['$valid']);
    signUpForm.$valid = false;
    _.assign(scope, { signUpForm });

    const UserMock = testUtils.getDefaultMockUser();

    $controller('SignUpController', {
      $q,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      User: UserMock,
      AuthService,
      USER_ACTIVITY_EVENTS,
      APP_CONFIG,
    });

    scope.signUp();
    expect(UserMock.$new).not.toHaveBeenCalled();
  });

  it('should create a user if form is $valid - and promise is resolved', (done) => {
    const signUpForm = jasmine.createSpyObj('signUpForm', ['$valid']);
    signUpForm.$valid = true;
    _.assign(scope, { signUpForm });

    const deferred = $q.defer();
    deferred.resolve();

    const createSpy = jasmine.createSpy('create');
    createSpy.and.returnValue(deferred.promise);

    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    AuthServiceMock.login.and.returnValue($q.when());

    spyOn(User, '$new').and.returnValue({
      loadFromSession() {
        return {
          isInitiated() {
            return true;
          },

          isTrialPeriodExpired() {
            return false;
          },
        };
      },

      create: createSpy,
    });

    spyOn(StatesHandler, 'goToSetUp').and.callFake(() => {
    });

    spyOn(scope, '$emit');

    $controller('SignUpController', {
      $q,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      User,
      AuthService: AuthServiceMock,
      USER_ACTIVITY_EVENTS,
      APP_CONFIG,
    });

    scope
      .signUp(scope.signUpData)
      .then(() => {
        expect(User.$new).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalledWith(scope.signUpData);
        expect(scope.isRequestPending).toBeFalsy();
        expect(AuthServiceMock.login)
          .toHaveBeenCalledWith(scope.signUpData.email, scope.signUpData.password);
        expect(StatesHandler.goToSetUp).toHaveBeenCalled();
        expect(scope.$emit)
          .toHaveBeenCalledWith('trackEvent', USER_ACTIVITY_EVENTS.signUpCompleted);
      })
      .then(done);
    $rootScope.$apply();
  });

  it('should create a user if form is $valid - and promise is rejected', (done) => {
    const signUpForm = jasmine.createSpyObj('signUpForm', ['$valid']);
    signUpForm.$valid = true;
    _.assign(scope, { signUpForm });

    const deferred = $q.defer();
    deferred.reject();

    const createSpy = jasmine.createSpy('create');
    createSpy.and.returnValue(deferred.promise);

    const AuthServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    AuthServiceMock.login.and.returnValue($q.when());

    spyOn(User, '$new').and.returnValue({
      loadFromSession() {
        return {
          isInitiated() {
            return true;
          },

          isTrialPeriodExpired() {
            return false;
          },
        };
      },

      create: createSpy,
    });

    spyOn(StatesHandler, 'goToSetUp').and.callFake(() => {
    });

    spyOn(scope, '$emit');

    $controller('SignUpController', {
      $q,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      User,
      AuthService: AuthServiceMock,
      USER_ACTIVITY_EVENTS,
      APP_CONFIG,
    });

    scope
      .signUp(scope.signUpData)
      .then(() => {
        expect(User.$new).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalledWith(scope.signUpData);
        expect(scope.isRequestPending).toBeFalsy();
        expect(AuthServiceMock.login)
          .not.toHaveBeenCalledWith(scope.signUpData.email, scope.signUpData.password);
        expect(StatesHandler.goToSetUp).not.toHaveBeenCalled();

        expect(scope.badPostSubmitResponse).toBeTruthy();
        expect(scope.isRequestPending).toBeFalsy();
        expect(scope.$emit).toHaveBeenCalledWith(ALERTS_EVENTS.DANGER, {
          message: 'Ups, something went wrong.',
          alertId: scope.alertId,
        });
      })
      .then(done);
    $rootScope.$apply();
  });
});
