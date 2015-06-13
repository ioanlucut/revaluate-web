'use strict';

/**
 * Main common module declaration including ui templates.
 */
angular
    .module("revaluate.common", [
        "chart.js",
        "ui.router",
        "ngSanitize",
        "ui.bootstrap.tpls",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dateparser",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "angular-flash.service",
        "angular-flash.flash-alert-directive"
    ])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("JWTInterceptor");
        $httpProvider.interceptors.push("ActivityInterceptor");
        $httpProvider.interceptors.push("ErrorInterceptor");
    }).run(function () {

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
