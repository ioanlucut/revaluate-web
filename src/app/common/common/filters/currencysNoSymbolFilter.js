function currencysNoSymbolFilter($filter) {
  return function (num, symbol, fractionSize) {

    return $filter('currency')(num, '', fractionSize);
  };
}

export default currencysNoSymbolFilter;
