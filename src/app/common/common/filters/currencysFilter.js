function currencysFilter($filter) {
  'ngInject';

  return (num, symbol, fractionSize) =>
    `${$filter('currency')(num, '', fractionSize)}<span class="currency__symbol">${symbol}</span>`;
}

export default currencysFilter;
