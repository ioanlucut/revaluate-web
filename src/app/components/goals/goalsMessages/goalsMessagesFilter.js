function goalsMessagesFilter() {
  return function (goalMessage, userName) {

    return goalMessage.format(userName);
  };
}

export default goalsMessagesFilter;
