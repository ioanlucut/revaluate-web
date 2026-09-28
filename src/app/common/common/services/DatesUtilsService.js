/**
 * Dates utils service.
 */
function DatesUtilsService() {
  this.fromLastMonthsToNow = intervalMonths => {
    const from = moment().subtract(intervalMonths - 1, 'M').startOf('month');
    const to = moment().add(1, 'month').startOf('month');

    return {
      from,
      to,
    };
  };

  this.getFromToOfMonthYear = monthDate => {
    const from = moment(monthDate).startOf('month');
    const to = moment(monthDate).add(1, 'month').startOf('month');

    return {
      from,
      to,
    };
  };

  this.formatDate =
    givenDate => `${moment(givenDate).format('YYYY-MM-DDTHH:mm:ss')}Z`;

  this.formatStartOfMonthInclusive =
    givenDate => moment(givenDate).format('YYYY-MM-DDTHH:mm:ss.hhh');

  this.formatEndOfMonthExclusive =
    givenDate => moment(givenDate).subtract(1, 's').format('YYYY-MM-DDTHH:mm:ss.hhh');

  this.formatDateExpectedForEndOfMonth =
    givenDate => `${moment(givenDate).add(1, 's').format('YYYY-MM-DDTHH:mm:ss')}Z`;
}

export default DatesUtilsService;
