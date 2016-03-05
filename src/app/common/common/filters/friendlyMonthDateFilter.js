export default

  /* Friendly date filter */

  function () {
      return function (date) {

        if (!_.isDate(date)) {
          date = moment(new Date(date));
        }

        var dateToFormat = moment(date),
          isSameYear = moment(moment().year()).isSame(dateToFormat.year());

        return dateToFormat.format(isSameYear ? 'MMMM' : 'MMM YYYY');
      };
    }

