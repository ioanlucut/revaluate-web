'use strict';

export default angular
    .module('revaluate.common')
    .filter('currencysNoSymbol', function ($filter) {
        return function (num, symbol, fractionSize) {

            return $filter('currency')(num, '', fractionSize);
        };
    })
    .name;
