"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiEndpoint:'http://revaluate-api-dev.herokuapp.com',mixPanelId:'e9ba9ca056ce11433777e3c8f59014b4'})

;;/**
 * Main common module declaration including ui templates.
 */
angular
    .module("revaluate.common", [
        "chart.js",
        "ui.router",
        "ngSanitize",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dateparser",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "angular-flash.service",
        "angular-flash.flash-alert-directive"
    ])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("JWTInterceptor");
        $httpProvider.interceptors.push("ActivityInterceptor");
        $httpProvider.interceptors.push("ErrorInterceptor");
    }]).run(function () {

        /**
         * Callback function to check if the date should include year too.
         * @returns {string}
         */
        function callbackCalendarFormatter() {
            var isSameYear = moment(moment().year()).isSame(this.year());

            return isSameYear ? 'ddd, MMM D' : 'ddd, MMM D YYYY';
        }

        // Initialize moment configuration
        moment.locale('en', {
            calendar: {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: callbackCalendarFormatter,
                nextWeek: callbackCalendarFormatter,
                sameElse: callbackCalendarFormatter
            }
        });
    });
;angular
    .module("revaluate.common")
    .constant("ALERTS_CONSTANTS", {
        login: "login",
        signUp: "signUp",
        signUpConfirm: "signUpConfirm",
        signUpSetUp: "signUpSetUp",
        generalError: "generalError",
        forgotPassword: "forgotPassword",
        requestSignUpRegistration: "requestSignUpRegistration",
        resetPassword: "resetPassword",
        updatePassword: "updatePassword",
        validatePassword: "validatePassword",
        sendConfirmationEmail: "sendConfirmationEmail",
        createUpdateExpense: "createUpdateExpense",
        expenseList: "expenseList",
        insights: "insights",
        categoryList: "categoryList",
        createUpdateCategory: "createUpdateCategory",
        updateProfile: "updateProfile",
        paymentProfile: "paymentProfile",
        cancelAccount: "cancelAccount",
        preferences: "preferences",
        import: "import"
    });;/**
 * Common states.
 */
angular
    .module("revaluate.common")
    .constant("ACTIVITY_INTERCEPTOR", {
        activityStart: "activity-interceptor-start",
        activityEnd: "activity-interceptor-end"
    })
    .constant("STATES", {
        home: "home",
        profile: "profile",
        expenses: "expenses.regular",
        setUp: "setup",
        addPayment: "settings.payment.add",
        insightsPayment: "settings.payment.insights",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    })
    .constant("ERROR_INTERCEPTOR", {
        status500: "status500",
        status402: "status402"
    });
;/**
 * Common mixpanel events.
 */
angular
    .module("revaluate.common")
    .constant("MIXPANEL_EVENTS", {
        landingPageLoaded: "Landing page loaded",
        signUpRequested: "Signup requested",
        signUpCompleted: "Signup completed",
        expensesPage: "Expenses page (site visited)",
        expenseModalOpened: "Expense modal opened",
        expenseCreated: "Expense created",
        expenseUpdated: "Expense updated",
        expenseDeleted: "Expense deleted",
        categoriesPage: "Categories page (site visited)",
        categoryCreated: "Category created",
        categoryUpdated: "Category updated",
        categoryDeleted: "Category deleted",
        insightsPage: "Insights page (site visited)",
        insightsFetched: "Insights fetched",
        settings: "Settings",
        settingsProfile: "Settings profile",
        settingsPayment: "Settings payment",
        settingsPaymentCustomer: "Settings payment customer",
        settingsPreferences: "Settings preferences",
        settingsImport: "Settings import",
        error404: "error-404",
        error500: "error-500"
    });;angular
    .module("revaluate.common")
    .directive("animate", function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                // Apply the animate class when the given event occurs
                scope.$on(attrs.animateOn, function () {
                    el.addClass(attrs.animateClass);
                });

                // Remove the animate class on animation end
                el.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass(attrs.animateClass);
                });
            }
        }
    });
;/* Auto focus */

angular
    .module("revaluate.common")
    .directive("autoFocus", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                if ( !attrs.autoFocus ) {

                    // No model to watch, focus the element
                    el.focus();
                }
                else {

                    // Watch the specified model, and auto-focus the element when the model is "true"
                    scope.$watch(attrs.autoFocus, function (val) {
                        if ( val === true ) {
                            $timeout(function () {
                                el.focus();
                            });
                        }
                    });
                }
            }
        }
    }]);
;angular
    .module("revaluate.common")
    .directive('escKey', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if ( event.which === 27 ) { // 27 = esc key
                    scope.$apply(function () {
                        scope.$eval(attrs.escKey);
                    });

                    event.preventDefault();
                }
            });
        };
    });;/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("flashMessages", function () {
        return {
            scope: {
                flash: "=",
                identifierId: "@"
            },
            restrict: "A",
            templateUrl: "app/common/partials/flash-messages.html",
            link: function (scope, el, attrs) {
            }
        };
    });
;/* Focus the first erroneous input on form submit */

angular
    .module("revaluate.common")
    .directive("focusFirstError", [function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                var errorSelector = attrs.focusFirstError || ".has-error input";

                el.on("submit", function () {
                    el.find(errorSelector).first().focus();
                });
            }
        }
    }]);
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("footer", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer.html",
            link: function (scope, el) {

            }
        };
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("footerHome", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer-home.html",
            link: function (scope, el) {

            }
        };
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("header", ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header.html",
            link: function (scope, el) {
            }
        };
    }]);
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("revaluate.common")
    .directive("headerHome", ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header-home.html",
            link: function (scope, el) {

                /**
                 * Reference to the current user.
                 * @type {$rootScope.currentUser|*}
                 */
                scope.currentUser = $rootScope.currentUser;
            }
        };
    }]);
;/* Auto focus */

angular
    .module("revaluate.common")
    .directive("inlineConfirmation", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            transclude: true,
            scope: {
                toggle: "=",
                message: "@",
                confirm: "&",
                cancel: "&"
            },
            templateUrl: "app/common/partials/inline.confirmation.html",
            link: function (scope, el, attrs) {

                // ---
                // The clear autoCancelTimeoutPromise timeout period.
                // ---
                var TIMEOUT_PERIOD = 2500;

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                // ---
                // Define auto cancel timeout promise.
                // ---
                var autoCancelTimeoutPromise = null;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;

                    if ( scope.showContent ) {
                        autoCancelTimeoutPromise = $timeout(function () {
                            scope.toggleContent()
                        }, TIMEOUT_PERIOD);
                    }
                    else if ( autoCancelTimeoutPromise ) {
                        $timeout.cancel(autoCancelTimeoutPromise);
                    }
                };

                /**
                 * Auto toggle
                 */
                scope.$watch('toggle', function (val, valOld) {
                    if ( val === true && valOld === false ) {
                        $timeout(function () {
                            scope.toggleContent();
                        });
                    }
                });
            }
        }
    }]);
;/* Loading bar */

angular
    .module("revaluate.common")
    .directive("loadingBar", ["$rootScope", "ACTIVITY_INTERCEPTOR", function ($rootScope, ACTIVITY_INTERCEPTOR) {
        return {
            restrict: "A",
            template: "<div class='loading-bar-progress'></div>",
            link: function (scope, el) {

                // Loading class
                var LOADING_CLASS = "loading-bar--active";

                // Show the loading bar on activity start
                $rootScope.$on(ACTIVITY_INTERCEPTOR.activityStart, function () {
                    el.addClass(LOADING_CLASS);
                });

                // Hide the loading bar on activity end
                $rootScope.$on(ACTIVITY_INTERCEPTOR.activityEnd, function () {
                    el.removeClass(LOADING_CLASS);
                });
            }
        }
    }]);
;angular
    .module("revaluate.common")
    .directive("mixpanelInitializer", ["$window", "ENV", function ($window, ENV) {
        return {
            restrict: "A",
            compile: function compile() {
                return {
                    pre: function preLink() {
                        var mixpanel = $window.mixpanel || {};
                        mixpanel.init(ENV.mixPanelId);
                    }
                };
            }
        }
    }]);
;angular
    .module('revaluate.common')
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if ( event.which === 13 ) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter, { 'event': event });
                    });

                    event.preventDefault();
                }
            });
        };
    });;/* Scroll to an element on the page */

angular
    .module("revaluate.common")
    .directive("scrollTo", ["$window", function ($window) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                el.on("click", function (e) {

                    // TODO: Find a more angular-ish solution to this problem
                    $("html, body").animate({ scrollTop: $(attrs.scrollTo).offset().top }, parseInt(attrs.scrollSpeed) || 800);
                    e.preventDefault();
                });
            }
        }
    }]);
;angular
    .module('revaluate.common')
    .directive('submitOn', function () {
        return {
            link: function (scope, elm, attrs) {
                scope.$on(attrs.submitOn, function () {
                    setTimeout(function () {
                        elm.trigger('submit');
                    });
                });
            }
        };
    });;angular
    .module("revaluate.common")
    .directive("validDate", function () {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidDate(date) {
                    return !(date === "" || _.isUndefined(date));

                }

                ngModel.$validators.validDate = function (date) {
                    return isValidDate(date);
                };
            }
        };
    });
;/* Friendly date filter */

angular
    .module("revaluate.common")
    .filter('friendlyDate', function () {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date).toDate();
            }

            return moment(date).calendar();
        };
    });
;/* Friendly date filter */

angular
    .module("revaluate.common")
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format("h:mm A");
        };
    });
;/* Friendly date filter */

angular
    .module("revaluate.common")
    .filter('friendlyHourTimePicker', function () {
        return function (date) {

            return moment(date).format("hh:mm A");
        };
    });
;/* Friendly date filter */

angular
    .module("revaluate.common")
    .filter('friendlyMonthDate', function () {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date);
            }

            var dateToFormat = moment(date);
            var isSameYear = moment(moment().year()).isSame(dateToFormat.year());

            return dateToFormat.format(isSameYear ? 'MMMM' : 'MMMM YYYY');
        };
    });
;angular
    .module("revaluate.common")
    .filter('friendlyRecipients', ["$rootScope", function ($rootScope) {
        return function (recipients) {

            /**
             * Current user email.
             * @type {User.$new.model.email|*|.$new.model.email}
             */
            var currentUserEmail = $rootScope.currentUser.model.email;

            if ( _.isUndefined(recipients) || !_.isArray(recipients) ) {
                return;
            }

            var friendlyRecipients = "";
            _.each(recipients, function (recipient) {
                if ( friendlyRecipients.length > 0 ) {
                    friendlyRecipients = friendlyRecipients + ", "
                }
                var emailToBeAppended = currentUserEmail === recipient.email ? 'Me' : recipient.email;
                friendlyRecipients = friendlyRecipients + emailToBeAppended;
            });

            return friendlyRecipients;
        };
    }]);
;// See https://github.com/fmquaglia/ngOrderObjectB
angular
    .module('revaluate.common')
    .filter('orderObjectBy', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            function index(obj, i) {
                return obj[i];
            }

            filtered.sort(function (a, b) {
                var comparator;
                var reducedA = field.split('.').reduce(index, a);
                var reducedB = field.split('.').reduce(index, b);
                if ( reducedA === reducedB ) {
                    comparator = 0;
                } else {
                    comparator = (reducedA > reducedB ? 1 : -1);
                }
                return comparator;
            });
            if ( reverse ) {
                filtered.reverse();
            }
            return filtered;
        };
    });
;angular
    .module('revaluate.common')
    .filter('groupExpenses', ["$parse", "filterWatcher", function ($parse, filterWatcher) {
        return function (expenses, reverse) {

            var isObject = angular.isObject,
                forEach = angular.forEach;

            if ( !isObject(expenses) ) {
                return expenses;
            }

            return filterWatcher.isMemoized('groupBy', arguments) ||
                filterWatcher.memoize('groupBy', arguments, this,
                    _groupBy(expenses));

            // ---
            // Group by expenses function.
            // ---

            function _groupBy(expenses) {
                var groupedExpenses = [];
                var matchingGroup;
                var matchingGroupName;

                forEach(expenses, function (expense) {
                    matchingGroup = expense.matchingGroup;
                    matchingGroupName = matchingGroup.name;

                    if ( !_.some(groupedExpenses, function (group) {
                            return group.name === matchingGroupName;
                        }) ) {
                        groupedExpenses.push({ name: matchingGroupName, matchingGroup: matchingGroup, values: [] });
                    }

                    _.find(groupedExpenses, function (group) {
                        return group.name === matchingGroupName;
                    }).values.push(expense);
                });

                // ---
                // Comparator to sort expenses.
                // ---

                function expensesSortComparator(a, b) {
                    // A less than B
                    if ( a.matchingGroup.diff.date < b.matchingGroup.diff.date )
                        return -1;
                    // A greater than B
                    if ( a.matchingGroup.diff.date > b.matchingGroup.diff.date )
                        return 1;
                    // A greater than B
                    if ( a.matchingGroup.name === 'Today' && b.matchingGroup.name === 'This month' ) {
                        return -1;
                    }
                    return 0;
                }

                // ---
                // Sort expenses - +-reversed.
                // ---

                groupedExpenses.sort(expensesSortComparator);

                if ( reverse ) {
                    groupedExpenses.reverse();
                }

                return groupedExpenses;
            }
        }
    }]);;/* Activity interceptor */

angular
    .module("revaluate.common")
    .factory("ActivityInterceptor", ["$rootScope", "$q", "ACTIVITY_INTERCEPTOR", function ($rootScope, $q, ACTIVITY_INTERCEPTOR) {
        return {

            /**
             * Request interceptor.
             *
             * @param config
             * @returns {*}
             */
            request: function (config) {
                if ( !config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
                }
                return config;
            },

            /**
             * Response interceptor.
             *
             * @param response
             * @returns {Promise}
             */

            response: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return response;
            },

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {Promise}
             */
            responseError: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return $q.reject(response);
            }
        };
    }]);
;/**
 * Error service interceptor used to listen to ajax server responses.
 */
angular
    .module("revaluate.common")
    .factory("ErrorInterceptor", ["$rootScope", "$q", "ERROR_INTERCEPTOR", function ($rootScope, $q, ERROR_INTERCEPTOR) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {*}
             */
            responseError: function (response) {

                var INTERNAL_SERVER_ERROR = 500;
                var PAYMENT_REQUIRED = 402;

                if ( response.status === INTERNAL_SERVER_ERROR && !response.config.cache ) {
                    $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
                } else if ( response.status === PAYMENT_REQUIRED && !response.config.cache ) {
                    $rootScope.$broadcast(ERROR_INTERCEPTOR.status402, response);
                }

                return $q.reject(response);
            }
        };

    }]);
;angular
    .module("revaluate.common")
    .provider('JWTInterceptor', function () {

        this.authHeader = 'Authorization';
        this.authPrefix = 'Bearer ';

        var config = this;

        this.$get = ["$q", "$injector", "$rootScope", "SessionService", function ($q, $injector, $rootScope, SessionService) {
            return {
                request: function (request) {
                    if ( request.skipAuthorization ) {
                        return request;
                    }

                    request.headers = request.headers || {};
                    // Already has an Authorization header
                    if ( request.headers[config.authHeader] ) {
                        return request;
                    }

                    var tokenPromise = $q.when($injector.invoke(function () {
                        return SessionService.getJwtToken();
                    }, this, {
                        config: request
                    }));

                    return tokenPromise.then(function (token) {
                        if ( token ) {
                            request.headers[config.authHeader] = config.authPrefix + token;
                        }
                        return request;
                    });
                }
            };
        }];
    });
;/**
 * Dates utils service.
 */
angular
    .module("revaluate.common")
    .service("DatesUtils", function () {

        this.prepareDate = function (givenDate) {

            // ---
            // Minutes.
            // ---
            var step = 30;

            // ---
            // Current values.
            // ---

            var now = moment();
            var minute = now.minutes();
            var hours = now.hours();

            // ---
            // Compute the date.
            // ---

            if ( minute >= step ) {
                minute = 0;
                hours += 1;
            }
            else {
                minute = step;
            }

            return Date.create(givenDate).set({ hours: hours, minute: minute, second: 0 });
        };

    });
;angular
    .module("revaluate.common")
    .factory("ExpenseMatchingGroupService", function () {
        var now = moment();
        var expensesGroup = [
            {
                name: 'Today',
                diff: { date: moment().set('day', now.day()), unit: 'day' }
            },
            {
                name: 'Tomorrow',
                diff: { date: moment().set('day', now.day() + 1), unit: 'day' }
            },
            {
                name: 'Yesterday',
                diff: { date: moment().set('day', now.day() - 1), unit: 'day' }
            },
            {
                name: 'This month',
                diff: { date: moment().set('month', now.month()), unit: 'month' }
            },
            {
                name: 'Next month',
                diff: { date: moment().set('month', now.month() + 1), unit: 'month' }
            },
            {
                name: 'Last month',
                diff: { date: moment().set('month', now.month() - 1), unit: 'month' }
            }
        ];

        return {

            /**
             * Populate expenses with matching groups
             */
            populateExpensesWithMatchingGroups: function (expenses, reverseOrder) {

                _.each(expenses, function (expense) {
                    var matchingGroupFound = _.find(expensesGroup, function (expensesGroup) {
                        return expensesGroup.diff.date.isSame(expense.model.spentDate, expensesGroup.diff.unit);
                    });

                    if ( !matchingGroupFound ) {
                        var expenseDueOn = moment(expense.model.spentDate);
                        var isSameYear = moment(moment().year()).isSame(expenseDueOn.year());

                        // ---
                        // If no matching group is found, create one with expenses month.
                        // ---

                        expense.matchingGroup = {
                            name: expenseDueOn.format(isSameYear ? 'MMMM' : 'MMMM, YYYY'),
                            diff: {
                                date: moment(expenseDueOn), unit: 'month'
                            }
                        };
                    }
                    else {
                        expense.matchingGroup = matchingGroupFound;
                    }
                });
            },

            /**
             * Populate expense with matching group
             */
            populateExpenseWithMatchingGroup: function (expense, reverseOrder) {
                return this.populateExpensesWithMatchingGroups([expense], reverseOrder);
            }
        };
    });
;angular
    .module('revaluate.common')
    .service('JWTHelper', function () {

        this.urlBase64Decode = function (str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch ( output.length % 4 ) {
                case 0:
                {
                    break;
                }
                case 2:
                {
                    output += '==';
                    break;
                }
                case 3:
                {
                    output += '=';
                    break;
                }
                default:
                {
                    throw 'Illegal base64url string!';
                }
            }
            return window.atob(output);
        };

        this.decodeToken = function (token) {
            var parts = token.split('.');

            if ( parts.length !== 3 ) {
                throw new Error('JWT must have 3 parts');
            }

            var decoded = this.urlBase64Decode(parts[1]);
            if ( !decoded ) {
                throw new Error('Cannot decode the token');
            }

            return JSON.parse(decoded);
        };

        this.getTokenExpirationDate = function (token) {
            var decoded;
            decoded = this.decodeToken(token);

            if ( !decoded.exp ) {
                return null;
            }

            var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
            d.setUTCSeconds(decoded.exp);

            return d;
        };

        this.isTokenExpired = function (token) {
            var d = this.getTokenExpirationDate(token);

            if ( !d ) {
                return false;
            }

            // Token expired?
            return !(d.valueOf() > new Date().valueOf());
        };
    });
;/**
 * Session service which encapsulates the whole logic account related to the Local storage which contains currently logged in user.
 */
