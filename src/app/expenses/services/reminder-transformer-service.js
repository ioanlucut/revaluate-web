/**
 * Expense transformer service which transforms a expense DTO model object to a expense business object.
 */
angular
    .module("expenses")
    .service("ReminderTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a expense business object model to a reminderDto object.
         * @param expense
         * @param skipKeys
         * @returns {{}}
         */
        this.toReminderDto = function (expense, skipKeys) {
            var reminderDto = {};

            TransformerUtils.copyKeysFromTo(expense.model, reminderDto, skipKeys);
            if ( reminderDto.dueOn ) {
                reminderDto.dueOn = reminderDto.dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            }
            reminderDto.text = $.trim(reminderDto.text.split("@")[0]);
            reminderDto.recipients = TransformerUtils.sanitizeRecipients(reminderDto.recipients);

            return reminderDto;
        };

        /**
         * Converts a reminderDto object to a expense business object model.
         * @param reminderDto
         * @param expense
         * @param skipKeys
         * @returns {*}
         */
        this.toReminder = function (reminderDto, expense, skipKeys) {
            expense = expense || $injector.get('Expense').build();

            TransformerUtils.copyKeysFromTo(reminderDto, expense.model, skipKeys);

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
         * @param reminderDtos
         * @returns {Array}
         */
        this.toReminders = function (reminderDtos) {
            var expenses = [];

            _.each(reminderDtos, _.bind(function (reminderDto) {
                expenses.push(this.toReminder(reminderDto));
            }, this));

            return expenses;
        };
    });
