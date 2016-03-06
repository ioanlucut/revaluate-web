/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
export default function (IMPORT_CONSTANTS, $http, ImportTransformerService) {

  this.importExpenses = (importType, expensesImport) => $http
    .post(URLTo.api(IMPORT_CONSTANTS.IMPORT_URLS[importType]), ImportTransformerService.toImportDto(expensesImport))
    .then(response => {
      ImportTransformerService.toImport(response.data, expensesImport);

      return response;
    });

}