angular
    .module("revaluate.common")
    .service("SessionService", ["$localStorage", function ($localStorage) {

        /**
         * Local storage key for session data.
         *
         * @type {string}
         */
        var sessionDataKey = "auth_session_data";
        var jwtTokenKey = "auth_jwt_token";

        /**
         * Create session.
         *
         * @param data
         */
        this.create = function (data, jwtToken) {
            this.setData(data);
            this.setJwtToken(jwtToken);
        };

        /**
         * Set the session data.
         *
         * @param data
         */
        this.setData = function (data) {

            $localStorage[sessionDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($localStorage[sessionDataKey]);
        };

        /**
         * Set the token data.
         *
         * @param data
         */
        this.setJwtToken = function (data) {
            $localStorage[jwtTokenKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getJwtToken = function () {
            return angular.fromJson($localStorage[jwtTokenKey]);
        };

        this.sessionExists = function () {
            return $localStorage[sessionDataKey] && $localStorage[jwtTokenKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $localStorage[sessionDataKey];
            delete $localStorage[jwtTokenKey];
        };

    }]);
;angular
    .module("revaluate.common")
    .service("StatesHandler", ["$state", "$stateParams", "STATES", function ($state, $stateParams, STATES) {

        this.goHome = function () {
            this.go(STATES.home);
        };

        this.goToProfile = function () {
            this.go(STATES.profile);
        };

        this.goToSetUp = function () {
            this.go(STATES.setUp);
        };

        this.goToAddPayment = function () {
            this.go(STATES.addPayment);
        };

        this.goToLogin = function () {
            this.go(STATES.account);
        };

        this.goToResetPassword = function () {
            this.go(STATES.account);
        };

        this.go = function (state) {
            $state.go(state);
        };

        this.goToExpenses = function () {
            this.go(STATES.expenses);
        };

        this.refreshCurrentState = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
    }]);;angular
    .module("revaluate.common")
    .service("TimezoneProvider", function () {

        /**
         * All timezones
         * @type {{key: string, value: string}[]}
         */
        this.timezones = [
            { key: "Pacific/Midway", value: "(UTC-11:00) Midway Island" },
            { key: "Pacific/Samoa", value: "(UTC-11:00) Samoa" },
            { key: "Pacific/Honolulu", value: "(UTC-10:00) Hawaii" },
            { key: "US/Alaska", value: "(UTC-09:00) Alaska" },
            { key: "America/Los_Angeles", value: "(UTC-08:00) Pacific Time (US &amp; Canada)" },
            { key: "America/Tijuana", value: "(UTC-08:00) Tijuana" },
            { key: "US/Arizona", value: "(UTC-07:00) Arizona" },
            { key: "America/Chihuahua", value: "(UTC-07:00) Chihuahua" },
            { key: "America/Chihuahua", value: "(UTC-07:00) La Paz" },
            { key: "America/Mazatlan", value: "(UTC-07:00) Mazatlan" },
            { key: "US/Mountain", value: "(UTC-07:00) Mountain Time (US &amp; Canada)" },
            { key: "America/Managua", value: "(UTC-06:00) Central America" },
            { key: "US/Central", value: "(UTC-06:00) Central Time (US &amp; Canada)" },
            { key: "America/Mexico_City", value: "(UTC-06:00) Guadalajara" },
            { key: "America/Mexico_City", value: "(UTC-06:00) Mexico City" },
            { key: "America/Monterrey", value: "(UTC-06:00) Monterrey" },
            { key: "Canada/Saskatchewan", value: "(UTC-06:00) Saskatchewan" },
            { key: "America/Bogota", value: "(UTC-05:00) Bogota" },
            { key: "US/Eastern", value: "(UTC-05:00) Eastern Time (US &amp; Canada)" },
            { key: "US/East-Indiana", value: "(UTC-05:00) Indiana (East)" },
            { key: "America/Lima", value: "(UTC-05:00) Lima" },
            { key: "America/Bogota", value: "(UTC-05:00) Quito" },
            { key: "Canada/Atlantic", value: "(UTC-04:00) Atlantic Time (Canada)" },
            { key: "America/Caracas", value: "(UTC-04:30) Caracas" },
            { key: "America/La_Paz", value: "(UTC-04:00) La Paz" },
            { key: "America/Santiago", value: "(UTC-04:00) Santiago" },
            { key: "Canada/Newfoundland", value: "(UTC-03:30) Newfoundland" },
            { key: "America/Sao_Paulo", value: "(UTC-03:00) Brasilia" },
            { key: "America/Argentina/Buenos_Aires", value: "(UTC-03:00) Buenos Aires" },
            { key: "America/Argentina/Buenos_Aires", value: "(UTC-03:00) Georgetown" },
            { key: "America/Godthab", value: "(UTC-03:00) Greenland" },
            { key: "America/Noronha", value: "(UTC-02:00) Mid-Atlantic" },
            { key: "Atlantic/Azores", value: "(UTC-01:00) Azores" },
            { key: "Atlantic/Cape_Verde", value: "(UTC-01:00) Cape Verde Is." },
            { key: "Africa/Casablanca", value: "(UTC+00:00) Casablanca" },
            { key: "Europe/London", value: "(UTC+00:00) Edinburgh" },
            { key: "Etc/Greenwich", value: "(UTC+00:00) Greenwich Mean Time : Dublin" },
            { key: "Europe/Lisbon", value: "(UTC+00:00) Lisbon" },
            { key: "Europe/London", value: "(UTC+00:00) London" },
            { key: "Africa/Monrovia", value: "(UTC+00:00) Monrovia" },
            { key: "UTC", value: "(UTC+00:00) UTC" },
            { key: "Europe/Amsterdam", value: "(UTC+01:00) Amsterdam" },
            { key: "Europe/Belgrade", value: "(UTC+01:00) Belgrade" },
            { key: "Europe/Berlin", value: "(UTC+01:00) Berlin" },
            { key: "Europe/Berlin", value: "(UTC+01:00) Bern" },
            { key: "Europe/Bratislava", value: "(UTC+01:00) Bratislava" },
            { key: "Europe/Brussels", value: "(UTC+01:00) Brussels" },
            { key: "Europe/Budapest", value: "(UTC+01:00) Budapest" },
            { key: "Europe/Copenhagen", value: "(UTC+01:00) Copenhagen" },
            { key: "Europe/Ljubljana", value: "(UTC+01:00) Ljubljana" },
            { key: "Europe/Madrid", value: "(UTC+01:00) Madrid" },
            { key: "Europe/Paris", value: "(UTC+01:00) Paris" },
            { key: "Europe/Prague", value: "(UTC+01:00) Prague" },
            { key: "Europe/Rome", value: "(UTC+01:00) Rome" },
            { key: "Europe/Sarajevo", value: "(UTC+01:00) Sarajevo" },
            { key: "Europe/Skopje", value: "(UTC+01:00) Skopje" },
            { key: "Europe/Stockholm", value: "(UTC+01:00) Stockholm" },
            { key: "Europe/Vienna", value: "(UTC+01:00) Vienna" },
            { key: "Europe/Warsaw", value: "(UTC+01:00) Warsaw" },
            { key: "Africa/Lagos", value: "(UTC+01:00) West Central Africa" },
            { key: "Europe/Zagreb", value: "(UTC+01:00) Zagreb" },
            { key: "Europe/Athens", value: "(UTC+02:00) Athens" },
            { key: "Europe/Bucharest", value: "(UTC+02:00) Bucharest" },
            { key: "Africa/Cairo", value: "(UTC+02:00) Cairo" },
            { key: "Africa/Harare", value: "(UTC+02:00) Harare" },
            { key: "Europe/Helsinki", value: "(UTC+02:00) Helsinki" },
            { key: "Europe/Istanbul", value: "(UTC+02:00) Istanbul" },
            { key: "Asia/Jerusalem", value: "(UTC+02:00) Jerusalem" },
            { key: "Europe/Helsinki", value: "(UTC+02:00) Kyiv" },
            { key: "Africa/Johannesburg", value: "(UTC+02:00) Pretoria" },
            { key: "Europe/Riga", value: "(UTC+02:00) Riga" },
            { key: "Europe/Sofia", value: "(UTC+02:00) Sofia" },
            { key: "Europe/Tallinn", value: "(UTC+02:00) Tallinn" },
            { key: "Europe/Vilnius", value: "(UTC+02:00) Vilnius" },
            { key: "Asia/Baghdad", value: "(UTC+03:00) Baghdad" },
            { key: "Asia/Kuwait", value: "(UTC+03:00) Kuwait" },
            { key: "Europe/Minsk", value: "(UTC+03:00) Minsk" },
            { key: "Africa/Nairobi", value: "(UTC+03:00) Nairobi" },
            { key: "Asia/Riyadh", value: "(UTC+03:00) Riyadh" },
            { key: "Europe/Volgograd", value: "(UTC+03:00) Volgograd" },
            { key: "Asia/Tehran", value: "(UTC+03:30) Tehran" },
            { key: "Asia/Muscat", value: "(UTC+04:00) Abu Dhabi" },
            { key: "Asia/Baku", value: "(UTC+04:00) Baku" },
            { key: "Europe/Moscow", value: "(UTC+04:00) Moscow" },
            { key: "Asia/Muscat", value: "(UTC+04:00) Muscat" },
            { key: "Europe/Moscow", value: "(UTC+04:00) St. Petersburg" },
            { key: "Asia/Tbilisi", value: "(UTC+04:00) Tbilisi" },
            { key: "Asia/Yerevan", value: "(UTC+04:00) Yerevan" },
            { key: "Asia/Kabul", value: "(UTC+04:30) Kabul" },
            { key: "Asia/Karachi", value: "(UTC+05:00) Islamabad" },
            { key: "Asia/Karachi", value: "(UTC+05:00) Karachi" },
            { key: "Asia/Tashkent", value: "(UTC+05:00) Tashkent" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Chennai" },
            { key: "Asia/Kolkata", value: "(UTC+05:30) Kolkata" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Mumbai" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) New Delhi" },
            { key: "Asia/Calcutta", value: "(UTC+05:30) Sri Jayawardenepura" },
            { key: "Asia/Katmandu", value: "(UTC+05:45) Kathmandu" },
            { key: "Asia/Almaty", value: "(UTC+06:00) Almaty" },
            { key: "Asia/Dhaka", value: "(UTC+06:00) Astana" },
            { key: "Asia/Dhaka", value: "(UTC+06:00) Dhaka" },
            { key: "Asia/Yekaterinburg", value: "(UTC+06:00) Ekaterinburg" },
            { key: "Asia/Rangoon", value: "(UTC+06:30) Rangoon" },
            { key: "Asia/Bangkok", value: "(UTC+07:00) Bangkok" },
            { key: "Asia/Bangkok", value: "(UTC+07:00) Hanoi" },
            { key: "Asia/Jakarta", value: "(UTC+07:00) Jakarta" },
            { key: "Asia/Novosibirsk", value: "(UTC+07:00) Novosibirsk" },
            { key: "Asia/Hong_Kong", value: "(UTC+08:00) Beijing" },
            { key: "Asia/Chongqing", value: "(UTC+08:00) Chongqing" },
            { key: "Asia/Hong_Kong", value: "(UTC+08:00) Hong Kong" },
            { key: "Asia/Krasnoyarsk", value: "(UTC+08:00) Krasnoyarsk" },
            { key: "Asia/Kuala_Lumpur", value: "(UTC+08:00) Kuala Lumpur" },
            { key: "Australia/Perth", value: "(UTC+08:00) Perth" },
            { key: "Asia/Singapore", value: "(UTC+08:00) Singapore" },
            { key: "Asia/Taipei", value: "(UTC+08:00) Taipei" },
            { key: "Asia/Ulan_Bator", value: "(UTC+08:00) Ulaan Bataar" },
            { key: "Asia/Urumqi", value: "(UTC+08:00) Urumqi" },
            { key: "Asia/Irkutsk", value: "(UTC+09:00) Irkutsk" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Osaka" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Sapporo" },
            { key: "Asia/Seoul", value: "(UTC+09:00) Seoul" },
            { key: "Asia/Tokyo", value: "(UTC+09:00) Tokyo" },
            { key: "Australia/Adelaide", value: "(UTC+09:30) Adelaide" },
            { key: "Australia/Darwin", value: "(UTC+09:30) Darwin" },
            { key: "Australia/Brisbane", value: "(UTC+10:00) Brisbane" },
            { key: "Australia/Canberra", value: "(UTC+10:00) Canberra" },
            { key: "Pacific/Guam", value: "(UTC+10:00) Guam" },
            { key: "Australia/Hobart", value: "(UTC+10:00) Hobart" },
            { key: "Australia/Melbourne", value: "(UTC+10:00) Melbourne" },
            { key: "Pacific/Port_Moresby", value: "(UTC+10:00) Port Moresby" },
            { key: "Australia/Sydney", value: "(UTC+10:00) Sydney" },
            { key: "Asia/Yakutsk", value: "(UTC+10:00) Yakutsk" },
            { key: "Asia/Vladivostok", value: "(UTC+11:00) Vladivostok" },
            { key: "Pacific/Auckland", value: "(UTC+12:00) Auckland" },
            { key: "Pacific/Fiji", value: "(UTC+12:00) Fiji" },
            { key: "Pacific/Kwajalein", value: "(UTC+12:00) International Date Line West" },
            { key: "Asia/Kamchatka", value: "(UTC+12:00) Kamchatka" },
            { key: "Asia/Magadan", value: "(UTC+12:00) Magadan" },
            { key: "Pacific/Fiji", value: "(UTC+12:00) Marshall Is." },
            { key: "Asia/Magadan", value: "(UTC+12:00) New Caledonia" },
            { key: "Asia/Magadan", value: "(UTC+12:00) Solomon Is." },
            { key: "Pacific/Auckland", value: "(UTC+12:00) Wellington" },
            { key: "Pacific/Tongatapu", value: "(UTC+13:00) Nuku'alofa" }
        ];

        /**
         * Returns timezones.
         */
        this.getTimezones = function () {
            return this.timezones;
        };

        /**
         * Returns timezone details.
         */
        this.getTimezoneDescription = function (timezone) {
            var that = this;
            var timezoneDetail = _.filter(that.timezones, { 'key': timezone });

            if ( timezoneDetail ) {
                return _.isArray(timezoneDetail) ? timezoneDetail[0] : timezoneDetail;
            }
        };

    });
;/**
 * Transformer utils service.
 */
angular
    .module("revaluate.common")
    .service("TransformerUtils", function () {

        /**
         * Copies keys from a sourceObject to a targetObject, except given skipKeys.
         * @param sourceObject
         * @param targetObject
         * @param skipKeys
         */
        this.copyKeysFromTo = function (sourceObject, targetObject, skipKeys) {
            _.each(_.keys(sourceObject), function (key) {
                if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                    targetObject[key] = sourceObject[key];
                }
            });
        };

        /**
         * Sanitize recipients (remove duplicates).
         */
        this.sanitizeRecipients = function (recipients) {

            return _.uniq(recipients, 'email');
        };
    });
;angular
    .module("revaluate.feedback", []);;angular
    .module("revaluate.feedback")
    .constant("FEEDBACK_URLS", {
        feedback: "account/sendFeedback"
    });;angular
    .module("revaluate.feedback")
    .controller("FeedbackModalController", ["$scope", "FeedbackModalService", "Feedback", "$timeout", function ($scope, FeedbackModalService, Feedback, $timeout) {

        /**
         * Feedback.
         */
        $scope.feedback = new Feedback();

        /**
         * Flags during the lifetime of the feedback.
         * @type {boolean}
         */
        $scope.isSending = false;
        $scope.isSent = false;

        $scope.openFeedbackModal = function () {
            FeedbackModalService.open();

            /**
             * If send feedback modal is opened
             */
            FeedbackModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        };

        /**
         * Dismiss the create/update modal.
         */
        $scope.dismissFeedbackModal = function () {
            FeedbackModalService.modalInstance.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Sends the feedback.
         * @param feedbackForm
         */
        $scope.sendFeedbackAndClose = function (feedbackForm) {
            if ( feedbackForm.$valid && !$scope.isSending ) {

                // Is sending feedback
                $scope.isSending = true;

                $scope.feedback.send()
                    .then(function () {

                        $scope.isSent = true;

                        $timeout(function () {
                            $scope.isSending = false;

                            FeedbackModalService.modalInstance.close();
                        }, 2500);

                    })
                    .catch(function () {

                        // Error
                        $scope.isSending = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isModalOpened = false;
                        $scope.isSending = false;
                    });
            }
        };

    }]);
;angular
    .module("revaluate.feedback")
    .factory("Feedback", ["FeedbackService", function (FeedbackService) {

        /**
         * Feedback class.
         * @constructor
         */
        function Feedback() {

            /**
             * Represents the DTO model of the Feedback.
             */
            this.model = {

                /**
                 * Feedback subject
                 */
                subject: "",

                /**
                 * Feedback message
                 */
                message: ""
            };

            /**
             * Sends a Feedback.
             * @returns {*}
             */
            this.send = function () {
                return FeedbackService.sendFeedback(this);
            };
        }

        /**
         * Builds a Feedback.
         * @returns {Feedback}
         */
        Feedback.build = function () {
            return new Feedback();
        };

        return Feedback;
    }]);;/* Feedback modal */

angular
    .module("revaluate.feedback")
    .service("FeedbackModalService", ["$modal", function ($modal) {

        /**
         * Feedback modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define feedback modal object.
         */
        this.open = function () {

            this.modalInstance = $modal.open({
                templateUrl: "app/feedback/partials/feedback-modal.html",
                controller: "FeedbackModalController",
                windowClass: "modal-feedback"
            });
        };

    }]);
;angular
    .module("revaluate.feedback")
    .service("FeedbackService", ["FEEDBACK_URLS", "$http", function (FEEDBACK_URLS, $http) {

        this.sendFeedback = function (feedback) {
            return $http
                .post(URLTo.api(FEEDBACK_URLS.feedback), {
                    subject: feedback.model.subject,
                    message: feedback.model.message
                });
        };
    }]);
;/**
 * Main account module declaration including ui templates.
 */
angular
    .module("revaluate.account", [
        "revaluate.common",
        "revaluate.currencies",
        "revaluate.categories"
    ])
    .config(["$stateProvider", "$httpProvider", function ($stateProvider, $httpProvider) {

        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

        // Home
        $stateProvider

            // Login page
            .state("account", {
                url: "/account",
                controller: "LoginController",
                templateUrl: "app/site/partials/home.html",
                title: "Login - Revaluate",
                isPublicPage: true
            })

            // Logout page
            .state("account:logout", {
                url: "/account/logout",
                controller: "LogoutController",
                templateUrl: "app/account/partials/logout.html",
                resolve: {
                    isSuccessfullyLoggedOut: ["$q", "AuthService", function ($q, AuthService) {
                        AuthService.logout();

                        return true;
                    }]
                },
                title: "Logout - Revaluate",
                isPublicPage: true
            })

            ///////////////////////////////////////////////
            /*Validate password reset token related views*/
            ///////////////////////////////////////////////

            // Validate password reset token abstract view
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/reset-password",
                templateUrl: "app/account/partials/validate_password_reset_token_abstract.html",
                abstract: true
            })
            // Validate password reset token - valid
            .state({
                name: "account:validatePasswordResetToken.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token_valid.html",
                controller: "ValidatePasswordResetTokenController",
                resolve: {
                    validateTokenResult: ["$stateParams", "$q", "AuthService", "$state", function ($stateParams, $q, AuthService, $state) {
                        var deferred = $q.defer();

                        AuthService
                            .validatePasswordResetToken($stateParams.email, $stateParams.token)
                            .then(function (response) {
                                deferred.resolve({ email: $stateParams.email, token: $stateParams.token });
                                return response;
                            })
                            .catch(function (response) {

                                $state.go("account:validatePasswordResetToken.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }]
                },
                title: "Reset password - Revaluate",
                isPublicPage: true
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:validatePasswordResetToken.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/validate_password_reset_token_invalid.html",
                controller: "ValidatePasswordResetTokenInvalidController",
                title: "Reset password - Revaluate",
                isPublicPage: true
            })

            ///////////////////////////////////////////////
            /*Confirmation email related views*/
            ///////////////////////////////////////////////

            // Confirmation email abstract view
            .state({
                name: "account:confirmationEmail",
                url: "/account/confirm-email",
                templateUrl: "app/account/partials/email_confirmation_send_abstract.html",
                abstract: true
            })
            // Validate confirmation email token - valid
            .state({
                name: "account:confirmationEmail.valid",
                url: "/{email}/{token}",
                templateUrl: "app/account/partials/email_confirmation_send_valid.html",
                resolve: {
                    validateTokenResult: ["AuthService", "$rootScope", "$stateParams", "$q", "$state", "AUTH_EVENTS", function (AuthService, $rootScope, $stateParams, $q, $state, AUTH_EVENTS) {
                        var deferred = $q.defer();

                        AuthService
                            .validateConfirmationEmailToken($stateParams.email, $stateParams.token)
                            .then(function (response) {

                                // ---
                                // Update user if logged in.
                                // ---
                                if ( AuthService.isAuthenticated() ) {
                                    $rootScope
                                        .currentUser
                                        .setEmailConfirmedAndReload();
                                    $rootScope.$broadcast(AUTH_EVENTS.refreshUser, {});
                                }

                                deferred.resolve({});
                                return response;
                            })
                            .catch(function (response) {

                                $state.go("account:confirmationEmail.invalid");
                                return response;
                            });

                        return deferred.promise;
                    }]
                },
                title: "Confirm email - Revaluate",
                isPublicPage: true
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:confirmationEmail.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/email_confirmation_send_invalid.html",
                title: "Invalid confirmation email token - Revaluate",
                isPublicPage: true
            })

            // ---
            // Account - second step of registration (set up).
            // ---
            .state("setup", {
                url: "/setup",
                templateUrl: 'app/account/partials/signup_setup.html',
                controller: "SignUpSetUpRegistrationController",
                title: "Setup - Revaluate",
                resolve: {
                    currencies: ["CurrencyService", function (CurrencyService) {
                        return CurrencyService.getAllCurrencies();
                    }],
                    colors: ["ColorService", function (ColorService) {
                        return ColorService.getAllColors();
                    }],
                    predefinedCategories: ["CategoriesSetupProvider", function (CategoriesSetupProvider) {
                        return CategoriesSetupProvider.getPredefinedCategories();
                    }]
                }
            });
    }])

    .run(["$rootScope", "AuthFilter", function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    }]);;/**
 * Account related constants.
 */
angular
    .module("revaluate.account")
    .constant("USER_SUBSCRIPTION_STATUS", {
        TRIAL: "TRIAL",
        TRIAL_EXPIRED: "TRIAL_EXPIRED",
        ACTIVE: "ACTIVE"
    })
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
        refreshUser: "auth-refresh-user",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    }).constant("AUTH_MODAL", {
        close: "close"
    })
    .constant("AUTH_URLS", {
        login: "account/login",
        logout: "account/logout",
        currentUser: "account/user",
        auth: "account",
        create: "account",
        update: "account",
        details: "account",
        cancel: "account",
        updateCurrency: "account/updateCurrency",
        requestPasswordReset: "account/requestResetPassword/:email",
        resetPasswordWithToken: "account/resetPassword/:email/:token",
        validatePasswordResetToken: "account/validateResetPasswordToken/:email/:token",
        updatePassword: "account/updatePassword",
        requestConfirmationEmail: "account/requestConfirmationEmail/:email",
        validateConfirmationEmailToken: "account/validateConfirmationEmailToken/:email/:token",
        fetchPaymentToken: "payment/fetchToken",
        fetchPaymentInsights: "payment/fetchPaymentInsights",
        subscribeToStandardPlan: "payment/subscribeToStandardPlan",
        createCustomerWithPaymentMethodSubscribeToStandardPlan: "payment/createCustomerWithPaymentMethodSubscribeToStandardPlan",
        fetchPaymentStatus: "payment/fetchPaymentStatus",
        updateCustomer: "payment/updateCustomer",
        updatePaymentMethod: "payment/updatePaymentMethod",
        isPaymentStatusDefined: "payment/isPaymentStatusDefined",
        //Below - deprecated
        refreshToken: "auth/refresh_token",
        requestSignUpRegistration: "account/send_email_verification_token"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        signUpSuccessfully: "signUpSuccessfully",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent",
        requestSignUpRegistration: "requestSignUpRegistration",
        updateProfile: "updateProfile",
        resetPassword: "resetPassword",
        resetPasswordSuccessfully: "resetPasswordSuccessfully",
        updatePassword: "updatePassword",
        updatePasswordSuccessfully: "updatePasswordSuccessfully"
    })
    .constant("AUTH_TOKEN_HEADER", "authtoken");
;angular
    .module("revaluate.account")
    .constant("USER_URLS", {
        userUnique: "account/isUniqueEmail"
    });
;angular
    .module("revaluate.account")
    .controller("EmailConfirmationSendController", ["$scope", "$rootScope", "$timeout", "flash", "AuthService", "StatesHandler", "ACCOUNT_FORM_STATE", "ALERTS_CONSTANTS", function ($scope, $rootScope, $timeout, flash, AuthService, StatesHandler, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.validatePassword;

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        var sendConfirmationEmailData = {
            email: $scope.user.model.email
        };

        $scope.sendConfirmationEmail = function (sendConfirmationEmailForm) {
            if ( sendConfirmationEmailForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .requestConfirmationEmail(sendConfirmationEmailData.email)
                    .then(function () {
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully sent the confirmation email!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    }]);
;/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("revaluate.account")
    .controller("ForgotPasswordController", ["$state", "$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountModal", function ($state, $scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.forgotPassword;

        /**
         * Request password reset up user information.
         */
        $scope.forgotPasswordData = {
            email: ""
        };

        /**
         * Request password reset functionality.
         */
        $scope.requestPasswordReset = function () {
            if ( $scope.forgotPasswordForm.$valid ) {
                AuthService
                    .requestPasswordReset($scope.forgotPasswordData.email)
                    .then(function () {
                        AccountModal.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = 'This email does not exist in our database.';
                    });
            }
        };
    }]);
;angular
    .module("revaluate.account")
    .controller("HomeSignUpRegistrationController", ["$scope", "$timeout", "flash", "ALERTS_CONSTANTS", "StatesHandler", "User", "AuthService", "MIXPANEL_EVENTS", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpConfirm;

        /**
         * Sign up user information.
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            currency: {
                "currencyCode": "EUR"
            }
        };

        /*
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid && !$scope.isRequestPending ) {

                $scope.isRequestPending = true;

                User.$new()
                    .create(signUpData)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                $scope.isRequestPending = false;

                                StatesHandler.goToSetUp();
                            });
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    }]);
;/**
 * Login controller responsible for user login actions.
 */
angular
    .module("revaluate.account")
    .controller("LoginController", ["$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountModal", "StatesHandler", "$timeout", function ($scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal, StatesHandler, $timeout) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.login;

        /**
         * If not opened, open it.
         */
        if ( !AccountModal.isOpen ) {
            AccountModal.openWithState(ACCOUNT_FORM_STATE.login)
        }

        /**
         * Login user information.
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * Login functionality.
         */
        $scope.login = function (loginData) {
            if ( $scope.loginForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;
                $scope.isWaitingForCloseEvent = false;

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        $scope.isWaitingForCloseEvent = true;
                        StatesHandler.goToExpenses();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Your email or password are wrong. Please try again.";
                    })
                    .finally(function () {
                        $scope.isRequestPending = false;
                    })
            }
        };
    }]);
;/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("revaluate.account")
    .controller("LogoutController", ["$scope", "$timeout", "StatesHandler", "isSuccessfullyLoggedOut", function ($scope, $timeout, StatesHandler, isSuccessfullyLoggedOut) {

        $scope.isSuccessfullyLoggedOut = isSuccessfullyLoggedOut;

        /**
         * Redirect to home after 1,5 sec.
         */
        $timeout(function () {
            StatesHandler.goHome();
        }, 1500);

    }]);
;angular
    .module("revaluate.account")
    .controller("SignUpSetUpRegistrationController", ["$q", "$rootScope", "$scope", "$timeout", "flash", "AuthService", "CategoryService", "AUTH_EVENTS", "ALERTS_CONSTANTS", "predefinedCategories", "colors", "CategoryColorService", "SessionService", "StatesHandler", "Category", "currencies", function ($q, $rootScope, $scope, $timeout, flash, AuthService, CategoryService, AUTH_EVENTS, ALERTS_CONSTANTS, predefinedCategories, colors, CategoryColorService, SessionService, StatesHandler, Category, currencies) {

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        $scope.currencies = currencies;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpSetUp;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Selected currency
         * @type {{}}
         */
        $scope.currency = {};

        /**
         * Saving timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Existing predefined colors.
         */
        $scope.colors = colors;

        /**
         * Existing predefined categories.
         */
        $scope.categories = predefinedCategories;

        // ---
        // Populate predefined categories with colors.
        // ---
        $scope.categories = _.map($scope.categories, function (category) {
            return {
                name: category,
                selected: true,
                color: $scope.colors[$scope.categories.indexOf(category)]
            };
        });

        /**
         * Category to be added on the fly
         * @type {string}
         */
        $scope.categoryOnTheFly = "";

        /**
         * Show block content
         * @type {boolean}
         */
        $scope.showCategoryOnTheFlyInput = false;

        /**
         * Toggle content
         */
        $scope.toggleContent = function () {
            $scope.showCategoryOnTheFlyInput = !$scope.showCategoryOnTheFlyInput;
        };

        /**
         * Trigger submit of the category on the fly nested form
         */
        $scope.triggerSubmit = function () {
            $scope.$broadcast('add-category-on-the-fly-event');
        };

        /**
         * To be called when on blur.
         */
        $scope.cancelAddCategoryOnTheFly = function () {
            resetCategoryOnTheFlyForm();
        };

        /**
         * Reset the category on the fly
         */
        function resetCategoryOnTheFlyForm() {
            $scope.showCategoryOnTheFlyInput = false;
            $scope.categoryOnTheFly = "";
            $scope.setUpForm.categoryOnTheFlyForm.$setPristine();
            $scope.badPostSubmitResponse = false;

            // ---
            // If there was a previously error, just clear it.
            // ---
            flash.to($scope.alertIdentifierId).error = '';
        }

        /**
         * Add a custom category to existing ones (only if name is unique)
         */
        $scope.onSubmitted = function ($event) {
            $event.stopPropagation();

            $scope.setUpForm.categoryOnTheFlyForm.$submitted = true;
            if ( $scope.setUpForm.categoryOnTheFlyForm.$invalid ) {
                return;
            }

            var result = _.some($scope.categories, function (category) {
                return category.name === $scope.categoryOnTheFly;
            });

            if ( result ) {
                flash.to($scope.alertIdentifierId).error = "Category is not unique";
            }
            else {
                $scope.categories.push({
                    name: $scope.categoryOnTheFly,
                    color: CategoryColorService.randomizedColor($scope.colors),
                    selected: true
                });

                // ---
                // Reinitialize the value and form.
                // ---
                resetCategoryOnTheFlyForm();
            }
        };

        /**
         * Toggle category selection
         */
        $scope.toggleCategorySelection = function (index) {
            $scope.categories[index].selected = !$scope.categories[index].selected;
        };

        /**
         * Minimum categories to select
         */
        var MIN_CATEGORIES_TO_SELECT = 3;

        function getSelectedCategories() {
            return _.filter($scope.categories, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        $scope.isEnoughSelectedCategories = function () {
            return getSelectedCategories().length >= MIN_CATEGORIES_TO_SELECT;
        };

        /**
         * Update profile functionality.
         */
        $scope.setUp = function () {
            if ( $scope.setUpForm.$invalid || $scope.isSaving ) {

                return;
            }

            var selectedCategories = angular.copy(getSelectedCategories());
            var userProfileToBeUpdated = {
                currency: angular.copy($scope.currency.selected),
                initiated: true
            };

            // ---
            // We perform a bulk create.
            // ---
            var selectedCategoriesToBeSaved = _.map(selectedCategories, function (categoryDTO) {
                return Category.build(categoryDTO);
            });

            // ---
            // This is the final deferred to update the user.
            // ---
            var deferred = $q.defer();

            // ---
            // Flag is saving flag.
            // ---
            $scope.isSaving = true;

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            CategoryService
                .bulkCreate(selectedCategoriesToBeSaved)
                .then(function () {
                    $scope.user
                        .save(userProfileToBeUpdated)
                        .then(function (response) {
                            deferred.resolve(response);
                        })
                        .catch(function (response) {
                            return deferred.reject(response);
                        })
                })
                .catch(function (response) {
                    return deferred.reject(response);
                });

            // ---
            // Wait for the final deferred.
            // ---
            deferred
                .promise
                .then(function (response) {
                    $timeout(function () {
                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Show some feedback.
                        // ---
                        $scope.isSaving = false;
                        flash.to($scope.alertIdentifierId).success = "Set up successfully! Preparing expenses..";

                        /**
                         * Finally, go to expenses.
                         */
                        StatesHandler.goToExpenses();
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // Error
                    $scope.isSaving = false;
                    flash.to($scope.alertIdentifierId).error = "Set up could not have been performed.";
                    $scope.badPostSubmitResponse = true;
                });
        };

    }]);;angular
    .module("revaluate.account")
    .controller("ValidatePasswordResetTokenController", ["$scope", "$timeout", "flash", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "validateTokenResult", "ALERTS_CONSTANTS", function ($scope, $timeout, flash, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.validatePassword;

        /**
         * Reset password data (used if
         * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
         */
        $scope.resetPasswordData = {
            email: validateTokenResult.email,
            password: "",
            passwordConfirmation: "",
            token: validateTokenResult.token
        };

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService
                    .resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
                        $scope.successfullyReseted = true;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

                        // Log in the user, and forward it to the expenses page.
                        AuthService
                            .login(resetPasswordData.email, resetPasswordData.password)
                            .then(function () {
                                $timeout(function () {
                                    StatesHandler.goToExpenses();
                                }, 1500);
                            });
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    }]);
;angular
    .module("revaluate.account")
    .controller("ValidatePasswordResetTokenInvalidController", ["$scope", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", function ($scope, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.continueToResetPassword = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            ProfileFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
            StatesHandler.goToLogin();
        };

    }]);
;/* Account modal toggle */

angular
    .module("revaluate.account")
    .directive("accountModalClose", ["AccountModal", function (AccountModal) {
        return {
            restrict: "A",
            templateUrl: "app/account/partials/account_close.html",
            link: function (scope, el) {
                el.on("click", function () {
                    AccountModal.close();
                });
            }
        };
    }]);
;/* Account modal toggle */

angular
    .module("revaluate.account")
    .directive("accountModalToggle", ["AccountModal", function (AccountModal) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                el.on("click", function () {
                    AccountModal.openWithState(attrs.accountModalToggle);
                });
            }
        };
    }]);
;/* Account modal */

angular
    .module("revaluate.account")
    .directive("accountModal", ["$rootScope", "$animate", "ACCOUNT_FORM_STATE", "AccountModal", function ($rootScope, $animate, ACCOUNT_FORM_STATE, AccountModal) {
        return {
            restrict: "A",
            templateUrl: "app/account/partials/account.html",
            link: function (scope, el) {

                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

                // Get the current user
                scope.user = $rootScope.currentUser;

                // Put the account modal to scope
                scope.AccountModal = AccountModal;

                var CLASS_OPEN = "account-modal--open";

                // Open or close the modal
                scope.$watch("AccountModal.isOpen", function (isOpen, isOpenOld) {
                    if ( isOpen === true ) {
                        $animate.addClass(el, CLASS_OPEN);
                    }
                    else if ( isOpen === false && isOpenOld === true ) {
                        $animate.removeClass(el, CLASS_OPEN);
                    }
                });
            }
        };
    }]);
;/**
 * Directive responsible for switching update profile forms between them.
 */
angular
    .module("revaluate.account")
    .directive("profileFormToggle", ["ProfileFormToggle", "ACCOUNT_FORM_STATE", function (ProfileFormToggle, ACCOUNT_FORM_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.ProfileFormToggle = ProfileFormToggle;
                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

                // ---
                // Default state.
                // ---
                scope.ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)
            }
        };
    }]);
;/**
 * Directive responsible for checking of a password is strong enough.
 */
angular
    .module("revaluate.account")
    .directive("strongPassword", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a password is strong enough.
                 *
                 * @param password
                 * @returns {boolean}
                 */
                function isStrongPassword(password) {
                    return !!password && password.length >= 7;
                }

                ngModel.$validators.strongPassword = function (password) {
                    return isStrongPassword(password);
                };
            }
        };
    });
;angular
    .module("revaluate.account")
    .directive("uniqueEmail", ["$q", "$timeout", "UserService", function ($q, $timeout, UserService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a string is a valid email address.
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidEmail(value) ) {

                        // Set validity
                        UserService
                            .isUnique(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.email === ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueEmail', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    }]);;/**
 * Directive responsible for checking of an email is valid.
 */
angular
    .module("revaluate.account")
    .directive("validEmail", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a string is a valid email address
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                ngModel.$validators.validEmail = function (email) {
                    return isValidEmail(email);
                };
            }
        };
    });
;/* Account modal */

angular
    .module("revaluate.account")
    .service("AccountModal", ["$rootScope", "$timeout", "AUTH_MODAL", function ($rootScope, $timeout, AUTH_MODAL) {

        // By default the modal is closed
        this.isOpen = false;
        this.state = null;

        // Open the modal
        this.open = function () {
            $timeout(_.bind(function () {
                this.isOpen = true;
            }, this));
        };

        // Close the modal
        this.close = function () {
            $timeout(_.bind(function () {
                this.isOpen = false;
            }, this));
        };

        // Set state
        this.setState = function (state) {
            $timeout(_.bind(function () {
                this.state = state;
            }, this));
        };

        // Open with state
        this.openWithState = function (state) {
            this.setState(state);
            this.open();
        };

        // Listen to the login event
        $rootScope.$on(AUTH_MODAL.close, _.bind(function () {
            this.close();
        }, this));
    }]);
;angular
    .module("revaluate.account")
    .value('redirectToUrlAfterLogin', { url: undefined });;/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("revaluate.account")
    .service("AuthService", ["$rootScope", "$q", "$http", "$location", "redirectToUrlAfterLogin", "SessionService", "AUTH_EVENTS", "AUTH_URLS", "AUTH_TOKEN_HEADER", function ($rootScope, $q, $http, $location, redirectToUrlAfterLogin, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

        /**
         * Is user already authenticated ?
         */
        this.isAuthenticated = function () {
            return SessionService.sessionExists();
        };

        /**
         * Login functionality
         */
        this.login = function (email, password) {

            return $http.post(URLTo.api(AUTH_URLS.login), {
                email: email,
                password: password
            }).then(function (response) {

                SessionService.create(response.data, response.headers()[AUTH_TOKEN_HEADER]);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

                return response;
            }).catch(function (response) {

                SessionService.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

                return $q.reject(response);
            });
        };

        /**
         * Logout functionality
         */
        this.logout = function () {
            SessionService.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        /**
         * Request password reset functionality
         */
        this.requestPasswordReset = function (email) {
            return $http
                .post(URLTo.api(AUTH_URLS.requestPasswordReset, { ":email": email }));
        };

        /**
         * Request registration functionality
         */
        this.requestSignUpRegistration = function (email) {
            return $http
                .post(URLTo.api(AUTH_URLS.requestSignUpRegistration), {
                    email: email
                });
        };

        this.requestConfirmationEmail = function (email) {
            return $http
                .post(URLTo.api(AUTH_URLS.requestConfirmationEmail, { ":email": email }))
                .then(function (response) {
                    return response.data;
                });
        };

        this.validateConfirmationEmailToken = function (email, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.validateConfirmationEmailToken, { ":email": email, ":token": token }), {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Reset password with token.
         */
        this.resetPasswordWithToken = function (email, password, passwordConfirmation, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, { ":email": email, ":token": token }),
                {
                    password: password,
                    passwordConfirmation: passwordConfirmation
                },
                {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Validate password reset token.
         */
        this.validatePasswordResetToken = function (email, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.validatePasswordResetToken, { ":email": email, ":token": token }),
                {
                    skipAuthorization: true
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update password.
         */
        this.updatePassword = function (oldPassword, newPassword, newPasswordConfirmation) {
            return $http
                .put(URLTo.api(AUTH_URLS.updatePassword),
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirmation: newPasswordConfirmation
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Cancel account.
         */
        this.cancelAccount = function () {
            return $http
                .delete(URLTo.api(AUTH_URLS.cancel))
                .then(function (response) {
                    return response.data;
                });
        };

        this.saveAttemptUrl = function () {
            if ( $location.path().toLowerCase() !== '/account' ) {
                redirectToUrlAfterLogin.url = $location.path();
            }
        };

        this.redirectToAttemptedUrl = function () {
            if ( redirectToUrlAfterLogin.url ) {
                $location.path(redirectToUrlAfterLogin.url);

                redirectToUrlAfterLogin.url = undefined;
            }
        }
    }]);
;/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("revaluate.account")
    .service("AuthFilter", ["AuthService", "StatesHandler", "User", "STATES", "flash", "ALERTS_CONSTANTS", function (AuthService, StatesHandler, User, STATES, flash, ALERTS_CONSTANTS) {

        return function (event, toState) {
            if (
                (toState.url === '/account'
                || toState.name === "home")
                && AuthService.isAuthenticated() ) {

                /*If user is authenticated, and tries to go to /account or home, just to expenses*/
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if ( !AuthService.isAuthenticated() && !toState.isPublicPage ) {

                /*If user is not authenticated, save attempt try and go to /account, where login modal is opened*/
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            } else if (
                toState.url.indexOf("/setup") > -1
                && AuthService.isAuthenticated()
                && User.$new().loadFromSession().isInitiated() ) {

                /*Once user is initiated, do not let user to setup page*/
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if (
                !toState.isPublicPage
                && toState.url.indexOf("/setup") === -1
                && AuthService.isAuthenticated()
                && !User.$new().loadFromSession().isInitiated() ) {

                /*If user is not initiated but authenticated, and tries to go to a non public page, go to setup page*/
                event.preventDefault();
                StatesHandler.goToSetUp();
            } else if (
                !toState.isPublicPage
                && !toState.isPaymentRelatedPage
                && AuthService.isAuthenticated()
                && User.$new().loadFromSession().isTrialPeriodExpired() ) {

                /*If user is with trial expired, authenticated and tries to go to a non public page, go to payment*/
                event.preventDefault();

                // ---
                // Show error.
                // ---
                flash.to(ALERTS_CONSTANTS.generalError).error = "You must define a payment method and subscribe to revaluate plan before further using revaluate.";
                StatesHandler.goToAddPayment();
            }

        };

    }]);;/**
 * Authentication service interceptor used to listen to server responses.
 */
angular
    .module("revaluate.account")
    .factory("AuthInterceptor", ["$rootScope", "$q", "SessionService", "AUTH_EVENTS", function ($rootScope, $q, SessionService, AUTH_EVENTS) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {*}
             */
            responseError: function (response) {
                if ( response.status === 401 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
                }
                if ( response.status === 403 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
                }
                if ( response.status === 419 || response.status === 440 ) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                }

                return $q.reject(response);
            }
        };

    }]);
;/**
 * Profile form toggle responsible to keep the state of the current displayed update profile form.
 */
angular
    .module("revaluate.account")
    .service("ProfileFormToggle", ["ACCOUNT_FORM_STATE", function (ACCOUNT_FORM_STATE) {
        this.state = ACCOUNT_FORM_STATE.updateProfile;

        this.setState = function (state) {
            this.state = state;
        };
    }]);



;angular
    .module("revaluate.account")
    .service("UserService", ["$http", "$q", "USER_URLS", function ($http, $q, USER_URLS) {

        /**
         * The list of already verified email addresses.
         *
         * @type {{}}
         */
        this.uniqueEmailCache = {};

        /**
         * Check if an email address is unique.
         *
         * @param email
         * @returns {*}
         */
        this.isUnique = function (email) {
            // Create deferred
            var deferred = $q.defer();

            if ( !_.isUndefined(this.uniqueEmailCache[email]) ) {

                // Use the value from cache
                deferred.resolve({
                    isUnique: this.uniqueEmailCache[email],
                    email: email
                });
            } else {
                $http
                    .get(URLTo.api(USER_URLS.userUnique), {params: {email: email}})
                    .then(_.bind(function (response) {
                        this.uniqueEmailCache[email] = response.data.isUnique;
                        deferred.resolve({
                            isUnique: true,
                            email: email
                        });
                    }, this))
                    .catch(function () {
                        deferred.resolve({
                            isUnique: false,
                            email: email
                        });
                    });
            }

            return deferred.promise;
        };

        /**
         * Reset the unique email cache.
         */
        this.resetUniqueEmailCache = function () {
            this.uniqueEmailCache = {};
        };
    }]);
;angular
    .module("revaluate.account")
    .factory("User", ["SessionService", "TransformerUtils", "$q", "$http", "AUTH_URLS", "USER_SUBSCRIPTION_STATUS", function (SessionService, TransformerUtils, $q, $http, AUTH_URLS, USER_SUBSCRIPTION_STATUS) {
        return {

            $new: function () {

                return {

                    /**
                     * User model (DTO)
                     */
                    model: {
                        userId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        timezone: "",
                        initiated: false,
                        createdDate: "",
                        endTrialDate: "",
                        userSubscriptionStatus: "",
                        emailConfirmed: false,
                        currency: {
                            symbol: ""
                        }
                    },

                    /**
                     * Is user already authenticated
                     * @returns {*}
                     */
                    isAuthenticated: function () {
                        return SessionService.sessionExists();
                    },

                    /**
                     * Is user already initiated
                     * @returns {*}
                     */
                    isInitiated: function () {
                        return this.isAuthenticated() && this.model.initiated;
                    },

                    getTrialRemainingDays: function () {
                        var difference = moment(this.model.endTrialDate).diff(moment(), 'days');
                        if ( difference < 0 ) {

                            return 0;
                        }
                        return difference;
                    },

                    showTrialRemainingDays: function () {
                        var trialRemainingDays = this.getTrialRemainingDays();

                        return trialRemainingDays > 0 && trialRemainingDays <= 5;
                    },

                    isTrialPeriodExpired: function () {

                        return (this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL && this.getTrialRemainingDays() === 0) || this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL_EXPIRED;
                    },

                    /**
                     * Loads a user from local storage.
                     * @returns {*}
                     */
                    loadFromSession: function () {

                        return this.loadFrom(SessionService.getData() || {});
                    },

                    /**
                     * Loads a user from given data.
                     * @returns {*}
                     */
                    loadFrom: function (data) {
                        TransformerUtils.copyKeysFromTo(data, this.model);

                        return this;
                    },

                    /**
                     * Set email as confirmed
                     */
                    setEmailConfirmedAndReload: function () {
                        this.loadFrom({ emailConfirmed: true });
                        this.saveToSession();
                    },

                    /**
                     * Update subscription status
                     */
                    setSubscriptionStatusAsAndReload: function (status) {
                        this.loadFrom({ userSubscriptionStatus: status });
                        this.saveToSession();
                    },

                    /**
                     * Saves a user to local storage.
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        TransformerUtils.copyKeysFromTo(this.model, sessionData, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    save: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @returns {*}
                     */
                    create: function (fromData) {
                        var toBeCreated = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

                        return this.createAccount(toBeCreated);
                    },

                    /**
                     * Retrieves details about the current account.
                     * @returns {*}
                     */
                    retrieveDetails: function () {
                        return $http.get(URLTo.api(AUTH_URLS.details));
                    },

                    /**
                     * Creates the account.
                     * @param account
                     * @returns {*}
                     */
                    createAccount: function (account) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.create), account, { skipAuthorization: true })
                            .then(function (response) {
                                return response.data;
                            });
                    },

                    /**
                     * Updates given account.
                     * @param account
                     * @returns {*}
                     */
                    updateAccount: function (account) {
                        return $http
                            .put(URLTo.api(AUTH_URLS.update), account);
                    },

                    /**
                     * Update account user currency
                     */
                    updateCurrency: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return $http
                            .put(URLTo.api(AUTH_URLS.updateCurrency), toBeSaved);
                    }

                };
            }

        };
    }]);;/**
 * Main settings module declaration including ui templates.
 */
angular
    .module("revaluate.settings", [
        "revaluate.account"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // ---
            // Abstract state - settings.
            // ---
            .state({
                name: "settings",
                url: "/account/settings",
                templateUrl: "app/settings/partials/settings.abstract.html",
                abstract: true
            })

            // ---
            // Profile page.
            // ---
            .state({
                name: "settings.profile",
                url: "/profile",
                templateUrl: "app/settings/partials/settings.profile.html",
                controller: "SettingsProfileController",
                title: "Profile - Revaluate"
            })

            // ---
            // Payment pages.
            // ---

            .state({
                name: "settings.payment",
                url: "/payment",
                templateUrl: "app/settings/partials/settings.payment.abstract.html",
                abstract: true
            })

            .state({
                name: "settings.payment.add",
                url: "/add",
                templateUrl: "app/settings/partials/settings.payment.add.html",
                controller: "SettingsPaymentMethodAddController",
                isPaymentRelatedPage: true,
                resolve: {
                    clientToken: ["$http", "AUTH_URLS", function ($http, AUTH_URLS) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.fetchPaymentToken))
                            .then(function (response) {
                                return response.data.clientToken;
                            });
                    }],
                    paymentStatus: ["$http", "AUTH_URLS", "$state", function ($http, AUTH_URLS, $state) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.isPaymentStatusDefined))
                            .then(function (response) {
                                if ( response.data.paymentStatusDefined ) {

                                    $state.go("settings.payment.insights");
                                }
                                return response.data.paymentStatusDefined;
                            });
                    }]

                },
                title: "Payment method - Revaluate"
            })

            .state({
                name: "settings.payment.method",
                url: "/method",
                templateUrl: "app/settings/partials/settings.payment.method.html",
                controller: "SettingsPaymentMethodController",
                isPaymentRelatedPage: true,
                resolve: {
                    clientToken: ["$http", "AUTH_URLS", function ($http, AUTH_URLS) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.fetchPaymentToken))
                            .then(function (response) {
                                return response.data.clientToken;
                            });
                    }],
                    paymentInsights: ["$http", "$state", "AUTH_URLS", function ($http, $state, AUTH_URLS) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function () {

                                $state.go("settings.payment.add");
                            });
                    }]
                },
                title: "Payment edit payment method - Revaluate"
            })

            .state({
                name: "settings.payment.customer",
                url: "/customer",
                templateUrl: "app/settings/partials/settings.payment.customer.html",
                controller: "SettingsPaymentCustomerController",
                isPaymentRelatedPage: true,
                resolve: {
                    paymentInsights: ["$http", "$state", "AUTH_URLS", function ($http, $state, AUTH_URLS) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function () {

                                $state.go("settings.payment.add");
                            });
                    }]
                },
                title: "Payment edit customer - Revaluate"
            })

            .state("settings.payment.insights", {
                url: "/insights",
                templateUrl: "app/settings/partials/settings.payment.insights.html",
                controller: "SettingsPaymentInsightsController",
                isPaymentRelatedPage: true,
                resolve: {
                    paymentInsights: ["$http", "$state", "AUTH_URLS", function ($http, $state, AUTH_URLS) {
                        return $http
                            .get(URLTo.api(AUTH_URLS.fetchPaymentInsights))
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function () {

                                $state.go("settings.payment.add");
                            });
                    }]
                },
                title: "Payment insights - Revaluate"
            })

            // ---
            // Admin page.
            // ---
            .state("settings.admin", {
                url: "/admin",
                views: {
                    '': {
                        templateUrl: "app/settings/partials/settings.admin.abstract.html"
                    },
                    'updatePassword@settings.admin': {
                        templateUrl: "app/settings/partials/settings.admin.updatePassword.html",
                        controller: "SettingsUpdatePasswordController"
                    },
                    'cancelAccount@settings.admin': {
                        templateUrl: "app/settings/partials/settings.admin.cancelAccount.html",
                        controller: "SettingsCancelAccountController"
                    }
                },
                title: "Admin - Revaluate"
            })

            // ---
            // Preferences.
            // ---
            .state("settings.preferences", {
                url: "/preferences",
                views: {
                    '': {
                        templateUrl: "app/settings/partials/settings.preferences.abstract.html"
                    },
                    'updateCurrency@settings.preferences': {
                        templateUrl: "app/settings/partials/settings.preferences.updateCurrency.html",
                        controller: "SettingsPreferencesCurrencyController",
                        resolve: {
                            currencies: ["CurrencyService", function (CurrencyService) {
                                return CurrencyService.getAllCurrencies();
                            }]
                        }

                    }
                },
                title: "Preferences - Revaluate"
            })
    }]);;angular
    .module("revaluate.settings")
    .controller("SettingsCancelAccountController", ["$q", "$scope", "$rootScope", "$timeout", "StatesHandler", "AuthService", "flash", "ALERTS_CONSTANTS", function ($q, $scope, $rootScope, $timeout, StatesHandler, AuthService, flash, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 1000;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.cancelAccount;

        /**
         * Cancel account functionality.
         */
        $scope.cancelAccount = function () {

            if ( !$scope.isDeleting ) {

                $scope.isDeleting = true;

                AuthService
                    .cancelAccount()
                    .then(function () {
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully deleted your account!';

                        $timeout(function () {
                            $scope.isDeleting = false;

                            // ---
                            // We need to set the data and refresh the user.
                            // ---
                            AuthService
                                .logout();
                            StatesHandler
                                .goHome();
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isDeleting = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to remove your account.';
                    });
            }
        };
    }]);;angular
    .module("revaluate.settings")
    .value('clientTokenPath', URLTo.api("payment/fetchToken"));;angular
    .module("revaluate.settings")
    .controller("SettingsPaymentCustomerController", ["$q", "$scope", "$rootScope", "$timeout", "$http", "AUTH_URLS", "paymentInsights", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, paymentInsights, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPaymentCustomer);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Payment status.
        // ---
        $scope.paymentInsights = paymentInsights;

        /**
         * Initial Payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                firstName: $scope.paymentInsights.paymentCustomerDTO.firstName,
                lastName: $scope.paymentInsights.paymentCustomerDTO.lastName,
                email: $scope.paymentInsights.paymentCustomerDTO.email
            }
        }

        /**
         * Payment details data.
         */
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // UPDATE CUSTOMER RELATED
        // ---
        $scope.updateCustomer = function () {
            if ( $scope.updateCustomerForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                var paymentDetailsData = angular.copy($scope.paymentDetailsData);

                return $http
                    .put(URLTo.api(AUTH_URLS.updateCustomer), paymentDetailsData)
                    .then(function (response) {
                        $scope.paymentInsights = response.data;

                        // ---
                        // Reset the payment data with empty new data.
                        // ---
                        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

                        $scope.updateCustomerForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your customer information!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        // ---
                        // Show errors.
                        // ---
                        var errors = response.data;
                        if ( _.isArray(errors) ) {
                            flash.to($scope.alertIdentifierId).error = errors.join("\n");
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your customer information.';
                        }
                    });
            }
        };

    }]);;angular
    .module("revaluate.settings")
    .controller("SettingsPaymentInsightsController", ["$q", "$scope", "$rootScope", "$timeout", "$http", "paymentInsights", "flash", "AUTH_URLS", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", "AUTH_EVENTS", "USER_SUBSCRIPTION_STATUS", function ($q, $scope, $rootScope, $timeout, $http, paymentInsights, flash, AUTH_URLS, ALERTS_CONSTANTS, MIXPANEL_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPayment);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Payment insights got from server.
        // ---
        $scope.paymentInsights = paymentInsights;

        // ---
        // On submit, perform payment subscription.
        // ---
        $scope.performPaymentSubscription = function () {
            if ( !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                return $http
                    .post(URLTo.api(AUTH_URLS.subscribeToStandardPlan), {})
                    .then(function (response) {
                        $scope.paymentInsights = response.data;

                        // ---
                        // Update user with subscription status ACTIVE.
                        // ---
                        $scope
                            .user
                            .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                        $rootScope
                            .$broadcast(AUTH_EVENTS.refreshUser, {});

                        // ---
                        // Clean previously errors.
                        // ---
                        flash.to(ALERTS_CONSTANTS.generalError).error = '';
                        flash.to($scope.alertIdentifierId).success = 'You\'ve successfully subscribed to Revaluate!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        // ---
                        // Show errors.
                        // ---
                        var errors = response.data;
                        if ( _.isArray(errors) ) {
                            flash.to($scope.alertIdentifierId).error = errors.join("\n");
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to subscribe you to Revaluate.';
                        }
                    });

            }

        };

    }]);;angular
    .module("revaluate.settings")
    .controller("SettingsPaymentMethodAddController", ["$q", "$scope", "$state", "$rootScope", "$timeout", "$http", "AUTH_URLS", "$braintree", "clientToken", "paymentStatus", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", "AUTH_EVENTS", "USER_SUBSCRIPTION_STATUS", function ($q, $scope, $state, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentStatus, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS, AUTH_EVENTS, USER_SUBSCRIPTION_STATUS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPayment);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Braintree client token got from server.
        // ---
        $scope.clientToken = clientToken;

        // ---
        // Payment status.
        // ---
        $scope.paymentStatus = paymentStatus;

        // ---
        // Braintree client.
        // ---
        $scope.client = new $braintree.api.Client({
            clientToken: clientToken
        });

        /**
         * Initial payment data
         */
        function getInitialPaymentData() {
            return {
                cardNumber: '',
                cardExpirationDate: ''
            }
        }

        /**
         * Profile user information.
         */
        $scope.paymentData = angular.copy(getInitialPaymentData());

        /**
         * Initial payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                paymentCustomerDetailsDTO: {
                    firstName: $scope.user.model.firstName,
                    lastName: $scope.user.model.lastName,
                    email: $scope.user.model.email
                },
                paymentNonceDetailsDTO: {
                    paymentMethodNonce: ''
                }
            }
        }

        /**
         * Payment details data.
         */
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // On submit, add payment method.
        // ---
        $scope.addPaymentMethod = function () {
            if ( $scope.addPaymentMethodForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // - Validate $scope.paymentData
                // - Make sure client is ready to use
                $scope
                    .client
                    .tokenizeCard({
                        number: $scope.paymentData.cardNumber,
                        expirationDate: $scope.paymentData.cardExpirationDate
                    }, function (err, nonce) {

                        if ( err ) {
                            flash.to($scope.alertIdentifierId).error = err;
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = '';

                            // ---
                            // Update details with the received nonce.
                            // ---
                            var paymentDetailsData = angular.copy($scope.paymentDetailsData);
                            paymentDetailsData.paymentNonceDetailsDTO.paymentMethodNonce = nonce;

                            return $http
                                .post(URLTo.api(AUTH_URLS.createCustomerWithPaymentMethodSubscribeToStandardPlan), paymentDetailsData)
                                .then(function (response) {
                                    // ---
                                    // Update user with subscription status ACTIVE if subscription is also successful.
                                    // ---
                                    var paymentInsights = response.data;
                                    if ( paymentInsights.subscriptionActive ) {
                                        $scope
                                            .user
                                            .setSubscriptionStatusAsAndReload(USER_SUBSCRIPTION_STATUS.ACTIVE);
                                        $rootScope
                                            .$broadcast(AUTH_EVENTS.refreshUser, {});
                                    }

                                    // ---
                                    // Clean previously errors.
                                    // ---
                                    flash.to(ALERTS_CONSTANTS.generalError).error = '';

                                    // ---
                                    // Reset the payment data with empty new data.
                                    // ---
                                    $scope.paymentData = angular.copy(getInitialPaymentData());

                                    $scope.addPaymentMethodForm.$setPristine();
                                    flash.to($scope.alertIdentifierId).success = 'We\'ve successfully saved your payment method!';

                                    $timeout(function () {
                                        $scope.isRequestPending = false;

                                        // ---
                                        // If successful, go to insights.
                                        // ---
                                        $state.go("settings.payment.insights");
                                    }, TIMEOUT_PENDING);
                                })
                                .catch(function (response) {
                                    /* If bad feedback from server */
                                    $scope.badPostSubmitResponse = true;
                                    $scope.isRequestPending = false;

                                    // ---
                                    // Show errors.
                                    // ---
                                    var errors = response.data;
                                    if ( _.isArray(errors) ) {
                                        flash.to($scope.alertIdentifierId).error = errors.join("\n");
                                    }
                                    else {
                                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to save your payment method.';
                                    }
                                });
                        }
                    });
            }

        };

    }]);;angular
    .module("revaluate.settings")
    .controller("SettingsPaymentMethodController", ["$q", "$scope", "$rootScope", "$timeout", "$http", "AUTH_URLS", "$braintree", "clientToken", "paymentInsights", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, $timeout, $http, AUTH_URLS, $braintree, clientToken, paymentInsights, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.paymentProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPayment);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Braintree client token got from server.
        // ---
        $scope.clientToken = clientToken;

        // ---
        // Payment status.
        // ---
        $scope.paymentInsights = paymentInsights;

        // ---
        // Braintree client.
        // ---
        $scope.client = new $braintree.api.Client({
            clientToken: clientToken
        });

        /**
         * Initial payment data
         */
        function getInitialPaymentData() {
            return {
                cardNumber: '',
                cardExpirationDate: ''
            }
        }

        /**
         * Profile user information.
         */
        $scope.paymentData = angular.copy(getInitialPaymentData());

        /**
         * Initial Payment details data
         */
        function getInitialPaymentDetailsData() {
            return {
                paymentMethodNonce: ''
            }
        }

        /**
         * Payment details data.
         */
        $scope.paymentDetailsData = angular.copy(getInitialPaymentDetailsData());

        // ---
        // UPDATE PAYMENT METHOD RELATED
        // ---
        $scope.updatePaymentMethod = function () {
            if ( $scope.updatePaymentMethodForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // - Validate $scope.paymentData
                // - Make sure client is ready to use
                $scope
                    .client
                    .tokenizeCard({
                        number: $scope.paymentData.cardNumber,
                        expirationDate: $scope.paymentData.cardExpirationDate
                    }, function (err, nonce) {

                        if ( err ) {
                            flash.to($scope.alertIdentifierId).error = err;
                        }
                        else {
                            flash.to($scope.alertIdentifierId).error = '';

                            // ---
                            // Update details with the received nonce.
                            // ---
                            var paymentDetailsData = angular.copy($scope.paymentDetailsData);
                            paymentDetailsData.paymentMethodNonce = nonce;

                            return $http
                                .put(URLTo.api(AUTH_URLS.updatePaymentMethod), paymentDetailsData)
                                .then(function () {

                                    // ---
                                    // Reset the payment data with empty new data.
                                    // ---
                                    $scope.paymentData = angular.copy(getInitialPaymentData());

                                    $scope.updatePaymentMethodForm.$setPristine();
                                    flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your payment method!';

                                    $timeout(function () {
                                        $scope.isRequestPending = false;
                                    }, TIMEOUT_PENDING);
                                })
                                .catch(function (response) {
                                    /* If bad feedback from server */
                                    $scope.badPostSubmitResponse = true;
                                    $scope.isRequestPending = false;

                                    // ---
                                    // Show errors.
                                    // ---
                                    var errors = response.data;
                                    if ( _.isArray(errors) ) {
                                        flash.to($scope.alertIdentifierId).error = errors.join("\n");
                                    }
                                    else {
                                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your payment method.';
                                    }
                                });
                        }
                    });
            }

        };

    }]);;/**
 * Preferences controller responsible for user update preferences action.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsPreferencesCurrencyController", ["$q", "$scope", "$rootScope", "$timeout", "StatesHandler", "SessionService", "AUTH_EVENTS", "flash", "currencies", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, flash, currencies, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Saving timeout
         */
        var TIMEOUT_PENDING = 300;

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        $scope.currencies = currencies;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.preferences;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsPreferences);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Selected currency
         * @type {{}}
         */
        /**
         * Selected category
         * @type {{}}
         */
        $scope.currency = {};
        $scope.currency.selected = _.find($scope.currencies, function (currencyCandidate) {
            return currencyCandidate.currencyCode === $scope.user.model.currency.currencyCode;
        });

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                currency: $scope.currency.selected
            };
        }

        /**
         * Profile user information.
         */
        $scope.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        $scope.updatePreferences = function () {
            if ( $scope.preferencesForm.$valid && !$scope.isSaving ) {

                // Show the loading bar
                $scope.isSaving = true;

                $scope.profileData.currency = angular.copy($scope.currency.selected || $scope.currency);

                // Update the user
                $scope.user
                    .updateCurrency($scope.profileData)
                    .then(function (response) {
                        // ---
                        // Reload data with given response.
                        // ---
                        $scope.user
                            .loadFrom(response.data);

                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Reset the profile data with possible new data.
                        // ---
                        $scope.profileData = angular.copy(getInitialProfileData());

                        $scope.preferencesForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';

                        $timeout(function () {
                            $scope.isSaving = false;
                        }, TIMEOUT_PENDING);

                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isSaving = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
                    });
            }
        };

    }]);;/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsProfileController", ["$q", "$scope", "$rootScope", "$timeout", "StatesHandler", "SessionService", "AUTH_EVENTS", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, $timeout, StatesHandler, SessionService, AUTH_EVENTS, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsProfile);

        /**
         * Current user.
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Initial profile data
         */
        function getInitialProfileData() {
            return {
                firstName: $scope.user.model.firstName,
                lastName: $scope.user.model.lastName,
                initiated: $scope.user.model.initiated,
                currency: $scope.user.model.currency
            };
        }

        /**
         * Profile user information.
         */
        $scope.profileData = angular.copy(getInitialProfileData());

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid && !$scope.isRequestPending ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                // Update the user
                $scope.user
                    .save(profileData)
                    .then(function (response) {
                        // ---
                        // Reload data with given response.
                        // ---
                        $scope.user
                            .loadFrom(response.data);

                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Reset the profile data with possible new data.
                        // ---
                        $scope.profileData = angular.copy(getInitialProfileData());

                        $scope.profileForm.$setPristine();
                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';

                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, TIMEOUT_PENDING);
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isRequestPending = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

    }]);;/**
 * Update password controller.
 */
