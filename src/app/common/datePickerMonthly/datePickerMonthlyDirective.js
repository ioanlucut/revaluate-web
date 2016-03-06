function DatePickerMonthlyController() {

  const _this = this, MONTH = 'month';

  /**
   * Checks if the date should be disabled.
   */
  _this.shouldDateBeDisabled = shouldDateBeDisabled;

  /**
   * Open date picker
   */
  _this.openDatePicker = openDatePicker;

  /**
   * Exposed data.
   */
  _this.data = _.extend({}, { yearMonthDate: _this.dateModel });

  /**
   * On date change do perform what needed.
   */
  _this.onChange = () => {
    doPerform(_this.data.yearMonthDate);
  };

  /**
   * If can load previous month
   */
  _this.canLoadPrevMonth = canLoadPrevMonth;

  /**
   * If can load next month
   */
  _this.canLoadNextMonth = canLoadNextMonth;

  /**
   * Go to previous month
   */
  _this.prevMonth = () => {
    moveToTheNextMonthUsing(failedCandidateAsMoment => {
      if (failedCandidateAsMoment.month() === 0) {
        return failedCandidateAsMoment.subtract(1, 'years').set('month', 11);
      }

      return failedCandidateAsMoment.subtract(1, MONTH);
    });
  };

  /**
   * Go to next month
   */
  _this.nextMonth = () => {
    moveToTheNextMonthUsing(failedCandidateAsMoment => {

      if (failedCandidateAsMoment.month() === 11) {
        return failedCandidateAsMoment.add(1, 'years').set('month', 0);
      }

      return failedCandidateAsMoment.add(1, MONTH);
    });
  };

  function moveToTheNextMonthUsing(momentRetryCallback) {
    _this.data.yearMonthDate = getMonthRecursivelyWith(_this.data.yearMonthDate, momentRetryCallback);

    doPerform(_this.data.yearMonthDate);
  }

  function getMonthRecursivelyWith(of, momentRetryCallback) {
    const prevMonthCandidate = momentRetryCallback(moment(of)), prevMonthCandidateAsDate = prevMonthCandidate.toDate(), prevMonthCandidateYear = prevMonthCandidate.year(), prevMonthCandidateMonthOfYear = prevMonthCandidate.month() + 1;

    if (prevMonthCandidateYear < 2000 || prevMonthCandidateYear > 2040) {

      return prevMonthCandidateAsDate;
    }

    if (_.some(_.result(_this.monthsPerYearsStatistics, prevMonthCandidateYear), entry => entry === prevMonthCandidateMonthOfYear)) {

      return prevMonthCandidateAsDate;
    }

    return getMonthRecursivelyWith(prevMonthCandidateAsDate, momentRetryCallback);
  }

  function doPerform(yearMonthDate) {
    _this.dateModel = angular.copy(yearMonthDate);

    _this.performOnPrevOrNext({ yearMonthDate: _this.dateModel });
  }

  function shouldDateBeDisabled(date) {
    const currentDate = moment(date), currentYear = currentDate.year(), currentMonthOfYear = currentDate.month() + 1;

    return !_.some(_.result(_this.monthsPerYearsStatistics, currentYear), entry => entry === currentMonthOfYear);
  }

  function openDatePicker($event) {
    $event.preventDefault();
    $event.stopPropagation();

    _this.datePickerOpened = true;
  }

  function canLoadPrevMonth() {
    const currentDate = moment(_this.data.yearMonthDate), currentYear = currentDate.year();

    return _.some(_.keys(_this.monthsPerYearsStatistics), keyEntry => {
      if (_.parseInt(keyEntry) === _.parseInt(currentYear)) {
        return _.some(_this.monthsPerYearsStatistics[keyEntry], month => _.lt(_.parseInt(month), _.parseInt(currentDate.month() + 1)));
      }

      return _.lte(_.parseInt(keyEntry), _.parseInt(currentYear));
    });
  }

  function canLoadNextMonth() {
    const currentDate = moment(_this.data.yearMonthDate), currentYear = currentDate.year();

    return _.some(_.keys(_this.monthsPerYearsStatistics), keyEntry => {
      if (_.parseInt(keyEntry) === _.parseInt(currentYear)) {
        return _.some(_this.monthsPerYearsStatistics[keyEntry], month => _.gt(_.parseInt(month), _.parseInt(currentDate.month() + 1)));
      }

      return _.gte(_.parseInt(keyEntry), _.parseInt(currentYear));
    });
  }

}

function datePickerMonthlyDirective() {
  return {
    restrict: 'E',
    scope: {
      dateModel: '=',
      monthsPerYearsStatistics: '=',
      performOnPrevOrNext: '&',
      loadTracker: '=',
      showLeftRightArrows: '=',
    },
    controller: DatePickerMonthlyController,
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/common/datePickerMonthly/datePickerMonthlyDirective.tpl.html',
    link() {
    },
  };
}

export default datePickerMonthlyDirective;
