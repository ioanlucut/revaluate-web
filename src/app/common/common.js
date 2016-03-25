import userActivityEventsConstants from './common/constants/userActivityEventsConstants';
import statesConstants from './common/constants/statesConstants';
import alertsConstants from './common/constants/alertsConstants';
import alertsEventsConstants from './common/constants/alertsEventsConstants';
import errorConstants from './common/constants/errorConstants';
import unisonConstants from './unison/unisonConstants';
import unisonBreakpointsConstants from './unison/unisonBreakpointsConstants';
import datePickerMonthlyDirective from './datePickerMonthly/datePickerMonthlyDirective';
import flashMessagesDirective from './flashMessage/flashMessagesDirective';
import footerDirective from './footer/footerDirective';
import footerHomeDirective from './footer/footerHomeDirective';
import HeaderController from './header/HeaderController';
import headerDirective from './header/headerDirective';
import headerSideDirective from './header/headerSideDirective';
import unisonListenerDirective from './unison/unisonListenerDirective';
import userProfilePictureDirective from './userProfilePicture/userProfilePictureDirective';
import userProfilePictureHeaderDirective from './userProfilePicture/userProfilePictureHeaderDirective';
import currencysFilter from './common/filters/currencysFilter';
import currencysNoSymbolFilter from './common/filters/currencysNoSymbolFilter';
import friendlyDateFilter from './common/filters/friendlyDateFilter';
import friendlyHourFilter from './common/filters/friendlyHourFilter';
import friendlyHourTimepickerFilter from './common/filters/friendlyHourTimepickerFilter';
import friendlyMonthDateFilter from './common/filters/friendlyMonthDateFilter';
import friendlyMonthDateNoYearFilter from './common/filters/friendlyMonthDateNoYearFilter';
import friendlyMonthShortDateNoYearFilter from './common/filters/friendlyMonthShortDateNoYearFilter';
import friendlyMonthDayFilter from './common/filters/friendlyMonthDayFilter';
import highlightSearchFilter from './common/filters/highlightSearchFilter';
import orderObjectByFilter from './common/filters/orderObjectByFilter';
import pluralisationFilter from './common/filters/pluralisationFilter';
import animateDirective from './common/directives/animateDirective';
import autoFocusDirective from './common/directives/autoFocusDirective';
import escKeyDirective from './common/directives/escKeyDirective';
import escapeHtmlDirective from './common/directives/escapeHtmlDirective';
import fadeOutInDirective from './common/directives/fadeOutInDirective';
import focusFirstErrorDirective from './common/directives/focusFirstErrorDirective';
import formatPriceDirective from './common/directives/formatPriceDirective';
import layzrInitializerDirective from './common/directives/layzrInitializerDirective';
import introbarDirective from './common/directives/introbarDirective';
import ngEnterDirective from './common/directives/ngEnterDirective';
import postAddExpenseFocus from './common/directives/postAddExpenseFocus';
import scrollToDirective from './common/directives/scrollToDirective';
import submitOnDirective from './common/directives/submitOnDirective';
import validDateDirective from './common/directives/validDateDirective';
import validPriceDirective from './common/directives/validPriceDirective';
import ErrorInterceptorService from './common/interceptors/ErrorInterceptorService';
import JWTInterceptor from './common/interceptors/JWTInterceptor';
import AlertService from './common/services/AlertService';
import DatesUtilsService from './common/services/DatesUtilsService';
import JwtHelperService from './common/services/JwtHelperService';
import MixpanelUtilsService from './common/services/MixpanelUtilsService';
import SessionService from './common/services/SessionService';
import StatesHandlerService from './common/services/StatesHandlerService';
import TransformerUtilsService from './common/services/TransformerUtilsService';

export default angular
  .module('revaluate.common', [
    'chart.js',
    'ui.router',
    'ngSanitize',
    'ui.bootstrap.tpls',
    'ui.bootstrap.transition',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.progressbar',
    'ui.bootstrap.dateparser',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.modal',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
  ])
  .constant('USER_ACTIVITY_EVENTS', userActivityEventsConstants)
  .constant('STATES', statesConstants)
  .constant('ALERTS_CONSTANTS', alertsConstants)
  .constant('ALERTS_EVENTS', alertsEventsConstants)
  .constant('ERROR_INTERCEPTOR', errorConstants)
  .constant('UNISON_EVENTS', unisonConstants)
  .constant('UNISON_BREAKPOINTS', unisonBreakpointsConstants)
  .constant('APP_CONFIG', {})
  .controller('HeaderController', HeaderController)
  .directive('datePickerMonthly', datePickerMonthlyDirective)
  .directive('flashMessages', flashMessagesDirective)
  .directive('footer', footerDirective)
  .directive('footerHome', footerHomeDirective)
  .directive('header', headerDirective)
  .directive('headerSide', headerSideDirective)
  .directive('unisonListener', unisonListenerDirective)
  .directive('userProfilePicture', userProfilePictureDirective)
  .directive('userProfilePictureHeader', userProfilePictureHeaderDirective)
  .filter('currencys', currencysFilter)
  .filter('currencysNoSymbol', currencysNoSymbolFilter)
  .filter('friendlyDate', friendlyDateFilter)
  .filter('friendlyHour', friendlyHourFilter)
  .filter('friendlyHourTimePicker', friendlyHourTimepickerFilter)
  .filter('friendlyMonthDate', friendlyMonthDateFilter)
  .filter('friendlyMonthDateNoYear', friendlyMonthDateNoYearFilter)
  .filter('friendlyMonthShortDateNoYear', friendlyMonthShortDateNoYearFilter)
  .filter('friendlyMonthDay', friendlyMonthDayFilter)
  .filter('highlightSearch', highlightSearchFilter)
  .filter('orderObjectBy', orderObjectByFilter)
  .filter('pluralisationFilter', pluralisationFilter)
  .directive('animate', animateDirective)
  .directive('autoFocus', autoFocusDirective)
  .directive('escKey', escKeyDirective)
  .directive('escapeHtml', escapeHtmlDirective)
  .directive('fadeOutIn', fadeOutInDirective)
  .directive('focusFirstError', focusFirstErrorDirective)
  .directive('formatPrice', formatPriceDirective)
  .directive('layzrInitializer', layzrInitializerDirective)
  .directive('introBarListener', introbarDirective)
  .directive('ngEnter', ngEnterDirective)
  .directive('postAddExpenseFocus', postAddExpenseFocus)
  .directive('scrollTo', scrollToDirective)
  .directive('submitOn', submitOnDirective)
  .directive('validDate', validDateDirective)
  .directive('validPrice', validPriceDirective)
  .factory('ErrorInterceptor', ErrorInterceptorService)
  .provider('JWTInterceptor', JWTInterceptor)
  .service('AlertService', AlertService)
  .service('DatesUtils', DatesUtilsService)
  .service('JWTHelper', JwtHelperService)
  .service('MixpanelUtilsService', MixpanelUtilsService)
  .service('SessionService', SessionService)
  .service('StatesHandler', StatesHandlerService)
  .service('TransformerUtils', TransformerUtilsService)
  .config($httpProvider => {
    'ngInject';

    $httpProvider.interceptors.push('JWTInterceptor');
    $httpProvider.interceptors.push('ErrorInterceptor');
  })
  .run(() => {

    /**
     * Callback function to check if the date should include year too.
     * @returns {string}
     */
    function callbackCalendarFormatter() {
      const isSameYear = moment(moment().year()).isSame(this.year());

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
        sameElse: callbackCalendarFormatter,
      },
    });
  });
