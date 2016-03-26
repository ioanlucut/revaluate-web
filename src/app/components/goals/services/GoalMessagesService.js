export default function GoalMessagesService(GOALS_MESSAGES_CONSTANTS) {
  'ngInject';

  function getRandomized(messagesOfType) {

    return messagesOfType.messages[Math.floor(Math.random() * messagesOfType.messages.length)];
  }

  this.getMessage = type => {
    const messagesOfType = GOALS_MESSAGES_CONSTANTS[type.toUpperCase()];

    return getRandomized(messagesOfType);
  };
}
