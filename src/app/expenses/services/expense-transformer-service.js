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
            if ( expenseDto.dueOn ) {
                expenseDto.dueOn = expenseDto.dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            }
            expenseDto.text = $.trim(expenseDto.text.split("@")[0]);
            expenseDto.recipients = TransformerUtils.sanitizeRecipients(expenseDto.recipients);

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
            if ( expense.model.dueOn ) {
                expense.model.dueOn = moment(expense.model.dueOn).toDate();
            }
            //handle addresses conversion
            var recipient = expense.model.recipients;
            if ( _.isEmpty(recipient) ) {
                expense.model.recipients = [];
            }
            else if ( _.isArray(recipient) ) {
                expense.model.recipients = recipient;
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
    });