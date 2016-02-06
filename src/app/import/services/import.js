'use strict';

export default angular
    .module('revaluate.expensesImport')
    .factory('ExpensesImport', function ($q, $http, ImportService, ImportTransformerService) {

        /**
         * ExpensesImport class.
         * @constructor
         */
        function ExpensesImport() {

            /**
             * Represents the DTO model of the expensesImport.
             */
            this.model = {

                /**
                 * The expenses.
                 */
                expenseDTOs: [],

                /**
                 * The color
                 */
                expenseCategoryMatchingProfileDTOs: []
            };

            /**
             * Saves a expensesImport and update model with response.
             * @returns {*}
             */
            this.save = function () {
                return ImportService.performImport(this);
            };
        }

        /**
         * Builds a expensesImport with given data.
         * @param data
         * @returns {ExpensesImport}
         */
        ExpensesImport.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new ExpensesImport();
            }

            return ImportTransformerService.toImport(data, new ExpensesImport());
        };

        return ExpensesImport;
    })
    .name;
