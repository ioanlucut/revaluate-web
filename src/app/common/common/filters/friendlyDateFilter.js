export default

  /* Friendly date filter */

  function () {
      return function (date) {

        if (!_.isDate(date)) {
          date = moment(date).toDate();
        }

        return moment(date).calendar();
      };
    }

