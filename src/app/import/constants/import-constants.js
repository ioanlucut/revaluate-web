/**
 * ExpensesImport constants.
 */
angular
    .module("revaluate.expensesImport")
    .constant("IMPORT_URLS", {
        importMint: "importer/mintImport",
        importMintParseAnalyse: "importer/mintParseAnalyseImport",
        spendeeImport: "importer/spendeeImport",
        importSpendeeParseAnalyse: "importer/spendeeParseAnalyseImport"
    })
    .constant("IMPORT_EVENTS", {
        isErrorOccurred: "expensesImport-error-occurred",
        isCreated: "expensesImport-is-created",
        isDeleted: "expensesImport-is-deleted",
        isUpdated: "expensesImport-is-updated"
    });