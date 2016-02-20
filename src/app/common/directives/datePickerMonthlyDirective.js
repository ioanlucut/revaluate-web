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
                if (failedCandidateAsMoment.month() === 0) {
                    return failedCandidateAsMoment.subtract(1, 'years').set('month', 11);
                }

                return failedCandidateAsMoment.subtract(1, MONTH);
            });
        };

        /**
         * Go to next month
         */
        vm.nextMonth = function () {
            moveToTheNextMonthUsing(function (failedCandidateAsMoment) {

                if (failedCandidateAsMoment.month() === 11) {
                    return failedCandidateAsMoment.add(1, 'years').set('month', 0);
                }

                return failedCandidateAsMoment.add(1, MONTH);
            });
        };

        function moveToTheNextMonthUsing(momentRetryCallback) {
            vm.data.yearMonthDate = getMonthRecursivelyWith(vm.data.yearMonthDate, momentRetryCallback);

            doPerform(vm.data.yearMonthDate);
        }

        function getMonthRecursivelyWith(of, momentRetryCallback) {
            var prevMonthCandidate = momentRetryCallback(moment(of)),
                prevMonthCandidateAsDate = prevMonthCandidate.toDate(),
                prevMonthCandidateYear = prevMonthCandidate.year(),
                prevMonthCandidateMonthOfYear = prevMonthCandidate.month() + 1;

            if (prevMonthCandidateYear < 2000 || prevMonthCandidateYear > 2040) {

                return prevMonthCandidateAsDate;
            }

            if (_.some(_.result(vm.monthsPerYearsStatistics, prevMonthCandidateYear), function (entry) {
                    return entry === prevMonthCandidateMonthOfYear;
                })) {
                return prevMonthCandidateAsDate;
            }

            return getMonthRecursivelyWith(prevMonthCandidateAsDate, momentRetryCallback);
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
                currentYear = currentDate.year();

            return _.some(_.keys(vm.monthsPerYearsStatistics), function (keyEntry) {
                if (_.parseInt(keyEntry) === _.parseInt(currentYear)) {
                    return _.some(vm.monthsPerYearsStatistics[keyEntry], function (month) {
                        return _.lt(_.parseInt(month), _.parseInt(currentDate.month() + 1));
                    });
                }

                return _.lte(_.parseInt(keyEntry), _.parseInt(currentYear));
            });
        }

        function canLoadNextMonth() {
            var currentDate = moment(vm.data.yearMonthDate),
                currentYear = currentDate.year();

            return _.some(_.keys(vm.monthsPerYearsStatistics), function (keyEntry) {
                if (_.parseInt(keyEntry) === _.parseInt(currentYear)) {
                    return _.some(vm.monthsPerYearsStatistics[keyEntry], function (month) {
                        return _.gt(_.parseInt(month), _.parseInt(currentDate.month() + 1));
                    });
                }

                return _.gte(_.parseInt(keyEntry), _.parseInt(currentYear));
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
                templateUrl: '/app/common/partials/datePickerMonthlyDirective.tpl.html',
                link: function () {
                }
            };
        });
}());
