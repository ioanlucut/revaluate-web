angular
    .module("revaluate.expensesImport")
    .factory("ExpensesExpensesImport", function ($q, $http, ImportService, ImportTransformerService) {

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
                expenseCategoriesMatchingProfileDTO: {}
            };

            /**
             * Saves a expensesImport and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return ImportService.createImport(this);
                }
                else {
                    return ImportService.updateImport(this);
                }
            };

            /**
             * Destroys (deletes) a expensesImport.
             * @returns {*}
             */
            this.destroy = function () {
                return ImportService.deleteImport(this);
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
    });