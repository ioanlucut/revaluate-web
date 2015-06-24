'use strict';

angular
    .module("revaluate.common")
    .filter('currencys', function ($filter) {
        return function (num, symbol, fractionSize) {

            return $filter('currency')(num, '<span class="currency__symbol">' + symbol + '</span>', fractionSize);
        };
    }
);