angular
    .module("revaluate.settings")
    .controller("SettingsUpdatePasswordController", ["$scope", "flash", "$timeout", "AuthService", "ACCOUNT_FORM_STATE", "ALERTS_CONSTANTS", function ($scope, flash, $timeout, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS) {

        var TIMEOUT_PENDING = 300;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

        /**
         * Initial update password data.
         */
        var initialUpdatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        $scope.updatePasswordData = angular.copy(initialUpdatePasswordData);

        /**
         * Update password data functionality.
         * @param updatePasswordData
         */
        $scope.updatePassword = function (updatePasswordData) {
            if ( !( $scope.updatePasswordForm.$valid && !$scope.isRequestPending ) ) {
                return;
            }

            if ( updatePasswordData.newPassword !== updatePasswordData.newPasswordConfirmation ) {
                flash.to($scope.alertIdentifierId).error = 'Your new password should match the new confirmation password!';

                return;
            }

            $scope.isRequestPending = true;

            AuthService
                .updatePassword(updatePasswordData.oldPassword, updatePasswordData.newPassword, updatePasswordData.newPasswordConfirmation)
                .then(function () {
                    flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';

                    $timeout(function () {
                        $scope.isRequestPending = false;
                    }, TIMEOUT_PENDING);
                })
                .catch(function () {
                    /* If bad feedback from server */
                    $scope.badPostSubmitResponse = true;
                    $scope.isRequestPending = false;

                    flash.to($scope.alertIdentifierId).error = 'We\'re not able to update your account. Please try again.';
                })
                .finally(function () {
                    $scope.updatePasswordForm.$setPristine();
                    $scope.updatePasswordData = angular.copy(initialUpdatePasswordData);
                });
        };
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("revaluate.site", [
        "revaluate.common"
    ])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        // Otherwise
        $urlRouterProvider.otherwise('/404');

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "LandingPageController",
                title: "Change the way you spend your money",
                isPublicPage: true
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "app/site/partials/privacy.html",
                title: "Privacy - Revaluate",
                isPublicPage: true
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/site/partials/about.html",
                title: "About - Revaluate",
                isPublicPage: true
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageController",
                title: "Hmm... looks like a 404",
                isPublicPage: true
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageController",
                title: "Oops... You found a 500",
                isPublicPage: true
            });
    }]);
