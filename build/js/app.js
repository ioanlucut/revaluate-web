"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiEndpoint:'http://revaluate-api-dev.herokuapp.com',mixPanelId:'e9ba9ca056ce11433777e3c8f59014b4'})

;;/**
 * Main common module declaration including ui templates.
 */
angular
    .module("common", [
        "a8m.filter-watcher",
        "ui.router",
        "ngSanitize",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dateparser",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal"
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

            return isSameYear ? 'dddd, D MMMM' : 'dddd, D MMMM YYYY';
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
    .module("common")
    .constant("ALERTS_CONSTANTS", {
        login: "login",
        signUp: "signUp",
        signUpConfirm: "signUpConfirm",
        signUpSetUp: "signUpSetUp",
        forgotPassword: "forgotPassword",
        requestSignUpRegistration: "requestSignUpRegistration",
        resetPassword: "resetPassword",
        updatePassword: "updatePassword",
        validatePassword: "validatePassword",
        createUpdateExpense: "createUpdateExpense",
        expenseList: "expenseList",
        categoryList: "categoryList",
        createUpdateCategory: "createUpdateCategory",
        updateProfile: "updateProfile",
        preferences: "preferences"
    });;/**
 * Common states.
 */
angular
    .module("common")
    .constant("ACTIVITY_INTERCEPTOR", {
        activityStart: "activity-interceptor-start",
        activityEnd: "activity-interceptor-end"
    })
    .constant("STATES", {
        home: "home",
        profile: "profile",
        expenses: "expenses.regular",
        setUp: "setup",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    })
    .constant("ERROR_INTERCEPTOR", {
        status500: "status500"
    });
;/**
 * Date source constants.
 */
angular
    .module("common")
    .constant("DATE_SOURCE", {
        isFromNlp: "naturalLanguageProcessorSource",
        isFromUpdateAction: "updateExpenseSource"
    });;/**
 * Common mixpanel events.
 */
angular
    .module("common")
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
        settings: "Settings",
        error404: "error-404",
        error500: "error-500"
    });;angular
    .module("common")
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
    .module("common")
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
;/* Email list */

angular
    .module("common")
    .directive("emailList", function () {
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                emails: "=ngModel",
                parentForm: "="
            },
            templateUrl: "app/common/partials/emailList/emailList.html",
            link: function (scope, el, attrs) {

                scope.canAddEmail = true;
                scope.$watch("emails.length", function (newLength, oldLength) {

                    if ( newLength > oldLength ) {

                        // Focus the new input
                        el.find("input").focus();
                    }
                });

                scope.addEmail = function (email) {
                    if ( isNaN(attrs.maxEmails) || scope.emails.length < parseInt(attrs.maxEmails) ) {
                        scope.emails.push({ email: email });
                    }

                    if ( !isNaN(attrs.maxEmails) && scope.emails.length >= parseInt(attrs.maxEmails) ) {
                        scope.canAddEmail = false;
                    }
                };

                scope.removeEmail = function (index) {
                    scope.emails.splice(index, 1);
                    scope.canAddEmail = true;
                };
            }
        }
    });
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
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
    .module("common")
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
    .module("common")
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
    .module("common")
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
    .module("common")
    .directive("header", ["$rootScope", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header.html",
            link: function (scope, el) {

                /**
                 * Reference to the current user.
                 * @type {$rootScope.currentUser|*}
                 */
                scope.currentUser = $rootScope.currentUser;
            }
        };
    }]);
;/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
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
;/* Loading bar */

angular.
    module("common").
    directive("loadingBar", ["$rootScope", "ACTIVITY_INTERCEPTOR", function ($rootScope, ACTIVITY_INTERCEPTOR) {
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
    .module("common")
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
    .module('common')
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
    });;/* Natural Language Date Input */

angular
    .module("common")
    .directive("nlpDate", ["$rootScope", "DATE_SOURCE", function ($rootScope, DATE_SOURCE) {
        return {
            require: 'ngModel',
            scope: {
                date: "=",
                text: "=ngModel"
            },
            restrict: "A",
            link: function (scope, el, attrs, ctrl) {
                scope.$watch("text", function (text) {

                    // Implement validation
                    if ( attrs.required && text && attrs.separator ) {

                        // Make sure there is text before the separator
                        ctrl.$setValidity('nlp-required', $.trim(text).indexOf(attrs.separator) !== 0);
                    }

                    // If a separator was specified, use it
                    if ( text && attrs.separator ) {
                        text = text.split(attrs.separator)[1];
                    }

                    // Don't parse empty strings
                    if ( !text ) return;

                    // Parse the string with SugarJS (http://sugarjs.com/)
                    var date = Date.create(text);
                    if ( !date.isValid() ) return;

                    // Make sure date limits are respected
                    if ( attrs.minDate && date.isBefore(scope.$eval(attrs.minDate)) ) return;
                    if ( attrs.maxDate && attrs.maxDate && date.isAfter(attrs.maxDate) ) return;

                    if ( scope.date.getYear() != date.getYear() || scope.date.getMonth() != date.getMonth() || scope.date.getDay() != date.getDay() ) {

                        // Date was changed
                        $rootScope.$broadcast("nlpDate:dateChange", null);
                    }

                    if ( scope.date.getHours() != date.getHours() || scope.date.getMinutes() != date.getMinutes() || scope.date.getSeconds() != date.getSeconds() ) {

                        // Time was changed
                        $rootScope.$broadcast("nlpDate:timeChange", null);
                    }

                    /**
                     * Set date source.
                     * @type {boolean}
                     */
                    date[DATE_SOURCE.isFromNlp] = true;

                    /**
                     * Set the computed date
                     * @type {text}
                     */
                    scope.date = date;
                });
            }
        }
    }]);
;/* Perfect scrollbar */

angular
    .module("common")
    .directive("perfectScrollbar", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                // Init the perfect scrollbar
                el.perfectScrollbar({
                    wheelSpeed: scope.$eval(attrs.wheelSpeed) || 50,
                    wheelPropagation: scope.$eval(attrs.wheelPropagation) || false,
                    minScrollbarLength: scope.$eval(attrs.minScrollbarLength) || false,
                    useBothWheelAxes: scope.$eval(attrs.useBothWheelAxes) || false,
                    useKeyboard: scope.$eval(attrs.useKeyboard) || true,
                    suppressScrollX: scope.$eval(attrs.suppressScrollX) || false,
                    suppressScrollY: scope.$eval(attrs.suppressScrollY) || false,
                    scrollXMarginOffset: scope.$eval(attrs.scrollXMarginOffset) || 0,
                    scrollYMarginOffset: scope.$eval(attrs.scrollYMarginOffset) || 0
                });

                // Update the perfect scrollbar
                attrs.updateOn && scope.$on(attrs.updateOn, function () {
                    el.perfectScrollbar("update");
                });
            }
        }
    });
;/* Scroll to an element on the page */

angular
    .module("common")
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
    .module("common")
    .directive("searchWidget", function () {
        return {
            restrict: "A",
            link: function (scope, el) {
                new UISearch(document.getElementById('sb-search'));
            }
        };
    });
;angular
    .module('common')
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
    .module("common")
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
    .module("common")
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
    .module("common")
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format("h:mm A");
        };
    });
;/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHourTimePicker', function () {
        return function (date) {

            return moment(date).format("hh:mm A");
        };
    });
;angular
    .module("common")
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
    .module('common')
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
    .module('common')
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

angular.
    module("common").
    factory("ActivityInterceptor", ["$rootScope", "$q", "ACTIVITY_INTERCEPTOR", function ($rootScope, $q, ACTIVITY_INTERCEPTOR) {
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
    .module("common")
    .factory("ErrorInterceptor", ["$rootScope", "$q", "ERROR_INTERCEPTOR", function ($rootScope, $q, ERROR_INTERCEPTOR) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {*}
             */
            responseError: function (response) {

                if ( response.status === 500 && !response.config.cache ) {
                    $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
                }

                return $q.reject(response);
            }
        };

    }]);
;angular
    .module("common")
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
    .module("common")
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
    .module("common")
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
    .module('common')
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
    .module("common")
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
    .module("common")
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
    .module("common")
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
    .module("common")
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
    .module("feedback", []);;angular
    .module("feedback")
    .constant("FEEDBACK_URLS", {
        feedback: "feedback/send"
    });
;angular
    .module("feedback")
    .controller("FeedbackModalCtrl", ["$scope", "FeedbackModalService", "Feedback", "$timeout", function ($scope, FeedbackModalService, Feedback, $timeout) {

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
    .module("feedback")
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
    .module("feedback")
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
                controller: "FeedbackModalCtrl",
                windowClass: "modal-feedback"
            });
        };

    }]);
