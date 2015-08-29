(function () {
    'use strict';

    function DatePickerMonthlyController() {

        var vm = this,
            MONTH = 'month';

        /**
         * Checks if the date should be disabled.
         */
        vm.shouldDateBeDisabled = shouldDateBeDisabled;

        /**
         * Open date picker
         */
        vm.openDatePicker = openDatePicker;

        /**
         * Exposed data.
         */
        vm.data = _.extend({}, { yearMonthDate: vm.dateModel });

        /**
         * On date change do perform what needed.
         */
        vm.onChange = function () {
            doPerform(vm.data.yearMonthDate);
        };

        /**
         * Can load prev month ?
         */
        vm.canLoadPrevMonth = canLoadPrevMonth;

        /**
         * Can load next month ?
         */
        vm.canLoadNextMonth = canLoadNextMonth;

        /**
         * Go to previous month
         */
        vm.prevMonth = function () {
            vm.data.yearMonthDate = moment(vm.data.yearMonthDate).subtract(1, MONTH).toDate();

            doPerform(vm.data.yearMonthDate);
        };

        /**
         * Go to next month
         */
        vm.nextMonth = function () {
            vm.data.yearMonthDate = moment(vm.data.yearMonthDate).add(1, MONTH).toDate();

            doPerform(vm.data.yearMonthDate);
        };

        function doPerform(yearMonthDate) {
            vm.dateModel = angular.copy(yearMonthDate);

            vm.performOnPrevOrNext({ yearMonthDate: vm.dateModel });
        }

        function shouldDateBeDisabled(date) {
            var givenDate = moment(date),
                givenDateYear = givenDate.year(),
                givenDateMonth = givenDate.month() + 1;

            if (!_.has(vm.monthsPerYearsStatistics, givenDateYear)) {

                return true;
            }

            return !_.some(_.result(vm.monthsPerYearsStatistics, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        }

        function canLoadPrevMonth() {
            var currentSelectedDate = moment(vm.data.yearMonthDate),
                currentSelectedDateYear = currentSelectedDate.year(),
                currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if (!existsInYear(currentSelectedDateYear)) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return existsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth - 1);
        }

        function canLoadNextMonth() {
            var currentSelectedDate = moment(vm.data.yearMonthDate),
                currentSelectedDateYear = currentSelectedDate.year(),
                currentSelectedDateMonth = currentSelectedDate.month() + 1;

            if (!existsInYear(currentSelectedDateYear)) {

                return true;
            }

            // ---
            // We check in the previous month.
            // ---
            return existsInMonthWithYear(currentSelectedDateYear, currentSelectedDateMonth + 1);
        }

        /**
         * Checks if in the given year are expenses defined.
         */
        function existsInYear(dateYear) {
            return _.has(vm.monthsPerYearsStatistics, dateYear);
        }

        /**
         * Checks if in the given year and month are expenses defined.
         */
        function existsInMonthWithYear(givenDateYear, givenDateMonth) {
            return _.some(_.result(vm.monthsPerYearsStatistics, givenDateYear), function (entry) {
                return entry === givenDateMonth;
            });
        }

    }

    angular
        .module('revaluate.common')
        .directive('datePickerMonthly', function () {
            return {
                restrict: 'E',
                scope: {
                    dateModel: '=',
                    monthsPerYearsStatistics: '=',
                    performOnPrevOrNext: '&',
                    loadTracker: '=',
                    showLeftRightArrows: '='
                },
                controller: DatePickerMonthlyController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/common/partials/date-picker-monthly-directive.tpl.html',
                link: function () {
                }
            };
        });
}());
