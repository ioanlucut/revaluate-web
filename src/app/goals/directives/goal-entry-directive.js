(function () {
    'use strict';

    function GoalEntryController(GOAL_EVENTS, APP_CONFIG, $rootScope, GoalService, DatesUtils, Category, promiseTracker) {

        var vm = this;

        /**
         * Current user.
         */
        this.user = $rootScope.currentUser;

        /**
         * Minimum date to create goal.
         */
        this.minDate = moment();

        /**
         * Max date to create goal
         */
        this.maxDate = moment().year(APP_CONFIG.MAX_YEAR_TO_CREATE_GOAL);

        /**
         * Keep the master backup. Work only with shownGoal.
         */
        this.shownGoal = angular.copy(this.goal);

        /**
         * Goals targets available
         */
        this.goalsTargets = APP_CONFIG.GOALS_TARGETS;
        /**
         * Selected category
         */
        this.category = {};

        this.category.selected = new Category(this.shownGoal.category);

        /**
         * We need an object in the scope as this model is changed by the
         * datePicker and we want to see those changes. Remember '.' notation.
         */
        this.datePickerStatus = {};

        /**
         * Update the goal.
         */
        this.updateGoal = updateGoal;

        /**
         * Open date picker
         */
        this.openDatePicker = openDatePicker;

        /**
         * Create an updating tracker.
         */
        vm.updateTracker = promiseTracker();

        /**
         * Create an deleting tracker.
         */
        vm.deleteTracker = promiseTracker();

        /**
         * Delete goal;
         */
        vm.deleteGoal = deleteGoal;

        function updateGoal(goal, category) {
            var period;

            if (category && category.selected) {
                goal.category = angular.copy(category.selected);
            }

            period = DatesUtils
                .getFromToOfMonthYear(vm.goal.yearMonthDate);
            vm.goal.startDate = period.from;
            vm.goal.endDate = period.to;

            GoalService
                .updateGoal(goal, vm.updateTracker)
                .then(function (updatedGoal) {
                    $rootScope.$broadcast(GOAL_EVENTS.isUpdated, { goal: _.extend(goal, updatedGoal) });
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $rootScope.$broadcast(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'error' });
                });
        }

        function deleteGoal() {
            GoalService
                .bulkDelete([vm.goal], vm.deleteTracker)
                .then(function () {
                    $rootScope.$broadcast(GOAL_EVENTS.isDeleted, { goal: vm.goal });
                })
                .catch(function () {
                    $rootScope.$broadcast(GOAL_EVENTS.isErrorOccurred, { errorMessage: 'error' });
                });
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datePickerStatus.opened = true;
        }
    }

    angular
        .module('revaluate.goals')
        .directive('goalEntry', function (GOAL_EVENTS, $rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    categories: '=',
                    goal: '='
                },
                controller: GoalEntryController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/goals/partials/goal-entry-directive.tpl.html',
                link: function (scope, el, attrs, vm) {
                    var GOAL_INPUT_SELECTOR = '.goal__form__price__input';

                    /**
                     * If date details should be shown
                     */
                    scope.showDateDetails = !_.isUndefined(attrs.showDateDetails);

                    /**
                     * Show block content
                     */
                    scope.showContent = false;

                    /**
                     * Toggle content
                     */
                    scope.toggleContent = function () {
                        scope.showContent = !scope.showContent;

                        // ---
                        // Auto focus price.
                        // ---
                        if (scope.showContent) {
                            $timeout(function () {
                                el.find(GOAL_INPUT_SELECTOR).focus();
                            });
                        }
                    };

                    /**
                     * Toggle and discard changes.
                     */
                    scope.cancel = function () {
                        scope.toggleContent();

                        vm.shownGoal = angular.copy(vm.goal);
                    };

                    /**
                     * On goal updated/deleted - cancel edit mode.
                     */
                    $rootScope.$on(GOAL_EVENTS.isUpdated, function (event, args) {
                        if (vm.goal.id === args.goal.id) {

                            // ---
                            // Now update the master goal, and remove the marked sign.
                            // ---
                            vm.shownGoal.marked = false;
                            vm.goal = angular.copy(vm.shownGoal);

                            scope.cancel();
                        }
                    });
                }
            };
        });
}());