;angular
    .module("feedback")
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
    .module("account", [
        "ui.router",
        "common",
        "currencies",
        "categories"
    ])
    .config(["$stateProvider", "$httpProvider", function ($stateProvider, $httpProvider) {

        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

        // Home
        $stateProvider

            // Login page
            .state("account", {
                url: "/account",
                controller: "LoginCtrl",
                templateUrl: "app/site/partials/home.html",
                title: "Login - Revaluate"
            })

            // Settings page
            .state("settings", {
                url: "/account/settings",
                views: {

                    '': { templateUrl: "app/account/partials/settings/settings.html" },

                    'profile@settings': {
                        templateUrl: "app/account/partials/settings/settings.profile.html"
                    },

                    'preferences@settings': {
                        templateUrl: "app/account/partials/settings/settings.preferences.html"
                    }
                },
                title: "Settings - Revaluate"
            })

            // Logout page
            .state("account:logout", {
                url: "/account/logout",
                controller: "LogoutCtrl",
                templateUrl: "app/account/partials/logout.html",
                resolve: {
                    isSuccessfullyLoggedOut: ["$q", "AuthService", function ($q, AuthService) {
                        AuthService.logout();

                        return true;
                    }]
                },
                title: "Logout - Revaluate"
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
                controller: "ValidatePasswordResetTokenCtrl",
                resolve: {
                    validateTokenResult: ["$stateParams", "$q", "AuthService", "$state", function ($stateParams, $q, AuthService, $state) {
                        var deferred = $q.defer();

                        AuthService.validatePasswordResetToken($stateParams.email, $stateParams.token)
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
                title: "Reset password - Revaluate"
            })
            // Validate password reset token - invalid token
            .state({
                name: "account:validatePasswordResetToken.invalid",
                url: "/invalid-token",
                templateUrl: "app/account/partials/validate_password_reset_token_invalid.html",
                controller: "ValidatePasswordResetTokenInvalidCtrl",
                title: "Reset password - Revaluate"
            })

            /////////////////////////
            /*Sign up related views*/
            /////////////////////////

            // Sign up confirm abstract view
            .state({
                name: "account:confirmRegistration",
                url: "/account/confirm-registration",
                templateUrl: "app/account/partials/signup_confirm_abstract.html",
                abstract: true
            })
            // Sign up confirm - valid
            .state({
                name: "account:confirmRegistration.valid",
                url: "",
                templateUrl: "app/account/partials/signup_confirm_valid.html",
                controller: "SignUpConfirmCtrl",
                title: "Register - Revaluate"
            })
            // Sign up confirm - invalid
            .state({
                name: "account:confirmRegistration.invalid",
                url: "/registration-failed",
                templateUrl: "app/account/partials/signup_confirm_invalid.html",
                controller: "SignUpConfirmInvalidCtrl",
                title: "Register - Revaluate"
            })

            // ---
            // Account - second step of registration (set up).
            // ---
            .state("setup", {
                url: "/setup",
                templateUrl: 'app/account/partials/signup_setup.html',
                controller: "SignUpSetUpRegistrationCtrl",
                title: "Setup - Revaluate",
                resolve: {
                    currencies: ["CurrencyService", function (CurrencyService) {
                        return CurrencyService.getAllCurrencies();
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
    .module("account")
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
        refreshUser: "auth-refresh-user",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    })
    .constant("AUTH_URLS", {
        login: "account/login",
        logout: "account/logout",
        currentUser: "account/user",
        auth: "account",
        create: "account/create",
        update: "account/update",
        details: "account/details",
        requestPasswordReset: "account/requestResetPassword/:email",
        resetPasswordWithToken: "account/resetPassword/:email/:token",
        validatePasswordResetToken: "account/validateResetPasswordToken/:email/:token",
        updatePassword: "account/updatePassword",
        //Below - deprecated
        refreshToken: "auth/refresh_token",
        validateRegistrationToken: "account/validate_email_verification_token/:email/:token",
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
    .module("account")
    .constant("USER_URLS", {
        userUnique: "account/isUniqueEmail"
    });
;/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("account")
    .controller("ForgotPasswordCtrl", ["$state", "$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountModal", function ($state, $scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal) {

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
    .module("account")
    .controller("HomeSignUpRegistrationCtrl", ["$scope", "$timeout", "flash", "ALERTS_CONSTANTS", "StatesHandler", "User", "AuthService", "TimezoneProvider", "MIXPANEL_EVENTS", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, TimezoneProvider, MIXPANEL_EVENTS) {

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
            timezone: jstz.determine().name(),
            currency: {
                "currencyCode": "EUR"
            }
        };

        /**
         * Timezone details
         */
        $scope.timezoneDetails = TimezoneProvider.getTimezoneDescription($scope.signUpData.timezone);

        /*
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Create a new user
                User.$new()
                    .$create(signUpData)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToSetUp();
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
;/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", ["$scope", "flash", "ALERTS_CONSTANTS", "AuthService", "AUTH_EVENTS", "ACCOUNT_FORM_STATE", "AccountModal", "StatesHandler", "$timeout", function ($scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountModal, StatesHandler, $timeout) {

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
         * @type {{username: string, password: string}}
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * Login functionality.
         * @param loginData
         */
        $scope.login = function (loginData) {
            if ( $scope.loginForm.$valid ) {

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        StatesHandler.goToExpenses();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Your email or password are wrong. Please try again.";
                    }).finally(function () {
                        // Stop the loading bar
                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, 2000);
                    })
            }
        };
    }]);
;/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("account")
    .controller("LogoutCtrl", ["$scope", "$timeout", "StatesHandler", "isSuccessfullyLoggedOut", function ($scope, $timeout, StatesHandler, isSuccessfullyLoggedOut) {

        $scope.isSuccessfullyLoggedOut = isSuccessfullyLoggedOut;

        /**
         * Redirect to home after 1,5 sec.
         */
        $timeout(function () {
            StatesHandler.goHome();
        }, 1500);

    }]);
;/**
 * Preferences controller responsible for user update preferences action.
 */
angular
    .module("account")
    .controller("PreferencesCtrl", ["$q", "$scope", "$rootScope", "TimezoneProvider", "flash", "ALERTS_CONSTANTS", function ($q, $scope, $rootScope, TimezoneProvider, flash, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.preferences;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.preferencesData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            email: $scope.user.model.email,
            timezone: $scope.user.model.timezone,
            currency: $scope.user.model.currency
        };

        /**
         * Available timezones.
         */
        $scope.timezones = TimezoneProvider.getTimezones();

        /**
         * Update preferences functionality.
         */
        $scope.updatePreferences = function (preferencesData) {

            if ( $scope.preferencesForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(preferencesData)
                    .then(function () {
                        $scope.preferencesForm.$setPristine();

                        flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
                    });
            }
        };

    }]);;/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", ["$q", "$scope", "$rootScope", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "flash", "ALERTS_CONSTANTS", "MIXPANEL_EVENTS", function ($q, $scope, $rootScope, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settings);

        /**
         * Set default state.
         */
        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            timezone: $scope.user.model.timezone
        };

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(profileData)
                    .then(function () {
                        $scope.user.$refresh().then(function () {
                            $scope.profileForm.$setPristine();

                            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';
                        });
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToExpenses();
        };
    }]);;angular
    .module("account")
    .controller("SignUpConfirmCtrl", ["$scope", "$timeout", "flash", "ALERTS_CONSTANTS", "StatesHandler", "User", "AuthService", "TimezoneProvider", "MIXPANEL_EVENTS", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, TimezoneProvider, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpConfirm;

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            timezone: jstz.determine().name(),
            currency: {
                "currencyCode": "USD"
            }
        };

        /**
         * Timezone details
         */
        $scope.timezoneDetails = TimezoneProvider.getTimezoneDescription($scope.signUpData.timezone);

        /*
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Create a new user
                User.$new()
                    .$create(signUpData)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToSetUp();
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
    .module("account")
    .controller("SignUpConfirmInvalidCtrl", ["$scope", "AuthService", "StatesHandler", function ($scope, AuthService, StatesHandler) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.goHome = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            StatesHandler.goHome();
        };
    }]);
;angular
    .module("account")
    .controller("SignUpSetUpRegistrationCtrl", ["$q", "$rootScope", "$scope", "$timeout", "flash", "AuthService", "AUTH_EVENTS", "ALERTS_CONSTANTS", "CategoriesSetupProvider", "CategoryColorService", "SessionService", "StatesHandler", "Category", "currencies", function ($q, $rootScope, $scope, $timeout, flash, AuthService, AUTH_EVENTS, ALERTS_CONSTANTS, CategoriesSetupProvider, CategoryColorService, SessionService, StatesHandler, Category, currencies) {

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
        const TIMEOUT_DURATION = 300;

        /**
         * Define categories
         */
        $scope.categories = CategoriesSetupProvider.getCategories();

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
                flash.to($scope.alertIdentifierId).success = "Category is not unique";
            }
            else {
                $scope.categories.push({
                    name: $scope.categoryOnTheFly,
                    color: CategoryColorService.randomizedColor().color,
                    selected: true
                });

                // ---
                // Reinitialize the value and form.
                // ---
                $scope.showCategoryOnTheFlyInput = false;
                $scope.categoryOnTheFly = "";
                $scope.setUpForm.categoryOnTheFlyForm.$setPristine();
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
        var minimumCategoriesToSelect = 3;

        function getSelectedCategories() {
            return _.filter($scope.categories, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        $scope.isEnoughSelectedCategories = function () {
            return getSelectedCategories().length >= minimumCategoriesToSelect;
        };

        /**
         * Update profile functionality.
         */
        $scope.setUp = function () {
            if ( $scope.setUpForm.$invalid || $scope.isSaving ) {

                return;
            }

            var selectedCategories = angular.copy(getSelectedCategories());
            var toBeSaved = {
                currency: angular.copy($scope.currency.originalObject),
                initiated: true
            };

            // ---
            // Put all promises in one array.
            // ---
            var promises = [];
            _.each(selectedCategories, function (category) {
                promises.push(Category.build(category).save());
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
            $q
                .all(promises)
                .then(function () {
                    $scope.user
                        .$save(toBeSaved)
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
                        flash.to($scope.alertIdentifierId).error = "Set up successfully!";

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
                });
        };

    }]);;/**
 * Update password controller.
 */
angular
    .module("account")
    .controller("UpdatePasswordCtrl", ["$scope", "flash", "AuthService", "ACCOUNT_FORM_STATE", "ALERTS_CONSTANTS", "ProfileFormToggle", function ($scope, flash, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS, ProfileFormToggle) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        $scope.updatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password data functionality.
         * @param updatePasswordData
         */
        $scope.updatePassword = function (updatePasswordData) {
            if ( $scope.updatePasswordForm.$valid ) {

                AuthService
                    .updatePassword(updatePasswordData.oldPassword, updatePasswordData.newPassword, updatePasswordData.newPasswordConfirmation)
                    .then(function () {
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePasswordSuccessfully);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = response.data && response.data.errors && response.data.errors[0];
                    });
            }
        };
    }]);;angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", ["$scope", "$timeout", "flash", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", "validateTokenResult", "ALERTS_CONSTANTS", function ($scope, $timeout, flash, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult, ALERTS_CONSTANTS) {

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
    .module("account")
    .controller("ValidatePasswordResetTokenInvalidCtrl", ["$scope", "AuthService", "StatesHandler", "ProfileFormToggle", "ACCOUNT_FORM_STATE", function ($scope, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {

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
    .module("account")
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
    .module("account")
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
    .module("account")
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
    .module("account")
    .directive("profileFormToggle", ["ProfileFormToggle", "ACCOUNT_FORM_STATE", function (ProfileFormToggle, ACCOUNT_FORM_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.ProfileFormToggle = ProfileFormToggle;
                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;
            }
        };
    }]);
;/**
 * Directive responsible for checking of a password is strong enough.
 */
angular
    .module("account")
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
    .module("account")
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
    .module("account")
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
    .module("account")
    .service("AccountModal", ["$rootScope", "$timeout", "AUTH_EVENTS", function ($rootScope, $timeout, AUTH_EVENTS) {

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
        $rootScope.$on(AUTH_EVENTS.loginSuccess, _.bind(function () {
            this.close();
        }, this));
    }]);
;angular
    .module("account")
    .value('redirectToUrlAfterLogin', { url: undefined });;/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", ["$rootScope", "$q", "$http", "$location", "redirectToUrlAfterLogin", "SessionService", "AUTH_EVENTS", "AUTH_URLS", "AUTH_TOKEN_HEADER", function ($rootScope, $q, $http, $location, redirectToUrlAfterLogin, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

        /**
         * Is User already authenticated ?
         * @returns {*}
         */
        this.isAuthenticated = function () {
            return SessionService.sessionExists();
        };

        /**
         * Login functionality
         *
         * @param email
         * @param password
         * @returns {*}
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
         *
         * @returns {*}
         */
        this.logout = function () {
            SessionService.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        /**
         * Request password reset functionality
         * @param email
         * @returns {*}
         */
        this.requestPasswordReset = function (email) {
            return $http.post(URLTo.api(AUTH_URLS.requestPasswordReset, { ":email": email }));
        };

        /**
         * Request registration functionality
         * @param email
         * @returns {*}
         */
        this.requestSignUpRegistration = function (email) {
            return $http.post(URLTo.api(AUTH_URLS.requestSignUpRegistration), {
                email: email
            });
        };

        /**
         * Reset password with token.
         *
         * @param email
         * @param password
         * @param passwordConfirmation
         * @param token
         * @returns {*}
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
         *
         * @param token
         * @returns {*}
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
         * Validate registration email token.
         *
         * @param token
         * @param email
         * @returns {*}
         */
        this.validateRegistrationToken = function (email, token) {
            return $http
                .get(URLTo.api(AUTH_URLS.validateRegistrationToken, { ":email": email, ":token": token }),
                {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update password.
         *
         * @param oldPassword
         * @param newPassword
         * @param newPasswordConfirmation
         * @returns {*}
         */
        this.updatePassword = function (oldPassword, newPassword, newPasswordConfirmation) {
            return $http
                .post(URLTo.api(AUTH_URLS.updatePassword),
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirmation: newPasswordConfirmation
                }).then(function (response) {
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
    .module("account")
    .service("AuthFilter", ["AuthService", "StatesHandler", "User", function (AuthService, StatesHandler, User) {

        return function (event, toState) {
            if (
                (toState.url === '/account'
                || toState.name === "home")
                && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToExpenses();
            } else if (
                (toState.url.indexOf("/settings") > -1
                || toState.url.indexOf("/expenses") > -1
                || toState.url.indexOf("/setup") > -1)
                && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            } else if (
                toState.url.indexOf("/setup") > -1
                && AuthService.isAuthenticated()
                && User.$new().loadFromSession().isInitiated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToExpenses();
            }
        };

    }]);;/**
 * Authentication service interceptor used to listen to server responses.
 */
angular
    .module("account")
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
    .module("account")
    .service("ProfileFormToggle", ["ACCOUNT_FORM_STATE", function (ACCOUNT_FORM_STATE) {
        this.state = ACCOUNT_FORM_STATE.updateProfile;

        this.setState = function (state) {
            this.state = state;
        };
    }]);



;angular
    .module("account")
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
    .module("account")
    .factory("User", ["SessionService", "TransformerUtils", "$q", "$http", "AUTH_URLS", function (SessionService, TransformerUtils, $q, $http, AUTH_URLS) {
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
                        helpdeskAuthToken: "",
                        currency: {
                            "currencyCode": ""
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

                    /**
                     * Loads a user from cookies.
                     * @returns {*}
                     */
                    loadFromSession: function () {
                        TransformerUtils.copyKeysFromTo(SessionService.getData() || {}, this.model);

                        return this;
                    },

                    /**
                     * Saves a user to cookies.
                     * @returns {*}
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        TransformerUtils.copyKeysFromTo(this, sessionData, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    $save: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @param token
                     * @returns {*}
                     */
                    $create: function (fromData) {
                        var toBeCreated = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

                        return this.createAccount(toBeCreated);
                    },

                    $refresh: function () {
                        var that = this;

                        return this
                            .retrieveDetails()
                            .then(function (response) {
                                TransformerUtils.copyKeysFromTo(response.data, that);
                                that.saveToSession();

                                return response;
                            })
                            .catch(function (response) {
                                return $q.reject(response);
                            });
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
                     * @param token
                     * @returns {*}
                     */
                    createAccount: function (account) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.create),
                            account,
                            { skipAuthorization: true })
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
                        return $http.post(URLTo.api(AUTH_URLS.update), account);
                    }

                };
            }

        };
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "common"
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
                controller: "LandingPageCtrl",
                title: "Change the way you spend your money"
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "app/site/partials/privacy.html",
                title: "Privacy - Revaluate"
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/site/partials/about.html",
                title: "About - Revaluate"
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageCtrl",
                title: "Hmm... looks like a 404"
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageCtrl",
                title: "Oops... You found a 500"
            });
    }]);
;/**
 * Abstract error page controller.
 */
angular
    .module("common")
    .controller("AbstractErrorPageCtrl", ["$scope", "StatesHandler", function ($scope, StatesHandler) {

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
    .module("common")
    .controller("Error404PageCtrl", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageCtrl', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error404);
    }]);
;/**
 * 500 page controller.
 */
angular
    .module("common")
    .controller("Error500PageCtrl", ["$scope", "$controller", "MIXPANEL_EVENTS", function ($scope, $controller, MIXPANEL_EVENTS) {

        /**
         * Inherit from this controller
         */
        $controller('AbstractErrorPageCtrl', { $scope: $scope });

        /**
         * Track error event
         */
        $scope.trackErrorEvent(MIXPANEL_EVENTS.error500);
    }]);;/**
 * Landing page controller.
 */
angular
    .module("common")
    .controller("LandingPageCtrl", ["$state", "$scope", "ACCOUNT_FORM_STATE", "MIXPANEL_EVENTS", function ($state, $scope, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);
    }]);
;angular
    .module("currencies", [
        "common"
    ]);;/**
 * Currencies constants.
 */
angular
    .module("currencies")
    .constant("CURRENCY_URLS", {
        allCurrencies: "currency/list"
    });;/**
 * Currencies service which encapsulates the whole logic related to currencies.
 */
angular
    .module("currencies")
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
    .module("categories", [
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("categories", {
                url: "/categories",
                templateUrl: 'app/categories/partials/categories.html',
                controller: "CategoryListCtrl",
                resolve: {
                    categories: ["CategoryService", function (CategoryService) {
                        return CategoryService.getAllCategories();
                    }]
                },
                title: "Categories - Revaluate"
            })

    }]);;/**
 * Categories constants.
 */
angular
    .module("categories")
    .constant("CATEGORY_URLS", {
        isUnique: "categories/isUniqueCategory",
        create: "categories/create",
        update: "categories/update",
        delete: "categories/remove/:id",
        allCategories: "categories/retrieve"
    })
    .constant("CATEGORY_EVENTS", {
        isErrorOccurred: "category-error-occurred",
        isCreated: "category-is-created",
        isDeleted: "category-is-deleted",
        isUpdated: "category-is-updated"
    });;angular
    .module("categories")
    .controller("CategoryCreateCtrl", ["$scope", "$rootScope", "CategoryColorService", "Category", "$timeout", "CATEGORY_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, CategoryColorService, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (categoryForm) {
            $scope.category = Category.build({ color: CategoryColorService.randomizedColor().color });

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
    .module("categories")
    .controller("CategoryEditRemoveCtrl", ["$scope", "$rootScope", "Category", "$timeout", "CATEGORY_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        const TIMEOUT_DURATION = 300;

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
    .module("categories")
    .controller("CategoryListCtrl", ["$scope", "$rootScope", "Category", "flash", "CATEGORY_EVENTS", "$timeout", "categories", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, Category, flash, CATEGORY_EVENTS, $timeout, categories, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {
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
         * Existing categories.
         */
        $scope.categories = categories;

        $scope.$on(CATEGORY_EVENTS.isErrorOccurred, function () {

            flash.to($scope.alertIdentifierId).error = "Error occurred!";
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
    .module("categories")
    .directive("addCategory", ["$rootScope", "CATEGORY_EVENTS", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryCreateCtrl',
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
    .module("categories")
    .directive("colorPicker", ["CATEGORY_EVENTS", "CategoryColorService", "$timeout", "$animate", function (CATEGORY_EVENTS, CategoryColorService, $timeout, $animate) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                categoryColor: "="
            },
            templateUrl: "app/categories/partials/color-picker-directive-template.html",
            link: function (scope, el, attrs) {

                // By default the popover is closed
                scope.isOpen = false;

                // Open the popover
                scope.open = function () {
                    scope.isOpen = true;
                };

                // Close the popover
                scope.close = function () {
                    scope.isOpen = false;
                };

                // ---
                // We check events on the sibling input.
                // ---
                var input = el.prev('input');

                input.on("focus", function () {
                    scope.$apply(function () {
                        scope.open();
                    });
                });

                input.on("blur", function () {
                    scope.$apply(function () {
                        scope.close();
                    });
                });

                var CLASS_OPEN = "color-picker-box--open";

                // Open or close the modal
                scope.$watch("isOpen", function (isOpen, isOpenOld) {
                    if ( isOpen === true ) {
                        $animate.addClass(el, CLASS_OPEN);
                    }
                    else if ( isOpen === false && isOpenOld === true ) {
                        $animate.removeClass(el, CLASS_OPEN);
                    }
                });

                // ---
                // Colors.
                // ---
                scope.colors = CategoryColorService.getColorsPool();

                // ---
                // Select the color.
                // ---
                scope.select = function (chosenColor) {
                    scope.categoryColor = chosenColor.color;

                    scope.close();
                };
            }
        };
    }]);;angular
    .module("categories")
    .directive("editRemoveCategory", ["$rootScope", "CATEGORY_EVENTS", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryEditRemoveCtrl',
            scope: {
                category: "="
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
    .module("categories")
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
    .module("categories")
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
    .module("categories")
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
    .module("categories")
    .service("CategoriesSetupProvider", function () {

        this.categories = [
            {
                "name": "Bills",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Food",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Clothes",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Car",
                "color": "#FFDD00",
                selected: false
            },
            {
                "name": "Donations",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Hobby",
                "color": "#FFDD00",
                selected: false
            },
            {
                "name": "Health",
                "color": "#826274",
                selected: false
            },
            {
                "name": "Education",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Investments",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "House",
                "color": "#8471B1",
                selected: false
            },
            {
                "name": "Entertainment",
                "color": "#8471B1",
                selected: false
            }];

        this.getCategories = function () {
            return this.categories;
        };

    });
;angular
    .module("categories")
    .service('CategoryColorService', function () {
        var hexPool = [
            {
                color: "#C3272B"
            },
            {
                color: "#DB5A6B"
            },
            {
                color: "#875F9A"
            },
            {
                color: "#22A7F0"
            },
            {
                color: "#317589"
            },
            {
                color: "#1F4788"
            },
            {
                color: "#006442"
            },
            {
                color: "#26A65B"
            },
            {
                color: "#36D7B7"
            },
            {
                color: "#FFB61E"
            },
            {
                color: "#CA6924"
            },
            {
                color: "#6C7A89"
            },
            {
                color: "#121212"
            },
            {
                color: "#BDC3C7"
            }];

        return {
            randomizedColor: function () {
                return hexPool[Math.floor(Math.random() * hexPool.length)];
            },

            getColorsPool: function () {
                return hexPool;
            },

            generateColor: function () {
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
        }
    });;/**
 * Categories service which encapsulates the whole logic related to categories.
 */
angular
    .module("categories")
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
                .post(URLTo.api(CATEGORY_URLS.update), categoryDto)
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
    .module("categories")
    .service("CategoryTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a category business object model to a categoryDto object.
         * @param category
         * @param skipKeys
         * @returns {{}}
         */
        this.toCategoryDto = function (category, skipKeys) {
            var categoryDto = {};

            TransformerUtils.copyKeysFromTo(category.model, categoryDto, skipKeys);

            return categoryDto;
        };

        /**
         * Converts a categoryDto object to a category business object model.
         * @param categoryDto
         * @param category
         * @param skipKeys
         * @returns {*}
         */
        this.toCategory = function (categoryDto, category, skipKeys) {
            category = category || $injector.get('Category').build();

            TransformerUtils.copyKeysFromTo(categoryDto, category.model, skipKeys);

            return category;
        };

        /**
         * Transform a list of categories as JSON to a list of categories as business object.
         * @param categoryDtos
         * @returns {Array}
         */
        this.toCategories = function (categoryDtos) {
            var categories = [];

            _.each(categoryDtos, _.bind(function (categoryDto) {
                categories.push(this.toCategory(categoryDto));
            }, this));

            return categories;
        };
    }]);
;angular
    .module("categories")
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
                 * The category due date
                 */
                color: ""
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
    }]);;/**
 * Main site module declaration including ui templates.
 */
angular
    .module("expenses", [
        "ui.router",
        "angular-ladda",
        "fiestah.money",
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("expenses", {
                url: "/expenses",
                templateUrl: 'app/expenses/partials/expense/expenses.template.html',
                abstract: true
            })

            // Regular case
            .state("expenses.regular", {
                url: "",
                views: {
                    'add': {
                        templateUrl: "app/expenses/partials/expense/expenses.add.html",
                        controller: "ExpenseCreateController",
                        resolve: {
                            categories: ["CategoryService", function (CategoryService) {
                                return CategoryService.getAllCategories();
                            }]
                        }
                    },

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListController",
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

            // Review case
            .state("expenses.update", {
                url: "/{id}/update",
                views: {

                    'action': {
                        controller: "ExpenseAutoEditCtrl",
                        resolve: {
                            expenseToReview: ["$stateParams", "$q", "$state", "ExpenseService", function ($stateParams, $q, $state, ExpenseService) {
                                var deferred = $q.defer();

                                ExpenseService
                                    .getDetails($stateParams.id)
                                    .then(function (response) {
                                        deferred.resolve(response);

                                        return response;
                                    })
                                    .catch(function (response) {

                                        $state.go("expenses.regular");
                                        return response;
                                    });

                                return deferred.promise;
                            }]
                        }

                    },

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListController",
                        resolve: {
                            expenses: ["ExpenseService", function (ExpenseService) {
                                return ExpenseService.getAllExpenses();
                            }]
                        }
                    }
                },
                title: "Preview expense - Revaluate"
            })

            // Opened modal
            .state("expenses.new", {
                url: "/new",
                views: {

                    'list': {
                        templateUrl: "app/expenses/partials/expense/expenses.list.html",
                        controller: "ExpenseListController",
                        resolve: {
                            expenses: ["ExpenseService", function (ExpenseService) {
                                return ExpenseService.getAllExpenses();
                            }]
                        }
                    }
                },
                title: "Preview expense - Revaluate"
            })

    }]);;/**
 * Expenses constants.
 */
angular
    .module("expenses")
    .constant("EXPENSE_URLS", {
        create: "expenses/create",
        update: "expenses/update",
        details: "expenses/:id",
        delete: "/expenses/remove/:id",
        allExpenses: "expenses/retrieve",
        pastExpenses: "expenses/past?:local_time&:local_time_zone",
        upcomingExpenses: "expenses/upcoming?:local_time&:local_time_zone",
        unSubscribeExpense: "expenses/:id/unsubscribe"
    })
    .constant("EXPENSE_EVENTS", {
        isCreated: "expense-is-created",
        isUnSubscribed: "expense-is-unsubscribed",
        isDeleted: "expense-is-deleted",
        isUpdated: "expense-is-updated"
    });;angular
    .module("expenses")
    .controller("ExpenseCreateController", ["$scope", "$rootScope", "$stateParams", "Expense", "categories", "$window", "DatesUtils", "$timeout", "StatesHandler", "EXPENSE_EVENTS", "flash", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, $stateParams, Expense, categories, $window, DatesUtils, $timeout, StatesHandler, EXPENSE_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateExpense;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 800;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (expenseForm) {

            //clear the input
            $scope.$broadcast('angucomplete-alt:clearInput');

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
             * Max date to create expense
             */
            $scope.maxDate = moment().hours(0).minutes(0).seconds(0);
        };

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(2000);

        /**
         * Open date picker
         * @param $event
         */
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        /**
         * Saves the expense or updates it.
         */
        $scope.saveExpense = function () {
            if ( $scope.expenseForm.$valid && !$scope.isSaving ) {

                var isDateInFuture = moment().diff($scope.expense.model.spentDate || $scope.expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    $scope.expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }

                // Is saving expense
                $scope.isSaving = true;

                // Update the  chosen category
                $scope.expense.model.category = angular.copy($scope.category.originalObject.model);
                // Ok, update master expense.
                angular.copy($scope.expense, $scope.masterExpense);

                $scope.masterExpense.save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseCreated);

                        var expenseToBePushed = angular.copy($scope.masterExpense);
                        $timeout(function () {
                            $scope.isSaving = false;

                            $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, {
                                expense: expenseToBePushed
                            });
                        }, TIMEOUT_DURATION);

                        /**
                         * Finally, reset.
                         */
                        $scope.initOrReset($scope.expenseForm);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isModalOpened = false;
                    });
            }
        };

    }]);
;angular
    .module("expenses")
    .controller("ExpenseDeleteModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$timeout", "StatesHandler", "EXPENSE_EVENTS", "expense", "expenseIndex", "MIXPANEL_EVENTS", function ($scope, $rootScope, $stateParams, $window, $timeout, StatesHandler, EXPENSE_EVENTS, expense, expenseIndex, MIXPANEL_EVENTS) {

        /**
         * Expense to be created (injected with few default values)
         */
        $scope.expense = expense;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        /**
         * Remove expense - owner action;
         */
        $scope.deleteExpenseAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting expense
                $scope.isDeleting = true;

                // Destroy expense
                $scope.expense.destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseDeleted);

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, {
                                expense: $scope.expense,
                                expenseIndex: expenseIndex,
                                message: 'Expense successfully deleted!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

        /**
         * Un subscribe from expense - recipient action.
         */
        $scope.unSubscribeFromExpenseAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting expense
                $scope.isDeleting = true;

                $scope.expense.unSubscribe()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseUnSubscribed);

                        $timeout(function () {
                            $rootScope.$broadcast(EXPENSE_EVENTS.isUnSubscribed, {
                                expense: $scope.expense,
                                expenseIndex: expenseIndex,
                                message: 'Successfully un-subscribed from this expense!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
;angular
    .module("expenses")
    .controller("ExpenseEntryController", ["$scope", "$rootScope", "Expense", "$timeout", "EXPENSE_EVENTS", "MIXPANEL_EVENTS", function ($scope, $rootScope, Expense, $timeout, EXPENSE_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        const TIMEOUT_DURATION = 300;

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
                if ( category && category.originalObject ) {
                    expense.model.category = angular.copy(category.originalObject.model);
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
;/**
 * Expenses controller.
 */
angular
    .module("expenses")
    .controller("ExpenseListController", ["$scope", "$rootScope", "flash", "ExpenseMatchingGroupService", "EXPENSE_EVENTS", "$timeout", "categories", "expenses", "MIXPANEL_EVENTS", "ALERTS_CONSTANTS", function ($scope, $rootScope, flash, ExpenseMatchingGroupService, EXPENSE_EVENTS, $timeout, categories, expenses, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

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
    }]);;angular
    .module("expenses")
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
    .module("expenses")
    .directive("expenseEntry", ["$rootScope", "EXPENSE_EVENTS", function ($rootScope, EXPENSE_EVENTS) {
        return {
            restrict: "A",
            controller: 'ExpenseEntryController',
            scope: {
                categories: "=",
                expense: "="
            },
            templateUrl: "app/expenses/partials/expense/expense.entry.template.html",
            link: function (scope, el, attrs) {

                /**
                 * Current user.
                 */
                scope.user = $rootScope.currentUser;

                /**
                 * Keep the master backup
                 */
                scope.masterExpense = angular.copy(scope.expense);

                /**
                 * Selected category
                 * @type {{}}
                 */
                scope.category = {};

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

                    scope.expense = angular.copy(scope.masterExpense);
                };

                /**
                 * On expense updated/deleted - hide everything.
                 */
                $rootScope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                    if ( scope.expense.model.id === args.expense.model.id ) {
                        scope.toggleContent();

                        // ---
                        // Update the master expense.
                        // ---
                        scope.masterExpense = angular.copy(scope.expense);
                    }
                });
            }
        }
    }]);
;/* Email list */

angular
    .module("expenses")
    .directive("expenseList", ["$rootScope", "$timeout", "EXPENSE_EVENTS", function ($rootScope, $timeout, EXPENSE_EVENTS) {
        return {
            restrict: "A",
            scope: {
                expenses: "=",
                categories: "=",
                searchByText: "="
            },
            templateUrl: "app/expenses/partials/expense/expense.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.reverseOrder = attrs.sort === "desc";

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
                 * Load more upcoming expenses.
                 */
                scope.loadMoreExpenses = function () {
                    scope.isLoadingMore = !scope.isLoadingMore;
                    $timeout(function () {
                        scope.expensesLimit = scope.expensesLimit + scope.defaultExpensesLimit;
                        scope.isLoadingMore = !scope.isLoadingMore;
                    }, 500);
                };

                /**
                 * Past expenses still to be loaded ?
                 * @returns {boolean}
                 */
                scope.isStillExpensesToBeLoaded = function () {
                    return scope.expensesLimit < scope.expenses.length;
                };

                /**
                 * Open DELETE modal
                 * @param expense
                 * @param expenseIndex
                 */
                scope.openDeleteExpenseModalService = function (expense, expenseIndex) {
                };

                /**
                 * Open UN SUBSCRIBE modal - which is the same as DELETE modal.
                 * @param expense
                 * @param expenseIndex
                 */
                scope.openUnSubscribeExpenseModalService = function (expense, expenseIndex) {
                };

                /**
                 * Open UPDATE modal
                 * @param expense
                 * @param expenseIndex
                 */
                scope.openUpdateExpenseModalService = function (expense, expenseIndex) {
                };

                scope.showGroupIfFirst = function (expense, expenseIndex) {
                };

                /**
                 * On expense deleted flag the deleted index.
                 */
                scope.$on(EXPENSE_EVENTS.isDeleted, function (event, args) {
                });

                /**
                 * On expense updated flag the updated index.
                 */
                scope.$on(EXPENSE_EVENTS.isUpdated, function (event, args) {
                });
            }
        }
    }]);
;angular
    .module("expenses")
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
                    elem[0].value = ctrl.$modelValue * 100;
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
    .module("common")
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
    .module("expenses")
    .filter('expensesHeader', ["$sce", function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<span class="expense-list-box__header__past">You have $1 expenses</span>' : '<span class="expense-list-box__header__upcoming">Your expenses</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    }]);;angular
    .module("expenses")
    .filter('groupLimit', function () {
        return function (inputGrouped, input, limit) {
            if ( limit > input.length )
                limit = input.length;
            else if ( limit < -input.length )
                limit = -input.length;

            // Should not exceed the limit
            var commonSumIndex = 0;
            var inputGroupedExpenses;
            var currentGroupIndex;

            // Remove every expense from grouped expenses which are more than the limit
            for ( var idx = 0; idx < inputGrouped.length; idx++ ) {
                inputGroupedExpenses = inputGrouped[idx].values;

                for ( currentGroupIndex = 0; currentGroupIndex < inputGroupedExpenses.length; currentGroupIndex++ ) {
                    commonSumIndex += 1;

                    if ( commonSumIndex > limit ) {
                        inputGroupedExpenses.splice(currentGroupIndex, 1);
                    }
                }
            }

            return inputGrouped;
        };
    });;angular
    .module("expenses")
    .filter('highlightSearch', ["$sce", function ($sce) {
        return function (text, phrase) {
            if ( phrase ) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="expense__found--highlight">$1</span>');

            return $sce.trustAsHtml(text)
        };
    }]);;angular
    .module("expenses")
    .filter('remindersHeader', ["$sce", function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<a class="expense-list-box__header__past" href="#">You have $1 past expenses</a>' : '<span class="expense-list-box__header__upcoming">Your upcoming expenses</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    }]);;/**
 * Expenses service which encapsulates the whole logic related to expenses.
 */
angular
    .module("expenses")
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
                .post(URLTo.api(EXPENSE_URLS.update), expenseDto)
                .then(function (response) {
                    ExpenseTransformerService.toExpense(response.data, expense);

                    return response;
                });
        };

        /**
         * UnSubscribe from a expense.
         * @param expense
         * @returns {*}
         */
        this.unSubscribeFromExpense = function (expense) {
            var expenseDto = ExpenseTransformerService.toExpenseDto(expense);

            return $http
                .post(URLTo.api(EXPENSE_URLS.unSubscribeExpense, { ":id": expenseDto.id }), expenseDto);
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
    }]);
;/**
 * Expense transformer service which transforms a expense DTO model object to a expense business object.
 */
angular
    .module("expenses")
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
    }]);
;angular
    .module("expenses")
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
                category: "",

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
    }]);;/**
 * Expense transformer service which transforms a expense DTO model object to a expense business object.
 */
angular
    .module("expenses")
    .service("ReminderTransformerService", ["$injector", "TransformerUtils", function ($injector, TransformerUtils) {

        /**
         * Converts a expense business object model to a reminderDto object.
         * @param expense
         * @param skipKeys
         * @returns {{}}
         */
        this.toReminderDto = function (expense, skipKeys) {
            var reminderDto = {};

            TransformerUtils.copyKeysFromTo(expense.model, reminderDto, skipKeys);
            if ( reminderDto.dueOn ) {
                reminderDto.dueOn = reminderDto.dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            }
            reminderDto.text = $.trim(reminderDto.text.split("@")[0]);
            reminderDto.recipients = TransformerUtils.sanitizeRecipients(reminderDto.recipients);

            return reminderDto;
        };

        /**
         * Converts a reminderDto object to a expense business object model.
         * @param reminderDto
         * @param expense
         * @param skipKeys
         * @returns {*}
         */
        this.toReminder = function (reminderDto, expense, skipKeys) {
            expense = expense || $injector.get('Expense').build();

            TransformerUtils.copyKeysFromTo(reminderDto, expense.model, skipKeys);

            // handle date conversion
            if ( expense.model.dueOn ) {
                expense.model.dueOn = moment(expense.model.dueOn).toDate();
            }
            //handle addresses conversion
            var recipient = expense.model.recipients;
            if ( _.isEmpty(recipient) ) {
                expense.model.recipients = [];
            }
            else if ( _.isArray(recipient) ) {
                expense.model.recipients = recipient;
            }

            return expense;
        };

        /**
         * Transform a list of expenses as JSON to a list of expenses as business object.
         * @param reminderDtos
         * @returns {Array}
         */
        this.toReminders = function (reminderDtos) {
            var expenses = [];

            _.each(reminderDtos, _.bind(function (reminderDto) {
                expenses.push(this.toReminder(reminderDto));
            }, this));

            return expenses;
        };
    }]);
;/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "config",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "angular-flash.service",
        "angular-flash.flash-alert-directive",
        "angucomplete-alt",
        "ngStorage",
        "partials",
        "site",
        "feedback",
        "common",
        "categories",
        "expenses",
        "account",
        "angular.filter"
    ])
    .config(["$locationProvider", function ($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .run(["ENV", function (ENV) {

        URLTo.apiBase(ENV.apiEndpoint);
    }]);;/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", ["$rootScope", "$scope", "$state", "$timeout", "$log", "AuthService", "User", "StatesHandler", "AUTH_EVENTS", "ACTIVITY_INTERCEPTOR", "ERROR_INTERCEPTOR", "ENV", function ($rootScope, $scope, $state, $timeout, $log, AuthService, User, StatesHandler, AUTH_EVENTS, ACTIVITY_INTERCEPTOR, ERROR_INTERCEPTOR, ENV) {

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
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(ERROR_INTERCEPTOR.status500, function () {
            $state.go('500');
        });
    }]);
;angular.module('partials', ['app/site/partials/404.html', 'app/site/partials/500.html', 'app/site/partials/about.html', 'app/site/partials/home.html', 'app/site/partials/privacy.html', 'app/categories/partials/add-category-directive-template.html', 'app/categories/partials/categories.html', 'app/categories/partials/color-picker-directive-template.html', 'app/categories/partials/edit-remove-category-directive-template.html', 'app/expenses/partials/expense.category.template.html', 'app/expenses/partials/expense/expense.entry.template.html', 'app/expenses/partials/expense/expense.list.template.html', 'app/expenses/partials/expense/expenses.add.html', 'app/expenses/partials/expense/expenses.list.html', 'app/expenses/partials/expense/expenses.template.html', 'app/account/partials/account.html', 'app/account/partials/account_close.html', 'app/account/partials/logout.html', 'app/account/partials/settings/settings.html', 'app/account/partials/settings/settings.preferences.html', 'app/account/partials/settings/settings.profile.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/signup_setup.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/feedback/partials/feedback-modal.html', 'app/common/partials/emailList/emailList.html', 'app/common/partials/flash-messages.html', 'app/common/partials/footer-home.html', 'app/common/partials/footer.html', 'app/common/partials/header-home.html', 'app/common/partials/header.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/accordion/accordion-group.html', 'template/accordion/accordion.html', 'template/alert/alert.html', 'template/carousel/carousel.html', 'template/carousel/slide.html', 'template/datepicker/datepicker.html', 'template/datepicker/day.html', 'template/datepicker/month.html', 'template/datepicker/popup.html', 'template/datepicker/year.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/pagination/pager.html', 'template/pagination/pagination.html', 'template/popover/popover.html', 'template/progressbar/bar.html', 'template/progressbar/progress.html', 'template/progressbar/progressbar.html', 'template/rating/rating.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/timepicker/timepicker.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html', 'template/typeahead/typeahead-match.html', 'template/typeahead/typeahead-popup.html']);

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
    "        <h3 class=\"home__description\">Keep a record of all your expenses. Or just some of them. Your choice.\n" +
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
    "        <div class=\"home__section__signup\" ng-controller=\"HomeSignUpRegistrationCtrl\">\n" +
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
    "                <button class=\"home__section__signup__btn\" type=\"submit\">Start my 14 day free trial</button>\n" +
    "            </form>\n" +
    "\n" +
    "            <!--<div class=\"home__action-btn\">-->\n" +
    "            <!--<div class=\"home__action-btn--label\">Sign up</div>-->\n" +
    "            <!--<div class=\"home__action-btn--pricing\">It's free for 15 days, then $7/month.</div>-->\n" +
    "            <!--</div>-->\n" +
    "            <!--<div class=\"home__action-btn--info\">-->\n" +
    "            <!--No credit card required.-->\n" +
    "            <!--</div>-->\n" +
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
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color}\"></label>\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"text\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div color-picker category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "            <input class=\"categories__form__input-group__name\" type=\"text\" placeholder=\"Category name\" name=\"name\" ng-model=\"category.model.name\" auto-focus required valid-category-name unique-category-name />\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__add__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button class=\"categories__add__form__content__right__cancel\" ng-click=\"toggleContent();initOrReset(categoryForm)\">Nevermind</button>\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"categories__add__form__content__right__add\" type=\"submit\">{{isSaving ? 'Adding..' : 'Add'}}</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("app/categories/partials/categories.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/categories.html",
    "<div class=\"page-wrapper\">\n" +
    "\n" +
    "    <div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "    <div class=\"view-container__content categories\">\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!--Add category-->\n" +
    "        <div class=\"categories__add\" add-category></div>\n" +
    "\n" +
    "        <!--List all categories-->\n" +
    "        <div class=\"categories__edit\">\n" +
    "\n" +
    "            <div class=\"categories__edit__category\" ng-repeat=\"category in categories track by category.model.name\">\n" +
    "\n" +
    "                <!--Edit/remove category-->\n" +
    "                <div edit-remove-category category=\"category\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div footer class=\"view-container__footer\"></div>\n" +
    "\n" +
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
    "            <div class=\"color-picker__popover__colors__color\" ng-repeat=\"color in colors\">\n" +
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
    "    <span class=\"categories__edit__category__color\" ng-style=\"{'background':category.model.color}\">C</span>\n" +
    "    <span class=\"categories__edit__category__label\">{{category.model.name}}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"categories__edit__category__controls\" ng-if=\"! showContent\">\n" +
    "    <!--Show content-->\n" +
    "    <button class=\"categories__edit__category__delete\" ng-click=\"deleteCategory(category)\">{{isDeleting ? 'Deleting..' : 'Delete'}}</button>\n" +
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
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color}\"></label>\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"text\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div color-picker category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Category label form group-->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"categories__form__input-group__name\" type=\"text\" placeholder=\"Category name\" name=\"name\" ng-model=\"category.model.name\" auto-focus required valid-category-name unique-category-name except=\"masterCategory.model.name\" />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__edit__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button class=\"categories__edit__form__content__right__cancel\" ng-click=\"cancel();\">Nevermind</button>\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"categories__edit__form__content__right__update\" type=\"submit\">{{isUpdating ? 'Saving..' : 'Save changes'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/expenses/partials/expense.category.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense.category.template.html",
    "<div class=\"angucomplete-holder\" ng-class=\"{'angucomplete-dropdown-visible': showDropdown}\">\n" +
    "    <input id=\"{{id}}_value\" ng-model=\"searchStr\" ng-disabled=\"disableInput\" type=\"{{type}}\" placeholder=\"{{placeholder}}\" maxlength=\"{{maxlength}}\" ng-focus=\"onFocusHandler()\" class=\"{{inputClass}}\" ng-focus=\"resetHideResults()\" ng-blur=\"hideResults($event)\" autocapitalize=\"off\" autocorrect=\"off\" autocomplete=\"off\" ng-change=\"inputChangeHandler(searchStr)\" />\n" +
    "\n" +
    "    <div id=\"{{id}}_dropdown\" class=\"angucomplete-dropdown\" ng-show=\"showDropdown\">\n" +
    "        <div class=\"angucomplete-searching\" ng-show=\"searching\" ng-bind=\"textSearching\"></div>\n" +
    "        <div class=\"angucomplete-searching\" ng-show=\"!searching && (!results || results.length == 0) || true\" ng-bind=\"textNoResults\"></div>\n" +
    "        <div class=\"angucomplete-row\" ng-repeat=\"result in results\" ng-click=\"selectResult(result)\" ng-mouseenter=\"hoverRow($index)\" ng-class=\"{'angucomplete-selected-row': $index == currentIndex}\">\n" +
    "            <div class=\"angucomplete-image-holder\">\n" +
    "                <label class=\"categories__form__color__preview\" ng-style=\"{'background':result.originalObject.model.color}\"></label>\n" +
    "            </div>\n" +
    "            <div class=\"angucomplete-title\" ng-if=\"matchClass\" ng-bind-html=\"result.title\"></div>\n" +
    "            <div class=\"angucomplete-title\" ng-if=\"!matchClass\">{{ result.title }}</div>\n" +
    "            <div ng-if=\"matchClass && result.description && result.description != ''\" class=\"angucomplete-description\" ng-bind-html=\"result.description\"></div>\n" +
    "            <div ng-if=\"!matchClass && result.description && result.description != ''\" class=\"angucomplete-description\">{{result.description}}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expense.entry.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expense.entry.template.html",
    "<!--Display expense-->\n" +
    "<div class=\"expenses__list__entry__display\" ng-if=\"! showContent\" ng-click=\"toggleContent()\">\n" +
    "\n" +
    "    <div class=\"expenses__list__entry__price\">\n" +
    "        {{expense.model.value | currency:\"\"}}\n" +
    "        <span class=\"expenses__list__entry__currency\">{{user.model.currency.currencyCode}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Expense category-->\n" +
    "    <div class=\"expenses__list__entry__category\" ng-style=\"{'background':expense.model.category.color}\" ng-bind-html=\"expense.model.category.name\"></div>\n" +
    "\n" +
    "    <!--Expense description-->\n" +
    "    <div class=\"expenses__list__entry__details\" ng-bind-html=\"expense.model.description | highlightSearch:searchByText\"></div>\n" +
    "\n" +
    "    <!--Expense date-->\n" +
    "    <div class=\"expenses__list__entry__date\">{{expense.model.spentDate | friendlyDate}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Display expense form -->\n" +
    "<div class=\"expenses__form\" ng-if=\"showContent\">\n" +
    "\n" +
    "    <form name=\"expenseForm\" ng-submit=\"updateExpense(expenseForm, expense, category)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Form groups -->\n" +
    "        <div class=\"expense__form__price\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.value.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" ng-model=\"expense.model.value\" format-price format=\"number\" required valid-price />\n" +
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
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.$error['autocomplete-required'] || expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <div angucomplete-alt\n" +
    "                 selected-object=\"category\"\n" +
    "                 local-data=\"categories\"\n" +
    "                 search-fields=\"model.name\"\n" +
    "                 title-field=\"model.name\"\n" +
    "                 field-required=\"true\"\n" +
    "                 placeholder=\"Add category\"\n" +
    "                 maxlength=\"50\"\n" +
    "                 pause=\"1\"\n" +
    "                 minlength=\"0\"\n" +
    "                 initial-value=\"{{expense.model.category.name}}\"\n" +
    "                 input-class=\"expense__form__category__input\"\n" +
    "                 match-class=\"highlight\"\n" +
    "                 template-url=\"app/expenses/partials/expense.category.template.html\">\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"autocomplete-required\">Category is missing or is invalid.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group-input__message\" ng-if=\"expenseForm.category.$invalid && expenseForm.$submitted\">Please add a category.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"20\" placeholder=\"Add details (optional)\" ng-model=\"expense.model.description\" escape-html />\n" +
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
    "            <input type=\"hidden\" name=\"spentDate\" ng-model=\"expense.model.spentDate\" required valid-date />\n" +
    "\n" +
    "            <!--Expense date picker-->\n" +
    "            <div class=\"expense__form__date__input\">\n" +
    "                <button ng-click=\"open($event)\" type=\"button\" datepicker-popup is-open=\"opened\" min-date=\"minDate\" max-date=\"maxDate\" ng-model=\"expense.model.spentDate\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\">{{expense.model.spentDate | friendlyDate}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please make that you add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit\">\n" +
    "            <span>Hit Enter to</span>\n" +
    "            <button type=\"submit\"> save</button>\n" +
    "            <span>the expense.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Content right-->\n" +
    "        <div class=\"expenses__edit__form__content__right\">\n" +
    "\n" +
    "            <!--Reset-->\n" +
    "            <button class=\"expenses__edit__form__content__right__cancel\" ng-click=\"cancel();\">Nevermind</button>\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"expenses__edit__form__content__right__update\" type=\"submit\">{{isUpdating ? 'Saving..' : 'Save changes'}}</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expense.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expense.list.template.html",
    "<!--Expense list content.-->\n" +
    "<div ng-show=\"showExpensesContent\" class=\"expense-list-box\" ng-class=\"{ 'expense-list-box--past-expenses': reverseOrder}\">\n" +
    "\n" +
    "    <div class=\"expenses__list\">\n" +
    "\n" +
    "        <!--Expense list-->\n" +
    "        <div class=\"expenses__list__entry\"\n" +
    "             ng-repeat=\"expense in expenses | orderObjectBy : 'model.spentDate' : reverseOrder | limitTo: expensesLimit | filter:{model:{description:searchByText}} as filteredExpenses track by expense.model.id\"\n" +
    "             expense-entry expense=\"expense\" categories=\"categories\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isStillExpensesToBeLoaded()\" class=\"expenses__list__loadbtn\">\n" +
    "        <button type=\"submit\" ladda=\"isLoadingMore\" data-style=\"expand-left\" data-spinner-size=\"20\" ng-click=\"loadMoreExpenses()\">LOAD MORE</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expenses.add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.add.html",
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
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" ng-model=\"expense.model.value\" format-price format=\"number\" required valid-price />\n" +
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
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.$error['autocomplete-required'] || expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <div angucomplete-alt\n" +
    "                 selected-object=\"category\"\n" +
    "                 local-data=\"categories\"\n" +
    "                 search-fields=\"model.name\"\n" +
    "                 title-field=\"model.name\"\n" +
    "                 field-required=\"true\"\n" +
    "                 placeholder=\"Add category\"\n" +
    "                 maxlength=\"50\"\n" +
    "                 pause=\"1\"\n" +
    "                 minlength=\"0\"\n" +
    "                 input-class=\"expense__form__category__input\"\n" +
    "                 match-class=\"highlight\"\n" +
    "                 template-url=\"app/expenses/partials/expense.category.template.html\">\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"autocomplete-required\">Category is missing or is invalid.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group-input__message\" ng-if=\"expenseForm.category.$invalid && expenseForm.$submitted\">Please add a category.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"20\" placeholder=\"Add details (optional)\" ng-model=\"expense.model.description\" escape-html />\n" +
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
    "                <button ng-click=\"open($event)\" type=\"button\" datepicker-popup is-open=\"opened\" min-date=\"minDate\" max-date=\"maxDate\" ng-model=\"expense.model.spentDate\" show-weeks=\"false\" datepicker-options=\"{starting_day:1}\">{{expense.model.spentDate | friendlyDate}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please make that you add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit\">\n" +
    "            <span>Hit Enter to</span>\n" +
    "            <button type=\"submit\"> save</button>\n" +
    "            <span>the expense.</span>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expenses.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.list.html",
    "<!--The expenses list-->\n" +
    "<div expense-list expenses=\"expenses\" categories=\"categories\" search-by-text=\"searchByText\" sort=\"desc\"></div>");
}]);

