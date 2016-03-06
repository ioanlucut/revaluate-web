/* Friendly date filter */

function friendlyHourFilter() {
  return date => moment(date).format('h:mm A');
}

export default friendlyHourFilter;
