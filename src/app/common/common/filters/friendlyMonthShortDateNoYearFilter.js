function friendlyMonthShortDateNoYearFilter() {
  return date => {

    if (!_.isDate(date)) {
      date = moment(new Date(date));
    }

    return moment(date).format('MMM');
  };
}

export default friendlyMonthShortDateNoYearFilter;
