/* Friendly date filter */

function friendlyDateFilter() {
  return function (date) {

    if (!_.isDate(date)) {
      date = moment(date).toDate();
    }

    return moment(date).calendar();
  };
}

export default friendlyDateFilter;
