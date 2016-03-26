function goalsMessagesFilter() {
  return (goalMessage, userName) => goalMessage.format(userName);
}

export default goalsMessagesFilter;
