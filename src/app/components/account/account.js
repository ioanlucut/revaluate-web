import accountFormStateConstants from './account/accountFormStateConstants';
import authEventsConstants from './account/authEventsConstants';
import authModalConstants from './account/authModalConstants';
import authUrlsConstants from './account/authUrlsConstants';
import userSubscriptionStatusConstants from './account/userSubscriptionStatusConstants';
import socialConnectConstants from './socialConnect/socialConnectConstants';

import authTokenHeaderConstants from './account/authTokenHeaderConstants';
import strongPasswordDirective from './directives/strongPasswordDirective';
import uniqueEmailDirective from './directives/uniqueEmailDirective';
import validEmailDirective from './directives/validEmailDirective';
import LogoutAutoController from './logout/LogoutAutoController';
import LogoutController from './logout/LogoutController';
import ProfileFormToggleService from './profile/ProfileFormToggleService';
import profileFormToggleDirective from './profile/profileFormToggleDirective';
import SignUpController from './signUp/SignUpController';
import User from './user/User';
import UserService from './user/UserService';
import userConstants from './user/userConstants';
import SocialConnectController from './socialConnect/SocialConnectController';
import SocialConnectService from './socialConnect/SocialConnectService';
import socialConnectOauthConstants from './socialConnect/socialConnectOauthConstants';
import ValidatePasswordResetTokenController from './validatePasswordResetToken/ValidatePasswordResetTokenController';
import ValidatePasswordResetTokenInvalidController from './validatePasswordResetToken/ValidatePasswordResetTokenInvalidController';
import EmailConfirmationResendController from './emailConfirmationResend/EmailConfirmationResendController';
import AccountLoginController from './accountModal/AccountLoginController';
import AccountForgotPasswordController from './accountModal/AccountForgotPasswordController';
import accountModal from './accountModal/AccountModal';
import accountModalDirective from './accountModal/accountModalDirective';
import accountModalToggleDirective from './accountModal/accountModalToggleDirective';
import accountModalCloseDirective from './accountModal/accountModalCloseDirective/accountModalCloseDirective';

import auth from './auth/auth';

/**
 * Main account module declaration including ui templates.
 */
