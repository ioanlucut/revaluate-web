'use strict';

// ---
// Utilities.
// ---
import * as testUtils from '../../../../helpers/tests';

fdescribe('ValidatePasswordResetTokenControllerSpec', () => {
  let $controller;
  let $rootScope;
  let ALERTS_EVENTS;
  let ALERTS_CONSTANTS;
  let StatesHandler;
  let User;
  let AuthService;
  let ACCOUNT_FORM_STATE;
  let $q;
  let $timeout;
  let ProfileFormToggle;
  let scope;
  let ValidatePasswordResetTokenController;
  const ANY_VALID_TOKEN_RESULT = { email: 'abc', token: 'abc' };

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
            _ACCOUNT_FORM_STATE_,
            _$q_,
            _$timeout_,
            _ProfileFormToggle_) => {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      ALERTS_EVENTS = _ALERTS_EVENTS_;
      ALERTS_CONSTANTS = _ALERTS_CONSTANTS_;
      StatesHandler = _StatesHandler_;
      User = _User_;
      AuthService = _AuthService_;
      ACCOUNT_FORM_STATE = _ACCOUNT_FORM_STATE_;
      $q = _$q_;
      $timeout = _$timeout_;
      ProfileFormToggle = _ProfileFormToggle_;
    });

    function createWithDefaultValues() {
      return $controller('ValidatePasswordResetTokenController', {
        $q,
        $timeout,
        $scope: scope,
        ALERTS_EVENTS,
        ALERTS_CONSTANTS,
        StatesHandler,
        ProfileFormToggle,
        AuthService,
        ACCOUNT_FORM_STATE,
        validateTokenResult: ANY_VALID_TOKEN_RESULT,
      });
    }

    scope = $rootScope.$new();
    ValidatePasswordResetTokenController = createWithDefaultValues();
  });

  it('should be injected', () => {
    expect(ValidatePasswordResetTokenController).toBeDefined();
  });

  it('should have few properties defined/undefined', () => {
    expect(scope.alertId).toBeDefined();
    expect(scope.resetPasswordData).toBeDefined();
    expect(scope.resetPassword).toBeDefined();
    expect(scope.successfullyReseted).toBeUndefined();
    expect(scope.badPostSubmitResponse).toBeUndefined();
    expect(scope.resetPasswordForm).toBeUndefined();
  });

  it('should have resetPasswordData properly initialized', () => {
    expect(scope.resetPasswordData).toEqual({
      email: ANY_VALID_TOKEN_RESULT.email,
      password: '',
      passwordConfirmation: '',
      token: ANY_VALID_TOKEN_RESULT.token,
    });
  });

  it('should not create a user if form is not $valid', (done) => {
    const resetPasswordForm = jasmine.createSpyObj('resetPasswordForm', ['$valid']);
    resetPasswordForm.$valid = false;
    _.assign(scope, { resetPasswordForm });

    const AuthServiceMock = jasmine
      .createSpyObj('AuthService', ['login', 'resetPasswordWithToken']);
    AuthServiceMock.login.and.returnValue($q.when());
    AuthServiceMock.resetPasswordWithToken.and.returnValue($q.when());

    $controller('ValidatePasswordResetTokenController', {
      $q,
      $timeout,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      validateTokenResult: ANY_VALID_TOKEN_RESULT,
      AuthService: AuthServiceMock,
      ACCOUNT_FORM_STATE,
    });

    scope
      .resetPassword()
      .then(() => {
        expect(AuthServiceMock.login).not.toHaveBeenCalled();
        expect(AuthServiceMock.resetPasswordWithToken).not.toHaveBeenCalled();
      })
      .then(done);

    $rootScope.$apply();
  });

  it('should reset password is $valid - and resetPasswordWithToken & login promises are resolved', (done) => {
    const resetPasswordForm = jasmine.createSpyObj('resetPasswordForm', ['$valid']);
    resetPasswordForm.$valid = true;
    _.assign(scope, { resetPasswordForm });

    const AuthServiceMock = jasmine
      .createSpyObj('AuthService', ['login', 'resetPasswordWithToken']);

    const resetPasswordWithTokenDeferred = $q.defer();
    resetPasswordWithTokenDeferred.resolve();
    AuthServiceMock.resetPasswordWithToken.and
      .returnValue(resetPasswordWithTokenDeferred.promise);

    const loginDeferred = $q.defer();
    loginDeferred.resolve();
    AuthServiceMock.login.and
      .returnValue(loginDeferred.promise);

    spyOn(StatesHandler, 'goToExpenses').and.callFake(() => {
    });

    $controller('ValidatePasswordResetTokenController', {
      $q,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      User,
      AuthService: AuthServiceMock,
      validateTokenResult: ANY_VALID_TOKEN_RESULT,
      ACCOUNT_FORM_STATE,
    });

    scope
      .resetPassword(scope.resetPasswordData)
      .then(() => {
        expect(AuthServiceMock.resetPasswordWithToken).toHaveBeenCalledWith(
          scope.resetPasswordData.email,
          scope.resetPasswordData.password,
          scope.resetPasswordData.passwordConfirmation,
          scope.resetPasswordData.token);
        expect(scope.successfullyReseted).toBeTruthy();
        expect(ProfileFormToggle.state).toBe(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

        expect(AuthServiceMock.login)
          .toHaveBeenCalledWith(scope.resetPasswordData.email, scope.resetPasswordData.password);
      })
      .then(done);
    $rootScope.$apply();
  });

  it('should not reset password is $valid - and resetPasswordWithToken resolved & login is rejected', (done) => {
    const resetPasswordForm = jasmine.createSpyObj('resetPasswordForm', ['$valid']);
    resetPasswordForm.$valid = true;
    _.assign(scope, { resetPasswordForm });

    const AuthServiceMock = jasmine
      .createSpyObj('AuthService', ['login', 'resetPasswordWithToken']);

    const resetPasswordWithTokenDeferred = $q.defer();
    resetPasswordWithTokenDeferred.resolve();
    AuthServiceMock.resetPasswordWithToken.and
      .returnValue(resetPasswordWithTokenDeferred.promise);

    const loginDeferred = $q.defer();
    loginDeferred.reject();
    AuthServiceMock.login.and
      .returnValue(loginDeferred.promise);

    spyOn(scope, '$emit');

    $controller('ValidatePasswordResetTokenController', {
      $q,
      $scope: scope,
      ALERTS_EVENTS,
      ALERTS_CONSTANTS,
      StatesHandler,
      User,
      AuthService: AuthServiceMock,
      validateTokenResult: ANY_VALID_TOKEN_RESULT,
      ACCOUNT_FORM_STATE,
    });

    scope
      .resetPassword(scope.resetPasswordData)
      .then(() => {
        expect(AuthServiceMock.resetPasswordWithToken).toHaveBeenCalledWith(
          scope.resetPasswordData.email,
          scope.resetPasswordData.password,
          scope.resetPasswordData.passwordConfirmation,
          scope.resetPasswordData.token);
        expect(scope.successfullyReseted).toBeTruthy();
        expect(scope.badPostSubmitResponse).toBeTruthy();
        expect(ProfileFormToggle.state).toBe(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);
        expect(AuthServiceMock.login).not.toHaveBeenCalledWith();

        expect(scope.$emit).toHaveBeenCalledWith(ALERTS_EVENTS.DANGER, {
          message: 'Ups, something went wrong.',
          alertId: scope.alertId,
        });
      })
      .then(done);
    $rootScope.$apply();
  });
});
