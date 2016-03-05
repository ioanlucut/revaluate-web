export default

  /* Friendly date filter */

  function () {
      return function (date) {

        return moment(date).format('hh:mm A');
      };
    }