angular.module("app/expenses/partials/expense/expenses.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.template.html",
    "<div class=\"page-wrapper\">\n" +
    "\n" +
    "    <div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "    <div class=\"view-container__content\">\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <div class=\"view-container__content\">\n" +
    "            <div ui-view=\"add\"></div>\n" +
    "\n" +
    "            <div ui-view=\"list\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div footer class=\"view-container__footer\"></div>\n" +
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
    "    <div class=\"account__section\" ng-if=\"AccountModal.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginCtrl\">\n" +
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
    "            <button ladda=\"isRequestPending\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"account__btn\" type=\"submit\">Log in</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"HomeSignUpRegistrationCtrl\">\n" +
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
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.forgotPassword\" ng-controller=\"ForgotPasswordCtrl\">\n" +
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

angular.module("app/account/partials/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/logout.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "   <!-- Logout section -->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "             <!--Message-->\n" +
    "            <div class=\"alert alert-success\">\n" +
    "               Logged out successfully.\n" +
    "            </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/settings/settings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"centered-section-account\">\n" +
    "    <tabset vertical=\"true\">\n" +
    "        <tab heading=\"Profile\">\n" +
    "            <div class=\"account\" ui-view=\"profile\" profile-form-toggle></div>\n" +
    "        </tab>\n" +
    "        <tab heading=\"Preferences\">\n" +
    "            <div class=\"account\" ui-view=\"preferences\"></div>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/account/partials/settings/settings.preferences.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.preferences.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-controller=\"PreferencesCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify timezone</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"preferencesForm\" ng-submit=\"updatePreferences(preferencesData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group form-group--timezone\" ng-class=\"{'has-error': preferencesForm.timezone.$invalid && preferencesForm.$submitted}\">\n" +
    "                    <select class=\"form-control\" chosen=\"{inherit_select_classes:true}\" ng-options=\"timezone.key as timezone.value for timezone in timezones\" ng-model=\"preferencesData.timezone\" required> </select>\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"preferencesForm.timezone.$invalid && preferencesForm.$submitted\">Please tell us your email.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("app/account/partials/settings/settings.profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/settings/settings.profile.html",
    "<!-- Profile section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updateProfile\" ng-controller=\"ProfileCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Modify profile</h1>\n" +
    "\n" +
    "    <!-- Profile form -->\n" +
    "    <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.firstName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Prenume\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': profileForm.lastName.$invalid && profileForm.$submitted}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Nume\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-value=\"user.model.email\" disabled />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Save changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePassword)\">Change password</a>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Update password section -->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state === ACCOUNT_FORM_STATE.updatePassword\" ng-controller=\"UpdatePasswordCtrl\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "    <!-- Update password form -->\n" +
    "    <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Account controls -->\n" +
    "        <div class=\"account__controls\">\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"account__controls__form-groups--last\">\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.oldPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" auto-focus required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Please enter your old password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Please enter a new password.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPasswordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Please confirm your new password.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"btn account__button\" type=\"submit\">Update password</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Nevermind, take me back!</a>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-if=\"ProfileFormToggle.state == ACCOUNT_FORM_STATE.updatePasswordSuccessfully\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">We've successfully updated your new password.</span>\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile)\">Continue</a>\n" +
    "</div>");
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
    "\n" +
    "<!-- Account sections -->\n" +
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
    "<div class=\"sign-up__setup\" xmlns=\"http://www.w3.org/1999/html\">\n" +
    "\n" +
    "    <div class=\"sign-up__setup__box\">\n" +
    "\n" +
    "        <h2 class=\"sign-up__setup__title\">Awesome! Just one more step.</h2>\n" +
    "\n" +
    "        <!-- Set up form -->\n" +
    "        <form name=\"setUpForm\" ng-submit=\"setUp()\" novalidate>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__section\">\n" +
    "                Please choose your currency:\n" +
    "                <div class=\"sign-up__setup__section--currency\">\n" +
    "                    <div angucomplete-alt\n" +
    "                         selected-object=\"currency\"\n" +
    "                         local-data=\"currencies\"\n" +
    "                         search-fields=\"displayName,currencyCode\"\n" +
    "                         title-field=\"currencyCode,displayName\"\n" +
    "                         field-required=\"true\"\n" +
    "                         field-required-class=\"sign-up__setup__section--currency--invalid\"\n" +
    "                         id=\"ex1\"\n" +
    "                         placeholder=\"Start typing your currency...\"\n" +
    "                         maxlength=\"50\"\n" +
    "                         pause=\"1\"\n" +
    "                         minlength=\"0\"\n" +
    "                         input-class=\"sign-up__setup__section--currency__input\"\n" +
    "                         match-class=\"highlight\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__tip\">\n" +
    "                Please choose\n" +
    "                <strong>at least 3</strong> categories we suggested or add your own. You can change them later as well.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__box__categories\">\n" +
    "\n" +
    "                <div class=\"sign-up__box__categories__category\" ng-repeat=\"category in categories track by category.name\">\n" +
    "                    <!--Category group-->\n" +
    "                    <div class=\"category-name\" ng-style=\"{'background':category.color}\" ng-class=\"{ 'category-name--unselected': !category.selected }\" ng-click=\"toggleCategorySelection($index)\"> {{category.name}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!--Toggle form-->\n" +
    "                <button ng-if=\"! showCategoryOnTheFlyInput\" class=\"sign-up__box__categories__addbtn\" ng-click=\"toggleContent()\">+ Add another</button>\n" +
    "\n" +
    "                <ng-form class=\"sign-up__box__categories__category__form\" name=\"categoryOnTheFlyForm\"\n" +
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
    "                               ng-model=\"$parent.categoryOnTheFly\"\n" +
    "                               ng-enter=\"triggerSubmit()\"\n" +
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
    "            <button ladda=\"isSaving\" data-style=\"expand-left\" data-spinner-size=\"20\" class=\"sign-up__setup__btn\" ng-disabled=\"! isEnoughSelectedCategories()\" type=\"submit\">Done! Let's start!</button>\n" +
    "        </form>\n" +
    "\n" +
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

angular.module("app/feedback/partials/feedback-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedback-modal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendFeedbackAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"feedback-modal__header\">Feedback</div>\n" +
    "\n" +
    "    <div class=\"expense-modal__form__cancel\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissFeedbackModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.$submitted}\">\n" +
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
    "        <button class=\"btn btn-link\" type=\"button\" ng-click=\"dismissFeedbackModal()\">Cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/common/partials/emailList/emailList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/emailList/emailList.html",
    "<div ng-repeat=\"email in emails track by $index\">\n" +
    "    <ng-form name=\"emailForm\">\n" +
    "        <div class=\"form-group form-group--email-icon\" ng-class=\"{'has-error': emailForm.email.$invalid && parentForm.$submitted}\">\n" +
    "\n" +
    "            <!--Inputs : first is your email-->\n" +
    "            <input class=\"form-control form-control--friend-email\" type=\"email\" placeholder=\"{{$index === 0 ? 'Your email' : 'Your friend\\'s email address'}}\" name=\"email\" ng-model=\"emails[$index].email\" required ng-disabled=\"$index === 0\" />\n" +
    "\n" +
    "            <!--Remove emails buttons-->\n" +
    "            <a href=\"javascript:void(0)\" ng-if=\"$index > 0\" class=\"close\" tabindex=\"-1\" ng-click=\"removeEmail($index)\">×</a>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "<a class=\"btn-add-emails\" href=\"javascript:void(0)\" ng-click=\"addEmail()\" ng-show=\"canAddEmail\">Add another email recipient</a>");
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
    "    <div class=\"footer__logo\">\n" +
    "        (C) 2015 Revaluate\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"footer__links\">\n" +
    "        <li><a href=\"http://blog.revaluate.io\">Read our Blog</a></li>\n" +
    "        <li><a href=\"mailto:hello@revaluate.io\">Send us an Email</a></li>\n" +
    "        <li><a href=\"https://twitter.com/revaluateapp\">Follow us on Twitter</a></li>\n" +
    "        <li><a href=\"https://www.facebook.com/revaluateapp\">Like us on Facebook</a></li>\n" +
    "    </ul>\n" +
    "</footer>\n" +
    "");
}]);