;/**
 * Abstract error page controller.
 */
angular
    .module("revaluate.common")
    .controller("AbstractErrorPageController", ["$scope", "StatesHandler", function ($scope, StatesHandler) {

        /**
         * Track event.
         */
        $scope.trackErrorEvent = function (event) {
            mixpanel.track(event);
        };

        /**
         * Continues to home page.
         */
        $scope.goToHomePage = function () {
            StatesHandler.goHome();
        };
    }]);
;/**
 * 404 page controller.
 */
angular
    .module("revaluate.common")
    .controller("Error404PageController", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageController', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error404);
    }]);
;/**
 * 500 page controller.
 */
angular
    .module("revaluate.common")
    .controller("Error500PageController", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageController', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error500);
    }]);;/**
 * Landing page controller.
 */
angular
    .module("revaluate.common")
    .controller("LandingPageController", ["$state", "$scope", "ACCOUNT_FORM_STATE", "MIXPANEL_EVENTS", function ($state, $scope, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);
    }]);
;angular
    .module("revaluate.currencies", [
        "revaluate.common"
    ]);;/**
 * Currencies constants.
 */
angular
    .module("revaluate.currencies")
    .constant("CURRENCY_URLS", {
        allCurrencies: "currency/list"
    });;/**
 * Currencies service which encapsulates the whole logic related to currencies.
 */
angular
    .module("revaluate.currencies")
    .service("CurrencyService", ["CURRENCY_URLS", "$q", "$http", function (CURRENCY_URLS, $q, $http) {

        /**
         * Get all currencies
         * @returns {*}
         */
        this.getAllCurrencies = function () {
            return $http
                .get(URLTo.api(CURRENCY_URLS.allCurrencies))
                .then(function (response) {

                    return response.data
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    }]);;angular
    .module("revaluate.color", [
        "revaluate.common"
    ]);;/**
 * Colors constants.
 */
angular
    .module("revaluate.color")
    .constant("COLOR_URLS", {
        allColors: "color/list"
    });;/**
 * Color service which encapsulates the whole logic related to color.
 */
angular
    .module("revaluate.color")
    .service("ColorService", ["COLOR_URLS", "$q", "$http", "CacheFactory", function (COLOR_URLS, $q, $http, CacheFactory) {

        if ( !CacheFactory.get('colorCache') ) {
            CacheFactory.createCache('colorCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var colorCache = CacheFactory.get('colorCache');

        /**
         * Get all colors
         * @returns {*}
         */
        this.getAllColors = function () {
            return $http
                .get(URLTo.api(COLOR_URLS.allColors), { cache: colorCache })
                .then(function (response) {

                    return response.data
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    }]);;angular
    .module("revaluate.categories", [
        "revaluate.color",
        "revaluate.common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // ---
            // Categories page.
            // ---
            .state({
                name: "settings.categories",
                url: "/categories",
                templateUrl: "app/categories/partials/categories.html",
                controller: "CategoryListController",
                resolve: {
                    categories: ["CategoryService", function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }],
                    colors: ["ColorService", function (ColorService) {
                        return ColorService.getAllColors();
                    }]
                },
                title: "Categories - Revaluate"
            });

    }]);;/**
 * Categories constants.
 */
angular
    .module("revaluate.categories")
    .constant("CATEGORY_URLS", {
        isUnique: "categories/isUniqueCategory",
        create: "categories",
        update: "categories",
        delete: "categories/:id",
        bulkDelete: "categories/bulkDelete",
        bulkCreate: "categories/bulkCreate",
        allCategories: "categories/retrieve"
    })
    .constant("CATEGORY_EVENTS", {
        isErrorOccurred: "category-error-occurred",
        isCreated: "category-is-created",
        isDeleted: "category-is-deleted",
        isUpdated: "category-is-updated"
    });;angular
    .module("revaluate.categories")
    .controller("CategoryCreateController", ["$scope", "$rootScope", "CategoryColorService", "Category", "$timeout", "CATEGORY_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, CategoryColorService, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Saving timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (categoryForm) {
            $scope.category = Category.build({ color: CategoryColorService.randomizedColor($scope.colors) });

            if ( categoryForm ) {
                categoryForm.$setPristine();
            }

            $scope.badPostSubmitResponse = false;
        };

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Saves the category or updates it.
         */
        $scope.saveCategory = function (categoryForm) {
            if ( categoryForm.$valid && !$scope.isSaving ) {

                // Is saving category
                $scope.isSaving = true;

                $scope.category
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        $timeout(function () {
                            $scope.isSaving = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, {
                                category: $scope.category
                            });

                            /**
                             * Finally, reset the form.
                             */
                            $scope.initOrReset(categoryForm);
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        $scope.badPostSubmitResponse = true;

                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

    }]);
;angular
    .module("revaluate.categories")
    .controller("CategoryEditRemoveController", ["$scope", "$rootScope", "Category", "$timeout", "CATEGORY_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Update the category.
         */
        $scope.updateCategory = function (categoryForm, category) {
            if ( categoryForm.$valid && !$scope.isUpdating ) {

                // Is saving category
                $scope.isUpdating = true;

                category
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, {
                                category: category
                            });

                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

        /**
         * Remove category;
         */
        $scope.deleteCategory = function (category) {
            if ( !$scope.isDeleting ) {

                // Is deleting category
                $scope.isDeleting = true;

                // Destroy category
                category
                    .destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryDeleted);

                        $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, {
                            category: category
                        });
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

    }]);
;/**
 * Categories controller.
 */
angular
    .module("revaluate.categories")
    .controller("CategoryListController", ["$scope", "$rootScope", "Category", "flash", "CATEGORY_EVENTS", "$timeout", "categories", "colors", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, Category, flash, CATEGORY_EVENTS, $timeout, categories, colors, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {
        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.categoriesPage);

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Existing colors
         * @type {colors|*}
         */
        $scope.colors = colors;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        $scope.$on(CATEGORY_EVENTS.isErrorOccurred, function () {

            flash.to($scope.alertIdentifierId).error = "This category could not be deleted.";
        });

        /**
         * On category created, display a success message, and add category to the list.
         */
        $scope.$on(CATEGORY_EVENTS.isCreated, function (event, args) {
            $scope.categories.push(args.category);

            flash.to($scope.alertIdentifierId).success = "Category successfully saved!";
        });

        /**
         * On category updated.
         */
        $scope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
            var result = _.some($scope.categories, function (topic) {
                return topic.model.id === args.category.model.id;
            });

            if ( result ) {
                removeCategoryFrom($scope.categories, args.category);
                $scope.categories.push(args.category);
            }

            flash.to($scope.alertIdentifierId).success = "Category successfully updated!";
        });

        /**
         * On category deleted, display a success message, and remove the category from the list.
         */
        $scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
            removeCategoryFrom($scope.categories, args.category);

            flash.to($scope.alertIdentifierId).success = "Category successfully deleted!";
        });

        /**
         * Removes given category from the list.
         * @param categoryList
         * @param categoryToBeRemoved
         */
        function removeCategoryFrom(categoryList, categoryToBeRemoved) {
            return _.remove(categoryList, function (categoryFromArray) {
                var categoryId = _.parseInt(categoryToBeRemoved.model.id, 10);
                var categoryFromArrayId = _.parseInt(categoryFromArray.model.id, 10);
                if ( _.isNaN(categoryFromArrayId) || _.isNaN(categoryId) ) {
                    return false;
                }

                return categoryFromArrayId === categoryId;
            });
        }
    }]);;angular
    .module("revaluate.categories")
    .directive("addCategory", ["$rootScope", "CATEGORY_EVENTS", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryCreateController',
            templateUrl: "app/categories/partials/add-category-directive-template.html",
            link: function (scope, el, attrs) {

                /**
                 * Show block content flag.
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * On category created - hide everything.
                 */
                $rootScope.$on(CATEGORY_EVENTS.isCreated, function () {
                    scope.toggleContent();
                });
            }
        }
    }]);
;angular
    .module("revaluate.categories")
    .directive("colorPicker", ["CATEGORY_EVENTS", "CategoryColorService", "$timeout", "$animate", function (CATEGORY_EVENTS, CategoryColorService, $timeout, $animate) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                categoryColor: "=",
                colors: "="
            },
            templateUrl: "app/categories/partials/color-picker-directive-template.html",
            link: function (scope, elm, attrs) {

                // By default the popover is closed
                scope.isOpen = false;

                // Close the popover
                scope.close = function () {
                    scope.isOpen = false;
                };

                // ---
                // Label element clicks toggles the picker.
                // ---
                var label = elm.prev().prev('label');

                label.on("click", function () {
                    scope.$apply(function () {
                        scope.isOpen = !scope.isOpen;
                    });
                });

                var CLASS_OPEN = "color-picker-box--open";

                // Open or close the modal
                scope.$watch("isOpen", function (isOpen, isOpenOld) {
                    if ( isOpen === true ) {
                        $animate.addClass(elm, CLASS_OPEN);
                    }
                    else if ( isOpen === false && isOpenOld === true ) {
                        $animate.removeClass(elm, CLASS_OPEN);
                    }
                });

                // ---
                // Select the color.
                // ---
                scope.select = function (chosenColor) {
                    scope.categoryColor = angular.copy(chosenColor);

                    scope.close();
                };
            }
        };
    }]);;angular
    .module("revaluate.categories")
    .directive("editRemoveCategory", ["$rootScope", "CATEGORY_EVENTS", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryEditRemoveController',
            scope: {
                category: "=",
                colors: "="
            },
            templateUrl: "app/categories/partials/edit-remove-category-directive-template.html",
            link: function (scope, el, attrs) {

                /**
                 * Keep the master backup
                 */
                scope.masterCategory = angular.copy(scope.category);

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * Toggle and discard changes.
                 */
                scope.cancel = function () {
                    scope.toggleContent();

                    scope.category = angular.copy(scope.masterCategory);
                };

                /**
                 * On category updated/deleted - hide everything.
                 */
                $rootScope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
                    if ( scope.category.model.id === args.category.model.id ) {
                        scope.toggleContent();

                        // ---
                        // Update the master category.
                        // ---
                        scope.masterCategory = angular.copy(scope.category);
                    }
                });
                scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
                    if ( scope.category.model.id === args.category.model.id ) {
                        scope.toggleContent();
                    }
                });
            }
        }
    }]);
;angular
    .module("revaluate.categories")
    .directive("uniqueCategoryName", ["$q", "CategoryService", function ($q, CategoryService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "=",
                except: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidCategoryName(categoryName) {
                    return /^([A-Za-z\d\s]){2,20}$/.test(categoryName);
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidCategoryName(value) && ngModel.$viewValue !== scope.except ) {

                        // Set validity
                        CategoryService
                            .isUnique(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.name === ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueCategoryName', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    }]);;/**
 * Directive responsible for checking of a category color is valid hex value.
 */
angular
    .module("revaluate.categories")
    .directive("validCategoryColor", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                function isValidCategoryColor(color) {
                    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
                }

                ngModel.$validators.validCategoryColor = function (color) {
                    return isValidCategoryColor(color);
                };
            }
        };
    });
;/**
 * Directive responsible for checking of a category name is valid.
 */
angular
    .module("revaluate.categories")
    .directive("validCategoryName", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                function isValidCategoryName(categoryName) {
                    return /^([A-Za-z\d\s!@#\$%\^&*\)\(+=._-]){2,30}$/.test(categoryName);
                }

                ngModel.$validators.validCategoryName = function (categoryName) {
                    return isValidCategoryName(categoryName);
                };
            }
        };
    });
;angular
    .module("revaluate.categories")
    .service("CategoriesSetupProvider", function () {

        this.getPredefinedCategories = function () {

            return ["Bills", "Food", "Clothes", "Car", "Donations", "Hobby", "Health", "Education", "Investments", "House"];
        };

    });
;angular
    .module("revaluate.categories")
    .service('CategoryColorService', function () {

        return {
            randomizedColor: function (colors) {

                return colors[Math.floor(Math.random() * colors.length)];
            }
        }
    });;/**
 * Categories service which encapsulates the whole logic related to categories.
 */
angular
    .module("revaluate.categories")
    .service("CategoryService", ["CATEGORY_URLS", "$q", "$http", "CategoryTransformerService", function (CATEGORY_URLS, $q, $http, CategoryTransformerService) {

        /**
         * Update a category.
         * @param category
         * @returns {*}
         */
        this.createCategory = function (category) {
            return $http
                .post(URLTo.api(CATEGORY_URLS.create), CategoryTransformerService.toCategoryDto(category))
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response;
                });
        };

        /**
         * Update a category.
         * @param category
         * @returns {*}
         */
        this.updateCategory = function (category) {
            var categoryDto = CategoryTransformerService.toCategoryDto(category);

            return $http
                .put(URLTo.api(CATEGORY_URLS.update), categoryDto)
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response;
                });
        };

        /**
         * Delete a category.
         * @param category
         * @returns {*}
         */
        this.deleteCategory = function (category) {
            var categoryDto = CategoryTransformerService.toCategoryDto(category);

            return $http
                .delete(URLTo.api(CATEGORY_URLS.delete, { ":id": categoryDto.id }), categoryDto)
                .then(function (response) {
                    CategoryTransformerService.toCategory(response.data, category);

                    return response.data;
                });
        };

        /**
         * Get all categories of current user
         * @returns {*}
         */
        this.getAllCategories = function () {
            return $http
                .get(URLTo.api(CATEGORY_URLS.allCategories))
                .then(function (response) {

                    return CategoryTransformerService.toCategories(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Bulk create action of a list of categories.
         * @returns {*}
         */
        this.bulkCreate = function (categories) {
            return $http
                .post(URLTo.api(CATEGORY_URLS.bulkCreate), CategoryTransformerService.toCategoryDTOs(categories))
                .then(function (response) {

                    return CategoryTransformerService.toCategories(response.data);
                });
        };

        /**
         * Bulk delete action of a list of categories.
         * @returns {*}
         */
        this.bulkDelete = function (categories) {
            return $http
                .put(URLTo.api(CATEGORY_URLS.bulkDelete), CategoryTransformerService.toCategoryDTOs(categories))
                .then(function (response) {

                    return response.data;
                });
        };

        /**
         * Check if a category name is unique.
         *
         * @param name
         * @returns {*}
         */
        this.isUnique = function (name) {
            var deferred = $q.defer();

            $http
                .get(URLTo.api(CATEGORY_URLS.isUnique), { params: { name: name } })
                .then(_.bind(function () {
                    deferred.resolve({
                        isUnique: true,
                        name: name
                    });
                }, this))
                .catch(function () {
                    deferred.resolve({
                        isUnique: false,
                        name: name
                    });
                });

            return deferred.promise;
        };
    }]);;/**
 * Category transformer service which transforms a category DTO model object to a category business object.
 */
angular
    .module("revaluate.categories")
    .service("CategoryTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a category business object model to a categoryDto object.
         */
        this.toCategoryDto = function (category, skipKeys) {
            var categoryDto = {};

            TransformerUtils.copyKeysFromTo(category.model, categoryDto, skipKeys);

            return categoryDto;
        };

        /**
         * Converts a categoryDto object to a category business object model.
         */
        this.toCategory = function (categoryDto, category, skipKeys) {
            category = category || $injector.get('Category').build();

            TransformerUtils.copyKeysFromTo(categoryDto, category.model, skipKeys);

            // ---
            // Should be always upper case (one way).
            // ---
            category.model.name = category.model.name.toUpperCase();

            return category;
        };

        /**
         * Transform a list of categories as JSON to a list of categories as business object.
         */
        this.toCategories = function (categoryDtos) {
            var categories = [];

            _.each(categoryDtos, _.bind(function (categoryDto) {
                categories.push(this.toCategory(categoryDto));
            }, this));

            return categories;
        };

        /**
         * Transform a list of categories as business objects to a list of DTOs.
         */
        this.toCategoryDTOs = function (categories) {
            var categoryDTOs = [];

            _.each(categories, _.bind(function (category) {
                categoryDTOs.push(this.toCategoryDto(category));
            }, this));

            return categoryDTOs;
        };
    }]);
;angular
    .module("revaluate.categories")
    .factory("Category", ["$q", "$http", "CategoryService", "CategoryTransformerService", function ($q, $http, CategoryService, CategoryTransformerService) {

        /**
         * Category class.
         * @constructor
         */
        function Category() {

            /**
             * Represents the DTO model of the category.
             */
            this.model = {

                /**
                 * The category id.
                 */
                id: "",

                /**
                 * The category text.
                 */
                name: "",

                /**
                 * The color
                 */
                color: {

                    color: "",

                    id: 0,

                    priority: 0
                }
            };

            /**
             * Is category new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.id === "" || _.isUndefined(this.model.id);
            };

            /**
             * Saves a category and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return CategoryService.createCategory(this);
                }
                else {
                    return CategoryService.updateCategory(this);
                }
            };

            /**
             * Destroys (deletes) a category.
             * @returns {*}
             */
            this.destroy = function () {
                return CategoryService.deleteCategory(this);
            };
        }

        /**
         * Builds a category with given data.
         * @param data
         * @returns {Category}
         */
        Category.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Category();
            }

            return CategoryTransformerService.toCategory(data, new Category());
        };

        return Category;
    }]);;angular
    .module("revaluate.expensesImport", [
        "revaluate.color",
        "revaluate.common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state({
                name: "settings.import",
                url: "/import",
                templateUrl: "app/import/partials/settings.import.abstract.html",
                abstract: true
            })

            .state({
                name: "settings.import.choose",
                url: "/choose",
                templateUrl: "app/import/partials/settings.import.choose.html",
                title: "Expenses import choose - Revaluate"
            })

            .state({
                name: "settings.import.import",
                url: "/{type}",
                templateUrl: "app/import/partials/settings.import.import.html",
                controller: "ExpensesImportController",
                resolve: {
                    categories: ["CategoryService", function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }],
                    importType: ["$q", "$stateParams", "IMPORT_TYPES", "$state", function ($q, $stateParams, IMPORT_TYPES, $state) {
                        var deferred = $q.defer();

                        if ( IMPORT_TYPES[$stateParams.type] ) {
                            deferred.resolve(IMPORT_TYPES[$stateParams.type])
                        }
                        else {
                            $state.go("404");
                        }

                        return deferred.promise;
                    }]
                },
                title: "Expenses import - Revaluate"
            })

    }]);;/**
 * ExpensesImport constants.
 */
angular
    .module("revaluate.expensesImport")
    .constant("IMPORT_PARSE_ANALYSE_URLS", {
        mint: "importer/mintParseAnalyseImport",
        spendee: "importer/spendeeParseAnalyseImport"
    })
    .constant("IMPORT_URLS", {
        mint: "importer/mintImport",
        spendee: "importer/spendeeImport"
    })
    .constant("IMPORT_EVENTS", {
        isErrorOccurred: "expensesImport-error-occurred",
        isCreated: "expensesImport-is-created",
        isDeleted: "expensesImport-is-deleted",
        isUpdated: "expensesImport-is-updated"
    })
    .constant("IMPORT_TYPES", {
        mint: "mint",
        spendee: "spendee"
    });;/**
 * Setting import controller.
 */
