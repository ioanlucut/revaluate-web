'use strict';
export default angular
    .module('revaluate.settings')
    .value('clientTokenPath', URLTo.api('payment/fetchToken'))
    .name;
