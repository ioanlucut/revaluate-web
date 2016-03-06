/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
export default function (IMPORT_URLS, $http, ImportTransformerService) {

  this.importExpenses = (importType, expensesImport) => $http
    .post(URLTo.api(IMPORT_URLS[importType]), ImportTransformerService.toImportDto(expensesImport))
    .then(response => {
      ImportTransformerService.toImport(response.data, expensesImport);

      return response;
    });

}