angular
    .module("revaluate.expensesImport")
    .controller("ExpensesImportController", ["$q", "$scope", "$rootScope", "$timeout", "IMPORT_PARSE_ANALYSE_URLS", "importType", "FileUploader", "ImportService", "ExpensesImport", "StatesHandler", "SessionService", "AUTH_EVENTS", "flash", "categories", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, $timeout, IMPORT_PARSE_ANALYSE_URLS, importType, FileUploader, ImportService, ExpensesImport, StatesHandler, SessionService, AUTH_EVENTS, flash, categories, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        // ---
        // Configure uploader.
        // ---
        var QUEUE_LIMIT = 1;
        var AUTO_UPLOAD = true;
        var IS_EMPTY_AFTER_SELECTION = true;

        // ---
        // Server status error.
        // ---
        var BAD_RESPONSE = 400;
        var SERVER_ERROR = 500;

        /**
         * All given categories.
         * @type {categories|*}
         */
        $scope.categories = categories;

        // ---
        // The import type.
        // ---
        $scope.importType = importType;

        // ---
        // The import description.
        // ---
        $scope.importDescription = capitalizeFirstLetter(importType);

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.import;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settingsImport);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        // ---
        // Flag which says if the upload is finished. Does not matter if successful/not.
        // ---
        $scope.isUploadFinished = false;

        // ---
        // Flag which says if the upload is successful.
        // ---
        $scope.isUploadSuccessful = false;

        // ---
        // This is the answer we get from server after analysing the import.
        // ---
        $scope.expensesImportAnswer = {};

        // ---
        // Define uploader.
        // ---
        var uploader = $scope.uploader = new FileUploader({
            url: URLTo.api(IMPORT_PARSE_ANALYSE_URLS[importType]),
            headers: {
                'Authorization': 'Bearer ' + SessionService.getJwtToken()
            },
            autoUpload: AUTO_UPLOAD,
            queueLimit: QUEUE_LIMIT
        });

        // ---
        // We want to have the input cleared after upload.
        // ---
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
            return IS_EMPTY_AFTER_SELECTION;
        };

        // ---
        // We only allow CSV files.
        // ---
        uploader.filters.push({
            name: 'csvFilter',
            fn: function (item, options) {
                return '|text/csv|application/vnd.ms-excel|text/plain|text/tsv|'.indexOf(item.type) !== -1;
            }
        });

        // ---
        // If file does not pass the filter, show an error message.
        // ---
        uploader.onWhenAddingFileFailed = function (item, filter, options) {

            flash.to($scope.alertIdentifierId).error = 'Hmm.. are you trying to upload anything but a CSV file?'
        };

        // ---
        // If successful, take the answer.
        // ---
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // ---
            // If there was a previously error, just clear it.
            // ---
            flash.to($scope.alertIdentifierId).error = '';

            // ---
            // Build the import answer, and toggle view.
            // ---
            $scope.expensesImportAnswer = ExpensesImport.build(response);
            $scope.isUploadSuccessful = true;
        };

        // ---
        // On error item.
        // ---
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            if ( status === BAD_RESPONSE ) {
                flash.to($scope.alertIdentifierId).error = 'Hmmm... Are you sure the CSV export is from selected app?';
            }
            else {
                if ( status === SERVER_ERROR ) {
                    flash.to($scope.alertIdentifierId).error = 'Something went wrong. Can you please try one more time?'
                }
            }

            // ---
            // Reset previously added file.
            // ---
            $scope.uploader.clearQueue();
        };

        // ---
        // Mark upload completed.
        // ---
        uploader.onCompleteItem = function (fileItem, response, status, headers) {

            $scope.isUploadFinished = true;
        };

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        /**
         * Show how to block content
         * @type {boolean}
         */
        $scope.showHowToContent = false;

        /**
         * Toggle how to content
         */
        $scope.toggleHowToContent = function () {
            $scope.showHowToContent = !$scope.showHowToContent;
        };

        /**
         * Minimum categories to select
         */
        var MIN_CATEGORIES_TO_SELECT = 1;

        function getSelectedMatchingCategories() {
            return _.filter($scope.expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        $scope.isEnoughSelectedMatchingCategories = function () {
            if ( !$scope.isUploadSuccessful ) {
                return false;
            }
            return getSelectedMatchingCategories().length >= MIN_CATEGORIES_TO_SELECT;
        };

        /**
         * Update profile functionality.
         */
        $scope.submitPerformImport = function (expensesImportForm) {
            if ( expensesImportForm.$valid && !$scope.isImporting ) {

                // Show the loading bar
                $scope.isImporting = true;

                // ---
                // Detach from scope.
                // ---
                var expensesImportPrepared = angular.copy($scope.expensesImportAnswer);

                // ---
                // We need to perform a transform of the selected categories.
                // ---
                _.each(expensesImportPrepared.model.expenseCategoryMatchingProfileDTOs, function (expenseCategoryMatchingProfileDTO) {
                    if ( expenseCategoryMatchingProfileDTO.selected ) {

                        expenseCategoryMatchingProfileDTO.categoryDTO = angular.copy(expenseCategoryMatchingProfileDTO.category.selected.model);
                    }
                    else {
                        // ---
                        // Really ugly, but we can't send back an invalid category..
                        // ---
                        expenseCategoryMatchingProfileDTO.categoryDTO = angular.copy(getSelectedMatchingCategories()[0].category.selected.model);
                    }
                });

                // ---
                // Perform import.
                // ---
                ImportService
                    .importExpenses(importType, expensesImportPrepared)
                    .then(function () {
                        expensesImportForm.$setPristine();

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully imported your expenses!';

                        // ---
                        // Import is finished.
                        // ---
                        $scope.isImporting = false;
                        $scope.importFinished = true;
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;
                        $scope.isImporting = false;

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to import your expenses.';
                    });
            }
        };

    }]);;/**
 * ExpensesImport service which encapsulates the whole logic related to expensesImport.
 */
angular
    .module("revaluate.expensesImport")
    .service("ImportService", ["IMPORT_URLS", "$http", "ImportTransformerService", function (IMPORT_URLS, $http, ImportTransformerService) {

        this.importExpenses = function (importType, expensesImport) {
            return $http
                .post(URLTo.api(IMPORT_URLS[importType]), ImportTransformerService.toImportDto(expensesImport))
                .then(function (response) {
                    ImportTransformerService.toImport(response.data, expensesImport);

                    return response;
                });
        }

    }]);;/**
 * ExpensesImport transformer service which transforms a expensesImport DTO model object to a expensesImport business object.
 */
angular
    .module("revaluate.expensesImport")
    .service("ImportTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a expensesImport business object model to a importDto object.
         */
        this.toImportDto = function (expensesImport, skipKeys) {
            var importDto = {};

            TransformerUtils.copyKeysFromTo(expensesImport.model, importDto, skipKeys);

            return importDto;
        };

        /**
         * Converts a importDto object to a expensesImport business object model.
         */
        this.toImport = function (importDto, expensesImport, skipKeys) {
            expensesImport = expensesImport || $injector.get('ExpensesImport').build();

            TransformerUtils.copyKeysFromTo(importDto, expensesImport.model, skipKeys);

            return expensesImport;
        };
    }]);
;angular
    .module("revaluate.expensesImport")
    .factory("ExpensesImport", ["$q", "$http", "ImportService", "ImportTransformerService", function ($q, $http, ImportService, ImportTransformerService) {

        /**
         * ExpensesImport class.
         * @constructor
         */
        function ExpensesImport() {

            /**
             * Represents the DTO model of the expensesImport.
             */
            this.model = {

                /**
                 * The expenses.
                 */
                expenseDTOs: [],

                /**
                 * The color
                 */
                expenseCategoryMatchingProfileDTOs: []
            };

            /**
             * Saves a expensesImport and update model with response.
             * @returns {*}
             */
            this.save = function () {
                return ImportService.performImport(this);
            };
        }

        /**
         * Builds a expensesImport with given data.
         * @param data
         * @returns {ExpensesImport}
         */
        ExpensesImport.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new ExpensesImport();
            }

            return ImportTransformerService.toImport(data, new ExpensesImport());
        };

        return ExpensesImport;
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("revaluate.expenses", [
        "revaluate.common",
        "revaluate.account",
        "revaluate.statistics"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("expenses", {
                url: "/expenses",
                templateUrl: 'app/expenses/partials/expense/expenses.abstract.html',
                abstract: true
            })

            // Regular case
            .state("expenses.regular", {
                url: "",
                views: {
                    'expenses': {
                        templateUrl: "app/expenses/partials/expense/expenses.html",
                        controller: "ExpenseController",
                        resolve: {
                            expenses: ["ExpenseService", function (ExpenseService) {
                                return ExpenseService.getAllExpenses();
                            }],
                            categories: ["CategoryService", function (CategoryService) {
                                return CategoryService.getAllCategories();
                            }]
                        }
                    }
                },
                title: "Expenses - Revaluate"
            })

    }]);;/**
 * Expenses constants.
 */
angular
    .module("revaluate.expenses")
    .constant("EXPENSE_URLS", {
        create: "expenses",
        update: "expenses",
        details: "expenses/:id",
        delete: "expenses/:id",
        bulkDelete: "expenses/bulkDelete",
        allExpenses: "expenses/retrieve"
    })
    .constant("EXPENSE_EVENTS", {
        isCreated: "expense-is-created",
        isDeleted: "expense-is-deleted",
        isUpdated: "expense-is-updated"
    });;angular
    .module("revaluate.expenses")
    .controller("ExpenseController", ["$scope", "$rootScope", "$stateParams", "Expense", "expenses", "ExpenseService", "categories", "$window", "DatesUtils", "$timeout", "StatesHandler", "EXPENSE_EVENTS", "flash", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, $stateParams, Expense, expenses, ExpenseService, categories, $window, DatesUtils, $timeout, StatesHandler, EXPENSE_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Updating/deleting timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Minimum expenses to enable bulk actions
         */
        var MIN_EXPENSES_TO_ENABLE_BULK_ACTION = 1;

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.expenseList;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.expensesPage);

        /**
         * Search by text
         * @type {string}
         */
        $scope.searchByText = "";

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Existing expenses.
         */
        $scope.expenses = expenses;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (expenseForm) {

            /**
             * Keep master expense.
             * @type {XMLList|XML|*}
             */
            $scope.masterExpense = Expense.build({
                spentDate: moment().toDate()
            });

            /**
             * Work with a copy of master expense
             */
            $scope.expense = angular.copy($scope.masterExpense);

            /**
             * Selected category
             * @type {{}}
             */
            $scope.category = {};

            if ( expenseForm ) {
                expenseForm.$setPristine();
            }

            $scope.badPostSubmitResponse = false;

            /**
             * Flag which represents whether the save is in progress.
             * @type {boolean}
             */
            $scope.isSaving = false;

            /**
             * Max date to create expense
             */
            $scope.datePickerMaxDate = moment().hours(0).minutes(0).seconds(0);
        };

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.datePickerMinDate = moment().year(2000);

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Open date picker
         * @param $event
         */
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePickerOpened = true;
        };

        /**
         * Saves the expense.
         */
        $scope.saveExpense = function () {
            if ( $scope.expenseForm.$valid && !$scope.isSaving ) {

                var isDateInFuture = moment().diff($scope.expense.model.spentDate || $scope.expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    $scope.expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }
                $scope.isSaving = true;

                // Update the  chosen category and master expense.
                $scope.expense.model.category = angular.copy($scope.category.selected.model);
                angular.copy($scope.expense, $scope.masterExpense);

                $scope.masterExpense
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseCreated);

                        var expenseToBePushed = angular.copy($scope.masterExpense);
                        $timeout(function () {
                            $scope.isSaving = false;
                            $scope.expenses.push(expenseToBePushed);
                        }, TIMEOUT_DURATION);

                        /**
                         * Finally, reset the add form.
                         */
                        $scope.initOrReset($scope.expenseForm);
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = "Could not add expense.";
                        $scope.isSaving = false;
                        $scope.badPostSubmitResponse = true;
                    });
            }
        };

        /**
         * Get selected expenses for bulk action (marked===true)
         * @returns {Array.<T>}
         */
        function getSelectedExpensesForBulkAction() {
            return _.filter($scope.expenses, 'marked', true);
        }

        /**
         * Is enough selected expenses for bulk action
         */
        $scope.isBulkActionEnabled = function () {
            return getSelectedExpensesForBulkAction().length >= MIN_EXPENSES_TO_ENABLE_BULK_ACTION;
        };

        /**
         * Cancels bulk action
         */
        $scope.cancelBulkAction = function () {
            var allCurrentlySelected = getSelectedExpensesForBulkAction();

            _.each(allCurrentlySelected, function (currentlySelected) {
                currentlySelected.marked = !currentlySelected.marked;
            });
        };

        /**
         * Performs bulk delete action
         */
        $scope.performBulkDelete = function () {
            if ( $scope.isBulkDeleting ) {

                return;
            }

            var selectedExpenses = angular.copy(getSelectedExpensesForBulkAction());

            // ---
            // Set the deleting flag.
            // ---
            $scope.isBulkDeleting = true;

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            ExpenseService
                .bulkDelete(selectedExpenses)
                .then(function () {
                    /**
                     * Track event.
                     */
                    mixpanel.track(MIXPANEL_EVENTS.expenseDeleted);

                    $timeout(function () {
                        removeAllExpenseFrom($scope.expenses, selectedExpenses);
                        $scope.isBulkDeleting = false;
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // Error
                    $scope.isBulkDeleting = false;
                    flash.to($scope.alertIdentifierId).error = "Could not perform bulk action.";
                });
        };

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On expense created, display a success message, and add expense to the list.
         */
        $scope.$on(EXPENSE_EVENTS.isCreated, function (event, args) {
            $scope.expenses.push(args.expense);

            flash.to($scope.alertIdentifierId).success = "Expense successfully saved!";
        });

        /**
         * On expense updated.
         */
        $scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
            var result = _.some($scope.expenses, function (topic) {
                return topic.model.id === args.expense.model.id;
            });

            if ( result ) {
                removeExpenseFrom($scope.expenses, args.expense);
                $scope.expenses.push(args.expense);
            }

            flash.to($scope.alertIdentifierId).success = "Expense successfully updated!";
        });

        /**
         * On expense deleted, display a success message, and remove the expense from the list.
         */
        $scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
            removeExpenseFrom($scope.expenses, args.expense);

            flash.to($scope.alertIdentifierId).success = "Expense successfully deleted!";
        });

        /**
         * On error occurred.
         */
        $scope.$on(EXPENSE_EVENTS.isErrorOccurred, function () {

            flash.to($scope.alertIdentifierId).error = "Error occurred!";
        });

        /**
         * Removes given expense from the list.
         * @param expenseList
         * @param expenseToBeRemoved
         */
        function removeExpenseFrom(expenseList, expenseToBeRemoved) {
            return _.remove(expenseList, function (expenseFromArray) {
                var expenseId = _.parseInt(expenseToBeRemoved.model.id, 10);
                var expenseFromArrayId = _.parseInt(expenseFromArray.model.id, 10);
                if ( _.isNaN(expenseFromArrayId) || _.isNaN(expenseId) ) {
                    return false;
                }

                return expenseFromArrayId === expenseId;
            });
        }

        /**
         * Remove a list of expenses from given existing list.
         * @param expenseList
         * @param expensesToBeRemoved
         */
        function removeAllExpenseFrom(expenseList, expensesToBeRemoved) {
            _.each(expensesToBeRemoved, function (expenseToBeRemoved) {
                removeExpenseFrom(expenseList, expenseToBeRemoved);
            });
        }

    }]);
;angular
    .module("revaluate.expenses")
    .controller("ExpenseEntryController", ["$scope", "$rootScope", "Expense", "$timeout", "EXPENSE_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(2000);

        /**
         * Edit/update timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Update the expense.
         */
        $scope.updateExpense = function (expenseForm, expense, category) {
            if ( expenseForm.$valid && !$scope.isUpdating ) {

                var isDateInFuture = moment().diff(expense.model.spentDate || expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }

                // Is saving expense
                $scope.isUpdating = true;

                // Update the  chosen category - if defined
                if ( category && category.selected ) {
                    expense.model.category = angular.copy(category.selected.model);
                }

                expense
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseCreated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                expense: expense
                            });
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.category = {};
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        $rootScope.$broadcast(EXPENSE_EVENTS.isErrorOccurred, {});
                    });
            }
        };
    }]);
;angular
    .module("revaluate.expenses")
    .directive('caretPricePosition', ["$timeout", function ($timeout) {
        return {
            link: function (scope, elem, attrs) {

                elem.on("focus, click", function () {
                    var el = this;

                    $timeout(function () {
                        var strLength = el.value.length;
                        if ( el.setSelectionRange !== undefined ) {
                            el.setSelectionRange(strLength, strLength);
                        } else {
                            $(el).val(el.value);
                        }
                    });
                })
            }
        };
    }]);;angular
    .module("revaluate.expenses")
    .directive('escapeHtml', function () {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if ( !ctrl ) return;

                ctrl.$parsers.unshift(function (value) {
                    if ( value == '' || value == null || value == undefined ) {
                        // null means that there is no value which is fine
                        return null;
                    }

                    return _.escape(value);
                });
            }
        };
    });;angular
    .module("revaluate.expenses")
    .directive("expenseEntry", ["$rootScope", "$timeout", "EXPENSE_EVENTS", "CategoryTransformerService", function ($rootScope, $timeout, EXPENSE_EVENTS, CategoryTransformerService) {
        return {
            restrict: "A",
            controller: 'ExpenseEntryController',
            scope: {
                categories: "=",
                expense: "=",
                isEnoughExpensesForBulkAction: "&"
            },
            templateUrl: "app/expenses/partials/expense/expenses.entry.template.html",
            link: function (scope, el, attrs) {

                var EXPENSE_INPUT_SELECTOR = '.expense__form__price__input';

                /**
                 * Current user.
                 */
                scope.user = $rootScope.currentUser;

                /**
                 * Keep the master backup. Work only with shownExpense.
                 */
                scope.shownExpense = angular.copy(scope.expense);

                /**
                 * Selected category
                 * @type {{}}
                 */
                scope.category = {};
                scope.category.selected = CategoryTransformerService.toCategory(scope.shownExpense.model.category);

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * We need an object in the scope as this model is changed by the
                 * datePicker and we want to see those changes. Remember '.' notation.
                 */
                scope.datePickerStatus = {};

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;

                    // ---
                    // Auto focus price.
                    // ---
                    if ( scope.showContent ) {
                        $timeout(function () {
                            el.find(EXPENSE_INPUT_SELECTOR).focus();
                        });

                        /**
                         * Max date to create expense
                         */
                        scope.maxDate = moment().hours(0).minutes(0).seconds(0);
                    }
                };

                /**
                 * Toggle mark for bulk action
                 */
                scope.toggleMark = function () {
                    scope.expense.marked = !scope.expense.marked;

                    // ---
                    // We need this info also in the parent scope, so we synchronize the master too.
                    // ---
                    scope.shownExpense.marked = scope.expense.marked;
                };

                /**
                 * Open date picker
                 * @param $event
                 */
                scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    scope.datePickerStatus.opened = true;
                };

                /**
                 * Toggle and discard changes.
                 */
                scope.cancel = function () {
                    scope.toggleContent();

                    scope.shownExpense = angular.copy(scope.expense);
                };

                /**
                 * On expense updated/deleted - cancel edit mode.
                 */
                $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                    if ( scope.expense.model.id === args.expense.model.id ) {

                        // ---
                        // Now update the master expense, and remove the marked sign.
                        // ---
                        scope.shownExpense.marked = false;
                        scope.expense = angular.copy(scope.shownExpense);

                        scope.cancel();
                    }
                });
            }
        }
    }]);;/* Email list */

angular
    .module("revaluate.expenses")
    .directive("expenseList", ["$rootScope", "$timeout", "EXPENSE_EVENTS", function ($rootScope, $timeout, EXPENSE_EVENTS) {
        return {
            restrict: "A",
            scope: {
                expenses: "=",
                categories: "=",
                searchByText: "="
            },
            templateUrl: "app/expenses/partials/expense/expenses.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.reverseOrder = attrs.sort === "desc";

                /**
                 * Load more timeout
                 * @type {number}
                 */
                var LOAD_MORE_TIMEOUT = 500;

                /**
                 * Current user.
                 */
                scope.user = $rootScope.currentUser;

                /**
                 * Default number of expenses to be displayed.
                 * @type {number}
                 */
                scope.defaultExpensesLimit = 20;

                /**
                 * Number of the filtered expenses
                 */
                scope.filteredExpenses = 0;

                /**
                 * Tells if the search by is activated;
                 */
                scope.isSearchByActivated = function () {
                    return scope.searchByText !== "" && !_.isUndefined(scope.searchByText);
                };

                /**
                 * Is loading more expenses flag.
                 * @type {boolean}
                 */
                scope.isLoadingMore = false;

                /**
                 * Past expenses limit - initially has the default value.
                 * @type {number}
                 */
                scope.expensesLimit = scope.defaultExpensesLimit;

                /**
                 * Show past expenses block content
                 * @type {boolean}
                 */
                scope.showExpensesContent = true;

                /**
                 * If empty expenses content message should be shown
                 * @type {boolean}
                 */
                scope.showEmptyExpensesContent = attrs.showEmptyContent === "true";

                // ---
                // Set up the toggle expenses content functionality.
                // ---

                if ( attrs.toggleContent === "true" ) {

                    /**
                     * Set expenses content settings
                     * @type {boolean}
                     */
                    scope.showExpensesContent = false;

                    /**
                     * Toggle past expenses content.
                     */
                    scope.togglePastExpensesContent = function () {
                        scope.showExpensesContent = !scope.showExpensesContent;
                    };
                }

                /**
                 * Load more expenses.
                 */
                scope.loadMoreExpenses = function () {
                    scope.isLoadingMore = !scope.isLoadingMore;

                    $timeout(function () {
                        scope.expensesLimit = scope.expensesLimit + scope.defaultExpensesLimit;
                        scope.isLoadingMore = !scope.isLoadingMore;
                    }, LOAD_MORE_TIMEOUT);
                };

                /**
                 * Expenses still to be loaded ?
                 * @returns {boolean}
                 */
                scope.isStillExpensesToBeLoaded = function () {
                    return scope.expensesLimit < scope.expenses.length;
                };
            }
        }
    }]);
;angular
    .module("revaluate.expenses")
    .directive('formatPrice', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if ( !ctrl ) return;

                var options = {
                    prefix: '',
                    centsSeparator: ',',
                    thousandsSeparator: '.'
                };

                /*First time format*/
                ctrl.$formatters.unshift(function () {
                    elem[0].value = parseInt(ctrl.$modelValue, 10) * 100;
                    elem.priceFormat(options);
                    return elem[0].value;
                });

                /*Parser*/
                ctrl.$parsers.unshift(function () {
                    elem.priceFormat(options);

                    return elem[0].value.replace(/\./g, '').replace(/,/g, '.');
                });
            }
        };
    }]);;angular
    .module("revaluate.common")
    .directive("validPrice", function () {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidPrice(price) {
                    return !(price === "" || _.isUndefined(price) || parseFloat(price) <= 0.01);

                }

                ngModel.$validators.validPrice = function (price) {
                    return isValidPrice(price);
                };
            }
        };
    });
;angular
    .module("revaluate.expenses")
    .filter('expensesHeader', ["$sce", function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<span class="expense-list-box__header__past">You have $1 expenses</span>' : '<span class="expense-list-box__header__upcoming">Your expenses</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    }]);;angular
    .module("revaluate.expenses")
    .filter('highlightSearch', ["$sce", function ($sce) {
        return function (text, phrase) {
            if ( phrase ) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="expense__found--highlight">$1</span>');

            return $sce.trustAsHtml(text)
        };
    }]);;/**
 * Expenses service which encapsulates the whole logic related to expenses.
 */
angular
    .module("revaluate.expenses")
    .service("ExpenseService", ["EXPENSE_URLS", "$q", "$http", "$injector", "ExpenseTransformerService", function (EXPENSE_URLS, $q, $http, $injector, ExpenseTransformerService) {

        /**
         * Update a expense.
         * @param expense
         * @returns {*}
         */
        this.createExpense = function (expense) {
            return $http
                .post(URLTo.api(EXPENSE_URLS.create), ExpenseTransformerService.toExpenseDto(expense))
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response;
                });
        };

        /**
         * Update a expense.
         * @param expense
         * @returns {*}
         */
        this.updateExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .put(URLTo.api(EXPENSE_URLS.update), expenseDto)
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response;
                });
        };

        /**
         * Delete a expense.
         * @param expense
         * @returns {*}
         */
        this.deleteExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .delete(URLTo.api(EXPENSE_URLS.delete, { ":id": expenseDto.id }), expenseDto)
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response.data;
                });
        };

        /**
         * Get all expenses of current user
         * @returns {*}
         */
        this.getAllExpenses = function () {
            return $http
                .get(URLTo.api(EXPENSE_URLS.allExpenses))
                .then(function (response) {

                    return ExpenseTransformerService.toExpenses(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Get details of a expense.
         * @param id
         * @returns {*}
         */
        this.getDetails = function (id) {
            return $http
                .get(URLTo.api(EXPENSE_URLS.details, { ":id": id }))
                .then(function (response) {
                    return ExpenseTransformerService.toExpense(response.data, $injector.get('Expense').build());
                });
        };

        /**
         * Bulk delete action of a list of expenses.
         * @returns {*}
         */
        this.bulkDelete = function (categories) {
            return $http
                .put(URLTo.api(EXPENSE_URLS.bulkDelete), ExpenseTransformerService.toExpenseDTOs(categories))
                .then(function (response) {

                    return response.data;
                });
        };
    }]);
;/**
 * Expense transformer service which transforms a expense DTO model object to a expense business object.
 */
angular
    .module("revaluate.expenses")
    .service("ExpenseTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a expense business object model to a expenseDto object.
         * @param expense
         * @param skipKeys
         * @returns {{}}
         */
        this.toExpenseDto = function (expense, skipKeys) {
            var expenseDto = {};

            TransformerUtils.copyKeysFromTo(expense.model, expenseDto, skipKeys);
            if ( expenseDto.spentDate ) {
                expenseDto.spentDate = moment(expenseDto.spentDate).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }

            return expenseDto;
        };

        /**
         * Converts a expenseDto object to a expense business object model.
         * @param expenseDto
         * @param expense
         * @param skipKeys
         * @returns {*}
         */
        this.toExpense = function (expenseDto, expense, skipKeys) {
            expense = expense || $injector.get('Expense').build();

            TransformerUtils.copyKeysFromTo(expenseDto, expense.model, skipKeys);

            // handle date conversion
            if ( expense.model.spentDate ) {
                expense.model.spentDate = moment(expense.model.spentDate).toDate();
            }

            return expense;
        };

        /**
         * Transform a list of expenses as JSON to a list of expenses as business object.
         * @param expenseDtos
         * @returns {Array}
         */
        this.toExpenses = function (expenseDtos) {
            var expenses = [];

            _.each(expenseDtos, _.bind(function (expenseDto) {
                expenses.push(this.toExpense(expenseDto));
            }, this));

            return expenses;
        };

        /**
         * Transform a list of expenses as business objects to a list of DTOs.
         * @param expenses
         * @returns {Array}
         */
        this.toExpenseDTOs = function (expenses) {
            var expenseDTOs = [];

            _.each(expenses, _.bind(function (expense) {
                expenseDTOs.push(this.toExpenseDto(expense));
            }, this));

            return expenseDTOs;
        };
    }]);
