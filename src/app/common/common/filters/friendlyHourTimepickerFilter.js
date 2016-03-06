/* Friendly date filter */

function friendlyHourTimepickerFilter() {
  return function (date) {

    return moment(date).format('hh:mm A');
  };
}

export default friendlyHourTimepickerFilter;
