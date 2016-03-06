function friendlyMonthDayFilter() {
  return date => {

    if (!_.isDate(date)) {
      date = moment(new Date(date));
    }

    return moment(date).format('D');
  };
}

export default friendlyMonthDayFilter;
