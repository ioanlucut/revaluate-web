/**
 * ExpensesImport transformer service which transforms a expensesImport DTO model object to a expensesImport business object.
 */
angular
    .module("revaluate.expensesImport")
    .service("ImportTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a expensesImport business object model to a importDto object.
         * @param expensesImport
         * @param skipKeys
         * @returns {{}}
         */
        this.toImportDto = function (expensesImport, skipKeys) {
            var importDto = {};

            TransformerUtils.copyKeysFromTo(expensesImport.model, importDto, skipKeys);

            return importDto;
        };

        /**
         * Converts a importDto object to a expensesImport business object model.
         * @param importDto
         * @param expensesImport
         * @param skipKeys
         * @returns {*}
         */
        this.toImport = function (importDto, expensesImport, skipKeys) {
            expensesImport = expensesImport || $injector.get('ExpensesImport').build();

            TransformerUtils.copyKeysFromTo(importDto, expensesImport.model, skipKeys);

            return expensesImport;
        };

        /**
         * Transform a list of expensesImport as JSON to a list of expensesImport as business object.
         * @param importDtos
         * @returns {Array}
         */
        this.toImport = function (importDtos) {
            var expensesImport = [];

            _.each(importDtos, _.bind(function (importDto) {
                expensesImport.push(this.toImport(importDto));
            }, this));

            return expensesImport;
        };

        /**
         * Transform a list of expensesImport as business objects to a list of DTOs.
         * @param expensesImport
         * @returns {Array}
         */
        this.toImportDTOs = function (expensesImport) {
            var importDTOs = [];

            _.each(expensesImport, _.bind(function (expensesImport) {
                importDTOs.push(this.toImportDto(expensesImport));
            }, this));

            return importDTOs;
        };
    });
