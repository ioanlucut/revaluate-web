/* Friendly date filter */

function friendlyMonthDateFilter() {
  return date => {

    if (!_.isDate(date)) {
      date = moment(new Date(date));
    }

    const dateToFormat = moment(date), isSameYear = moment(moment().year()).isSame(dateToFormat.year());

    return dateToFormat.format(isSameYear ? 'MMMM' : 'MMM YYYY');
  };
}

export default friendlyMonthDateFilter;
