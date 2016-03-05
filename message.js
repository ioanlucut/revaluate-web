--------------------------
module('revaluate.common', [
import common from 'src/app/common/common'
--------------------------
module('revaluate.common')
import datePickerMonthlyDirective from 'src/app/common/datePickerMonthly/datePickerMonthlyDirective'
import flashMessagesDirective from 'src/app/common/flashMessage/flashMessagesDirective'
import footerDirective from 'src/app/common/footer/footerDirective'
import footerHomeDirective from 'src/app/common/footer/footerHomeDirective'
import HeaderController from 'src/app/common/header/HeaderController'
import headerDirective from 'src/app/common/header/headerDirective'
import headerSideDirective from 'src/app/common/header/headerSideDirective'
import unisonConstants from 'src/app/common/unison/unisonConstants'
import unisonListenerDirective from 'src/app/common/unison/unisonListenerDirective'
import userProfilePictureDirective from 'src/app/common/userProfilePicture/userProfilePictureDirective'
import userProfilePictureHeaderDirective from 'src/app/common/userProfilePicture/userProfilePictureHeaderDirective'
import currencysFilter from 'src/app/common/common/filters/currencysFilter'
import currencysNoSymbolFilter from 'src/app/common/common/filters/currencysNoSymbolFilter'
import friendlyDateFilter from 'src/app/common/common/filters/friendlyDateFilter'
import friendlyHourFilter from 'src/app/common/common/filters/friendlyHourFilter'
import friendlyHourTimepickerFilter from 'src/app/common/common/filters/friendlyHourTimepickerFilter'
import friendlyMonthDateFilter from 'src/app/common/common/filters/friendlyMonthDateFilter'
import friendlyMonthDateNoYearFilter from 'src/app/common/common/filters/friendlyMonthDateNoYearFilter'
import friendlyMonthShortDateNoYearFilter from 'src/app/common/common/filters/friendlyMonthShortDateNoYearFilter'
import friendlyMonthDayFilter from 'src/app/common/common/filters/friendlyMonthDayFilter'
import highlightSearchFilter from 'src/app/common/common/filters/highlightSearchFilter'
import orderObjectByFilter from 'src/app/common/common/filters/orderObjectByFilter'
import pluralisationFilter from 'src/app/common/common/filters/pluralisationFilter'
import animateDirective from 'src/app/common/common/directives/animateDirective'
import autoFocusDirective from 'src/app/common/common/directives/autoFocusDirective'
import escKeyDirective from 'src/app/common/common/directives/escKeyDirective'
import escapeHtmlDirective from 'src/app/common/common/directives/escapeHtmlDirective'
import fadeOutInDirective from 'src/app/common/common/directives/fadeOutInDirective'
import focusFirstErrorDirective from 'src/app/common/common/directives/focusFirstErrorDirective'
import formatPriceDirective from 'src/app/common/common/directives/formatPriceDirective'
import layzrInitializerDirective from 'src/app/common/common/directives/layzrInitializerDirective'
import introbarDirective from 'src/app/common/common/directives/introbarDirective'
import ngEnterDirective from 'src/app/common/common/directives/ngEnterDirective'
import odometerDirective from 'src/app/common/common/directives/odometerDirective'
import postAddExpenseFocus from 'src/app/common/common/directives/postAddExpenseFocus'
import scrollToDirective from 'src/app/common/common/directives/scrollToDirective'
import submitOnDirective from 'src/app/common/common/directives/submitOnDirective'
import validDateDirective from 'src/app/common/common/directives/validDateDirective'
import validPriceDirective from 'src/app/common/common/directives/validPriceDirective'
import ErrorInterceptorService from 'src/app/common/common/interceptors/ErrorInterceptorService'
import JWTInterceptor from 'src/app/common/common/interceptors/JWTInterceptor'
import AlertService from 'src/app/common/common/services/AlertService'
import DatesUtilsService from 'src/app/common/common/services/DatesUtilsService'
import JwtHelperService from 'src/app/common/common/services/JwtHelperService'
import MixpanelUtilsService from 'src/app/common/common/services/MixpanelUtilsService'
import SessionService from 'src/app/common/common/services/SessionService'
import StatesHandlerService from 'src/app/common/common/services/StatesHandlerService'
import TransformerUtilsService from 'src/app/common/common/services/TransformerUtilsService'
--------------------------
module('revaluate.common', [
.constant('USER_ACTIVITY_EVENTS', common)
--------------------------
module('revaluate.common')
.directive('datePickerMonthly', datePickerMonthlyDirective)
.directive('flashMessages', flashMessagesDirective)
.directive('footer', footerDirective)
.directive('footerHome', footerHomeDirective)
.controller('HeaderController', HeaderController)
.directive('header', headerDirective)
.directive('headerSide', headerSideDirective)
.constant('UNISON_EVENTS', unisonConstants)
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
.directive('odometer', odometerDirective)
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
