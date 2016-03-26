/* Friendly date filter */

function friendlyDateFilter() {
  return date => {

    if (!_.isDate(date)) {
      date = moment(date).toDate();
    }

    return moment(date).calendar();
  };
}

export default friendlyDateFilter;
