/**
 * Account related constants.
 */
angular
    .module("revaluate.account")
    .constant("USER_SUBSCRIPTION_STATUS", {
        TRIAL: "TRIAL",
        TRIAL_EXPIRED: "TRIAL_EXPIRED",
        ACTIVE: "ACTIVE"
    })
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
        refreshUser: "auth-refresh-user",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    })
    .constant("AUTH_URLS", {
        login: "account/login",
        logout: "account/logout",
        currentUser: "account/user",
        auth: "account",
        create: "account",
        update: "account",
        details: "account",
        cancel: "account",
        updateCurrency: "account/updateCurrency",
        requestPasswordReset: "account/requestResetPassword/:email",
        resetPasswordWithToken: "account/resetPassword/:email/:token",
        validatePasswordResetToken: "account/validateResetPasswordToken/:email/:token",
        updatePassword: "account/updatePassword",
        requestConfirmationEmail: "account/requestConfirmationEmail/:email",
        validateConfirmationEmailToken: "account/validateConfirmationEmailToken/:email/:token",
        fetchPaymentToken: "payment/fetchToken",
        fetchPaymentInsights: "payment/fetchPaymentInsights",
        subscribeToStandardPlan: "payment/subscribeToStandardPlan",
        createCustomerWithPaymentMethod: "payment/createCustomerWithPaymentMethod",
        fetchPaymentStatus: "payment/fetchPaymentStatus",
        updateCustomer: "payment/updateCustomer",
        updatePaymentMethod: "payment/updatePaymentMethod",
        isPaymentStatusDefined: "payment/isPaymentStatusDefined",
        //Below - deprecated
        refreshToken: "auth/refresh_token",
        requestSignUpRegistration: "account/send_email_verification_token"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        signUpSuccessfully: "signUpSuccessfully",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent",
        requestSignUpRegistration: "requestSignUpRegistration",
        updateProfile: "updateProfile",
        resetPassword: "resetPassword",
        resetPasswordSuccessfully: "resetPasswordSuccessfully",
        updatePassword: "updatePassword",
        updatePasswordSuccessfully: "updatePasswordSuccessfully"
    })
    .constant("AUTH_TOKEN_HEADER", "authtoken");
