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
         * If can load previous month
         */
        vm.canLoadPrevMonth = canLoadPrevMonth;

        /**
         * If can load next month
         */
        vm.canLoadNextMonth = canLoadNextMonth;

        /**
         * Go to previous month
         */
        vm.prevMonth = function () {
            moveToTheNextMonthUsing(function (failedCandidateAsMoment) {
                return failedCandidateAsMoment.subtract(1, MONTH);
            })
        };

        /**
         * Go to next month
         */
        vm.nextMonth = function () {
            moveToTheNextMonthUsing(function (failedCandidateAsMoment) {
                return failedCandidateAsMoment.add(1, MONTH);
            })
        };

        function moveToTheNextMonthUsing(momentRetryCallback) {
            vm.data.yearMonthDate = getMonthRecursivelyWith(vm.data.yearMonthDate, momentRetryCallback);

            doPerform(vm.data.yearMonthDate);
        }

        function getMonthRecursivelyWith(of, momentRetryCallback) {
            var prevMonthCandidateDate = moment(of),
                prevMonthCandidate = momentRetryCallback(prevMonthCandidateDate).toDate(),
                prevMonthCandidateYear = prevMonthCandidateDate.year(),
                prevMonthCandidateMonthOfYear = prevMonthCandidateDate.month() + 1;

            if (prevMonthCandidateYear < 2000 || prevMonthCandidateYear > 2040) {

                return prevMonthCandidate;
            }

            if (_.some(_.result(vm.monthsPerYearsStatistics, prevMonthCandidateYear), function (entry) {
                    return entry === prevMonthCandidateMonthOfYear;
                })) {
                return prevMonthCandidate;
            }

            return getMonthRecursivelyWith(prevMonthCandidate, momentRetryCallback);
        }

        function doPerform(yearMonthDate) {
            vm.dateModel = angular.copy(yearMonthDate);

            vm.performOnPrevOrNext({ yearMonthDate: vm.dateModel });
        }

        function shouldDateBeDisabled(date) {
            var currentDate = moment(date),
                currentYear = currentDate.year(),
                currentMonthOfYear = currentDate.month() + 1;

            return !_.some(_.result(vm.monthsPerYearsStatistics, currentYear), function (entry) {
                return entry === currentMonthOfYear;
            });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerOpened = true;
        }

        function canLoadPrevMonth() {
            var currentDate = moment(vm.data.yearMonthDate),
                currentYear = currentDate.year(),
                currentMonthOfYear = currentDate.month() + 1;

            return _.some(_.result(vm.monthsPerYearsStatistics, currentYear), function (entry) {
                return _.lte(entry, currentMonthOfYear - 1);
            });
        }

        function canLoadNextMonth() {
            var currentDate = moment(vm.data.yearMonthDate),
                currentYear = currentDate.year(),
                currentMonthOfYear = currentDate.month() + 1;

            return _.some(_.result(vm.monthsPerYearsStatistics, currentYear), function (entry) {
                return _.gte(entry, currentMonthOfYear + 1);
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
