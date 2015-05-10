/**
 * Common states.
 */
angular
    .module("revaluate.common")
    .constant("ACTIVITY_INTERCEPTOR", {
        activityStart: "activity-interceptor-start",
        activityEnd: "activity-interceptor-end"
    })
    .constant("STATES", {
        home: "home",
        profile: "profile",
        expenses: "expenses.regular",
        setUp: "setup",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    })
    .constant("ERROR_INTERCEPTOR", {
        status500: "status500"
    });
