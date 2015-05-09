/**
 * Date source constants.
 */
angular
    .module("revaluate.common")
    .constant("DATE_SOURCE", {
        isFromNlp: "naturalLanguageProcessorSource",
        isFromUpdateAction: "updateExpenseSource"
    });