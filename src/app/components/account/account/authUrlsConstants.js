export default

/**
 * Account related constants.
 */
{
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
};