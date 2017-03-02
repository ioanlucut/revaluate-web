/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
function ImportService(IMPORT_CONSTANTS, $http, ImportTransformerService) {
  'ngInject';

  this.importExpenses = (importType, expensesImport) => $http
    .post(URLTo.api(IMPORT_CONSTANTS.IMPORT_URLS[importType]),
      ImportTransformerService.toImportDto(expensesImport))
    .then(response => {
      ImportTransformerService.toImport(response.data, expensesImport);

      return response;
    });
}

export default ImportService;
