/* Friendly date filter */

function friendlyHourTimepickerFilter() {
  return date => moment(date).format('hh:mm A');
}

export default friendlyHourTimepickerFilter;