;angular
    .module("revaluate.expenses")
    .factory("Expense", ["$q", "$http", "ExpenseService", "ExpenseTransformerService", function ($q, $http, ExpenseService, ExpenseTransformerService) {

        /**
         * Expense class.
         * @constructor
         */
        function Expense() {

            /**
             * Represents the DTO model of the expense.
             */
            this.model = {

                /**
                 * The expense id.
                 */
                id: "",

                /**
                 * The expense description.
                 */
                category: {},

                /**
                 * The expense value
                 */
                value: 0,

                /**
                 * The expense description.
                 */
                description: "",

                /**
                 * Create date of the expense.
                 */
                spentDate: ""
            };

            /**
             * Shows if this expense is marked (can be used e.g. in a bulk list)
             * @type {boolean}
             */
            this.marked = false;

            /**
             * Is expense new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.id === "" || _.isUndefined(this.model.id);
            };

            /**
             * Saves a expense and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return ExpenseService.createExpense(this);
                }
                else {
                    return ExpenseService.updateExpense(this);
                }
            };

            /**
             * Destroys (deletes) a expense.
             * @returns {*}
             */
            this.destroy = function () {
                return ExpenseService.deleteExpense(this);
            };

        }

        /**
         * Builds a expense with given data.
         * @param data
         * @returns {Expense}
         */
        Expense.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Expense();
            }

            return ExpenseTransformerService.toExpense(data, new Expense());
        };

        return Expense;
    }]);;angular
    .module("revaluate.statistics", [
        "revaluate.common"
    ]);;/**
 * Summaries constants.
 */
angular
    .module("revaluate.statistics")
    .constant("STATISTIC_URLS", {
        fetchStatistic: "insights/summary_insights"
    });;/**
 * Summaries service which encapsulates the whole logic related to statistics.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticService", ["STATISTIC_URLS", "$q", "$http", "$injector", "StatisticTransformerService", function (STATISTIC_URLS, $q, $http, $injector, StatisticTransformerService) {

        /**
         * Get all statistics of current user
         * @returns {*}
         */
        this.fetchStatistics = function () {

            return $http
                .get(URLTo.api(STATISTIC_URLS.fetchStatistic))
                .then(function (response) {

                    return StatisticTransformerService.toStatistic(response.data, $injector.get('Statistic').build());
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    }]);
;/**
 * Statistic transformer service which transforms a statistic DTO model object to a statistic business object.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a statisticDto object to a statistic business object model.
         * @param statisticDto
         * @param statistic
         * @param skipKeys
         * @returns {*}
         */
        this.toStatistic = function (statisticDto, statistic, skipKeys) {
            statistic = statistic || $injector.get('Statistic').build();

            TransformerUtils.copyKeysFromTo(statisticDto, statistic.model, skipKeys);

            if ( statistic.model.firstExistingExpenseDate ) {
                statistic.model.firstExistingExpenseDate = moment(statistic.model.firstExistingExpenseDate).toDate();
            }

            if ( statistic.model.lastExistingExpenseDate ) {
                statistic.model.lastExistingExpenseDate = moment(statistic.model.lastExistingExpenseDate).toDate();
            }

            return statistic;
        };
    }]);
;angular
    .module("revaluate.statistics")
    .factory("Statistic", ["$q", "StatisticTransformerService", function ($q, StatisticTransformerService) {

        /**
         * Statistic class.
         * @constructor
         */
        function Statistic() {

            /**
             * Represents the DTO model of the statistic.
             */
            this.model = {

                /**
                 * First existing expense date
                 */
                firstExistingExpenseDate: "",

                /**
                 * Last existing expense date
                 */
                lastExistingExpenseDate: ""
            };
        }

        /**
         * Builds a statistic with given data.
         * @param data
         * @returns {Statistic}
         */
        Statistic.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Statistic();
            }

            return StatisticTransformerService.toStatistic(data, new Statistic());
        };

        return Statistic;
    }]);;angular
    .module("revaluate.insights", [
        "revaluate.common",
        "revaluate.expenses"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("insights", {
                url: "/insights",
                templateUrl: 'app/insight/partials/insight.html',
                controller: "InsightController",
                resolve: {
                    insight: ["InsightService", function (InsightService) {
                        var from = moment().startOf('month');
                        var to = moment().endOf('month');

                        return InsightService
                            .fetchInsightsFromTo(from, to);
                    }],
                    statistics: ["StatisticService", function (StatisticService) {
                        return StatisticService
                            .fetchStatistics();
                    }]
                },
                title: "Insights - Revaluate"
            })

    }]);;/**
 * Insights constants.
 */
angular
    .module("revaluate.insights")
    .constant("INSIGHTS_CHARTS", {
        BAR: "BAR",
        DOUGHNUT: "DOUGHNUT"
    })
    .constant("INSIGHTS_URLS", {
        fetchInsights: "insights/retrieve_from_to?from=:from&to=:to"
    });;/**
 * expenses controller.
 */
angular
    .module("revaluate.insights")
    .controller("InsightController", ["$scope", "$rootScope", "$filter", "$timeout", "flash", "insight", "statistics", "InsightService", "MIXPANEL_EVENTS", "INSIGHTS_CHARTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, $filter, $timeout, flash, insight, statistics, InsightService, MIXPANEL_EVENTS, INSIGHTS_CHARTS, ALERTS_CONSTANTS) {

        /**
         * Updating/deleting timeout
         */
        var TIMEOUT_DURATION = 150;

        /**
         * Month constant
         * @type {string}
         */
        var MONTH = 'month';

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.insights;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.insightsPage);

        /**
         * Default insights loaded.
         */
        $scope.insight = insight;

        $scope.insightLineData = [insight.model.insightData];
        $scope.insightLineColors = [insight.model.insightColors];
        $scope.insightLineSeries = ["Categories"];

        $scope.INSIGHTS_CHARTS = INSIGHTS_CHARTS;
        $scope.activeChart = $scope.INSIGHTS_CHARTS.DOUGHNUT;

        $scope.setActiveChart = function (chartType) {
            $scope.activeChart = chartType;
        };

        /**
         * Expenses statistics
         * @type {statistics|*}
         */
        $scope.statistics = statistics;

        // ---
        // Chart config options.
        // ---
        $scope.chartOptions = {
            scaleLabel: function (label) {

                return formatValue(label);
            },
            multiTooltipTemplate: function (label) {

                return label.datasetLabel + ' ' + formatValue(label);
            },
            tooltipTemplate: function (label) {

                return label.label + ' ' + formatValue(label);
            }
        };

        function formatValue(label) {
            return $filter('currency')(label.value.toString(), $scope.user.model.currency.symbol);
        }

        /**
         * Open date picker
         * @param $event
         */
        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePickerOpened = true;
        };

        /**
         * Minimum date to fetch insights.
         * @type {Date}
         */
        $scope.datePickerMinDate = $scope.statistics.model.firstExistingExpenseDate || moment().year(2000);

        /**
         * Maximum date to fetch insights.
         */
        $scope.datePickerMaxDate = $scope.statistics.model.lastExistingExpenseDate || moment().hours(0).minutes(0).seconds(0);

        /**
         * Exposed insight data (first define master copy).
         * @type {{spentDate: *}}
         */
        $scope.masterInsightData = {
            spentDate: moment().toDate()
        };

        /**
         * Exposed insight data.
         * @type {{spentDate: *}}
         */
        $scope.insightData = angular.copy($scope.masterInsightData);

        /**
         * Load insights
         */
        function loadInsight() {
            if ( $scope.isLoading ) {

                $scope.insightData = angular.copy($scope.masterInsightData);
                return;
            }

            $scope.isLoading = true;
            var computedInsightsData = angular.copy($scope.insightData);
            var from = moment(computedInsightsData.spentDate).startOf(MONTH);
            var to = moment(computedInsightsData.spentDate).endOf(MONTH);
            InsightService
                .fetchInsightsFromTo(from, to)
                .then(function (receivedInsight) {

                    /**
                     * Track event.
                     */
                    mixpanel.track(MIXPANEL_EVENTS.insightsFetched);

                    $timeout(function () {
                        if ( receivedInsight.isEmpty() ) {
                            // ---
                            // Reset the insight data.
                            // ---
                            $scope.insightData = angular.copy($scope.masterInsightData);
                            flash.to($scope.alertIdentifierId).info = "There are no expenses defined for selected period."
                        }
                        else {
                            // ---
                            // If there was a previously error, just clear it.
                            // ---
                            flash.to($scope.alertIdentifierId).error = '';

                            // ---
                            // Update everything.
                            // ---
                            $scope.masterInsightData = angular.copy($scope.insightData);
                            $scope.insight = receivedInsight;
                            $scope.insightLineData = [$scope.insight.model.insightData];
                            $scope.insightLineSeries = ["Categories"];
                        }

                        $scope.isLoading = false;

                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // ---
                    // Reset the insight data.
                    // ---
                    $scope.insightData = angular.copy($scope.masterInsightData);
                    flash.to($scope.alertIdentifierId).error = "Could not fetch insights.";
                    $scope.badPostSubmitResponse = true;
                    $scope.isLoading = false;
                });
        }

        /**
         * Submitted from inside the form.
         */
        $scope.submitLoadInsight = function () {
            if ( !$scope.insightForm.$valid ) {
                return;
            }

            var isDateInFuture = moment().diff($scope.insightData.spentDate || $scope.insightForm.spentDate) <= 0;
            if ( isDateInFuture ) {
                $scope.insightForm.spentDate.$setValidity('validDate', false);

                return;
            }

            // ---
            // Now load the insights.
            // ---
            loadInsight();
        };

        /**
         * On date change do load insight
         */
        $scope.onChange = function () {
            loadInsight();
        };

        /**
         * Go to previous month
         */
        $scope.prevMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).subtract(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if -1 month is at most the first existing expenses date.
         * @returns {boolean}
         */
        $scope.canLoadPrevMonth = function () {

            // a - b < 0 or a - b > 0
            return moment($scope.insightData.spentDate).diff($scope.statistics.model.firstExistingExpenseDate) >= 0;
        };

        /**
         * Go to next month
         */
        $scope.nextMonth = function () {
            $scope.insightData.spentDate = moment($scope.insightData.spentDate).add(1, MONTH).toDate();

            loadInsight();
        };

        /**
         * Only if +1 month is at most the last existing expenses date.
         * @returns {boolean}
         */
        $scope.canLoadNextMonth = function () {

            return moment($scope.insightData.spentDate).diff($scope.statistics.model.lastExistingExpenseDate) <= 0;
        }
    }])
;;/**
 * Insights service which encapsulates the whole logic related to insights.
 */
angular
    .module("revaluate.insights")
    .service("InsightService", ["INSIGHTS_URLS", "$q", "$http", "$injector", "InsightTransformerService", function (INSIGHTS_URLS, $q, $http, $injector, InsightTransformerService) {

        /**
         * Get all insights of current user
         * @returns {*}
         */
        this.fetchInsightsFromTo = function (from, to) {
            var fromFormatted = moment(from).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
            var toFormatted = moment(to).format('YYYY-MM-DDTHH:mm:ss') + 'Z';

            return $http
                .get(URLTo.api(INSIGHTS_URLS.fetchInsights, { ":from": fromFormatted, ":to": toFormatted }))
                .then(function (response) {

                    return InsightTransformerService.toInsight(response.data, $injector.get('Insight').build());
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    }]);
;/**
 * Insight transformer service which transforms a insight DTO model object to a insight business object.
 */
angular
    .module("revaluate.insights")
    .service("InsightTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a insight business object model to a insightDto object.
         * @param insight
         * @param skipKeys
         * @returns {{}}
         */
        this.toInsightDto = function (insight, skipKeys) {
            var insightDto = {};

            TransformerUtils.copyKeysFromTo(insight.model, insightDto, skipKeys);
            if ( insightDto.from ) {
                insightDto.from = moment(insightDto.from).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }
            if ( insightDto.to ) {
                insightDto.to = moment(insightDto.to).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }

            return insightDto;
        };

        /**
         * Converts a insightDto object to a insight business object model.
         * @param insightDto
         * @param insight
         * @param skipKeys
         * @returns {*}
         */
        this.toInsight = function (insightDto, insight, skipKeys) {
            insight = insight || $injector.get('Insight').build();

            TransformerUtils.copyKeysFromTo(insightDto, insight.model, skipKeys);

            // handle date conversion
            if ( insight.model.from ) {
                insight.model.from = moment(insight.model.from).toDate();
            }

            if ( insight.model.to ) {
                insight.model.to = moment(insight.model.to).toDate();
            }

            if ( insight.model.firstExistingExpenseDate ) {
                insight.model.firstExistingExpenseDate = moment(insight.model.firstExistingExpenseDate).toDate();
            }

            if ( insight.model.lastExistingExpenseDate ) {
                insight.model.lastExistingExpenseDate = moment(insight.model.lastExistingExpenseDate).toDate();
            }

            insight.model.insightData = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.totalAmount;
            });
            insight.model.insightColors = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.color.color;
            });
            insight.model.insightLabels = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.name;
            });

            return insight;
        };

        /**
         * Transform a list of insights as JSON to a list of insights as business object.
         * @param insightDtos
         * @returns {Array}
         */
        this.toInsights = function (insightDtos) {
            var insights = [];

            _.each(insightDtos, _.bind(function (insightDto) {
                insights.push(this.toInsight(insightDto));
            }, this));

            return insights;
        };

        /**
         * Transform a list of insights as business objects to a list of DTOs.
         * @param insights
         * @returns {Array}
         */
        this.toInsightDTOs = function (insights) {
            var insightDTOs = [];

            _.each(insights, _.bind(function (insight) {
                insightDTOs.push(this.toInsightDto(insight));
            }, this));

            return insightDTOs;
        };
    }]);
;angular
    .module("revaluate.insights")
    .factory("Insight", ["$q", "$http", "InsightService", "InsightTransformerService", function ($q, $http, InsightService, InsightTransformerService) {

        /**
         * Insight class.
         * @constructor
         */
        function Insight() {

            /**
             * Represents the DTO model of the insight.
             */
            this.model = {

                /**
                 * The insight data.
                 */
                insightData: [],

                /**
                 * The insight colors
                 */
                insightColors: [],

                /**
                 * The insight labels
                 */
                insightLabels: [],

                /**
                 * From date period of the insight.
                 */
                from: "",

                /**
                 * To date period of the insight.
                 */
                to: "",

                /**
                 * Total amount spent
                 */
                totalAmountSpent: 0,

                /**
                 * Number of transactions
                 */
                numberOfTransactions: 0,

                /**
                 * Total per categories
                 */
                totalPerCategoryInsightDTOs: [],

                /**
                 * Summary insights data
                 */
                summaryInsightsDTO: {

                    /**
                     * First existing expense date
                     */
                    firstExistingExpenseDate: "",

                    /**
                     * Last existing expense date
                     */
                    lastExistingExpenseDate: ""
                }
            };

            /**
             * Is insight empty.
             * @returns {boolean}
             */
            this.isEmpty = function () {
                return this.model.insightData.length === 0;
            };
        }

        /**
         * Builds a insight with given data.
         */
        Insight.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Insight();
            }

            return InsightTransformerService.toInsight(data, new Insight());
        };

        return Insight;
    }]);;/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "braintree-angular",
        "angular-cache",
        "angularFileUpload",
        "ngAnimate",
        "ngMessages",
        "ngStorage",
        "ngSanitize",
        "partials",
        "revaluate.site",
        "revaluate.feedback",
        "revaluate.common",
        "revaluate.categories",
        "revaluate.expensesImport",
        "revaluate.expenses",
        "revaluate.statistics",
        "revaluate.account",
        "revaluate.settings",
        "revaluate.insights",
        "angular.filter",
        "ui.gravatar",
        "ui.select"
    ])
    .config(["$locationProvider", "CacheFactoryProvider", "gravatarServiceProvider", function ($locationProvider, CacheFactoryProvider, gravatarServiceProvider) {
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // ---
        // Gravatar configs.
        // ---
        gravatarServiceProvider.defaults = {
            size: 100,
            "default": 'mm'
        };

        // Use https endpoint
        gravatarServiceProvider.secure = true;
    }])
    .run(["ENV", function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    }]);;/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppController", ["$rootScope", "$scope", "$state", "$timeout", "$log", "flash", "AuthService", "AccountModal", "User", "StatesHandler", "AUTH_EVENTS", "ALERTS_CONSTANTS", "ACTIVITY_INTERCEPTOR", "AUTH_MODAL", "ERROR_INTERCEPTOR", "ENV", function ($rootScope, $scope, $state, $timeout, $log, flash, AuthService, AccountModal, User, StatesHandler, AUTH_EVENTS, ALERTS_CONSTANTS, ACTIVITY_INTERCEPTOR, AUTH_MODAL, ERROR_INTERCEPTOR, ENV) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * Environment
         */
        $rootScope.ENV = ENV;

        /**
         * On app load, retrieve user profile previously saved (if exists).
         */
        $rootScope.currentUser = User.$new().loadFromSession();
        $log.log("Current user: ", $rootScope.currentUser);

        /**
         * Listen to login success event. If user is properly logged in,
         * then retrieve its profile this from cookie used for persistence.
         */
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            AuthService.redirectToAttemptedUrl();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        /**
         * Sometimes we need to refresh the user from the local storage.
         */
        $scope.$on(AUTH_EVENTS.refreshUser, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            $log.log("Refreshed user: ", $rootScope.currentUser);
        });

        /**
         * Listen to the session timeout event
         */
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        /**
         * Listen to the not authenticated event
         */
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");

            AuthService.logout();
            AuthService.saveAttemptUrl();
            StatesHandler.goToLogin();
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });

        /**
         * Track activity - for animation loading bar
         */
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
        });

        $rootScope.$on('$viewContentLoaded', function () {
            // ---
            // Close login modal if everything is loaded.
            // ---
            if ( AccountModal.isOpen ) {
                $rootScope.$broadcast(AUTH_MODAL.close, {})
            }
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
        });

        /**
         * Listen to the internal server error
         */
        $scope.$on(ERROR_INTERCEPTOR.status500, function () {
            $state.go('500');
        });

        /**
         * Listen to the payment required error
         */
        $scope.$on(ERROR_INTERCEPTOR.status402, function () {

            flash.to(ALERTS_CONSTANTS.generalError).error = "Payment method is required in order to use revaluate.";
        });
    }]);
;angular.module('partials', ['app/site/partials/404.html', 'app/site/partials/500.html', 'app/site/partials/about.html', 'app/site/partials/home.html', 'app/site/partials/privacy.html', 'app/categories/partials/add-category-directive-template.html', 'app/categories/partials/categories.html', 'app/categories/partials/color-picker-directive-template.html', 'app/categories/partials/edit-remove-category-directive-template.html', 'app/import/partials/howto/settings.import.howto.mint.html', 'app/import/partials/howto/settings.import.howto.spendee.html', 'app/import/partials/settings.import.abstract.html', 'app/import/partials/settings.import.choose.html', 'app/import/partials/settings.import.import.html', 'app/expenses/partials/expense/expenses.abstract.html', 'app/expenses/partials/expense/expenses.entry.template.html', 'app/expenses/partials/expense/expenses.html', 'app/expenses/partials/expense/expenses.list.template.html', 'app/account/partials/account.html', 'app/account/partials/account_close.html', 'app/account/partials/email_confirmation_send_abstract.html', 'app/account/partials/email_confirmation_send_invalid.html', 'app/account/partials/email_confirmation_send_send.html', 'app/account/partials/email_confirmation_send_valid.html', 'app/account/partials/logout.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/signup_setup.html', 'app/account/partials/trial_period_countdown.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/settings/partials/settings.abstract.html', 'app/settings/partials/settings.admin.abstract.html', 'app/settings/partials/settings.admin.cancelAccount.html', 'app/settings/partials/settings.admin.updatePassword.html', 'app/settings/partials/settings.payment.abstract.html', 'app/settings/partials/settings.payment.add.html', 'app/settings/partials/settings.payment.customer.html', 'app/settings/partials/settings.payment.insights.html', 'app/settings/partials/settings.payment.method.html', 'app/settings/partials/settings.preferences.abstract.html', 'app/settings/partials/settings.preferences.updateCurrency.html', 'app/settings/partials/settings.profile.html', 'app/insight/partials/insight.html', 'app/feedback/partials/feedback-modal.html', 'app/common/partials/flash-messages.html', 'app/common/partials/footer-home.html', 'app/common/partials/footer.html', 'app/common/partials/header-home.html', 'app/common/partials/header.html', 'app/common/partials/inline.confirmation.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/accordion/accordion-group.html', 'template/accordion/accordion.html', 'template/alert/alert.html', 'template/carousel/carousel.html', 'template/carousel/slide.html', 'template/datepicker/datepicker.html', 'template/datepicker/day.html', 'template/datepicker/month.html', 'template/datepicker/popup.html', 'template/datepicker/year.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/pagination/pager.html', 'template/pagination/pagination.html', 'template/popover/popover.html', 'template/progressbar/bar.html', 'template/progressbar/progress.html', 'template/progressbar/progressbar.html', 'template/rating/rating.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/timepicker/timepicker.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html', 'template/typeahead/typeahead-match.html', 'template/typeahead/typeahead-popup.html']);

