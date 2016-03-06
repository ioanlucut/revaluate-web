function friendlyMonthDateNoYearFilter() {
  return function (date) {

    if (!_.isDate(date)) {
      date = moment(new Date(date));
    }

    return moment(date).format('MMMM');
  };
}

export default friendlyMonthDateNoYearFilter;
