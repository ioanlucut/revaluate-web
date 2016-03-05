export default

  function ($filter) {
        return function (num, symbol, fractionSize) {

          return $filter('currency')(num, '', fractionSize);
        };
      }