angular.module("app/site/partials/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/404.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Hmm... looks like a 404</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">We can't really impress you since that page doesn't actually exist.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">Probably a typo or the page may have moved.</div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/500.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/500.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Oops... you found a 500</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">Nothing you did. It seems like an internal problem on the server.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">If this happens again please let us know at <a class=\"link-primary\" href=\"mailto:hello@reme.io\">hello@reme.io</a></div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/about.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--about\">\n" +
    "    <div class=\"about__sections\">\n" +
    "        <h1 class=\"about__sections__heading\">About us</h1>\n" +
    "\n" +
    "        <h1 class=\"about__sections__description\">\n" +
    "            We are a small team of 2 and we're really passioned about building Reme. Our main goal is to make our users happy (that's you!)\n" +
    "            and we hope you like using it. If you'd like to say hi, here we are.\n" +
    "        </h1>\n" +
    "\n" +
    "        <div class=\"about__sections__team\">\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4162760-9cf2-11e4-9312-dbead076a43a.png\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Sorin Pantiş</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/sorinpantis\" target=\"_blank\">@sorinpantis</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"about__sections__team__entry\">\n" +
    "                <img class=\"about__sections__team__entry__img\" src=\"/build/assets/img/c4105efc-9cf2-11e4-99aa-22889cb05bd0s.jpg\">\n" +
    "\n" +
    "                <div class=\"about__sections__team__desc\">Ioan Lucuţ</div>\n" +
    "                <div class=\"about__sections__team__link\">\n" +
    "                    <a href=\"https://twitter.com/ioanlucut\" target=\"_blank\">@ioanlucut</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header-home></div>\n" +
    "\n" +
    "<div class=\"home\">\n" +
    "\n" +
    "    <div class=\"home__section\">\n" +
    "        <h1 class=\"home__title\">Change the way you spend your money</h1>\n" +
    "\n" +
    "        <h3 class=\"home__description\">Keep a record of all your expenses. Or just some of them.\n" +
    "            <br> Have simple insights and set clear goals.</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home__section\">\n" +
    "        <div class=\"home__section__features\">\n" +
    "            <ul class=\"home__section__features--list\">\n" +
    "                <li><span class=\"icon-checkmark\"></span>Easy and fast input of your expenses</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Easily import your expenses from other apps</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Simple, meaningfull visual insights</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Clear, achievable goals</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"home__section__signup\" ng-controller=\"HomeSignUpRegistrationController\">\n" +
    "\n" +
    "            <!-- Sign-up form -->\n" +
    "            <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "                <!-- Title -->\n" +
    "                <h1 class=\"account__title\">Sign Up</h1>\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <div class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" name=\"firstName\" placeholder=\"First Name\" ng-model=\"signUpData.firstName\" required />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <div class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\" ng-model=\"signUpData.lastName\" required />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Email input -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add your email address.</div>\n" +
    "                        <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                        <div ng-message=\"uniqueEmail\">This email address is already used. <a href=\"javascript:void(0)\" account-modal-toggle=\"forgotPassword\">Forgot your password?</a></div>\n" +
    "                    </div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"email\" name=\"email\" placeholder=\"Email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.$submitted && signUpForm.password.$invalid}\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                        <div ng-message=\"strongPassword\">Please choose a password with at least 7 characters.</div>\n" +
    "                    </div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"password\" name=\"password\" placeholder=\"Password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"home__section__signup__btn\" type=\"submit\">{{isRequestPending ? 'Signing up..' : 'Start my 14 day free trial'}}</button>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"home__section\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("app/site/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/privacy.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--terms\">\n" +
    "\n" +
    "    <div class=\"privacy__sections\">\n" +
    "\n" +
    "        <h1>Terms of use</h1>\n" +
    "        <ul>\n" +
    "            <li>Reme is a tool created in the sole purpose of helping people get organized by creating expenses which will be sent to the provided e-mail address(es) at a specific date and time. Reme is not responsible for the content entered by the user.</li>\n" +
    "            <li>Reme uses e-mail as the only notification method. Reme is not responsible for missed dead-lines, appointments or other time-critical events.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>What personal data do we collect?</h3>\n" +
    "        <ul>\n" +
    "            <li>By registering or authenticating, you allow Reme to identify you and give you access to its services.</li>\n" +
    "            <li>We store your name and email address used for registration.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>Third party service that use personal data</h3>\n" +
    "        <ul>\n" +
    "            <li>Mandrill (from Mailchimp) - the mail server used to send the expenses</li>\n" +
    "            <li>Mixpanel - used to track actions with the purpose of improving the application&#39;s user experience</li>\n" +
    "            <li>Reamaze - used to manage the conversations with our users</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h1>Privacy Policy</h1>\n" +
    "        <ul>\n" +
    "            <li>The information Reme stores is the subject of the expense and the e-mail address(es) the user enters for the expense recipient.</li>\n" +
    "            <li>We use local storage to save expense related data for better user-experience. We do not collect anonymous data of any kind.</li>\n" +
    "            <li>The only e-mail Reme will send to the provided address(es) as recipients will be the expense which the user creates.</li>\n" +
    "            <li>We will only use your email address(es) to send the expenses you create or for Reme related notifications.</li>\n" +
    "            <li>We will not use your email address to send newsletters or advertising that you didn&#39;t subscribe to.</li>\n" +
    "            <li>We will not share your e-mail address or the e-mail address(es) you used for other recipients with 3rd party entities in the scope of advertising or spam.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <p>We may change the Privacy policy and/or the Terms of use without notice.</p>\n" +
    "\n" +
    "        <h3>Contact</h3>\n" +
    "\n" +
    "        <p>Please feel free to contact us at hello@reme.io for any questions or concerns you may have regarding the terms of use or the privacy policy.</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/categories/partials/add-category-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/add-category-directive-template.html",
    "<!--Show content-->\n" +
    "<div class=\"categories__add__controls\" ng-if=\"! showContent\">\n" +
    "    <button class=\"categories__add__controls__btn\" ng-click=\"toggleContent()\">Add category</button>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Add category form -->\n" +
    "<form name=\"categoryForm\" class=\"categories__add__form\" ng-if=\"showContent\" ng-submit=\"saveCategory(categoryForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <!--Content left-->\n" +
    "    <div class=\"categories__add__form__content__left\">\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.color.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"hidden\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color.color}\"></label>\n" +
    "\n" +
    "            <input type=\"text\"\n" +
    "                   name=\"name\"\n" +
    "                   class=\"categories__form__input-group__name\"\n" +
    "                   placeholder=\"Category name\"\n" +
    "                   ng-maxlength=\"20\"\n" +
    "                   maxlength=\"20\"\n" +
    "                   ng-model=\"category.model.name\"\n" +
    "                   auto-focus required valid-category-name unique-category-name />\n" +
    "\n" +
    "            <div class=\"categories__form__input-group__count\">{{20 - category.model.name.length}}</div>\n" +
    "\n" +
    "            <div color-picker colors=\"colors\" category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__add__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button type=\"button\" class=\"categories__add__form__content__right__cancel\" ng-click=\"toggleContent();initOrReset(categoryForm)\">Nevermind</button>\n" +
    "        <!-- Submit button container -->\n" +
    "        <button class=\"categories__add__form__content__right__add\" type=\"submit\">{{isSaving ? 'Saving...' : 'Save category'}}</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("app/categories/partials/categories.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/categories.html",
    "<div class=\"settings__box\">\n" +
    "    <h1 class=\"settings__title\">Categories</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Add category-->\n" +
    "    <div class=\"categories__add\" add-category colors=\"colors\"></div>\n" +
    "\n" +
    "    <!--List all categories-->\n" +
    "    <div class=\"categories__edit\">\n" +
    "\n" +
    "        <div class=\"categories__edit__category\" ng-repeat=\"category in categories | orderObjectBy : 'model.id' : true track by category.model.name\">\n" +
    "\n" +
    "            <!--Edit/remove category-->\n" +
    "            <div edit-remove-category colors=\"colors\" category=\"category\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/categories/partials/color-picker-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/color-picker-directive-template.html",
    "<div class=\"color-picker-box\">\n" +
    "\n" +
    "    <div class=\"color-picker__popover\">\n" +
    "\n" +
    "        <div class=\"color-picker__popover__colors\">\n" +
    "\n" +
    "            <div class=\"color-picker__popover__colors__color\" ng-repeat=\"color in colors | orderBy : 'priority' track by color.id \">\n" +
    "\n" +
    "                <!--Color picker-->\n" +
    "                <div class=\"color-picker__popover__colors__color__name\" ng-style=\"{'background':color.color}\" ng-click=\"select(color)\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/categories/partials/edit-remove-category-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/edit-remove-category-directive-template.html",
    "<!--Category group-->\n" +
    "<div class=\"categories__edit__category__name\" ng-if=\"! showContent\">\n" +
    "    <span class=\"categories__edit__category__color\" ng-style=\"{'background':category.model.color.color}\">C</span>\n" +
    "    <span class=\"categories__edit__category__label\">{{category.model.name}}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"categories__edit__category__controls\" ng-if=\"! showContent\">\n" +
    "    <!--Show content-->\n" +
    "    <div inline-confirmation toggle=\"! isDeleting\" confirm=\"deleteCategory(category)\" message=\"Are you sure?\" style=\"float: right\">\n" +
    "        <button class=\"categories__edit__category__delete\">{{isDeleting ? 'Deleting..' : 'Delete'}}</button>\n" +
    "    </div>\n" +
    "    <button class=\"categories__edit__category__edit\" ng-click=\"toggleContent()\">Edit</button>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Update category form -->\n" +
    "<form name=\"categoryForm\" class=\"categories__edit__form\" ng-if=\"showContent\" ng-submit=\"updateCategory(categoryForm, category)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <!--Content left-->\n" +
    "    <div class=\"categories__edit__form__content__left\">\n" +
    "\n" +
    "        <!-- Category color form group -->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.color.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"hidden\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Category label form group-->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color.color}\"></label>\n" +
    "            <input class=\"categories__form__input-group__name\"\n" +
    "                   type=\"text\"\n" +
    "                   ng-maxlength=\"20\"\n" +
    "                   maxlength=\"20\"\n" +
    "                   placeholder=\"Category name\"\n" +
    "                   name=\"name\"\n" +
    "                   ng-model=\"category.model.name\"\n" +
    "                   auto-focus\n" +
    "                   required\n" +
    "                   valid-category-name\n" +
    "                   unique-category-name\n" +
    "                   except=\"masterCategory.model.name\" />\n" +
    "\n" +
    "            <div class=\"categories__form__input-group__count\">{{20 - category.model.name.length}}</div>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div color-picker colors=\"colors\" category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__edit__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button type=\"button\" class=\"categories__edit__form__content__right__cancel\" ng-click=\"cancel();\">Nevermind</button>\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"categories__edit__form__content__right__update\" type=\"submit\">{{isUpdating ? 'Saving..' : 'Save changes'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/import/partials/howto/settings.import.howto.mint.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/howto/settings.import.howto.mint.html",
    "<div class=\"section-text\">\n" +
    "    Here's how you can export your expenses from <strong>Mint</strong>.\n" +
    "\n" +
    "    <iframe src=\"//fast.wistia.net/embed/iframe/yu4eurkxc0\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" class=\"wistia_embed\" name=\"wistia_embed\" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width=\"640\" height=\"360\">\n" +
    "    </iframe>\n" +
    "    <script src=\"//fast.wistia.net/assets/external/E-v1.js\" async></script>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/import/partials/howto/settings.import.howto.spendee.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/howto/settings.import.howto.spendee.html",
    "<div class=\"section-text\">\n" +
    "    Here's how you can export your expenses from <strong>Spendee</strong>.\n" +
    "\n" +
    "    <iframe src=\"//fast.wistia.net/embed/iframe/yu4eurkxc0\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" class=\"wistia_embed\" name=\"wistia_embed\" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width=\"640\" height=\"360\">\n" +
    "    </iframe>\n" +
    "    <script src=\"//fast.wistia.net/assets/external/E-v1.js\" async></script>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/import/partials/settings.import.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.abstract.html",
    "<div class=\"settings__box\" ui-view></div>");
}]);

angular.module("app/import/partials/settings.import.choose.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.choose.html",
    "<h1 class=\"settings__title\">Import</h1>\n" +
    "\n" +
    "<div class=\"section-text\">Select the app you want to import from:</div>\n" +
    "\n" +
    "<ul class=\"settings__import__choose\">\n" +
    "    <li class=\"settings__import__choose__source\" ui-sref=\"settings.import.import({type: 'mint'})\">\n" +
    "        <span class=\"settings__import__choose__source__logo--mint\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Mint</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "    <li class=\"settings__import__choose__source\" ui-sref=\"settings.import.import({type: 'spendee'})\">\n" +
    "        <span class=\"settings__import__choose__source__logo--spendee\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Spendee</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div class=\"section-text\">Coming soon:</div>\n" +
    "<ul class=\"settings__import__choose\">\n" +
    "    <li class=\"settings__import__choose__source settings__import__choose__source--soon\">\n" +
    "        <span class=\"settings__import__choose__source__logo--wally\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Wally</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div class=\"section-text\">\n" +
    "    If you'd like to import your expenses from another app,\n" +
    "    <a href=\"#\" ng-controller=\"FeedbackModalController\" ng-click=\"openFeedbackModal()\">let us know</a>\n" +
    "    .\n" +
    "</div>");
}]);

angular.module("app/import/partials/settings.import.import.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.import.html",
    "<!-- Flash messages. -->\n" +
    "<div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "<!--Upload section form-->\n" +
    "<div class=\"import__upload\" ng-if=\"! isUploadSuccessful\">\n" +
    "\n" +
    "    <div class=\"import__upload__area\" over-class=\"import__upload__area--over\" nv-file-drop=\"\" nv-file-over=\"\" uploader=\"uploader\" filters=\"queueLimit, csvFilter\">\n" +
    "        <div class=\"import__upload__btn\">\n" +
    "            <div class=\"section-text\">Drop the CSV file exported from\n" +
    "                <strong>{{importDescription}}</strong> here, or <span class=\"text-underlined\">browse</span> to select it.\n" +
    "            </div>\n" +
    "            <input class=\"import__upload__btn__input\" type=\"file\" nv-file-select=\"\" uploader=\"uploader\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--How to content-->\n" +
    "    <ul class=\"section-text\" ng-if=\"! showHowToContent\">\n" +
    "        <li>\n" +
    "            <a href=\"javascript:void(0)\" ng-click=\"toggleHowToContent()\"> How do I export my expenses from {{importDescription}}?</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div ng-show=\"showHowToContent\" ng-include src=\"'app/import/partials/howto/settings.import.howto.' + importType + '.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<!--Expenses import form-->\n" +
    "<form name=\"expensesImportForm\" ng-submit=\"submitPerformImport(expensesImportForm)\" novalidate ng-if=\"isUploadSuccessful && ! importFinished\">\n" +
    "\n" +
    "    <div class=\"import__edit\">\n" +
    "\n" +
    "        <div class=\"section-text\">\n" +
    "            Awesome! We found <strong>{{expensesImportAnswer.model.totalCategoriesFound}} expenses</strong> in\n" +
    "            <strong>{{expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs.length}} categories</strong>.\n" +
    "            Please tell us where each category from {{importDescription}} should be imported to.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"import__edit__categories__header\">\n" +
    "            <div class=\"import__edit__categories__header__src\">Import this category from {{importDescription}}</div>\n" +
    "            <div class=\"import__edit__categories__header__dest\">Into this category in Revaluate</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"import__edit__categories\" ng-repeat=\"categoryMatchCandidate in expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs track by categoryMatchCandidate.categoryCandidateName\">\n" +
    "\n" +
    "            <!--Category candidate name preview-->\n" +
    "            <div class=\"import__edit__categories__src\">\n" +
    "\n" +
    "                <div class=\"import__edit__categories__src__toggle\">\n" +
    "                    <input class='tgl tgl-flat' id='toggle_{{$index}}' type='checkbox' ng-model=\"categoryMatchCandidate.selected\">\n" +
    "                    <label class='tgl-btn' for='toggle_{{$index}}'></label>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"import__edit__categories__src__name\">{{categoryMatchCandidate.categoryCandidateName}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Category select-->\n" +
    "            <ng-form class=\"import__edit__categories__dest\" name=\"expensesImportCategoryMatchEntryForm\" ng-if=\"categoryMatchCandidate.selected\">\n" +
    "\n" +
    "                <div class=\"import__edit__categories__dest__category\" ng-class=\"{'has-error': expensesImportForm.$submitted && (expensesImportCategoryMatchEntryForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                    <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"categoryMatchCandidate.category.selected\" theme=\"selectize\">\n" +
    "                        <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                            <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                            <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': expensesImportCategoryMatchEntryForm.category.$invalid && expensesImportForm.$submitted}\" ng-messages=\"expensesImportCategoryMatchEntryForm.$error\" ng-if=\"expensesImportForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a category.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </ng-form>\n" +
    "\n" +
    "            <!--Category not selected-->\n" +
    "            <div class=\"import__edit__categories__ignored\" ng-if=\"! categoryMatchCandidate.selected\">\n" +
    "                Expenses in <strong>{{categoryMatchCandidate.categoryCandidateName}}</strong> will be ignored.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"import__edit__categories__arrow\">&#8594;</div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Perform import submit -->\n" +
    "        <button class=\"import__save__btn\" ng-disabled=\"! isEnoughSelectedMatchingCategories()\" type=\"submit\">{{isImporting ? 'Importing...' : 'Import expenses'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>\n" +
    "\n" +
    "<!--After import-->\n" +
    "<a ng-if=\"importFinished\" ui-sref=\"settings.import.import({type: importType})\" ui-sref-opts=\"{reload:true}\">Let me try again!</a>");
}]);

angular.module("app/expenses/partials/expense/expenses.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.abstract.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content\">\n" +
    "\n" +
    "    <!--Trial period countdown-->\n" +
    "    <div ng-if=\"currentUser.showTrialRemainingDays()\">\n" +
    "        <div ng-include src=\"'app/account/partials/trial_period_countdown.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Account confirmation alert-->\n" +
    "    <div ng-if=\"! currentUser.model.emailConfirmed\" ng-controller=\"EmailConfirmationSendController\">\n" +
    "        <div ng-include src=\"'app/account/partials/email_confirmation_send_send.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"generalError\"></div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <div ui-view=\"expenses\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/expenses/partials/expense/expenses.entry.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.entry.template.html",
    "<!--Display expense-->\n" +
    "<div class=\"expenses__list__entry__display\" ng-if=\"! showContent\" ng-class=\"expense.marked ? 'expense__bulk--marked' : ''\" ng-click=\"toggleMark();$event.stopPropagation();\">\n" +
    "\n" +
    "    <div class=\"expenses__list__entry__select icon-checkmark\" ng-if=\"expense.marked\"></div>\n" +
    "\n" +
    "    <div class=\"expenses__list__entry__price\">\n" +
    "        {{expense.model.value | currency:user.model.currency.symbol}}\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Expense category-->\n" +
    "    <div class=\"expenses__list__entry__category\" ng-style=\"{'background':expense.model.category.color.color}\" ng-bind-html=\"expense.model.category.name\"></div>\n" +
    "\n" +
    "    <!--Expense description-->\n" +
    "    <div class=\"expenses__list__entry__details\" ng-bind-html=\"expense.model.description | highlightSearch:searchByText\"></div>\n" +
    "\n" +
    "    <!--Expense date-->\n" +
    "    <div class=\"expenses__list__entry__date\">{{expense.model.spentDate | friendlyDate}}</div>\n" +
    "\n" +
    "    <button class=\"expenses__list__entry__editbtn icon-pen\" type=\"button\" ng-click=\"toggleContent();\"></button>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Display expense in edit mode -->\n" +
    "<div class=\"expenses__form expenses__form--edit\" ng-if=\"showContent\">\n" +
    "\n" +
    "    <form name=\"expenseForm\" ng-submit=\"updateExpense(expenseForm, shownExpense, category)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Form groups -->\n" +
    "        <div class=\"expense__form__price\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.value.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" ng-model=\"shownExpense.model.value\" format-price format=\"number\" caret-price-position required valid-price />\n" +
    "            <span class=\"expense__form__price__currency\">{{user.model.currency.currencyCode}}</span>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.value.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a price.</div>\n" +
    "                <div ng-message=\"validPrice\">Price is invalid</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"category.selected\" theme=\"selectize\">\n" +
    "                <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                    <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                    <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                </ui-select-choices>\n" +
    "            </ui-select>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a category.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"30\" maxlength=\"30\" placeholder=\"Add details (optional)\" ng-model=\"shownExpense.model.description\" escape-html />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.description.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"maxlength\">Hmm. Too long.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Date input -->\n" +
    "        <div class=\"expense__form__date\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\">\n" +
    "\n" +
    "            <!--Hidden input of the expense chosen date-->\n" +
    "            <input type=\"hidden\" name=\"spentDate\" ng-model=\"shownExpense.model.spentDate\" required valid-date />\n" +
    "\n" +
    "            <!--Expense date picker-->\n" +
    "            <div class=\"expense__form__date__input\">\n" +
    "                <button ng-click=\"openDatePicker($event)\" type=\"button\"\n" +
    "                        datepicker-popup is-open=\"datePickerStatus.opened\"\n" +
    "                        min-date=\"minDate\"\n" +
    "                        max-date=\"maxDate\"\n" +
    "                        ng-model=\"shownExpense.model.spentDate\"\n" +
    "                        datepicker-options=\"{startingDay:1,showWeeks:false}\">\n" +
    "                    {{shownExpense.model.spentDate | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit__save\">\n" +
    "            <button class=\"expense__edit__form__savebtn\" type=\"submit\">Save</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"expense__form__submit__cancel\">\n" +
    "            <button class=\"expense__edit__form__cancelbtn\" type=\"button\" ng-click=\"cancel();\">Discard changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expenses.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.html",
    "<!-- Add a new expense form -->\n" +
    "<div class=\"expenses__form\">\n" +
    "\n" +
    "    <form name=\"expenseForm\" ng-submit=\"saveExpense()\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form groups -->\n" +
    "        <div class=\"expense__form__price\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.value.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" maxlength=\"14\" ng-model=\"expense.model.value\" format-price format=\"number\" caret-price-position required valid-price auto-focus />\n" +
    "            <span class=\"expense__form__price__currency\">{{user.model.currency.currencyCode}}</span>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.value.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Don't forget the price.</div>\n" +
    "                <div ng-message=\"validPrice\">Oops, you missed the price.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"category.selected\" theme=\"selectize\">\n" +
    "                <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                    <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                    <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                </ui-select-choices>\n" +
    "            </ui-select>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a category.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"30\" maxlength=\"30\" placeholder=\"Add details (optional)\" ng-model=\"expense.model.description\" escape-html />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.description.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"maxlength\">Hmm. Too long. Make it shorter.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Date input -->\n" +
    "        <div class=\"expense__form__date\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\">\n" +
    "\n" +
    "            <!--Hidden input of the expense chosen date-->\n" +
    "            <input type=\"hidden\" name=\"spentDate\" ng-model=\"expense.model.spentDate\" required valid-date />\n" +
    "\n" +
    "            <!--Expense date picker-->\n" +
    "            <div class=\"expense__form__date__input\">\n" +
    "                <button type=\"button\"\n" +
    "                        class=\"expense__form__date__input__btn\"\n" +
    "                        ng-click=\"openDatePicker($event)\"\n" +
    "                        ng-model=\"expense.model.spentDate\"\n" +
    "                        datepicker-popup\n" +
    "                        is-open=\"datePickerOpened\"\n" +
    "                        min-date=\"datePickerMinDate\"\n" +
    "                        max-date=\"datePickerMaxDate\"\n" +
    "                        datepicker-options=\"{startingDay:1,showWeeks:false}\">{{expense.model.spentDate | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit__save\">\n" +
    "            <button class=\"expense__edit__form__savebtn\" type=\"submit\">Save</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Expense bulk actions-->\n" +
    "<div class=\"expenses__bulk-actions\" ng-if=\"isBulkActionEnabled()\">\n" +
    "\n" +
    "    <div class=\"expenses__bulk-actions__buttons\">\n" +
    "\n" +
    "        <div class=\"expenses__bulk-actions__delete\">\n" +
    "            <button class=\"expenses__bulk-actions__delete__btn-delete\" ng-click=\"performBulkDelete()\">{{isBulkDeleting ? 'Deleting...' : 'Delete'}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"expenses__bulk-actions__cancel\">\n" +
    "            <button class=\"expenses__bulk-actions__delete__btn-cancel\" ng-click=\"cancelBulkAction()\">Nevermind</button>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Empty state-->\n" +
    "<div class=\"expenses__empty-state\" ng-if=\"expenses.length === 0\">\n" +
    "    <div class=\"expenses__empty-state__icon\"></div>\n" +
    "    <h1>No expenses yet.</h1>\n" +
    "\n" +
    "    <div>Here's where your expenses will show up.</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--The expenses list-->\n" +
    "<div expense-list expenses=\"expenses\" categories=\"categories\" search-by-text=\"searchByText\" sort=\"desc\"></div>");
}]);

angular.module("app/expenses/partials/expense/expenses.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.list.template.html",
    "<!--Expense list content.-->\n" +
    "<div ng-show=\"showExpensesContent\" class=\"expense-list-box\" ng-class=\"{ 'expense-list-box--past-expenses': reverseOrder}\">\n" +
    "\n" +
    "    <div class=\"expenses__list\">\n" +
    "\n" +
    "        <!--Expense list-->\n" +
    "        <div class=\"expenses__list__entry\"\n" +
    "             ng-repeat=\"expense in expenses | orderObjectBy : 'model.spentDate' : reverseOrder | limitTo: expensesLimit | filter:{model:{description:searchByText}} as filteredExpenses track by expense.model.id\"\n" +
    "             expense-entry expense=\"expense\" categories=\"categories\">\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isStillExpensesToBeLoaded()\">\n" +
    "        <button type=\"submit\" class=\"expenses__list__loadbtn\" ng-click=\"loadMoreExpenses()\">{{isLoadingMore ? 'Loading..' : 'Load more'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Brand logo -->\n" +
    "<div class=\"brand-logo-block\"><a ui-sref=\"home\"></a></div>\n" +
    "\n" +
    "<!-- Account sections -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" auto-focus required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"loginForm.email.$invalid && loginForm.$submitted\">Please enter your email address.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"loginForm.password.$invalid && loginForm.$submitted\">Please enter your password.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Reset password -->\n" +
    "            <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"account__btn\" type=\"submit\">{{isRequestPending ? 'Logging in..' : isWaitingForCloseEvent ? 'Loading..' : 'Log in'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"HomeSignUpRegistrationController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's get you started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <div class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</div>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" name=\"firstName\" placeholder=\"First Name\" ng-model=\"signUpData.firstName\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <div class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</div>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\" ng-model=\"signUpData.lastName\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Email input -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please add your email address.</div>\n" +
    "                    <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                    <div ng-message=\"uniqueEmail\">This email address is already used. <a href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot your password?</a></div>\n" +
    "                </div>\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" name=\"email\" placeholder=\"Email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.$submitted && signUpForm.password.$invalid}\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                    <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                </div>\n" +
    "                <input class=\"form-group-input__input\" type=\"password\" name=\"password\" placeholder=\"Password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"home__section__signup__btn\" type=\"submit\">Start my 14 day free trial</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Recover password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.forgotPassword\" ng-controller=\"ForgotPasswordController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Can't remember your password?</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Please enter the e-mail you use to log in. We'll send you a link to reset your password.\n" +
    "        </span>\n" +
    "\n" +
    "        <!-- Forgot password form -->\n" +
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': forgotPasswordForm.$submitted && (forgotPasswordForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" auto-focus required valid-email />\n" +
    "\n" +
    "                <div class=\"form-group-input__message\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter your email address.</div>\n" +
    "                    <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"account__btn\" type=\"submit\">Reset password</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, let me log in!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email. We've sent you a link to reset your password.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Actually I remember the password</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account_close.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account_close.html",
    "<a class=\"account__close\" href=\"javascript:void(0)\">+</a>");
}]);

angular.module("app/account/partials/email_confirmation_send_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Sorry..</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        The token is invalid or expired.\n" +
    "    </span>\n" +
    "\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"home\">Continue.</a>\n" +
    "    <br />\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_send.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_send.html",
    "<!-- Send confirmation email section -->\n" +
    "<div class=\"account_send_email_section\">\n" +
    "\n" +
    "    <!-- Send confirmation email form -->\n" +
    "    <form name=\"sendConfirmationEmailForm\" ng-submit=\"sendConfirmationEmail(sendConfirmationEmailForm)\" novalidate>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <div class=\"alert-info account_send_email_section__alert\">\n" +
    "            Please check your inbox at <strong>{{user.model.email}}</strong> to confirm your email address.\n" +
    "            <button type=\"submit\">Resend email</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_valid.html",
    "<div class=\"account__section\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Success!</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        Your account was successfully validated.\n" +
    "    </span>\n" +
    "\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"home\">Continue to Revaluate</a>\n" +
    "    <br />\n" +
    "</div>");
}]);

angular.module("app/account/partials/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/logout.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!-- Logout section -->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!--Message-->\n" +
    "        <div class=\"alert alert-success\">\n" +
    "            Logged out successfully.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_abstract.html",
    "<div ui-view></div>");
}]);

angular.module("app/account/partials/signup_confirm_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_invalid.html",
    "<!-- Registration confirmation invalid -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Sorry, we couldn't validate your email. Maybe the link in the email is too old..\n" +
    "        </span>\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"goHome()\">Request the email again</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_valid.html",
    "<!-- Registration confirmation valid -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's finalize your account!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" auto-focus required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Email input -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"email\" placeholder=\"Email address\" name=\"email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                        <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--medium-offset\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group form-group--small-offset\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-group-input__input\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "\n" +
    "                        <div class=\"form-group-input__message\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                            <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"account__controls__form__info\">\n" +
    "                    <div class=\"account__controls__form__info__left\">Timezone</div>\n" +
    "                    <div class=\"account__controls__form__info__right simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"We automatically detected your timezone. You can change this later in the Settings page.\">{{timezoneDetails.value}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"account__section__terms\">\n" +
    "        * By singing up you agree to our\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"privacy\" class=\"account__section__terms__link\">Terms and Privacy policy</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_setup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_setup.html",
    "<div class=\"sign-up__setup\">\n" +
    "\n" +
    "    <div class=\"sign-up__setup__box\">\n" +
    "\n" +
    "        <h2 class=\"sign-up__setup__title\">Awesome! Let's set some basics!</h2>\n" +
    "\n" +
    "        <!-- Set up form -->\n" +
    "        <form name=\"setUpForm\" ng-submit=\"setUp()\" novalidate>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__section\">\n" +
    "                Please choose your currency:\n" +
    "                <div class=\"currency-select\" ng-class=\"{'has-error': setUpForm.$submitted && (setUpForm.currency.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                    <ui-select name=\"currency\" class=\"currency-select__input\" required ng-model=\"currency.selected\" theme=\"selectize\">\n" +
    "                        <ui-select-match placeholder=\"Start typing your currency...\">{{$select.selected.displayName}} - {{$select.selected.symbol}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"currencyEntry in currencies | orderObjectBy : 'displayName' : false | filter:{$:$select.search} track by currencyEntry.numericCode\">\n" +
    "                            <span ng-bind-html=\"currencyEntry.displayName | highlight: $select.search\"></span>\n" +
    "                            <span>-</span>\n" +
    "                            <span ng-bind-html=\"currencyEntry.symbol | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message form-group-input__message--currency\" ng-class=\"{'has-error': setUpForm.category.$invalid && setUpForm.$submitted}\" ng-messages=\"setUpForm.$error\" ng-if=\"setUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a currency.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__tip\">\n" +
    "                Let's add some categories. <strong>Unselect or add another</strong>. You can change them later as well.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__box__categories\">\n" +
    "                <div class=\"sign-up__box__categories__category\" ng-repeat=\"category in categories track by category.name\">\n" +
    "                    <div class=\"category-name\" ng-style=\"{'background':category.color.color}\" ng-class=\"{ 'category-name--unselected': !category.selected }\" ng-click=\"toggleCategorySelection($index)\">\n" +
    "                        <span class=\"icon-checkmark-light\"></span>\n" +
    "                        {{category.name}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__box__categories\">\n" +
    "\n" +
    "                <!--Toggle form-->\n" +
    "                <button ng-if=\"! showCategoryOnTheFlyInput\" class=\"sign-up__box__categories__addbtn\" ng-click=\"toggleContent()\">+ Add another</button>\n" +
    "\n" +
    "                <!--Add category on the fly form-->\n" +
    "                <ng-form class=\"sign-up__box__categories__category__form\"\n" +
    "                         name=\"categoryOnTheFlyForm\"\n" +
    "                         submit-on=\"add-category-on-the-fly-event\"\n" +
    "                         ng-submit=\"onSubmitted($event)\"\n" +
    "                         ng-if=\"showCategoryOnTheFlyInput\">\n" +
    "\n" +
    "                    <div ng-class=\"{'has-error': categoryOnTheFlyForm.$submitted && categoryOnTheFlyForm.name.$invalid}\">\n" +
    "\n" +
    "                        <!-- Error messages -->\n" +
    "                        <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryOnTheFlyForm.name.$invalid}\" ng-messages=\"categoryOnTheFlyForm.name.$error\" ng-if=\"categoryOnTheFlyForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                            <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!--The on the fly input category-->\n" +
    "                        <input class=\"sign-up__box__categories__addinput\" type=\"text\" name=\"name\"\n" +
    "                               maxlength=\"15\"\n" +
    "                               ng-model=\"$parent.categoryOnTheFly\"\n" +
    "                               ng-enter=\"triggerSubmit()\"\n" +
    "                               ng-blur=\"cancelAddCategoryOnTheFly()\"\n" +
    "                               auto-focus required valid-category-name />\n" +
    "\n" +
    "                    </div>\n" +
    "                </ng-form>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Button -->\n" +
    "            <button class=\"sign-up__setup__btn\" ng-disabled=\"! isEnoughSelectedCategories()\" type=\"submit\">{{isSaving ? 'Saving..' : 'Done! Let\\'s start!'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/trial_period_countdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/trial_period_countdown.html",
    "<!-- Trial period ending section -->\n" +
    "<div class=\"account_trial_period_section\">\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <div class=\"alert-error account_send_email_section__alert\">\n" +
    "        Your trial period will end in <strong>{{currentUser.getTrialRemainingDays()}} days</strong>.\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"settings.payment.insights\">Add payment details</a>.\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "    The token is invalid or expired.\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "    <br />\n" +
    "    <span ng-if=\"isUserAuthenticated\">\n" +
    "        You are authenticated. You will be logged off if you want to try again.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_valid.html",
    "<!-- Validate password reset token section -->\n" +
    "<div class=\"account__section\" ng-hide=\"successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "    <!-- Reset password form -->\n" +
    "    <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" auto-focus required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.passwordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"account__btn\" type=\"submit\">Reset password</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We've successfully updated your password.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.abstract.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content view-container__content--settings\">\n" +
    "\n" +
    "    <ul class=\"view-container__content__admin__aside\">\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.profile\">Profile</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.admin\">Account</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.preferences\">Preferences</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.categories\">Categories</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.import.choose\">Import</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.payment.insights\">Billing</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"view-container__content__admin__section\" ui-view></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/settings/partials/settings.admin.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.abstract.html",
    "<div class=\"settings__box\" ui-view=\"updatePassword\"></div>\n" +
    "\n" +
    "<div class=\"settings__box\" ui-view=\"cancelAccount\"></div>");
}]);

