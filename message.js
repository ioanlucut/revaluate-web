--------------------------
module('revaluate.common')
import currencysFilter from 'src/app/common/common/filters/currencysFilter'
import currencysNoSymbolFilter from 'src/app/common/common/filters/currencysNoSymbolFilter'
import friendlyDateFilter from 'src/app/common/common/filters/friendlyDateFilter'
import friendlyHourFilter from 'src/app/common/common/filters/friendlyHourFilter'
import friendlyHourTimepickerFilter from 'src/app/common/common/filters/friendlyHourTimepickerFilter'
import friendlyMonthDateFilter from 'src/app/common/common/filters/friendlyMonthDateFilter'
import friendlyMonthDateNoYearFilter from 'src/app/common/common/filters/friendlyMonthDateNoYearFilter'
import friendlyMonthDayFilter from 'src/app/common/common/filters/friendlyMonthDayFilter'
import friendlyMonthShortDateNoYearFilter from 'src/app/common/common/filters/friendlyMonthShortDateNoYearFilter'
import highlightSearchFilter from 'src/app/common/common/filters/highlightSearchFilter'
import orderObjectByFilter from 'src/app/common/common/filters/orderObjectByFilter'
import pluralisationFilter from 'src/app/common/common/filters/pluralisationFilter'
--------------------------
module('revaluate.common')
.filter('currencys', currencysFilter)
.filter('currencysNoSymbol', currencysNoSymbolFilter)
.filter('friendlyDate', friendlyDateFilter)
.filter('friendlyHour', friendlyHourFilter)
.filter('friendlyHourTimePicker', friendlyHourTimepickerFilter)
.filter('friendlyMonthDate', friendlyMonthDateFilter)
.filter('friendlyMonthDateNoYear', friendlyMonthDateNoYearFilter)
.filter('friendlyMonthDay', friendlyMonthDayFilter)
.filter('friendlyMonthShortDateNoYear', friendlyMonthShortDateNoYearFilter)
.filter('highlightSearch', highlightSearchFilter)
.filter('orderObjectBy', orderObjectByFilter)
.filter('pluralisationFilter', pluralisationFilter)
