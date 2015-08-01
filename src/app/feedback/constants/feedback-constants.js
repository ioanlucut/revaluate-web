(function () {
    "use strict";

    angular
        .module("revaluate.feedback")
        .constant("FEEDBACK_URLS", {
            feedback: "account/sendFeedback"
        });
}());
