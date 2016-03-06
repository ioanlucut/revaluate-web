function currencysNoSymbolFilter($filter) {
  return (num, symbol, fractionSize) => $filter('currency')(num, '', fractionSize);
}

export default currencysNoSymbolFilter;
