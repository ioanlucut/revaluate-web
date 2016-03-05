export default

  /* Friendly date filter */

  function () {
      return function (date) {

        return moment(date).format('h:mm A');
      };
    }