angular.module("app/common/partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer.html",
    "<footer class=\"footer\">\n" +
    "    <div class=\"footer__logo\">\n" +
    "        (C) 2015 Revaluate\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"footer__links\">\n" +
    "        <li><a href=\"http://blog.revaluate.io\">Read our Blog</a></li>\n" +
    "        <li><a href=\"mailto:hello@revaluate.io\">Send us an Email</a></li>\n" +
    "        <li><a href=\"https://twitter.com/revaluateapp\">Follow us on Twitter</a></li>\n" +
    "        <li><a href=\"https://www.facebook.com/revaluateapp\">Like us on Facebook</a></li>\n" +
    "    </ul>\n" +
    "</footer>\n" +
    "");
}]);

angular.module("app/common/partials/header-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header-home.html",
    "<header class=\"header-home\">\n" +
    "\n" +
    "    <div class=\"header-home__brand\">\n" +
    "        <div class=\"header-home__brand--logo\">Logo</div>\n" +
    "        <a href=\"javascript:void(0)\" class=\"header-home__brand--name\">Revaluate</a>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <ul class=\"header-home__navigation\">\n" +
    "        <li><a href=\"javascript:void(0)\">Pricing</a></li>\n" +
    "        <li><a href=\"javascript:void(0)\">Blog</a></li>\n" +
    "        <li><a href=\"javascript:void(0)\">Contact</a></li>\n" +
    "        <li><button class=\"header-home__navigation--btn\" account-modal-toggle=\"login\">Log in</button></li>\n" +
    "    </ul>\n" +
    "\n" +
    "</header>\n" +
    "");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<header class=\"header\">\n" +
    "\n" +
    "    <div class=\"header__brand\">\n" +
    "        <a href=\"javascript:void(0)\" class=\"header__brand--name\">Revaluate</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"dropdown header__dropdown\" dropdown is-open=\"status.isopen\">\n" +
    "        <button class=\"dropdown-toggle header__dropdown__toggle\" ng-show=\"currentUser.model.firstName + currentUser.model.lastName\" dropdown-toggle data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "            <span class=\"header__dropdown__avatar\">AV</span>\n" +
    "            {{currentUser.model.firstName + \" \" + currentUser.model.lastName}}\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu header__dropdown__menu\" role=\"menu\">\n" +
    "            <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"settings\">Preferences</a></li>\n" +
    "            <li><a class=\"nav-link\" href=\"javascript:void(0)\" id=\"feedback-trigger\" ng-controller=\"FeedbackModalCtrl\" ng-click=\"openFeedbackModal()\">Send feedback</a></li>\n" +
    "            <li><a class=\"nav-link\" href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"header__navigation\">\n" +
    "        <li><a href=\"javascript:void(0)\">Wallet</a></li>\n" +
    "        <li><a href=\"javascript:void(0)\">Insights</a></li>\n" +
    "        <li><a href=\"javascript:void(0)\">Goals</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "</header>");
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
