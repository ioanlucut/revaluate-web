export default

/**
 * Account related constants.
 */
angular
  .constant('USER_SUBSCRIPTION_STATUS', {
    TRIAL: 'TRIAL',
    TRIAL_EXPIRED: 'TRIAL_EXPIRED',
    ACTIVE: 'ACTIVE',
  })
  .constant('AUTH_EVENTS', {
    isLoggedIn: 'auth-is-logged-in',
    loginSuccess: 'auth-login-success',
    refreshUser: 'auth-refresh-user',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
  }).constant('AUTH_MODAL', {
    close: 'close',
  })
  .constant('AUTH_URLS', {
    login: 'account/login',
    connectViaOauth: 'account/connectViaOauth/:email',
    logout: 'account/logout',
    currentUser: 'account/user',
    auth: 'account',
    create: 'account',
    details: 'account',
    cancel: 'account',
    updateInitiatedStatus: 'account/updateInitiatedStatus',
    updateAccountDetails: 'account/updateAccountDetails',
    updateCurrency: 'account/updateCurrency',
    requestPasswordReset: 'account/requestResetPassword/:email',
    resetPasswordWithToken: 'account/resetPassword/:email/:token',
    validatePasswordResetToken: 'account/validateResetPasswordToken/:email/:token',
    updatePassword: 'account/updatePassword',
    requestConfirmationEmail: 'account/requestConfirmationEmail/:email',
    validateConfirmationEmailToken: 'account/validateConfirmationEmailToken/:email/:token',
    fetchPaymentToken: 'payment/fetchToken',
    fetchPaymentInsights: 'payment/fetchPaymentInsights',
    subscribeToStandardPlan: 'payment/subscribeToStandardPlan',
    createCustomerWithPaymentMethodSubscribeToStandardPlan: 'payment/createCustomerWithPaymentMethodSubscribeToStandardPlan',
    fetchPaymentStatus: 'payment/fetchPaymentStatus',
    updateCustomer: 'payment/updateCustomer',
    updatePaymentMethod: 'payment/updatePaymentMethod',
    removePaymentMethod: 'payment/removePaymentMethod',
    isPaymentStatusDefined: 'payment/isPaymentStatusDefined',
  })
  .constant('ACCOUNT_FORM_STATE', {
    login: 'login',
    logout: 'logout',
    signUp: 'signUp',
    signUpSuccessfully: 'signUpSuccessfully',
    forgotPassword: 'forgotPassword',
    forgotPasswordEmailSent: 'forgotPasswordEmailSent',
    requestSignUpRegistration: 'requestSignUpRegistration',
    updateProfile: 'updateProfile',
    resetPassword: 'resetPassword',
    resetPasswordSuccessfully: 'resetPasswordSuccessfully',
    updatePassword: 'updatePassword',
    updatePasswordSuccessfully: 'updatePasswordSuccessfully',
  })
  .constant('AUTH_TOKEN_HEADER', 'authtoken');