angular.module("app/settings/partials/settings.admin.cancelAccount.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.cancelAccount.html",
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <!-- Delete account -->\n" +
    "    <h1 class=\"settings__title\">Delete account</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Cancel account-->\n" +
    "    <div inline-confirmation toggle=\"! isDeleting\" confirm=\"cancelAccount()\" message=\"Are you sure you want to delete your account?\">\n" +
    "        <button class=\"settings__cancel__btn\">{{isDeleting ? 'Deleting...' : 'Delete my account'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.admin.updatePassword.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.updatePassword.html",
    "<!-- Update password section -->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Change password</h1>\n" +
    "\n" +
    "    <!-- Update password form -->\n" +
    "    <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.oldPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" auto-focus required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Please enter your old password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Please enter a new password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPasswordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Please confirm your new password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving...' : 'Change password'}}</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.abstract.html",
    "<!-- Flash messages. -->\n" +
    "<div flash-messages flash=\"flash\" identifier-id=\"generalError\"></div>\n" +
    "\n" +
    "<!--The view-->\n" +
    "<div class=\"settings__box\" ui-view></div>");
}]);

angular.module("app/settings/partials/settings.payment.add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.add.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment method section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Billing</h1>\n" +
    "\n" +
    "        <div class=\"section-text\">\n" +
    "            It seems that you have no payment info added yet. In order to subscribe to Revaluate, please add your credit\n" +
    "            card details below.\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Add payment method form -->\n" +
    "        <form class=\"payment__form__addcard\" name=\"addPaymentMethodForm\" ng-submit=\"addPaymentMethod()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input payment__form__addcard__number\" ng-class=\"{'has-error': addPaymentMethodForm.$submitted && (addPaymentMethodForm.cardNumber.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"4111111111111111\" name=\"cardNumber\" ng-model=\"paymentData.cardNumber\" auto-focus required/>\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"addPaymentMethodForm.cardNumber.$invalid && addPaymentMethodForm.$submitted\">Please enter your card number.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input payment__form__addcard__expiration\" ng-class=\"{'has-error': addPaymentMethodForm.$submitted && (addPaymentMethodForm.cardExpirationDate.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Expiration</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"10/18\" name=\"cardExpirationDate\" ng-model=\"paymentData.cardExpirationDate\" required/>\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"addPaymentMethodForm.cardExpirationDate.$invalid && addPaymentMethodForm.$submitted\">Please enter card expiration date.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving...' : 'Add credit card'}}\n" +
    "            </button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.customer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.customer.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment customer section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Update customer information</h1>\n" +
    "\n" +
    "        <!-- Update customer information form -->\n" +
    "        <form name=\"updateCustomerForm\" ng-submit=\"updateCustomer()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updateCustomerForm.$submitted && (updateCustomerForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last name\" name=\"cardNumber\" ng-model=\"paymentDetailsData.firstName\" auto-focus required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updateCustomerForm.firstName.$invalid && updateCustomerForm.$submitted\">Please enter your first name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updateCustomerForm.$submitted && (updateCustomerForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First name\" name=\"cardExpirationDate\" ng-model=\"paymentDetailsData.lastName\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updateCustomerForm.lastName.$invalid && updateCustomerForm.$submitted\">Please enter your last name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Updating...' : 'Update customer'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.insights.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.insights.html",
    "<!--Payment profile section-->\n" +
    "\n" +
    "<!-- Title -->\n" +
    "<h1 class=\"settings__title\">Billing</h1>\n" +
    "\n" +
    "<!--Subscription payment section-->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Subscription status</div>\n" +
    "\n" +
    "    <div ng-repeat=\"paymentMethodDTO in paymentInsights.paymentMethodDTOs\">\n" +
    "\n" +
    "        <!--Payment method subscriptions-->\n" +
    "        <div class=\"settings__box__payment-payment-method__subscription\" ng-repeat=\"paymentSubscription in paymentMethodDTO.paymentSubscriptionDTOList\">\n" +
    "\n" +
    "            <div class=\"settings__box__payment__subscription__status\" ng-if=\"paymentInsights.subscriptionActive\">\n" +
    "                <div>\n" +
    "                    <span class=\"settings__box__payment__subscription__status--active\">{{paymentSubscription.status}}</span>\n" +
    "                    <span class=\"settings__box__payment__subscription__status--info\"> - Next payment: ${{paymentSubscription.amount}} due {{paymentSubscription.billingPeriodEndDate | friendlyDate}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"settings__box__payment__subscription__status\" ng-if=\"! paymentInsights.subscriptionActive\">\n" +
    "        <div>\n" +
    "            <span class=\"settings__box__payment__subscription__status--trial\">Trial</span>\n" +
    "            <span class=\"settings__box__payment__subscription__status--info\">- First billing: $7.00 due 2015.05.25</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Payment form -->\n" +
    "    <form ng-if=\"! paymentInsights.subscriptionActive\" name=\"paymentSubscriptionForm\" ng-submit=\"performPaymentSubscription()\" novalidate>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"settings__box__payment__subscription__btn\" type=\"submit\">{{isRequestPending ? 'Activating...' : 'Activate'}}</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<!--Payment method-->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Payment method</div>\n" +
    "\n" +
    "    <div class=\"settings__box__payment__method\" ng-repeat=\"paymentMethodDTO in paymentInsights.paymentMethodDTOs\">\n" +
    "        <div class=\"settings__box__payment__method__cardno\">{{paymentMethodDTO.cardType}} ending with {{paymentMethodDTO.last4}}</div>\n" +
    "        <div class=\"settings__box__payment__method__cardexp\">Expiration: {{paymentMethodDTO.expirationMonth}} / {{paymentMethodDTO.expirationYear}}</div>\n" +
    "        <img ng-src=\"{{paymentMethodDTO.imageUrl}}\" />\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"settings.payment.method\">Update payment method</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Billing History-->\n" +
    "<div class=\"settings__box__section--100\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Billing History</div>\n" +
    "\n" +
    "    <table class=\"settings__box__payment__history\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Status</th>\n" +
    "            <th>ID</th>\n" +
    "            <th>Amount</th>\n" +
    "            <th>Date</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"paymentTransactionDTO in paymentInsights.paymentTransactionDTOs\">\n" +
    "            <td>\n" +
    "                <span class=\"icon-checkmark settings__box__payment__history__status--settled\" ng-if=\"paymentTransactionDTO.status == 'SETTLED'\"></span>\n" +
    "                <span class=\"icon-checkmark\" ng-if=\"paymentTransactionDTO.status != 'SETTLED'\"></span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <a href=\"javascript:void(0)\">{{paymentTransactionDTO.id}}</a>\n" +
    "            </td>\n" +
    "            <td>$ {{paymentTransactionDTO.amount}}</td>\n" +
    "            <td>{{paymentTransactionDTO.createdAt | friendlyDate}}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.method.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.method.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment method section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Update payment method</h1>\n" +
    "\n" +
    "        <!-- Update payment method form -->\n" +
    "        <form name=\"updatePaymentMethodForm\" ng-submit=\"updatePaymentMethod()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updatePaymentMethodForm.$submitted && (updatePaymentMethodForm.cardNumber.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"4111111111111111\" name=\"cardNumber\" ng-model=\"paymentData.cardNumber\" auto-focus required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updatePaymentMethodForm.cardNumber.$invalid && updatePaymentMethodForm.$submitted\">Please enter your card number.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updatePaymentMethodForm.$submitted && (updatePaymentMethodForm.cardExpirationDate.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"10/18\" name=\"cardExpirationDate\" ng-model=\"paymentData.cardExpirationDate\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updatePaymentMethodForm.cardExpirationDate.$invalid && updatePaymentMethodForm.$submitted\">Please enter card expiration date.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Updating...' : 'Update payment'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.preferences.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.preferences.abstract.html",
    "<div class=\"settings__box\" ui-view=\"updateCurrency\"></div>");
}]);

angular.module("app/settings/partials/settings.preferences.updateCurrency.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.preferences.updateCurrency.html",
    "<div class=\"settings__box__section--100\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Change your currency</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <form name=\"preferencesForm\" ng-submit=\"updatePreferences()\" novalidate>\n" +
    "\n" +
    "        <div class=\"settings__preferences__section\">\n" +
    "\n" +
    "            <div class=\"currency-select\" ng-class=\"{'has-error': preferencesForm.$submitted && (preferencesForm.currency.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                <ui-select name=\"currency\" class=\"currency-select__input\" required ng-model=\"currency.selected\" theme=\"selectize\">\n" +
    "                    <ui-select-match placeholder=\"Start typing your currency...\">{{$select.selected.displayName}} - {{$select.selected.symbol}}</ui-select-match>\n" +
    "                    <ui-select-choices repeat=\"currencyEntry in currencies | orderObjectBy : 'displayName' : false | filter:{$:$select.search} track by currencyEntry.numericCode\">\n" +
    "                        <span ng-bind-html=\"currencyEntry.displayName | highlight: $select.search\"></span>\n" +
    "                        <span>-</span>\n" +
    "                        <span ng-bind-html=\"currencyEntry.symbol | highlight: $select.search\"></span>\n" +
    "                    </ui-select-choices>\n" +
    "                </ui-select>\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message form-group-input__message--currency\" ng-class=\"{'has-error': preferencesForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"preferencesForm.$error\" ng-if=\"preferencesForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please add a currency.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button -->\n" +
    "        <button class=\"settings__btn__save\" type=\"submit\">{{isSaving ? 'Saving...' : 'Save changes'}}</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.profile.html",
    "<!-- Profile section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Edit profile</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Update profile section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Profile form -->\n" +
    "        <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': profileForm.$submitted && (loginForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>First Name</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First name\" name=\"firstName\" ng-model=\"profileData.firstName\" required auto-focus />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': profileForm.$submitted && (profileForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Last Name</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last name\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\">\n" +
    "                <label>Email</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-value=\"user.model.email\" disabled />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving..' : 'Save changes'}}</button>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/insight/partials/insight.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/insight/partials/insight.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content\">\n" +
    "\n" +
    "    <!--Trial period countdown-->\n" +
    "    <div ng-if=\"currentUser.showTrialRemainingDays()\">\n" +
    "        <div ng-include src=\"'app/account/partials/trial_period_countdown.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Account confirmation alert-->\n" +
    "    <div ng-if=\"! currentUser.model.emailConfirmed\" ng-controller=\"EmailConfirmationSendController\">\n" +
    "        <div ng-include src=\"'app/account/partials/email_confirmation_send_send.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Empty state if no expenses overall-->\n" +
    "    <div class=\"insights__empty-state\" ng-if=\"insight.model.totalNumberOfTransactions === 0\">\n" +
    "        <div class=\"insights__empty-state__icon\"></div>\n" +
    "        <h1>No data yet.</h1>\n" +
    "\n" +
    "        <div>Add some expenses to get insights.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"insight.model.totalNumberOfTransactions !== 0\">\n" +
    "        <!-- Insight fetch form -->\n" +
    "        <div class=\"insights__controls\">\n" +
    "\n" +
    "            <form name=\"insightForm\" class=\"insights__controls__form\" ng-submit=\"submitLoadInsight()\" novalidate>\n" +
    "\n" +
    "                <!-- Select prev month -->\n" +
    "                <button type=\"button\" class=\"insights__controls__form__arrow icon-chevron-left\" ng-disabled=\"isLoading || ! canLoadPrevMonth()\" ng-click=\"prevMonth()\"></button>\n" +
    "\n" +
    "                <div class=\"insights__controls__form__month\" ng-class=\"{'has-error': insightForm.spentDate.$invalid && insightForm.$submitted}\">\n" +
    "\n" +
    "                    <!--Hidden input of the insight chosen date-->\n" +
    "                    <input type=\"hidden\" name=\"spentDate\" ng-model=\"insightData.spentDate\" required valid-date />\n" +
    "\n" +
    "                    <!--insight date picker-->\n" +
    "                    <div class=\"insight__form__date__input\">\n" +
    "                        <button type=\"button\"\n" +
    "                                class=\"insight__form__date__input__btn\"\n" +
    "                                ng-click=\"openDatePicker($event)\"\n" +
    "                                ng-model=\"insightData.spentDate\"\n" +
    "                                datepicker-popup\n" +
    "                                is-open=\"datePickerOpened\"\n" +
    "                                ng-change=\"onChange()\"\n" +
    "                                ng-disabled=\"isLoading\"\n" +
    "                                min-date=\"datePickerMinDate\"\n" +
    "                                max-date=\"datePickerMaxDate\"\n" +
    "                                datepicker-mode=\"'month'\" min-mode=\"month\"\n" +
    "                                show-button-bar=\"false\"\n" +
    "                                datepicker-options=\"{minMode: 'month',datepickerMode: 'month'}\">{{isLoading ? 'Loading'\n" +
    "                            : (insightData.spentDate | friendlyMonthDate)}}\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!--Error messages-->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': insightForm.spentDate.$invalid && insightForm.$submitted}\" ng-messages=\"insightForm.$error\" ng-if=\"insightForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a date.</div>\n" +
    "                        <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Select next month -->\n" +
    "                <button type=\"button\" class=\"insights__controls__form__arrow icon-chevron-right\" ng-disabled=\"isLoading || ! canLoadNextMonth()\" ng-click=\"nextMonth()\"></button>\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "            <div class=\"insights__controls__chart-toggle\">\n" +
    "                <a ng-class=\"{'insights__chart--active': activeChart === INSIGHTS_CHARTS.BAR}\" href=\"javascript:void(0)\" ng-click=\"setActiveChart(INSIGHTS_CHARTS.BAR)\">Bar</a>\n" +
    "                <a ng-class=\"{'insights__chart--active': activeChart === INSIGHTS_CHARTS.DOUGHNUT}\" href=\"javascript:void(0)\" ng-click=\"setActiveChart(INSIGHTS_CHARTS.DOUGHNUT)\">Pie</a>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Empty state if no expenses for current month-->\n" +
    "        <div class=\"insights__empty-state\" ng-if=\"insight.model.numberOfTransactions === 0\">\n" +
    "            <div class=\"insights__empty-state__icon\"></div>\n" +
    "            <h1>No expenses on this month yet.</h1>\n" +
    "\n" +
    "            <div>You'll get some insights here.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"insight.model.numberOfTransactions !== 0\">\n" +
    "            <div class=\"insights__summary\">\n" +
    "                Hey, <span>{{currentUser.model.firstName}}</span>! In <span>{{(insightData.spentDate | friendlyMonthDate)}}</span>\n" +
    "                you've spent a total of <span>{{insight.model.totalAmountSpent | currency:user.model.currency.symbol}}</span>,\n" +
    "                which is <span>5% more</span> than the last month.\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"activeChart === INSIGHTS_CHARTS.BAR\" class=\"insights__chart__bar\">\n" +
    "                <canvas id=\"bar\"\n" +
    "                        class=\"chart chart-bar\"\n" +
    "                        data=\"insightLineData\"\n" +
    "                        series=\"insightLineSeries\"\n" +
    "                        legend=\"false\"\n" +
    "                        options=\"chartOptions\"\n" +
    "                        labels=\"insight.model.insightLabels\">\n" +
    "                </canvas>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"activeChart === INSIGHTS_CHARTS.DOUGHNUT\" class=\"insights__chart__doughnut\">\n" +
    "                <canvas class=\"chart chart-doughnut\"\n" +
    "                        data=\"insight.model.insightData\"\n" +
    "                        labels=\"insight.model.insightLabels\"\n" +
    "                        legend=\"true\"\n" +
    "                        options=\"chartOptions\"\n" +
    "                        colours=\"insight.model.insightColors\">\n" +
    "                </canvas>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"insights__summary\">\n" +
    "                You had a total of <span>{{insight.model.numberOfTransactions}} transactions</span>, in\n" +
    "                <span>{{insight.model.totalPerCategoryInsightDTOs.length}} categories</span>.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"insights__table\">\n" +
    "                <table>\n" +
    "                    <thead class=\"insights__table__header\">\n" +
    "                    <tr class=\"\">\n" +
    "                        <td>TOTAL</td>\n" +
    "                        <td class=\"insights__table__amount\">{{insight.model.totalAmountSpent | currency:user.model.currency.symbol}}<span>{{user.model.currency.currencyCode}}</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                    <tr ng-repeat=\"totalPerCategory in insight.model.totalPerCategoryInsightDTOs\">\n" +
    "                        <td class=\"insights__table__category\">\n" +
    "                            <span class=\"insights__table__category__color\" ng-style=\"{'background':totalPerCategory.categoryDTO.color.color}\">C</span>\n" +
    "                            {{totalPerCategory.categoryDTO.name}}\n" +
    "                        </td>\n" +
    "                        <td class=\"insights__table__amount\">{{totalPerCategory.totalAmount | currency:user.model.currency.symbol}}<span>{{user.model.currency.currencyCode}}</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/feedback/partials/feedback-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedback-modal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendFeedbackAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"feedback-modal__header\">Tell us something</div>\n" +
    "\n" +
    "    <div class=\"feedback-modal__form__close\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissFeedbackModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group form-group-input\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.$submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"subject\" ng-model=\"feedback.model.subject\" placeholder=\"Subject\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.message.$invalid && feedbackForm.$submitted}\">\n" +
    "            <textarea class=\"form-control\" rows=\"6\" name=\"message\" ng-model=\"feedback.model.message\" placeholder=\"Your message\" required></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSending\">\n" +
    "        <div class=\"sending-status\">Sending your message...</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSent\">\n" +
    "        <div class=\"sending-status\">Thanks! We'll get back to you.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"modal-footer__cancelbtn\" type=\"button\" ng-click=\"dismissFeedbackModal()\">Cancel</button>\n" +
    "        <button class=\"modal-footer__sendbtn\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/common/partials/flash-messages.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/flash-messages.html",
    "<!-- Flash messages. -->\n" +
    "<div ng-attr-id=\"{{ identifierId }}\" flash-alert active-class=\"in alert\" class=\"alert--center fade\" duration=\"0\">\n" +
    "    <span class=\"close\" ng-click=\"hide()\">&times;</span>\n" +
    "    <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer-home.html",
    "<footer class=\"footer\">\n" +
    "    <div class=\"footer__wrapper\">\n" +
    "        <div class=\"footer__logo\">\n" +
    "            Revaluate.\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"footer__links\">\n" +
    "            <li>Read our <a href=\"http://blog.revaluate.io\" target=\"_blank\">Blog</a></li>\n" +
    "            <li>Follow us on <a href=\"https://twitter.com/revaluateapp\" target=\"_blank\">Twitter</a></li>\n" +
    "            <li>Like us on <a href=\"https://www.facebook.com/revaluateapp\" target=\"_blank\">Facebook</a></li>\n" +
    "            <li>Contact us via <a href=\"mailto:hello@revaluate.io\">Email</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</footer>");
}]);

angular.module("app/common/partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer.html",
    "<footer class=\"footer\">\n" +
    "    <div class=\"footer__wrapper\">\n" +
    "        <div class=\"footer__logo\">\n" +
    "            Revaluate.\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"footer__links\">\n" +
    "            <li>Read our <a href=\"http://blog.revaluate.io\" target=\"_blank\">Blog</a></li>\n" +
    "            <li>Follow us on <a href=\"https://twitter.com/revaluateapp\" target=\"_blank\">Twitter</a></li>\n" +
    "            <li>Like us on <a href=\"https://www.facebook.com/revaluateapp\" target=\"_blank\">Facebook</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</footer>");
}]);

angular.module("app/common/partials/header-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header-home.html",
    "<div class=\"header-home__wrapper\">\n" +
    "\n" +
    "    <header class=\"header-home\">\n" +
    "\n" +
    "        <div class=\"header-home__brand\">\n" +
    "            <div class=\"header-home__brand--logo\">Logo</div>\n" +
    "            <a href=\"javascript:void(0)\" class=\"header-home__brand--name\">Revaluate</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"header-home__navigation\">\n" +
    "            <li><a href=\"javascript:void(0)\">Pricing</a></li>\n" +
    "            <li><a href=\"javascript:void(0)\">Blog</a></li>\n" +
    "            <li><a href=\"javascript:void(0)\">Contact</a></li>\n" +
    "            <li>\n" +
    "                <button class=\"header-home__navigation--btn\" account-modal-toggle=\"login\">Log in</button>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </header>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<div class=\"header__wrapper\">\n" +
    "    <header class=\"header\">\n" +
    "\n" +
    "        <div class=\"header__brand\">\n" +
    "            <a href=\"javascript:void(0)\" class=\"header__brand--name\">Revaluate</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"header__navigation\">\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\" ui-sref=\"expenses.regular\">Wallet</a>\n" +
    "            </li>\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\" ui-sref=\"insights\">Insights</a>\n" +
    "            </li>\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\">Goals</a>\n" +
    "                <span>Coming soon!</span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"dropdown header__dropdown\" dropdown is-open=\"status.isopen\">\n" +
    "            <button class=\"dropdown-toggle header__dropdown__toggle\" ng-show=\"currentUser.model.firstName + currentUser.model.lastName\" dropdown-toggle data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "                <img class=\"header__dropdown__avatar\" gravatar-src=\"'{{currentUser.model.email}}'\" />\n" +
    "                {{currentUser.model.firstName + \" \" + currentUser.model.lastName}}\n" +
    "                <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu header__dropdown__menu\" role=\"menu\">\n" +
    "                <li><a href=\"javascript:void(0)\" ui-sref=\"settings.profile\">Preferences</a></li>\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0)\" id=\"feedback-trigger\" ng-controller=\"FeedbackModalController\" ng-click=\"openFeedbackModal()\">Send feedback</a>\n" +
    "                </li>\n" +
    "                <li><a href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </header>\n" +
    "</div>");
}]);

angular.module("app/common/partials/inline.confirmation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/inline.confirmation.html",
    "<!--Show content-->\n" +
    "<div ng-if=\"showContent\">\n" +
    "\n" +
    "    <!--Message-->\n" +
    "    <div class=\"message\">{{message}}</div>\n" +
    "\n" +
    "    <button type=\"button\" ng-click=\"confirm();\">Ok</button>\n" +
    "    <button type=\"button\" ng-click=\"cancel();toggleContent();\">Cancel</button>\n" +
    "</div>\n" +
    "\n" +
    "<!--Transclude content-->\n" +
    "<div ng-transclude ng-if=\"! showContent\" ng-click=\"toggleContent()\"></div>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn--expense-popup bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"highlight-button\" dropdown-toggle> {{date | friendlyHourTimePicker}}</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time)\">{{time.timestamp | friendlyHourTimePicker}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a href class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
    "	  <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/alert/alert.html",
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissable' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
    "    <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "        <li ng-repeat=\"slide in slides track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "    <a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a>\n" +
    "    <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
    "  <daypicker ng-switch-when=\"day\" tabindex=\"0\"></daypicker>\n" +
    "  <monthpicker ng-switch-when=\"month\" tabindex=\"0\"></monthpicker>\n" +
    "  <yearpicker ng-switch-when=\"year\" tabindex=\"0\"></yearpicker>\n" +
    "</div>");
}]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group pull-left\">\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "		</span>\n" +
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<ul class=\"pagination\">\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\">{{getText('first')}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\">{{getText('last')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\">\n" +
    "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    </i>\n" +
    "</span>");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "<table>\n" +
    "	<tbody>\n" +
    "		<tr class=\"text-center\">\n" +
    "			<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +
    "			<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +
    "		</tr>\n" +
    "		<tr>\n" +
    "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "				<input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +
    "			<td>:</td>\n" +
    "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "				<input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +
    "			<td ng-show=\"showMeridian\"><button type=\"button\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\">{{meridian}}</button></td>\n" +
    "		</tr>\n" +
    "		<tr class=\"text-center\">\n" +
    "			<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +
    "			<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +
    "		</tr>\n" +
    "	</tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n" +
    "        <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
