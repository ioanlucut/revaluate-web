(function () {
    'use strict';

    angular
        .module('revaluate.settings')
        .value('clientTokenPath', URLTo.api('payment/fetchToken'));
}());
