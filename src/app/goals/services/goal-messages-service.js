(function () {
    'use strict';

    function GoalMessagesService(GOALS_MESSAGES_CONSTANTS) {

        function getRandomized(messagesOfType) {

            return messagesOfType.messages[Math.floor(Math.random() * messagesOfType.messages.length)];
        }

        this.getMessage = function (type) {
            var messagesOfType = GOALS_MESSAGES_CONSTANTS[type.toUpperCase()];

            return getRandomized(messagesOfType);
        };
    }

    angular
        .module('revaluate.goals')
        .service('GoalMessagesService', GoalMessagesService);
}());
