/**
 * ExpensesImport transformer service which transforms a expensesImport DTO model object to a expensesImport business object.
 */
function ImportTransformerService($injector, TransformerUtils) {
  'ngInject';

  /**
   * Converts a expensesImport business object model to a importDto object.
   */
  this.toImportDto = (expensesImport, skipKeys) => {
    const importDto = {};

    TransformerUtils.copyKeysFromTo(expensesImport.model, importDto, skipKeys);

    return importDto;
  };

  /**
   * Converts a importDto object to a expensesImport business object model.
   */
  this.toImport = (importDto, expensesImport, skipKeys) => {
    expensesImport = expensesImport || $injector.get('ExpensesImport').build();

    TransformerUtils.copyKeysFromTo(importDto, expensesImport.model, skipKeys);

    return expensesImport;
  };
}

export default ImportTransformerService;
