export default

  function () {
      return function (goalMessage, userName) {

        return goalMessage.format(userName);
      };
    }

