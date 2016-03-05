export default

  function () {
      return function (date) {

        if (!_.isDate(date)) {
          date = moment(new Date(date));
        }

        return moment(date).format('D');
      };
    }

