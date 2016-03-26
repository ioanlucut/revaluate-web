/**
 * ExpensesImport transformer service which transforms a expensesImport DTO model object to a expensesImport business object.
 */
function ImportTransformerService($injector) {
  'ngInject';

  /**
   * Converts a expensesImport business object model to a importDto object.
   */
  this.toImportDto = (expensesImport, skipKeys) => {
    const importDto = {};
    _.merge(importDto, _.omit(expensesImport.model, skipKeys));

    return importDto;
  };

  /**
   * Converts a importDto object to a expensesImport business object model.
   */
  this.toImport = (importDto, expensesImport, skipKeys) => {
    expensesImport = expensesImport || $injector.get('ExpensesImport').build();
    _.merge(expensesImport.model, _.omit(importDto, skipKeys));

    return expensesImport;
  };
}

export default ImportTransformerService;
