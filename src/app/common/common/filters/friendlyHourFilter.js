/* Friendly date filter */

function friendlyHourFilter() {
  return function (date) {

    return moment(date).format('h:mm A');
  };
}

export default friendlyHourFilter;
