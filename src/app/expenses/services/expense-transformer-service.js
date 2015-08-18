(function () {
    'use strict';

    /**
     * Expense transformer service which transforms a expense DTO model object to a expense business object.
     */
    angular
        .module('revaluate.expenses')
        .service('ExpenseTransformerService', function ($injector, TransformerUtils) {

            /**
             * Converts a expense business object model to a expenseDto object.
             */
            this.toExpenseDto = function (expense, skipKeys) {
                var expenseDto = {};
                skipKeys = skipKeys || [];

                TransformerUtils.copyKeysFromTo(expense.model, expenseDto, skipKeys.concat(['modifiedDate', 'createdDate']));
                if (expenseDto.spentDate) {
                    expenseDto.spentDate = moment(expenseDto.spentDate).format('YYYY-MM-DDTHH:mm:ss.hhh');
                }

                return expenseDto;
            };

            /**
             * Converts a expenseDto object to a expense business object model.
             */
            this.toExpense = function (expenseDto, expense, skipKeys) {
                expense = expense || $injector.get('Expense').build();

                TransformerUtils.copyKeysFromTo(expenseDto, expense.model, skipKeys);

                // handle date conversion
                if (expense.model.spentDate) {
                    expense.model.spentDate = moment(expense.model.spentDate).toDate();
                }
                if (expense.model.modifiedDate) {
                    expense.model.modifiedDate = moment(expense.model.modifiedDate).toDate();
                }
                if (expense.model.createdDate) {
                    expense.model.createdDate = moment(expense.model.createdDate).toDate();
                }

                return expense;
            };

            this.toExpensesGrouped = function (queryResponse) {
                var groupedExpensesDTOList = _.map(queryResponse.groupedExpensesDTOList, _.bind(function (expenseGroupedDtoEntry) {
                    var expenseGrouped = $injector.get('ExpenseGrouped').build();

                    _.extend(expenseGrouped.model, {
                        localDate: moment(expenseGroupedDtoEntry.localDate).toDate(),
                        expenseDTOs: this.toExpenses(expenseGroupedDtoEntry.expenseDTOs)
                    });

                    return expenseGrouped;
                }, this));

                return {
                    groupedExpensesDTOList: groupedExpensesDTOList,
                    currentPage: queryResponse.currentPage,
                    currentSize: queryResponse.currentSize,
                    totalSize: queryResponse.totalSize
                }
            };

            /**
             * Transform a list of expenses as JSON to a list of expenses as business object.
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
             */
            this.toExpenseDTOs = function (expenses) {
                var expenseDTOs = [];

                _.each(expenses, _.bind(function (expense) {
                    expenseDTOs.push(this.toExpenseDto(expense));
                }, this));

                return expenseDTOs;
            };
        });
}());
