export default

  function ($filter) {
        return function (num, symbol, fractionSize) {

          return $filter('currency')(num, '', fractionSize) + '<span class="currency__symbol">' + symbol + '</span>';
        };
      }
