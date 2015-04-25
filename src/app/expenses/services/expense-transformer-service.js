/**
 * Expense transformer service which transforms a expense DTO model object to a expense business object.
 */
angular
    .module("expenses")
    .service("ExpenseTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a expense business object model to a expenseDto object.
         * @param expense
         * @param skipKeys
         * @returns {{}}
         */
        this.toExpenseDto = function (expense, skipKeys) {
            var expenseDto = {};

            TransformerUtils.copyKeysFromTo(expense.model, expenseDto, skipKeys);
            if ( expenseDto.spentDate ) {
                expenseDto.spentDate = moment(expenseDto.spentDate).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }

            return expenseDto;
        };

        /**
         * Converts a expenseDto object to a expense business object model.
         * @param expenseDto
         * @param expense
         * @param skipKeys
         * @returns {*}
         */
        this.toExpense = function (expenseDto, expense, skipKeys) {
            expense = expense || $injector.get('Expense').build();

            TransformerUtils.copyKeysFromTo(expenseDto, expense.model, skipKeys);

            // handle date conversion
            if ( expense.model.spentDate ) {
                expense.model.spentDate = moment(expense.model.spentDate).toDate();
            }

            return expense;
        };

        /**
         * Transform a list of expenses as JSON to a list of expenses as business object.
         * @param expenseDtos
         * @returns {Array}
         */
        this.toExpenses = function (expenseDtos) {
            var expenses = [];

            _.each(expenseDtos, _.bind(function (expenseDto) {
                expenses.push(this.toExpense(expenseDto));
            }, this));

            return expenses;
        };

        /**
         * Transform a list of expenses as business objects to a list of DTOs.
         * @param expenses
         * @returns {Array}
         */
        this.toExpenseDTOs = function (expenses) {
            var expenseDTOs = [];

            _.each(expenses, _.bind(function (expense) {
                expenseDTOs.push(this.toCategoryDto(expense));
            }, this));

            return expenseDTOs;
        };
    });
