'use strict';

/**
 * ExpensesImport constants.
 */
angular
    .module("revaluate.expensesImport")
    .constant("IMPORT_PARSE_ANALYSE_URLS", {
        mint: "importer/mintParseAnalyseImport",
        spendee: "importer/spendeeParseAnalyseImport"
    })
    .constant("IMPORT_URLS", {
        mint: "importer/mintImport",
        spendee: "importer/spendeeImport"
    })
    .constant("IMPORT_EVENTS", {
        isErrorOccurred: "expensesImport-error-occurred",
        isCreated: "expensesImport-is-created",
        isDeleted: "expensesImport-is-deleted",
        isUpdated: "expensesImport-is-updated"
    })
    .constant("IMPORT_TYPES", {
        mint: "mint",
        spendee: "spendee"
    });