export default angular
  .module('revaluate.account', [
    'revaluate.common',
    'revaluate.categories',
    auth.name,
  ])
  .constant('ACCOUNT_FORM_STATE', accountFormStateConstants)
  .constant('AUTH_EVENTS', authEventsConstants)
  .constant('AUTH_MODAL', authModalConstants)
  .constant('AUTH_URLS', authUrlsConstants)
  .constant('USER_SUBSCRIPTION_STATUS', userSubscriptionStatusConstants)
  .constant('OAUTH2_URLS', socialConnectConstants)
  .constant('AUTH_TOKEN_HEADER', authTokenHeaderConstants)
  .directive('accountModalClose', accountModalCloseDirective)
  .directive('strongPassword', strongPasswordDirective)
  .directive('uniqueEmail', uniqueEmailDirective)
  .directive('validEmail', validEmailDirective)
  .controller('LogoutController', LogoutAutoController)
  .controller('LogoutController', LogoutController)
  .service('ProfileFormToggle', ProfileFormToggleService)
  .directive('profileFormToggle', profileFormToggleDirective)
  .controller('SignUpController', SignUpController)
  .factory('User', User)
  .service('UserService', UserService)
  .constant('USER_URLS', userConstants)
  .controller('SocialConnectController', SocialConnectController)
  .service('SocialConnectService', SocialConnectService)
  .constant('OAUTH2_SCOPE', socialConnectOauthConstants)
  .controller('ValidatePasswordResetTokenController', ValidatePasswordResetTokenController)
  .controller('ValidatePasswordResetTokenInvalidController', ValidatePasswordResetTokenInvalidController)
  .controller('EmailConfirmationResendController', EmailConfirmationResendController)
  .controller('AccountLoginController', AccountLoginController)
  .controller('AccountForgotPasswordController', AccountForgotPasswordController)
  .service('AccountModal', accountModal)
  .directive('accountModal', accountModalDirective)
  .directive('accountModalToggle', accountModalToggleDirective)

  .config(($stateProvider, $httpProvider, USER_ACTIVITY_EVENTS) => {

    // Register AuthInterceptor
    $httpProvider.interceptors.push('AuthInterceptor');

    // Home
    $stateProvider

    // Login page
      .state('account', {
        url: '/account',
        controller: 'AccountLoginController',
        templateUrl: '/app/components/site/home/home.html',
        title: 'Login - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.account,
        isPublicPage: true,
      })

      // Logout page
      .state('account:logout', {
        url: '/account/logout',
        controller: 'LogoutAutoController',
        controllerAs: 'vm',
        templateUrl: '/app/components/account/logout/logout.html',
        title: 'Logout - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.accountLogout,
        isPublicPage: true,
      })

      ///////////////////////////////////////////////
      /*Validate password reset token related views*/

      ///////////////////////////////////////////////

      // Validate password reset token abstract view
      .state({
        name: 'account:validatePasswordResetToken',
        url: '/account/reset-password',
        templateUrl: '/app/components/account/components/validatePasswordResetTokenAbstract/validatePasswordResetTokenAbstract.html',
        abstract: true,
      })

      // Validate password reset token - valid
      .state({
        name: 'account:validatePasswordResetToken.valid',
        url: '/{email}/{token}',
        templateUrl: '/app/components/account/components/validatePasswordResetTokenAbstract/validatePasswordResetTokenValid.html',
        controller: 'ValidatePasswordResetTokenController',
        resolve: {
          validateTokenResult($stateParams, $q, AuthService, $state) {
            const deferred = $q.defer();

            AuthService
              .validatePasswordResetToken($stateParams.email, $stateParams.token)
              .then(response => {
                deferred.resolve({ email: $stateParams.email, token: $stateParams.token });
                return response;
              })
              .catch(response => {

                $state.go('account:validatePasswordResetToken.invalid');
                return response;
              });

            return deferred.promise;
          },
        },
        title: 'Reset password - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.accountValidatePasswordResetTokenValid,
        isPublicPage: true,
      })

      // Validate password reset token - invalid token
      .state({
        name: 'account:validatePasswordResetToken.invalid',
        url: '/invalid-token',
        templateUrl: '/app/components/account/components/validatePasswordResetTokenAbstract/validatePasswordResetTokenInvalid.html',
        controller: 'ValidatePasswordResetTokenInvalidController',
        title: 'Reset password - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.accountValidatePasswordResetTokenInvalid,
        isPublicPage: true,
      })

      ///////////////////////////////////////////////
      /*Confirmation email related views*/

      ///////////////////////////////////////////////

      // Confirmation email abstract view
      .state({
        name: 'account:confirmationEmail',
        url: '/account/confirm-email',
        templateUrl: '/app/components/account/emailConfirmationResend/emailConfirmationResendAbstract.html',
        abstract: true,
      })

      // Validate confirmation email token - valid
      .state({
        name: 'account:confirmationEmail.valid',
        url: '/{email}/{token}',
        templateUrl: '/app/components/account/emailConfirmationResend/emailConfirmationResendValid.html',
        resolve: {
          validateTokenResult(AuthService, $rootScope, $stateParams, $q, $state, AUTH_EVENTS) {
            const deferred = $q.defer();

            AuthService
              .validateConfirmationEmailToken($stateParams.email, $stateParams.token)
              .then(response => {

                // ---
                // Update user if logged in.
                // ---
                if (AuthService.isAuthenticated()) {
                  $rootScope
                    .currentUser
                    .setEmailConfirmedAndReload();
                  $rootScope.$broadcast(AUTH_EVENTS.refreshUser, {});
                }

                deferred.resolve({});
                return response;
              })
              .catch(response => {

                $state.go('account:confirmationEmail.invalid');
                return response;
              });

            return deferred.promise;
          },
        },
        title: 'Confirm email - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.accountConfirmationEmailValid,
        isPublicPage: true,
      })

      // Validate password reset token - invalid token
      .state({
        name: 'account:confirmationEmail.invalid',
        url: '/invalid-token',
        templateUrl: '/app/components/account/emailConfirmationResend/emailConfirmationResendInvalid.html',
        title: 'Invalid confirmation email token - Revaluate',
        stateEventName: USER_ACTIVITY_EVENTS.accountConfirmationEmailInvalid,
        isPublicPage: true,
      });
  })

  .run(($rootScope, AuthFilter) => {

    // Setup route filters
    $rootScope.$on('$stateChangeStart', AuthFilter);

  });
