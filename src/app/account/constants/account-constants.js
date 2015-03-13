/**
 * Account related constants.
 */
angular
    .module("account")
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
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
        create: "account/create",
        update: "account/update",
        details: "account/details",
        requestPasswordReset: "account/requestResetPassword/:email",
        resetPasswordWithToken: "account/resetPassword/:email/:token",
        validatePasswordResetToken: "account/validateResetPasswordToken/:email/:token",
        updatePassword: "account/updatePassword",
        //Below - deprecated
        refreshToken: "auth/refresh_token",
        validateRegistrationToken: "account/validate_email_verification_token/:email/:token",
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
        requestSignUpRegistrationEmailSent: "requestSignUpRegistrationEmailSent",
        updateProfile: "updateProfile",
        resetPassword: "resetPassword",
        resetPasswordSuccessfully: "resetPasswordSuccessfully",
        updatePassword: "updatePassword",
        updatePasswordSuccessfully: "updatePasswordSuccessfully"
    })
    .constant("AUTH_TOKEN_HEADER", "authtoken");
