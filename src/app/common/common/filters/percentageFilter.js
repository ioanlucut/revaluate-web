function percentageFilter($filter) {
  'ngInject';

  return (input, decimals) => `${$filter('number')(input, decimals)}%`;
}

export default percentageFilter;
